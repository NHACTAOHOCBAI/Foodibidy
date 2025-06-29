import { firestore } from 'firebase-admin'
import HTTP_STATUS from '~/constants/httpStatus'
import { RESTAURANT_MESSAGES, USER_MESSAGES } from '~/constants/messages'
import { ErrorWithStatus } from '~/models/errors'
import { CreateRestaurantReqBody, UpdateRestaurantReqBody } from '~/models/requests/restaurant.request'
import Restaurant, { RestaurantType } from '~/models/schemas/restaurant.schema'
import { handleFormatDate, updateNestedFieldInCollection } from '~/utils/utils'
import databaseService from './database.service'
import dishService from './dish.service'
import { CloudinaryService } from './file.service'

class RestaurantService {
  private restaurantCollection = databaseService.restaurants
  private restaurant_categoryCollection = databaseService.restaurant_category
  private dishCollection = databaseService.dishes
  private order_detailCollection = databaseService.order_details
  private userCollection = databaseService.users
  private cartCollection = databaseService.carts
  async createRestaurant(data: CreateRestaurantReqBody) {
    try {
      const { restaurantImage, ...resRestaurant } = data
      let urlImage = ''
      if (restaurantImage) {
        urlImage = await CloudinaryService.uploadImage(restaurantImage, 'restaurant')
      }

      const newRestaurant = new Restaurant({
        ...resRestaurant,
        restaurantImage: urlImage,
        cateIds: [],
        category: [],
        createdAt: new Date()
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
      let updatedAt = handleFormatDate(data.updatedAt as Date)
      let createdAt = handleFormatDate(data.createdAt as Date)
      return { ...doc.data(), updatedAt, createdAt }
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
    const doc = await this.restaurantCollection.doc(id).get()
    let urlImage = doc.data()?.restaurantImage || ''
    if (restaurantImage) {
      urlImage = await CloudinaryService.uploadImage(restaurantImage, 'restaurant')
    }

    const updatedRestaurant = {
      ...resRestaurant,
      restaurantImage: urlImage,
      updatedAt: new Date()
    }
    console.log('updateRestaurant', updatedRestaurant)
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
      const userDoc = await this.userCollection.doc(doc.data()?.user.id as string).get()

      if (!userDoc.exists) {
        throw new ErrorWithStatus({ message: USER_MESSAGES.NOT_FOUND, status: HTTP_STATUS.NOT_FOUND })
      }

      const userData = userDoc.data()

      // Nếu user có cart thì xóa luôn cart
      if (userData?.cartId) {
        await this.cartCollection.doc(userData.cartId).delete()
        console.log(`Cart with ID ${userData.cartId} deleted successfully`)
      }

      //  delete restaurant trong dishes
      const dishesSnapshot = await databaseService.dishes.where('restaurant.id', '==', id).get()
      for (const doc of dishesSnapshot.docs) {
        await dishService.deleteDish(doc.id)
      }
      // delete restaurant trong order_detail
      const order_detailsSnapshot = await databaseService.order_details.where('restaurant.id', '==', id).get()
      for (const doc of order_detailsSnapshot.docs) {
        await databaseService.order_details.doc(doc.id).delete()
      }
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
    return { ...doc.data(), id: doc.id }
  }
  async deleteRestaurantByUserId(userId: string) {
    const snapshot = await this.restaurantCollection.where('user.id', '==', userId).limit(1).get()

    const doc = snapshot.docs[0]
    //  delete restaurant trong dishes
    const dishesSnapshot = await databaseService.dishes.where('restaurant.id', '==', doc.id).get()
    for (const doc of dishesSnapshot.docs) {
      await dishService.deleteDish(doc.id)
    }
    // delete restaurant trong order_detail
    const order_detailsSnapshot = await databaseService.order_details.where('restaurant.id', '==', doc.id).get()
    for (const doc of order_detailsSnapshot.docs) {
      await databaseService.order_details.doc(doc.id).delete()
    }
    //xoa bang trung gian
    const categorySnapshot = await this.restaurant_categoryCollection.where('restaurantId', '==', doc.id).get()
    const batch = firestore().batch()
    categorySnapshot.forEach((doc) => {
      batch.delete(doc.ref)
    })
    await this.deleteRestaurant(doc.id)

    console.log(`Deleted restaurant of userId ${userId} with docId ${doc.id}`)
    return doc.id
  }
}

const restaurantService = new RestaurantService()
export default restaurantService
