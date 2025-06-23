import { firestore, auth } from 'firebase-admin'
import HTTP_STATUS from '~/constants/httpStatus'
import { USER_MESSAGES } from '~/constants/messages'
import { ErrorWithStatus } from '~/models/errors'
import { CreateUserReqBody, UpdateUserReqBody } from '~/models/requests/user.request'
import Address from '~/models/schemas/address.schema'
import User, { UserType } from '~/models/schemas/user.schema'
import { hashPassword } from '~/utils/hashPassword'
import { handleFormatDate } from '~/utils/utils'
import cartService from './cart.service'
import databaseService from './database.service'
import { CloudinaryService } from './file.service'
import { UserRole } from '~/constants/enums'
import restaurantService from './restaurant.service'

class UsersService {
  // dateOfBirth: new Date(userData.dateOfBirth)

  // Khởi tạo collection người dùng và giỏ hàng từ databaseService
  private userCollection = databaseService.users
  private cartCollection = databaseService.carts
  private restaurant_categoryCollection = databaseService.restaurant_category

  async createUser(userData: CreateUserReqBody) {
    try {
      console.log(this.checkEmailExists(userData.email))
      if ((await this.checkEmailExists(userData.email)) === true) {
        const { avatar, password, email, ...userDataWithoutAddress } = userData

        let urlImage = ''
        if (avatar) {
          urlImage = await CloudinaryService.uploadImage(avatar, 'avatar')
        }

        const firebaseUser = await auth().createUser({
          email: email,
          password: password,
          displayName: userData.fullName,
          photoURL: urlImage || undefined
        })

        console.log('Firebase Auth user created with UID:', firebaseUser.uid)

        const newUser = new User({
          ...userDataWithoutAddress,
          id: firebaseUser.uid,

          email: email,

          avatar: urlImage,
          passwordHash: hashPassword(password) // Băm password để lưu Firestore (optional nếu bạn vẫn muốn lưu)
          // dateOfBirth: new Date(userData.dateOfBirth)
        }).toObject()

        await this.userCollection.doc(firebaseUser.uid).set(newUser)

        // Thêm danh sách địa chỉ cho user
        // for (const data of address) {
        //   const newAddress = new Address({ ...data, userId: firebaseUser.uid }).toObject()
        //   await this.userCollection.doc(firebaseUser.uid).collection('addresses').add(newAddress)
        // }

        // Tạo cart cho user
        const cart = await cartService.createCart({ userId: firebaseUser.uid })

        // Cập nhật lại cartId cho user
        await this.userCollection.doc(firebaseUser.uid).update({ cartId: cart })
        console.log('User created with ID:', firebaseUser.uid)
        return firebaseUser.uid
      } else throw new Error(`Email already exist`)
    } catch (error) {
      console.error('Error creating user:', error)
      throw error // Ném lỗi để controller xử lý
    }
  }
  async createRestaurantOwner(userData: CreateUserReqBody) {
    try {
      // Kiểm tra email đã tồn tại chưa
      console.log(this.checkEmailExists(userData.email))
      if ((await this.checkEmailExists(userData.email)) === true) {
        const { avatar, password, email, ...userDataWithoutAddress } = userData

        let urlImage = ''
        // Nếu có avatar thì upload lên cloudinary
        if (avatar) {
          urlImage = await CloudinaryService.uploadImage(avatar, 'avatar')
        }

        // Tạo user trên Firebase Authentication trước
        const firebaseUser = await auth().createUser({
          email: email,
          password: password,
          displayName: userData.fullName,
          photoURL: urlImage || undefined
        })

        console.log('Firebase Auth user created with UID:', firebaseUser.uid)

        // Tạo user mới với dữ liệu nhập vào lưu vào Firestore
        const newUser = new User({
          ...userDataWithoutAddress,
          id: firebaseUser.uid,
          role: UserRole.RESTAURANT,
          email: email,
          // firebaseUID: firebaseUser.uid, // lưu thêm UID Firebase để mapping sau này
          avatar: urlImage,
          passwordHash: hashPassword(password) // Băm password để lưu Firestore (optional nếu bạn vẫn muốn lưu)
          // dateOfBirth: new Date(userData.dateOfBirth)
        }).toObject()

        // Thêm user vào Firestore
        const docRef = await this.userCollection.doc(firebaseUser.uid).set(newUser)

        // Thêm danh sách địa chỉ cho user
        // for (const data of address) {
        //   const newAddress = new Address({ ...data, userId: firebaseUser.uid }).toObject()
        //   await this.userCollection.doc(firebaseUser.uid).collection('addresses').add(newAddress)
        // }

        const cart = await cartService.createCart({ userId: firebaseUser.uid })

        await this.userCollection.doc(firebaseUser.uid).update({ cartId: cart })
        console.log('User created with ID:', firebaseUser.uid)
        return firebaseUser.uid
      } else throw new Error(`Email already exist`)
    } catch (error) {
      console.error('Error creating user:', error)
      throw error
    }
  }

