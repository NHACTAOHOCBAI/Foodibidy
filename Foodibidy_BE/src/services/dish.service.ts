import { ErrorWithStatus } from '~/models/errors'
import databaseService from './database.service'
import { CreateDishReqBody, UpdateDishReqBody } from '~/models/requests/dish.request'
import Dish from '~/models/schemas/dish.schema'
import { DISH_MESSAGES } from '~/constants/messages'
import HTTP_STATUS from '~/constants/httpStatus'

class DishService {
  private dishCollection = databaseService.dishes

  async createDish(data: CreateDishReqBody) {
    try {
      const newDish = new Dish({
        ...data
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
      return { id: doc.id, ...doc.data() } as Dish
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
      updated_at: new Date()
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

  async getAllDishes(): Promise<Dish[]> {
    try {
      const snapshot = await this.dishCollection.get()
      const dishes: Dish[] = []
      snapshot.forEach((doc) => {
        dishes.push({ ...doc.data(), id: doc.id } as Dish)
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
