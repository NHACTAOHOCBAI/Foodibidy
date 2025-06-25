import { ErrorWithStatus } from '~/models/errors'
import databaseService from './database.service'
import { CreateRestaurantReqBody, UpdateRestaurantReqBody } from '~/models/requests/restaurant.request'
import Restaurant, { RestaurantType } from '~/models/schemas/restaurant.schema'
import { RESTAURANT_MESSAGES } from '~/constants/messages'
import HTTP_STATUS from '~/constants/httpStatus'
import { handleFormatDate, updateNestedFieldInCollection } from '~/utils/utils'
import { CloudinaryService } from './file.service'
import { firestore } from 'firebase-admin'
import usersService from './user.service'

class RestaurantService {
  private restaurantCollection = databaseService.restaurants
  private restaurant_categoryCollection = databaseService.restaurant_category
  private dishCollection = databaseService.dishes
  private order_detailCollection = databaseService.order_details

  async createRestaurant(data: CreateRestaurantReqBody) {
    try {
      const { restaurantImage, ...resRestaurant } = data
      let urlImage = ''
      if (restaurantImage) {
        urlImage = await CloudinaryService.uploadImage(restaurantImage, 'restaurant')
      }

      const cateIds = data.category.map((cate) => cate.id).filter((id): id is string => !!id)

      const newRestaurant = new Restaurant({
        ...resRestaurant,
        restaurantImage: urlImage,
        cateIds,
        createdAt: new Date()
      }).toObject()

      const docRef = await this.restaurantCollection.add(newRestaurant)
      for (const cate of data.category) {
        await this.restaurant_categoryCollection.add({
          restaurantId: docRef.id,
          categoryId: cate.id as string
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
    const { restaurantImage, ...resRestaurant } = data
    let urlImage = ''
    if (restaurantImage) {
      urlImage = await CloudinaryService.uploadImage(restaurantImage, 'restaurant')
    }

    const doc = await this.restaurantCollection.doc(id).get()
    const updatedRestaurant = {
      ...resRestaurant,
      restaurantImage: urlImage,
      updatedAt: new Date()
    }

    if (data.restaurantName) {
      // update dish
      await updateNestedFieldInCollection({
        collection: this.dishCollection,
        matchField: 'restaurant.id',
        matchValue: id,
        nestedFieldPath: 'restaurant.restaurantName',
        updatedValue: data.restaurantName
      })

      // update order_detail
      await updateNestedFieldInCollection({
        collection: this.order_detailCollection,
        matchField: 'restaurant.id',
        matchValue: id,
        nestedFieldPath: 'restaurant.restaurantName',
        updatedValue: data.restaurantName
      })
    }
    try {
      await this.restaurantCollection.doc(id).update(updatedRestaurant)

      //xoa bang trung gian
      const categorySnapshot = await this.restaurant_categoryCollection.where('restaurantId', '==', id).get()
      const batch = firestore().batch()
      categorySnapshot.forEach((doc) => {
        batch.delete(doc.ref)
      })
      await batch.commit()

      for (const cate of data.category) {
        await this.restaurant_categoryCollection.add({
          restaurantId: id,
          categoryId: cate.id as string
        })
      }
      console.log(`Update restaurant success with ID ${doc.id}`)
    } catch {
      throw new ErrorWithStatus({ message: RESTAURANT_MESSAGES.UPDATE_FAIL, status: HTTP_STATUS.BAD_REQUEST })
    }
  }

  async deleteRestaurant(id: string) {
    try {
      const doc = await this.restaurantCollection.doc(id).get()
      await this.restaurantCollection.doc(id).delete()

      //xoa user
      await usersService.deleteUser(doc.data()?.user.id as string)

      //xoa bang trung gian
      const categorySnapshot = await this.restaurant_categoryCollection.where('restaurantId', '==', id).get()
      const batch = firestore().batch()
      categorySnapshot.forEach((doc) => {
        batch.delete(doc.ref)
      })
      await batch.commit()

      console.log(`Restaurant with ID ${id} deleted successfully`)
    } catch (error) {
      console.error(`Error deleting restaurant with ID ${id}:`, error)
      throw new ErrorWithStatus({ message: RESTAURANT_MESSAGES.DELETE_FAIL, status: HTTP_STATUS.BAD_REQUEST })
    }
  }

  async getRestaurantByUserId(id: string) {
    const snapshot = await this.restaurantCollection.where('user.id', '==', id).limit(1).get()

    if (snapshot.empty) {
      return null
    }

    const doc = snapshot.docs[0]
    return { id: doc.id, ...doc.data() }
  }
  async deleteRestaurantByUserId(userId: string) {
    const snapshot = await this.restaurantCollection.where('user.id', '==', userId).limit(1).get()

    const doc = snapshot.docs[0]
    await this.deleteRestaurant(doc.id)

    console.log(`Deleted restaurant of userId ${userId} with docId ${doc.id}`)
    return doc.id
  }
}

const restaurantService = new RestaurantService()
export default restaurantService
