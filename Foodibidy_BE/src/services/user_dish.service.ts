import databaseService from './database.service'
import { ErrorWithStatus } from '~/models/errors'
import HTTP_STATUS from '~/constants/httpStatus'
import { CATEGORY_MESSAGES } from '~/constants/messages'
import { chunkArray, handleFormatDate } from '~/utils/utils'
import User_Dish, { User_DishType } from '~/models/schemas/user_dish.schema'
import { FieldPath } from 'firebase-admin/firestore'
import { DishType } from '~/models/schemas/dish.schema'

class User_DishService {
  private user_dishCollection = databaseService.user_dish
  private dishCollection = databaseService.dishes

  async createUser_Dish(user_dishData: User_Dish) {
    const newUser_Dish = new User_Dish({
      ...user_dishData
    }).toObject()

    const docRef = await this.user_dishCollection.add(newUser_Dish)
    return docRef.id
  }

  async getDishesByUserId(pageSize: number, page: number, userId: string): Promise<DishType[]> {
    try {
      const snapshot = await this.user_dishCollection.where('userId', '==', userId).get()

      let dishes = snapshot.docs.map((doc) => doc.data().dishId) as string[]
      console.log(dishes)
      const allResults: DishType[] = []
      const chunks = chunkArray(dishes, 10) // chia nhỏ array
      for (const chunk of chunks) {
        let query = this.dishCollection.where(FieldPath.documentId(), 'in', chunk)

        const snapshot = await query.get()

        snapshot.forEach((doc) => {
          const data = doc.data()
          console.log(doc.id)
          let updatedAt = handleFormatDate(data.updatedAt as Date)
          let createdAt = handleFormatDate(data.createdAt as Date)
          allResults.push({ ...doc.data(), id: doc.id, createdAt, updatedAt } as DishType)
        })
      }
      console.log('All dishes:', allResults)
      return allResults
    } catch (error) {
      console.error('Error getting all dishes:', error)
      throw new Error(`Failed to get all dishes: ${error}`)
    }
  }
  async updateUser_Dish(user_dishId: string, updateData: Partial<User_DishType>) {
    const doc = await this.user_dishCollection.doc(user_dishId).get()
    if (!doc.exists) {
      throw new ErrorWithStatus({ message: CATEGORY_MESSAGES.NOT_FOUND, status: HTTP_STATUS.NOT_FOUND })
    }

    await this.user_dishCollection.doc(user_dishId).update({
      ...updateData,
      updatedAt: new Date()
    })
  }

  async deleteUser_Dish(user_dishId: string) {
    await this.user_dishCollection.doc(user_dishId).delete()
  }
}

const user_dishService = new User_DishService()
export default user_dishService
