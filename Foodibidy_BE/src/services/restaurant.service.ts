import { ErrorWithStatus } from '~/models/errors'
import databaseService from './database.service'
import { CreateRestaurantReqBody, UpdateRestaurantReqBody } from '~/models/requests/restaurant.request'
import Restaurant, { RestaurantType } from '~/models/schemas/restaurant.schema'
import { RESTAURANT_MESSAGES } from '~/constants/messages'
import HTTP_STATUS from '~/constants/httpStatus'
import { handleFormatDate } from '~/utils/utils'

class RestaurantService {
  private restaurantCollection = databaseService.restaurants
  private restaurant_categoryCollection = databaseService.restaurant_category

  async createRestaurant(data: CreateRestaurantReqBody) {
    try {
      const newRestaurant = new Restaurant({
        ...data,
        createdAt: new Date()
      }).toObject()

      const docRef = await this.restaurantCollection.add(newRestaurant)
      for (const cate of data.category) {
        await this.restaurant_categoryCollection.add({
          restaurantId: docRef.id,
          restaurantName: data.restaurantName,
          categoryId: cate.id as string,
          categoryName: cate.name
        })
      }

      console.log('Restaurant created with ID:', docRef.id)
      return docRef.id
    } catch (error) {
      console.error('Error creating restaurant:', error)
      throw new Error(`Failed to create restaurant: ${error}`)
    }
  }

  async getRestaurant(id: string) {
    const doc = await this.restaurantCollection.doc(id).get()
    if (doc.exists) {
      console.log(`Get restaurant success with ID ${doc.id}`)

      const data = doc.data() as RestaurantType
      let updatedAt = handleFormatDate(data.updatedAt as Date)
      let createdAt = handleFormatDate(data.createdAt as Date)
      return { id: doc.id, ...doc.data(), updatedAt, createdAt }
    } else {
      console.error(`Error getting restaurant with ID ${id}`)
    }
    throw new ErrorWithStatus({ message: RESTAURANT_MESSAGES.NOT_FOUND, status: HTTP_STATUS.NOT_FOUND })
  }

  async getAllRestaurants(pageSize: number, page: number): Promise<RestaurantType[]> {
    try {
      let query = this.restaurantCollection.orderBy('purchase', 'desc')
      const offset = (page - 1) * pageSize
      if (offset > 0) query = query.offset(offset)
      if (pageSize > 0) query = query.limit(pageSize)

      const snapshot = await query.get()
      const restaurants: RestaurantType[] = []
      snapshot.forEach((doc) => {
        const data = doc.data()
        console.log(doc.id)
        let updatedAt = handleFormatDate(data.updatedAt as Date)
        let createdAt = handleFormatDate(data.createdAt as Date)
        restaurants.push({ ...doc.data(), id: doc.id, createdAt, updatedAt } as RestaurantType)
      })
      console.log('All restaurants:', restaurants)
      return restaurants
    } catch (error) {
      throw new ErrorWithStatus({ message: RESTAURANT_MESSAGES.SERVER_FAIL, status: HTTP_STATUS.INTERNAL_SERVER_ERROR })
    }
  }

  async updateRestaurant(id: string, data: UpdateRestaurantReqBody) {
    const doc = await this.restaurantCollection.doc(id).get()
    const updatedRestaurant = {
      ...data,
      updatedAt: new Date()
    }

    try {
      await this.restaurantCollection.doc(id).update(updatedRestaurant)
      console.log(`Update restaurant success with ID ${doc.id}`)
    } catch {
      throw new ErrorWithStatus({ message: RESTAURANT_MESSAGES.NOT_FOUND, status: HTTP_STATUS.NOT_FOUND })
    }
  }

  async deleteRestaurant(id: string) {
    try {
      await this.restaurantCollection.doc(id).delete()
      console.log(`Restaurant with ID ${id} deleted successfully`)
    } catch (error) {
      console.error(`Error deleting restaurant with ID ${id}:`, error)
      throw new ErrorWithStatus({ message: RESTAURANT_MESSAGES.NOT_FOUND, status: HTTP_STATUS.NOT_FOUND })
    }
  }
}

const restaurantService = new RestaurantService()
export default restaurantService
