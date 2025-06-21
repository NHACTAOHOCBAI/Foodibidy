import HTTP_STATUS from '~/constants/httpStatus'
import { DISH_MESSAGES } from '~/constants/messages'
import { ErrorWithStatus } from '~/models/errors'
import { CreateDishReqBody, UpdateDishReqBody } from '~/models/requests/dish.request'
import { GetDishRes } from '~/models/responses/dish.response'
import Dish, { DishType } from '~/models/schemas/dish.schema'
import { handleFormatDate } from '~/utils/utils'
import databaseService from './database.service'
import { CloudinaryService } from './file.service'

class DishService {
  private dishCollection = databaseService.dishes

  async createDish(data: CreateDishReqBody) {
    try {
      const { dishImage, ...resDishBody } = data
      let urlImage = ''
      if (dishImage) {
        urlImage = await CloudinaryService.uploadImage(dishImage, 'dish')
      }

      const newDish = new Dish({
        ...resDishBody,
        dishImage: urlImage
      }).toObject()

      const docRef = await this.dishCollection.add(newDish)
      console.log('Dish created with ID:', docRef.id)
      return docRef.id
    } catch (error) {
      console.error('Error creating dish:', error)
      throw new Error(`Failed to create dish: ${error}`)
    }
  }

  async getDish(id: string) {
    const doc = await this.dishCollection.doc(id).get()
    if (doc.exists) {
      console.log(`Get dish success with ID ${doc.id}`)
      const data = doc.data() as DishType
      let updatedAt = handleFormatDate(data.updatedAt as Date)
      let createdAt = handleFormatDate(data.createdAt as Date)
      return { ...doc.data(), id: doc.id, createdAt, updatedAt } as DishType
    } else {
      console.error(`Error getting dish with ID ${id}`)
    }
    throw new ErrorWithStatus({ message: DISH_MESSAGES.DISH_NOT_FOUND, status: HTTP_STATUS.NOT_FOUND })
  }

  async updateDish(id: string, data: UpdateDishReqBody) {
    const doc = await this.dishCollection.doc(id).get()

    if (!doc.exists) {
      throw new ErrorWithStatus({ message: DISH_MESSAGES.DISH_NOT_FOUND, status: HTTP_STATUS.NOT_FOUND })
    }

    const updatedDish = {
      ...data,
      updatedAt: new Date()
    }

    try {
      await this.dishCollection.doc(id).update(updatedDish)
      console.log(`Update dish success with ID ${doc.id}`)
    } catch (error) {
      console.error('Error updating dish:', error)
      throw new ErrorWithStatus({ message: DISH_MESSAGES.DISH_NOT_FOUND, status: HTTP_STATUS.NOT_FOUND })
    }
  }

  async deleteDish(id: string) {
    try {
      await this.dishCollection.doc(id).delete()
      console.log(`Dish with ID ${id} deleted successfully`)
    } catch (error) {
      console.error(`Error deleting dish with ID ${id}:`, error)
      throw new ErrorWithStatus({ message: DISH_MESSAGES.DISH_NOT_FOUND, status: HTTP_STATUS.NOT_FOUND })
    }
  }

  async getAllDishes(pageSize: number, page: number): Promise<GetDishRes[]> {
    try {
      let query = this.dishCollection.orderBy('updatedAt', 'desc')
      const offset = (page - 1) * pageSize
      if (offset > 0) query = query.offset(offset)
      if (pageSize > 0) query = query.limit(pageSize)
      const snapshot = await query.get()
      const dishes: GetDishRes[] = []
      snapshot.forEach((doc) => {
        const data = doc.data()
        console.log(doc.id)
        let updatedAt = handleFormatDate(data.updatedAt as Date)
        let createdAt = handleFormatDate(data.createdAt as Date)
        dishes.push({ ...doc.data(), id: doc.id, createdAt, updatedAt } as GetDishRes)
      })
      console.log('All dishes:', dishes)
      return dishes
    } catch (error) {
      console.error('Error getting all dishes:', error)
      throw new Error(`Failed to get all dishes: ${error}`)
    }
  }

  async getDishesByCategoryId(pageSize: number, page: number, categoryId: string): Promise<DishType[]> {
    try {
      let query = this.dishCollection.where('category.id', '==', categoryId)
      const offset = (page - 1) * pageSize
      if (offset > 0) query = query.offset(offset)
      if (pageSize > 0) query = query.limit(pageSize)
      const snapshot = await query.get()

      const dishes: DishType[] = []
      snapshot.forEach((doc) => {
        const data = doc.data()
        console.log(doc.id)
        let updatedAt = handleFormatDate(data.updatedAt as Date)
        let createdAt = handleFormatDate(data.createdAt as Date)
        dishes.push({ ...doc.data(), id: doc.id, createdAt, updatedAt } as DishType)
      })
      console.log('All dishes:', dishes)
      return dishes
    } catch (error) {
      console.error('Error getting all dishes:', error)
      throw new Error(`Failed to get all dishes: ${error}`)
    }
  }
  async getDishesByRestaurantId(pageSize: number, page: number, restaurantId: string): Promise<DishType[]> {
    try {
      let query = this.dishCollection.where('restaurant.id', '==', restaurantId)
      const offset = (page - 1) * pageSize
      if (offset > 0) query = query.offset(offset)
      if (pageSize > 0) query = query.limit(pageSize)
      const snapshot = await query.get()

      const dishes: DishType[] = []
      snapshot.forEach((doc) => {
        const data = doc.data()
        console.log(doc.id)
        let updatedAt = handleFormatDate(data.updatedAt as Date)
        let createdAt = handleFormatDate(data.createdAt as Date)
        dishes.push({ ...doc.data(), id: doc.id, createdAt, updatedAt } as DishType)
      })
      console.log('All dishes:', dishes)
      return dishes
    } catch (error) {
      console.error('Error getting all dishes:', error)
      throw new Error(`Failed to get all dishes: ${error}`)
    }
  }
}

const dishService = new DishService()
export default dishService
