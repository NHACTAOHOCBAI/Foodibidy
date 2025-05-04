import databaseService from './database.service'
import { CreateUserRequest } from '~/models/requests/user.request'
import User from '~/models/schemas/user.schema'
import { hashPassword } from '~/utils/hashPassword'
class UsersService {
  private userCollection = databaseService.users

  async createUser(userData: CreateUserRequest) {
    try {
      const userId = this.userCollection.doc().id
      const newUser = new User({
        ...userData,
        password_hash: hashPassword(userData.password),
        date_of_birth: new Date(userData.date_of_birth),
        user_id: userId
      }).toObject()

      const docRef = await this.userCollection.add(newUser)
      console.log('User created with ID:', docRef.id)
      return docRef.id
    } catch (error) {
      console.error('Error creating user:', error)
      throw new Error(`Failed to create user: ${error}`)
    }
  }

  // async getUser(userId: string): Promise<User | null> {
  //   try {
  //     const doc = await this.userCollection.doc(userId).get()
  //     if (doc.exists) {
  //       return { user_id: doc.id, ...doc.data() } as User
  //     } else {
  //       console.log(`User with ID ${userId} not found`)
  //       return null
  //     }
  //   } catch (error) {
  //     console.error(`Error getting user with ID ${userId}:`, error)
  //     throw new Error(`Failed to get user: ${error}`)
  //   }
  // }

  // async updateUser(
  //   userId: string,
  //   updateData: Partial<Omit<User, 'user_id' | 'created_at' | 'updated_at'>>
  // ): Promise<void> {
  //   try {
  //     const updatedAt = new Date()
  //     await this.userCollection.doc(userId).update({ ...updateData })
  //     console.log(`User with ID ${userId} updated successfully`)
  //   } catch (error) {
  //     console.error(`Error updating user with ID ${userId}:`, error)
  //     throw new Error(`Failed to update user: ${error}`)
  //   }
  // }

  // async deleteUser(userId: string): Promise<void> {
  //   try {
  //     await this.userCollection.doc(userId).delete()
  //     console.log(`User with ID ${userId} deleted successfully`)
  //   } catch (error) {
  //     console.error(`Error deleting user with ID ${userId}:`, error)
  //     throw new Error(`Failed to delete user: ${error}`)
  //   }
  // }

  // async getAllUsers(): Promise<User[]> {
  //   try {
  //     const snapshot = await this.userCollection.get()
  //     const users: User[] = []
  //     snapshot.forEach((doc) => {
  //       users.push({ user_id: doc.id, ...doc.data() } as User)
  //     })
  //     console.log('All users:', users)
  //     return users
  //   } catch (error) {
  //     console.error('Error getting all users:', error)
  //     throw new Error(`Failed to get all users: ${error}`)
  //   }
  // }
}

const usersService = new UsersService()
export default usersService
