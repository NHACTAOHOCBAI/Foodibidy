import { ErrorWithStatus } from '~/models/errors'
import databaseService from './database.service'
import { CreateUserReqBody, UpdateUserReqBody } from '~/models/requests/user.request'
import User, { UserType } from '~/models/schemas/user.schema'
import { hashPassword } from '~/utils/hashPassword'
import { USERS_MESSAGES } from '~/constants/messages'
import HTTP_STATUS from '~/constants/httpStatus'
import { handleFormatDate } from '~/utils/utils'
class UsersService {
  private userCollection = databaseService.users

  async createUser(userData: CreateUserReqBody) {
    try {
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

  async getAllUsers(): Promise<UserType[]> {
    try {
      const snapshot = await this.userCollection.get()
      const users: UserType[] = []

      snapshot.forEach((doc) => {
        const data = doc.data()

        let updated_at = handleFormatDate(data.updated_at as Date)
        let created_at = handleFormatDate(data.created_at as Date)
        users.push({ id: doc.id, ...doc.data(), created_at, updated_at } as UserType)
      })
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
      let updated_at = handleFormatDate(data.updated_at as Date)
      let created_at = handleFormatDate(data.created_at as Date)
      return { id: doc.id, ...doc.data(), updated_at, created_at }
    } else {
      console.error(`Error getting user with ID ${userId}`)
    }
    throw new ErrorWithStatus({ message: USERS_MESSAGES.USER_NOT_FOUND, status: HTTP_STATUS.NOT_FOUND })
  }

  async updateUser(userId: string, updateData: UpdateUserReqBody) {
    const doc = await this.userCollection.doc(userId).get()
    const updatedUser = {
      ...updateData,
      updated_at: new Date()
    }

    try {
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
}

const usersService = new UsersService()
export default usersService
