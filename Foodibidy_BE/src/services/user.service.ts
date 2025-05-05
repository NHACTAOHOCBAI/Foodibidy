import { ErrorWithStatus } from '~/models/errors'
import databaseService from './database.service'
import { CreateUserReqBody, UpdateUserReqBody } from '~/models/requests/user.request'
import User, { UserType } from '~/models/schemas/user.schema'
import { hashPassword } from '~/utils/hashPassword'
import { USERS_MESSAGES } from '~/constants/messages'
import HTTP_STATUS from '~/constants/httpStatus'
import { CollectionReference, DocumentData, getDoc, updateDoc } from 'firebase/firestore'
class UsersService {
  private userCollection = databaseService.users

  async createUser(userData: CreateUserReqBody) {
    try {
      const userId = this.userCollection.doc().id
      const newUser = new User({
        ...userData,
        password_hash: hashPassword(userData.password),
        date_of_birth: new Date(userData.date_of_birth)
      }).toObject()

      const docRef = await this.userCollection.add(newUser)
      console.log('User created with ID:', docRef.id)
      return docRef.id
    } catch (error) {
      console.error('Error creating user:', error)
      throw new Error(`Failed to create user: ${error}`)
    }
  }

  async getUser(userId: string) {
    const doc = await this.userCollection.doc(userId).get()
    if (doc.exists) {
      console.log(`Get user success with ID ${doc.id}`)
      return { ...doc.data() } as User
    } else {
      console.error(`Error getting user with ID ${userId}`)
    }
    throw new ErrorWithStatus({ message: USERS_MESSAGES.USER_NOT_FOUND, status: HTTP_STATUS.NOT_FOUND })
  }

  async updateUser(userId: string, updateData: UpdateUserReqBody) {
    const doc = await this.userCollection.doc(userId).get()
    const data = doc.data() as UserType
    const updatedUser = {
      ...updateData,
      updated_at: new Date()
    }

    try {
      const doc2 = await this.userCollection.doc(userId).update(updatedUser)
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

  async getAllUsers(): Promise<User[]> {
    try {
      const snapshot = await this.userCollection.get()
      const users: User[] = []
      snapshot.forEach((doc) => {
        users.push({ ...doc.data() } as User)
      })
      console.log('All users:', users)
      return users
    } catch (error) {
      console.error('Error getting all users:', error)
      throw new Error(`Failed to get all users: ${error}`)
    }
  }
}

const usersService = new UsersService()
export default usersService
