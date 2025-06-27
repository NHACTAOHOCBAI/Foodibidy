import { firestore, auth } from 'firebase-admin'
import HTTP_STATUS from '~/constants/httpStatus'
import { USER_MESSAGES } from '~/constants/messages'
import { ErrorWithStatus } from '~/models/errors'
import { CreateUserReqBody, UpdateUserReqBody } from '~/models/requests/user.request'
import Address from '~/models/schemas/address.schema'
import User, { UserType } from '~/models/schemas/user.schema'
import { hashPassword } from '~/utils/hashPassword'
import { handleFormatDate, updateNestedFieldInCollection } from '~/utils/utils'
import cartService from './cart.service'
import databaseService from './database.service'
import { CloudinaryService } from './file.service'
import { UserRole } from '~/constants/enums'
import restaurantService from './restaurant.service'
import { id } from 'date-fns/locale'

class UsersService {
  private userCollection = databaseService.users
  private cartCollection = databaseService.carts
  private restaurantCollection = databaseService.restaurants
  private order_detailCollection = databaseService.order_details

  async createUser(userData: CreateUserReqBody) {
    try {
      if ((await this.checkEmailExists(userData.email)) === true) {
        const { avatar, password, email, address, ...userDataWithoutAddress } = userData

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
          role: userData.role || UserRole.CUSTOMER,
          passwordHash: hashPassword(password)
        }).toObject()

        await this.userCollection.doc(firebaseUser.uid).set(newUser)

        // Create addresses collection and add addresses if provided
        const addressCollection = this.userCollection.doc(firebaseUser.uid).collection('addresses')

        if (address && address.length > 0) {
          const batch = firestore().batch()

          for (const addressData of address) {
            const newAddressRef = addressCollection.doc()
            const newAddress = new Address({
              ...addressData,
              userId: firebaseUser.uid
            }).toObject()
            batch.set(newAddressRef, newAddress)
          }

          await batch.commit()
          console.log(`Added ${address.length} addresses for user ${firebaseUser.uid}`)
        }

        // Create cart for user
        const cart = await cartService.createCart({ userId: firebaseUser.uid })

        // Update user with cartId
        await this.userCollection.doc(firebaseUser.uid).update({ cartId: cart })
        console.log('User created with ID:', firebaseUser.uid)
        return firebaseUser.uid
      } else throw new Error(`Email already exist`)
    } catch (error) {
      console.error('Error creating user:', error)
      throw error
    }
  }

  // async createRestaurantOwner(userData: CreateUserReqBody) {
  //   try {
  //     // Kiểm tra email đã tồn tại chưa
  //     console.log(this.checkEmailExists(userData.email))
  //     if ((await this.checkEmailExists(userData.email)) === true) {
  //       const { avatar, password, email, ...userDataWithoutAddress } = userData

  //       let urlImage = ''
  //       // Nếu có avatar thì upload lên cloudinary
  //       if (avatar) {
  //         urlImage = await CloudinaryService.uploadImage(avatar, 'avatar')
  //       }

  //       // Tạo user trên Firebase Authentication trước
  //       const firebaseUser = await auth().createUser({
  //         email: email,
  //         password: password,
  //         displayName: userData.fullName,
  //         photoURL: urlImage || undefined
  //       })

  //       console.log('Firebase Auth user created with UID:', firebaseUser.uid)

  //       // Tạo user mới với dữ liệu nhập vào lưu vào Firestore
  //       const newUser = new User({
  //         ...userDataWithoutAddress,
  //         id: firebaseUser.uid,
  //         role: UserRole.RESTAURANT,
  //         email: email,
  //         // firebaseUID: firebaseUser.uid, // lưu thêm UID Firebase để mapping sau này
  //         avatar: urlImage,
  //         passwordHash: hashPassword(password) // Băm password để lưu Firestore (optional nếu bạn vẫn muốn lưu)
  //         // dateOfBirth: new Date(userData.dateOfBirth)
  //       }).toObject()

  //       // Thêm user vào Firestore
  //       const docRef = await this.userCollection.doc(firebaseUser.uid).set(newUser)

  //       // Thêm danh sách địa chỉ cho user
  //       // for (const data of address) {
  //       //   const newAddress = new Address({ ...data, userId: firebaseUser.uid }).toObject()
  //       //   await this.userCollection.doc(firebaseUser.uid).collection('addresses').add(newAddress)
  //       // }

  //       const cart = await cartService.createCart({ userId: firebaseUser.uid })

  //       await this.userCollection.doc(firebaseUser.uid).update({ cartId: cart })
  //       console.log('User created with ID:', firebaseUser.uid)
  //       return firebaseUser.uid
  //     } else throw new Error(`Email already exist`)
  //   } catch (error) {
  //     console.error('Error creating user:', error)
  //     throw error
  //   }
  // }

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

      // Fix email check logic - should be true if email exists
      if (updateData.email && !(await this.checkEmailExists(updateData.email))) {
        throw new Error(`Email already exist`)
      }

      const { avatar, address, ...updatedDataReq } = updateData

      let urlImage = ''
      if (avatar) {
        urlImage = await CloudinaryService.uploadImage(avatar, 'avatar')
      }

      const batch = firestore().batch()
      const addressCollection = docRef.collection('addresses')

      // Handle addresses update
      if (address && address.length > 0) {
        // Delete all existing addresses first
        const existingAddresses = await addressCollection.get()
        existingAddresses.forEach((doc) => {
          batch.delete(doc.ref)
        })

        // Add new addresses
        address.forEach((addressData) => {
          const newAddressRef = addressCollection.doc()
          const newAddress = new Address({
            ...addressData,
            userId
          }).toObject()
          batch.set(newAddressRef, newAddress)
        })
      }

      // Update user in other collections if name or phone changes
      if (updateData.fullName) {
        await updateNestedFieldInCollection({
          collection: this.order_detailCollection,
          matchField: 'user.id',
          matchValue: userId, // Fix: use userId instead of id
          nestedFieldPath: 'user.fullName',
          updatedValue: updateData.fullName
        })

        await updateNestedFieldInCollection({
          collection: this.restaurantCollection,
          matchField: 'user.id',
          matchValue: userId, // Fix: use userId instead of id
          nestedFieldPath: 'user.fullName',
          updatedValue: updateData.fullName
        })
      }

      if (updateData.phoneNumber) {
        await updateNestedFieldInCollection({
          collection: this.order_detailCollection,
          matchField: 'user.id',
          matchValue: userId, // Fix: use userId instead of id
          nestedFieldPath: 'user.phoneNumber',
          updatedValue: updateData.phoneNumber
        })

        await updateNestedFieldInCollection({
          collection: this.restaurantCollection,
          matchField: 'user.id',
          matchValue: userId, // Fix: use userId instead of id
          nestedFieldPath: 'user.phoneNumber',
          updatedValue: updateData.phoneNumber
        })
      }

      const updatedUser = {
        ...updatedDataReq,
        ...(urlImage && { avatar: urlImage }), // Only update avatar if new image uploaded
        updatedAt: new Date()
      }

      // Commit batch operations first
      await batch.commit()

      // Then update user document
      await docRef.update(updatedUser)

      console.log(`Update user success with ID ${userId}`)
      return true
    } catch (error) {
      console.error('Error updating user:', error)
      throw new ErrorWithStatus({
        message: USER_MESSAGES.UPDATE_FAIL,
        status: HTTP_STATUS.BAD_REQUEST
      })
    }
  }

  async deleteUser(userId: string) {
    try {
      const userDoc = await this.userCollection.doc(userId).get()

      if (!userDoc.exists) {
        throw new ErrorWithStatus({ message: USER_MESSAGES.NOT_FOUND, status: HTTP_STATUS.NOT_FOUND })
      }

      const userData = userDoc.data()

      //xoa restaurant
      if (userData?.role === UserRole.RESTAURANT) {
        const restaurantId = await restaurantService.deleteRestaurantByUserId(userId)
        console.log(restaurantId)
      }
      // xoa orderdetail khỏi collection
      const orderDetailSnapshot = await databaseService.order_details.where('user.id', '==', userId).get()
      const batch = firestore().batch()
      orderDetailSnapshot.forEach((doc) => {
        batch.delete(doc.ref)
      })
      //  xoa  user_dish khỏi collection
      const userDishSnapshot = await databaseService.user_dish.where('user.id', '==', userId).get()
      userDishSnapshot.forEach((doc) => {
        batch.delete(doc.ref)
      })
      await batch.commit()
      console.log(`Order with user ID ${userId} deleted successfully`)

      // Xóa user khỏi collection
      await this.userCollection.doc(userId).delete()
      console.log(`User with ID ${userId} deleted successfully`)

      // Xóa luôn Firebase Auth user nếu có firebaseUID
      await auth().deleteUser(userId)
      console.log(`Firebase Auth user with UID ${userId} deleted successfully`)

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
