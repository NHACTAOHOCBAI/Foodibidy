import databaseService from './database.service'
import { ErrorWithStatus } from '~/models/errors'
import HTTP_STATUS from '~/constants/httpStatus'
import { CATEGORY_MESSAGES, USER_DISH_MESSAGES } from '~/constants/messages'
import { chunkArray, handleFormatDate } from '~/utils/utils'
import User_Dish, { User_DishType } from '~/models/schemas/user_dish.schema'
import { FieldPath } from 'firebase-admin/firestore'
import { DishType } from '~/models/schemas/dish.schema'
import { exists } from 'fs'

class User_DishService {
  private user_dishCollection = databaseService.user_dish
  private dishCollection = databaseService.dishes

  async createUser_Dish(user_dishData: User_DishType) {
    const newUser_Dish = new User_Dish({
      ...user_dishData
    }).toObject()

    const exists = await this.checkLikeDish(user_dishData)
    console.log(exists)
    if (exists === '') {
      const docRef = await this.user_dishCollection.add(newUser_Dish)
      return docRef.id
    } else {
      this.deleteUser_Dish(exists)
      throw new ErrorWithStatus({ message: USER_DISH_MESSAGES.DELETE_SUCCESS, status: HTTP_STATUS.ACCEPTED })
    }
  }

  async checkLikeDish(data: User_DishType): Promise<string> {
    const snapshot = await this.user_dishCollection
      .where('userId', '==', data.userId)
      .where('dishId', '==', data.dishId)
      .limit(1)
      .get()

    if (!snapshot.empty) {
      return snapshot.docs[0].id
    } else return ''
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
      // Nếu cần sắp xếp + cắt theo offset/limit sau khi gộp:
      let offset = 0
      if (pageSize > 0) offset = (page - 1) * pageSize

      // allResults.sort((a, b) => (b.purchase as number) - (a.purchase as number))
      //.slice(offset, pageSize + offset)
      if (page > 0) {
        console.log(allResults, offset, page)
        if (page <= allResults.length / pageSize) return allResults.slice(offset, pageSize + offset)
        else return []
      }
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
