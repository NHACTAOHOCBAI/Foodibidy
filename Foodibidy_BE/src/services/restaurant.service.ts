import { ErrorWithStatus } from '~/models/errors'
import databaseService from './database.service'
import { CreateRestaurantReqBody, UpdateRestaurantReqBody } from '~/models/requests/restaurant.request'
import Restaurant, { RestaurantType } from '~/models/schemas/restaurant.schema'
import { RESTAURANT_MESSAGES } from '~/constants/messages'
import HTTP_STATUS from '~/constants/httpStatus'
import { handleFormatDate } from '~/utils/utils'

import { DocumentData, QuerySnapshot } from 'firebase-admin/firestore'

class RestaurantService {
  private restaurantCollection = databaseService.restaurants

  async createRestaurant(data: CreateRestaurantReqBody) {
    try {
      const newRestaurant = new Restaurant({
        ...data,
        created_at: new Date()
      }).toObject()

      const docRef = await this.restaurantCollection.add(newRestaurant)
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
      let updated_at = handleFormatDate(data.updated_at as Date)
      let created_at = handleFormatDate(data.created_at as Date)
      return { id: doc.id, ...doc.data(), updated_at, created_at }
    } else {
      console.error(`Error getting restaurant with ID ${id}`)
    }
    throw new ErrorWithStatus({ message: RESTAURANT_MESSAGES.NOT_FOUND, status: HTTP_STATUS.NOT_FOUND })
  }

  async getAllRestaurants(pageSize: number, lastDocId?: string): Promise<RestaurantType[]> {
    try {
      let query = this.restaurantCollection.orderBy('accountId', 'desc').limit(pageSize)

      // If lastDocId is provided, start after that document
      if (lastDocId) {
        const lastDoc = await this.restaurantCollection.doc(lastDocId).get()
        if (!lastDoc.exists) {
          throw new ErrorWithStatus({ message: RESTAURANT_MESSAGES.NOT_FOUND, status: HTTP_STATUS.NOT_FOUND })
        }
        query = query.startAfter(lastDoc)
      }

      const snapshot: QuerySnapshot<DocumentData> = await query.get()
      const restaurants: RestaurantType[] = []
      snapshot.forEach((doc) => {
        const data = doc.data()
        console.log(doc.id)
        let updated_at = handleFormatDate(data.updated_at as Date)
        let created_at = handleFormatDate(data.created_at as Date)
        restaurants.push({ ...doc.data(), id: doc.id, created_at, updated_at } as RestaurantType)
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
      updated_at: new Date()
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