  async getAllUsers(): Promise<UserType[]> {
    try {
      const snapshot = await this.userCollection.get()
      const users: UserType[] = []

      for (const doc of snapshot.docs) {
        const data = doc.data()

        let updatedAt = handleFormatDate(data.updatedAt as Date)
        let createdAt = handleFormatDate(data.createdAt as Date)
        let dateOfBirth = handleFormatDate(data.dateOfBirth as Date)

        const addressesSnapshot = await this.userCollection.doc(doc.id).collection('addresses').get()

        users.push({
          ...data,
          id: doc.id,
          createdAt,
          updatedAt,
          dateOfBirth,
          address: addressesSnapshot.docs.map((doc2) => ({
            ...doc2.data(),
            id: doc2.id
          }))
        } as UserType)
      }

      console.log('All users:', users)
      return users
    } catch (error) {
      console.error('Error getting all users:', error)
      throw new Error(`Failed to get all users: ${error}`)
    }
  }

  async getUser(userId: string) {
    const doc = await this.userCollection.doc(userId).get()
    if (doc.exists) {
      console.log(`Get user success with ID ${doc.id}`)
      const data = doc.data() as UserType
      let updatedAt = handleFormatDate(data.updatedAt as Date)
      let createdAt = handleFormatDate(data.createdAt as Date)
      let dateOfBirth = handleFormatDate(data.dateOfBirth as Date)

      const addressesSnapshot = await this.userCollection.doc(userId).collection('addresses').get()

      return {
        ...doc.data(),
        id: doc.id,
        updatedAt,
        createdAt,
        dateOfBirth,
        address: addressesSnapshot.docs.map((doc2) => ({
          ...doc2.data(),
          id: doc2.id
        }))
      }
    } else {
      console.error(`Error getting user with ID ${userId}`)
    }
    throw new ErrorWithStatus({ message: USER_MESSAGES.NOT_FOUND, status: HTTP_STATUS.NOT_FOUND })
  }
  async updateUser(userId: string, updateData: UpdateUserReqBody) {
    try {
      const docRef = this.userCollection.doc(userId)
      const doc = await docRef.get()

      if (!doc.exists) {
        throw new ErrorWithStatus({ message: USER_MESSAGES.NOT_FOUND, status: HTTP_STATUS.NOT_FOUND })
      }

      if (updateData.email)
        if ((await this.checkEmailExists(updateData.email)) === false) throw new Error(`Email already exist`)

      const { avatar, address, ...updatedDataReq } = updateData

      let urlImage = ''
      if (avatar) {
        urlImage = await CloudinaryService.uploadImage(avatar, 'avatar')
      }

      const batch = firestore().batch()
      const addressCollection = docRef.collection('addresses')

      const existingAddressesSnapshot = await addressCollection.get()
      const existingAddressIds = existingAddressesSnapshot.docs.map((doc) => doc.id)

      const newAddresses = address ?? []
      const newAddressIds = newAddresses.filter((addr) => addr.id).map((addr) => addr.id)

      const deletedAddressIds = existingAddressIds.filter((id) => !newAddressIds.includes(id))

      for (const id of deletedAddressIds) {
        await addressCollection.doc(id).delete()
      }

      for (const address of newAddresses) {
        if (address.id) {
          const addressRef = addressCollection.doc(address.id)
          batch.set(addressRef, address, { merge: true })
        } else {
          await addressCollection.add(address)
        }
      }

      const updatedUser = {
        ...updatedDataReq,
        avatar: urlImage,
        updatedAt: new Date()
      }

      await batch.commit()
      await docRef.update(updatedUser)

      console.log(`Update user success with ID ${doc.id}`)
    } catch (error) {
      throw new ErrorWithStatus({ message: USER_MESSAGES.UPDATE_FAIL, status: HTTP_STATUS.BAD_REQUEST })
    }
  }

  async deleteUser(userId: string) {
    try {
      const userDoc = await this.userCollection.doc(userId).get()

      if (!userDoc.exists) {
        throw new ErrorWithStatus({ message: USER_MESSAGES.NOT_FOUND, status: HTTP_STATUS.NOT_FOUND })
      }

      const userData = userDoc.data()

      // Nếu user có cart thì xóa luôn cart
      if (userData?.cartId) {
        await this.cartCollection.doc(userData.cartId).delete()
        console.log(`Cart with ID ${userData.cartId} deleted successfully`)
      }

      //xoa restaurant
      if (userData?.role === UserRole.RESTAURANT) {
        const restaurantId = restaurantService.deleteRestaurantByUserId(userId)
        console.log(restaurantId)
      }

      // Xóa user khỏi collection
      await this.userCollection.doc(userId).delete()
      console.log(`User with ID ${userId} deleted successfully`)

      // Xóa luôn Firebase Auth user nếu có firebaseUID
      // if (userData?.firebaseUID) {
      //   await auth().deleteUser(userData.firebaseUID)
      //   console.log(`Firebase Auth user with UID ${userData.firebaseUID} deleted successfully`)
      // }
    } catch (error) {
      console.error(`Error deleting user with ID ${userId}:`, error)
      throw new ErrorWithStatus({ message: USER_MESSAGES.DELETE_FAIL, status: HTTP_STATUS.BAD_REQUEST })
    }
  }

  // Kiểm tra email đã tồn tại chưa
  async checkEmailExists(email: string): Promise<boolean> {
    const userSnapshot = await databaseService.users.where('email', '==', email).limit(1).get()
    console.log(userSnapshot.empty)
    return userSnapshot.empty
  }
}

const usersService = new UsersService()
export default usersService
