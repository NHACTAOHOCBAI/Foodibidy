import { ErrorWithStatus } from '~/models/errors'
import databaseService from './database.service'
import { CreateUserReqBody, UpdateUserReqBody } from '~/models/requests/user.request'
import User, { UserType } from '~/models/schemas/user.schema'
import { hashPassword } from '~/utils/hashPassword'
import { USERS_MESSAGES } from '~/constants/messages'
import HTTP_STATUS from '~/constants/httpStatus'
import { handleFormatDate } from '~/utils/utils'
import Address from '~/models/schemas/address.schema'
import cartService from './cart.service'
import { firestore } from 'firebase-admin'
class UsersService {
  private userCollection = databaseService.users

  async createUser(userData: CreateUserReqBody) {
    try {
      console.log(this.checkEmailExists(userData.email))
      if ((await this.checkEmailExists(userData.email)) === true) {
        const { address, ...userDataWithoutAddress } = userData

        const newUser = new User({
          ...userDataWithoutAddress,
          passwordHash: hashPassword(userData.password),
          dateOfBirth: new Date(userData.dateOfBirth)
        }).toObject()

        const docRef = await this.userCollection.add(newUser)

        for (const data of address) {
          const newAddress = new Address({ ...data, userId: docRef.id }).toObject()
          await this.userCollection.doc(docRef.id).collection('addresses').add(newAddress)
        }
        const cart = await cartService.createCart({ userId: docRef.id })
        console.log(cart)
        await this.userCollection.doc(docRef.id).update({ cart: cart })
        console.log('User created with ID:', docRef.id)
        return docRef.id
      } else throw new Error(`Email already exist`)
    } catch (error) {
      console.error('Error creating user:', error)
      throw new Error(`Failed to create user: ${error}`)
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
    throw new ErrorWithStatus({ message: USERS_MESSAGES.USER_NOT_FOUND, status: HTTP_STATUS.NOT_FOUND })
  }

  async updateUser(userId: string, updateData: UpdateUserReqBody) {
    try {
      const doc = await this.userCollection.doc(userId).get()
      const batch = firestore().batch()

      const addressCollection = this.userCollection.doc(userId).collection('addresses')

      const existingAddressesSnapshot = await addressCollection.get()
      const existingAddressIds = existingAddressesSnapshot.docs.map((doc) => doc.id)

      const newAddresses = updateData.address ?? []
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
        ...updateData,
        updatedAt: new Date()
      }
      await batch.commit()
      await this.userCollection.doc(userId).update(updatedUser)

      console.log(`Update user success with ID ${doc.id}`)
    } catch {
      throw new ErrorWithStatus({ message: USERS_MESSAGES.USER_NOT_FOUND, status: HTTP_STATUS.NOT_FOUND })
    }
  }

  async deleteUser(userId: string) {
    try {
      await this.userCollection.doc(userId).delete()
      console.log(`User with ID ${userId} deleted successfully`)
    } catch (error) {
      console.error(`Error deleting user with ID ${userId}:`, error)
      throw new ErrorWithStatus({ message: USERS_MESSAGES.USER_NOT_FOUND, status: HTTP_STATUS.NOT_FOUND })
    }
  }

  async checkEmailExists(email: string): Promise<boolean> {
    const userSnapshot = await databaseService.users.where('email', '==', email).limit(1).get()
    console.log(userSnapshot.empty)
    return userSnapshot.empty
  }
}

const usersService = new UsersService()
export default usersService
