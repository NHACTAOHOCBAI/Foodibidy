import HTTP_STATUS from '~/constants/httpStatus'
import { CATEGORY_MESSAGES, DISH_MESSAGES, RESTAURANT_MESSAGES } from '~/constants/messages'
import { ErrorWithStatus } from '~/models/errors'
import { CreateDishReqBody, UpdateDishReqBody } from '~/models/requests/dish.request'
import { GetDishRes } from '~/models/responses/dish.response'
import Dish, { DishType } from '~/models/schemas/dish.schema'
import { handleFormatDate, validateFieldMatchById } from '~/utils/utils'
import databaseService, { admin } from './database.service'
import { CloudinaryService } from './file.service'
import reviewService from './review.service'
import { CartType } from '~/models/schemas/cart.schema'
import restaurantService from './restaurant.service'
import categoryService from './category.service'
import { forEach } from 'lodash'
import Category from '~/models/schemas/category.schema'

class DishService {
  private dishCollection = databaseService.dishes
  private order_detailsCollection = databaseService.order_details
  private restaurantCollection = databaseService.restaurants

  async createDish(data: CreateDishReqBody) {
    try {
      const { dishImage, restaurant, ...resDishBody } = data
      let urlImage = ''
      if (dishImage) {
        urlImage = await CloudinaryService.uploadImage(dishImage, 'dish')
      }

      await validateFieldMatchById(
        categoryService.getCategory.bind(categoryService),
        data.category.id,
        'name',
        data.category.name,
        CATEGORY_MESSAGES.NOT_FOUND
      )
      const resData = await restaurantService.getRestaurantByUserId(restaurant.id!).then((res) => {
        return { id: res!.id, restaurantName: res!.restaurantName }
      })
      const restaurantDoc = await this.restaurantCollection.doc(resData.id).get()
      await restaurantDoc.ref.update({
        categories: admin.firestore.FieldValue.arrayUnion({
          id: data.category.id,
          name: data.category.name
        }),
        cateIds: admin.firestore.FieldValue.arrayUnion(data.category.id)
      })


      const newDish = new Dish({
        ...resDishBody,
        restaurant: resData,
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
    if (data.category) {
      await validateFieldMatchById(
        categoryService.getCategory.bind(categoryService),
        data.category.id,
        'name',
        data.category.name,
        CATEGORY_MESSAGES.NOT_FOUND
      )
      if (data.price) {
        // udpate order detail
        const order_detailsSnapshot = await this.order_detailsCollection.where('dishIds', 'array-contains', id).get()
        for (const doc of order_detailsSnapshot.docs) {
          const data2 = doc.data()
          const updatedItems = data2.items.map((item: any) => {
            if (item.dish?.id === id) {
              return {
                ...item,
                dish: {
                  ...item.dish,
                  price: data.price
                }
              }
            }
            return item
          })

          await this.order_detailsCollection.doc(doc.id).update({
            items: updatedItems
          })
        }
      }

      if (data.dishName) {
        // udpate order detail
        const order_detailsSnapshot = await this.order_detailsCollection.where('dishIds', 'array-contains', id).get()
        for (const doc of order_detailsSnapshot.docs) {
          const data2 = doc.data()
          const updatedItems = data2.items.map((item: any) => {
            if (item.dish?.id === id) {
              return {
                ...item,
                dish: {
                  ...item.dish,
                  dishName: data.dishName
                }
              }
            }
            return item
          })

          await this.order_detailsCollection.doc(doc.id).update({
            items: updatedItems
          })
        }
      }
    }

    const { dishImage, ...resDishBody } = data
    let urlImage = ''
    if (dishImage) {
      urlImage = await CloudinaryService.uploadImage(dishImage, 'dish')
    }
    if (!doc.exists) {
      throw new ErrorWithStatus({ message: DISH_MESSAGES.DISH_NOT_FOUND, status: HTTP_STATUS.NOT_FOUND })
    }

    const updatedDish = {
      ...resDishBody,
      dishImage: urlImage,
      updatedAt: new Date()
    }

    try {
      await this.dishCollection.doc(id).update(updatedDish)

      console.log(`Update dish success with ID ${doc.id}`)
      // Sau khi update dish thành công, cập nhật trong cart
      const cartSnapshot = await databaseService.carts.where('dishes', '!=', null).get()

      for (const doc of cartSnapshot.docs) {
        const cartData = doc.data() as CartType

        let isUpdated = false

        const updatedDishes = cartData.dishes?.map((dishItem) => {
          if (dishItem.dish.id === id) {
            isUpdated = true
            return {
              ...dishItem,
              dish: {
                ...dishItem.dish,
                ...resDishBody, // cập nhật các field mới
                dishImage: urlImage || dishItem.dish.dishImage
              }
            }
          }
          return dishItem
        })

        if (isUpdated) {
          await databaseService.carts.doc(doc.id).update({
            dishes: updatedDishes,
            updatedAt: new Date()
          })
        }
      }
    } catch (error) {
      console.error('Error updating dish:', error)
      throw new ErrorWithStatus({ message: DISH_MESSAGES.DISH_NOT_FOUND, status: HTTP_STATUS.NOT_FOUND })
    }
  }

  async deleteDish(id: string) {
    try {
      //xoá review
      const reviewSnapshot = await databaseService.reviews.where('dishId', '==', id).get()
      for (const doc of reviewSnapshot.docs) {
        await reviewService.deleteReview(doc.id)
      }

      //xoá order
      const order_detailsSnapshot = await this.order_detailsCollection.where('dish.id', '==', id).get()
      for (const doc of order_detailsSnapshot.docs) {
        await this.order_detailsCollection.doc(doc.id).update({ status: 'CANCEL' })
      }

      const cartSnapshot = await databaseService.carts.get()
      for (const doc of cartSnapshot.docs) {
        const cartData = doc.data() as CartType
        if (!cartData.dishes) continue

        const filteredDishes = cartData.dishes.filter((item) => item.dish.id !== id)
        if (filteredDishes.length !== cartData.dishes.length) {
          await databaseService.carts.doc(doc.id).update({
            dishes: filteredDishes,
            updatedAt: new Date()
          })
        }
      }
      // xóa user_dish
      const user_dishSnapshot = await databaseService.user_dish.where('dishId', '==', id).get()
      for (const doc of user_dishSnapshot.docs) {
        await databaseService.user_dish.doc(doc.id).delete()
      }


      // Lấy thông tin món ăn cần xoá để biết category và restaurant
      const dishDoc = await this.dishCollection.doc(id).get()
      if (!dishDoc.exists) {
        throw new ErrorWithStatus({ message: DISH_MESSAGES.DISH_NOT_FOUND, status: HTTP_STATUS.NOT_FOUND })
      }
      const dishData = dishDoc.data() as DishType
      const categoryId = dishData.category?.id
      const restaurantId = dishData.restaurant?.id

      if (categoryId && restaurantId) {
        // Đếm số lượng món ăn trong cùng category và cùng nhà hàng (trừ món này)
        const sameCategorySnapshot = await this.dishCollection
          .where('category.id', '==', categoryId)
          .where('restaurant.id', '==', restaurantId)
          .get()

        if (sameCategorySnapshot.size <= 1) {
          // Đây là món duy nhất thuộc category này trong nhà hàng → cần xoá category khỏi danh sách
          const restaurantDoc = await this.restaurantCollection.doc(restaurantId).get()
          if (restaurantDoc.exists) {
            await restaurantDoc.ref.update({
              categories: admin.firestore.FieldValue.arrayRemove({
                id: categoryId,
                name: dishData.category?.name
              }),
              cateIds: admin.firestore.FieldValue.arrayRemove(categoryId)
            })
          }
        }
      }
      //xoá dish
      await this.dishCollection.doc(id).delete()
      console.log(`Dish with ID ${id} deleted successfully`)
    } catch (error) {
      console.error(`Error deleting dish with ID ${id}:`, error)
      throw new ErrorWithStatus({ message: DISH_MESSAGES.DISH_NOT_FOUND, status: HTTP_STATUS.NOT_FOUND })
    }
  }

  async getAllDishes(pageSize: number, page: number, filter: string | undefined): Promise<GetDishRes[]> {
    try {
      let query = this.dishCollection.orderBy('dishName')

      if (filter) {
        const start = filter.toLowerCase()
        const end = start + '\uf8ff'
        query = query.startAt(start).endAt(end)
        console.log('Filter applied:', filter)
        console.log('Query:', query)
        console.log('Start:', start)
        console.log('End:', end)
      }

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

  async getMyDishes(userId: string): Promise<GetDishRes[]> {
    try {
      const restaurant = await restaurantService.getRestaurantByUserId(userId)
      if (!restaurant) {
        throw new ErrorWithStatus({
          message: RESTAURANT_MESSAGES.NOT_FOUND,
          status: HTTP_STATUS.NOT_FOUND
        })
      }
      console.log(restaurant)
      let query = this.dishCollection.where('restaurant.id', '==', restaurant.id)

      const snapshot = await query.get()
      const dishes: GetDishRes[] = []

      snapshot.forEach((doc) => {
        const data = doc.data()
        dishes.push({
          ...data,
          id: doc.id,
          createdAt: handleFormatDate(data.createdAt as Date),
          updatedAt: handleFormatDate(data.updatedAt as Date)
        } as GetDishRes)
      })

      return dishes
    } catch (error) {
      console.error('Error getting my dishes:', error)
      throw error
    }
  }
}

const dishService = new DishService()
export default dishService
