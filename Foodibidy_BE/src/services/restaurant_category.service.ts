import databaseService from './database.service'
import { ErrorWithStatus } from '~/models/errors'
import HTTP_STATUS from '~/constants/httpStatus'
import { CATEGORY_MESSAGES } from '~/constants/messages'
import { handleFormatDate } from '~/utils/utils'
import Restaurant_Category, { Restaurant_CategoryType } from '~/models/schemas/restaurant_category.schema'

class Restaurant_CategoryService {
  private restaurant_categoryCollection = databaseService.restaurant_category

  async createRestaurant_Category(restaurant_categoryData: Restaurant_Category) {
    const newRestaurant_Category = new Restaurant_Category({
      ...restaurant_categoryData
    }).toObject()

    const docRef = await this.restaurant_categoryCollection.add(newRestaurant_Category)
    return docRef.id
  }

  async getCategoriesByRestaurantId(restaurantId: string): Promise<string[]> {
    const snapshot = await this.restaurant_categoryCollection.where('restaurantId', '==', restaurantId).get()

    return snapshot.docs.map((doc) => doc.data().categoryId) as string[]
  }

  async updateRestaurant_Category(restaurant_categoryId: string, updateData: Partial<Restaurant_CategoryType>) {
    const doc = await this.restaurant_categoryCollection.doc(restaurant_categoryId).get()
    if (!doc.exists) {
      throw new ErrorWithStatus({ message: CATEGORY_MESSAGES.NOT_FOUND, status: HTTP_STATUS.NOT_FOUND })
    }

    await this.restaurant_categoryCollection.doc(restaurant_categoryId).update({
      ...updateData,
      updatedAt: new Date()
    })
  }

  async deleteRestaurant_Category(restaurant_categoryId: string) {
    await this.restaurant_categoryCollection.doc(restaurant_categoryId).delete()
  }
}

const restaurant_categoryService = new Restaurant_CategoryService()
export default restaurant_categoryService
