import databaseService from './database.service'
import Category, { CategoryType } from '~/models/schemas/category.schema'
import { CreateCategoryReqBody } from '~/models/requests/category.request'
import { ErrorWithStatus } from '~/models/errors'
import HTTP_STATUS from '~/constants/httpStatus'
import { CATEGORY_MESSAGES } from '~/constants/messages'
import { GetCategoryRes } from '~/models/responses/category.response'
import { chunkArray, handleFormatDate } from '~/utils/utils'
import { DocumentData, FieldPath, QuerySnapshot } from 'firebase-admin/firestore'
import restaurant_categoryService from './restaurant_category.service'

import { CloudinaryService } from './file.service'
import dishService from './dish.service'
import { da } from 'date-fns/locale'
import { database } from 'firebase-admin'
import { RestaurantType } from '~/models/schemas/restaurant.schema'

class CategoryService {
  private categoryCollection = databaseService.categories

  async createCategory(categoryData: CreateCategoryReqBody) {
    const { cateImage, ...resDishBody } = categoryData
    let urlImage = ''
    if (cateImage) {
      urlImage = await CloudinaryService.uploadImage(cateImage, 'category')
    }

    const newCategory = new Category({
      ...resDishBody,
      image: urlImage,
      createdAt: new Date()
    }).toObject()

    const docRef = await this.categoryCollection.add(newCategory)
    return docRef.id
  }

  async getCategory(categoryId: string) {
    const doc = await this.categoryCollection.doc(categoryId).get()

    if (!doc.exists) {
      throw new ErrorWithStatus({ message: CATEGORY_MESSAGES.NOT_FOUND, status: HTTP_STATUS.NOT_FOUND })
    } else {
      const data = doc.data() as CategoryType
      let updatedAt = handleFormatDate(data.updatedAt)
      let createdAt = handleFormatDate(data.createdAt)
      return { ...doc.data(), id: doc.id, updatedAt, createdAt }
    }
  }

  async getAllCategories(pageSize: number, page: number): Promise<GetCategoryRes[]> {
    let query = this.categoryCollection.orderBy('purchase', 'desc')
    const offset = (page - 1) * pageSize
    if (offset > 0) query = query.offset(offset)
    if (pageSize > 0) query = query.limit(pageSize)
    const snapshot = await query.get()
    const result: GetCategoryRes[] = []

    snapshot.forEach((doc) => {
      const data = doc.data()

      let updatedAt = handleFormatDate(data.updatedAt as Date)
      let createdAt = handleFormatDate(data.createdAt)
      result.push({
        ...doc.data(),
        id: doc.id,
        createdAt,
        updatedAt
      } as GetCategoryRes)
    })
    return result
  }
  async getAllCategoriesByRestaurantId(
    pageSize: number,
    page: number,
    restaurantId: string
  ): Promise<GetCategoryRes[]> {
    const categories = await restaurant_categoryService.getCategoriesByRestaurantId(restaurantId)
    const allResults: GetCategoryRes[] = []
    const chunks = chunkArray(categories, 10) // chia nhỏ array
    for (const chunk of chunks) {
      let query = this.categoryCollection.where(FieldPath.documentId(), 'in', chunk)

      const snapshot = await query.get()

      snapshot.forEach((doc) => {
        const data = doc.data()

        let updatedAt = handleFormatDate(data.updatedAt as Date)
        let createdAt = handleFormatDate(data.createdAt)
        allResults.push({
          ...doc.data(),
          id: doc.id,
          createdAt,
          updatedAt
        } as GetCategoryRes)
      })
    }

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
  }

  async updateCategory(categoryId: string, updateData: Partial<CreateCategoryReqBody>) {
    const doc = await this.categoryCollection.doc(categoryId).get()
    if (!doc.exists) {
      throw new ErrorWithStatus({ message: CATEGORY_MESSAGES.NOT_FOUND, status: HTTP_STATUS.NOT_FOUND })
    }
    const { cateImage, ...resDishBody } = updateData
    let urlImage = ''
    if (cateImage) {
      urlImage = await CloudinaryService.uploadImage(cateImage, 'category')
    }

    await this.categoryCollection.doc(categoryId).update({
      ...resDishBody,
      image: urlImage,
      updatedAt: new Date()
    })
    // update category trong restaurant_category
    const snapshot = await databaseService.restaurant_category.where('categoryId', '==', categoryId).get()
    snapshot.forEach(async (doc) => {

      const data = doc.data()
      data.categoryName = resDishBody.name || data.categoryName
      await databaseService.restaurant_category.doc(doc.id).update({
        ...data,

        updatedAt: new Date()
      })
    })
    // update category trong dishes
    const dishSnapshot = await databaseService.dishes.where('category.id', '==', categoryId).get()

    dishSnapshot.forEach(async (doc) => {
      const data = doc.data()
      data.category.name = resDishBody.name || data.category.name
      await databaseService.dishes.doc(doc.id).update({
        ...data,
        updatedAt: new Date()
      })
    })
    // update category trong restaurant
    const restaurantSnapshot = await databaseService.restaurants.get()
    for (const doc of restaurantSnapshot.docs) {
      const data = doc.data() as RestaurantType
      let isUpdated = false

      const updatedCategories = data.category.map((cat) => {
        if (cat.id === categoryId) {
          isUpdated = true
          return {
            ...cat,
            name: resDishBody.name || cat.name
          }
        }
        return cat
      })

      if (isUpdated) {
        await databaseService.restaurants.doc(doc.id).update({
          category: updatedCategories,
          updatedAt: new Date()
        })
      }
    }

  }

  async deleteCategory(categoryId: string) {
    // delete category trong dishes
    const dishesSnapshot = await databaseService.dishes.where('category.id', '==', categoryId).get()
    for (const doc of dishesSnapshot.docs) {
      await dishService.deleteDish(doc.id)
    }
    // delete category trong restaurant
    const restaurantSnapshot = await databaseService.restaurant_category.where('categoryId', '==', categoryId).get()
    for (const doc of restaurantSnapshot.docs) {
      await restaurant_categoryService.deleteRestaurant_Category(doc.id)
    }
    await this.categoryCollection.doc(categoryId).delete()
  }
}

const categoryService = new CategoryService()
export default categoryService
