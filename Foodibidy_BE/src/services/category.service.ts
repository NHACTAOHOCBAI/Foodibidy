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
import { update } from 'lodash'

class CategoryService {
  private categoryCollection = databaseService.categories
  private dishCollection = databaseService.dishes
  private restaurantCollection = databaseService.restaurants

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
    //update dish
    if (updateData.name) {
      const dishesSnapshot = await this.dishCollection.where('category.id', '==', categoryId).get()
      for (const doc of dishesSnapshot.docs) {
        await this.dishCollection.doc(doc.id).update({
          'category.name': updateData.name
        })
      }

      //update res
      const restaurantsSnapshot = await this.restaurantCollection.where('cateIds', 'array-contains', categoryId).get()
      for (const doc of restaurantsSnapshot.docs) {
        const data2 = doc.data()
        const updatedItems = data2.category.map((item: any) => {
          if (item.id === categoryId) {
            return {
              ...item,
              name: updateData.name
            }
          }
          return item
        })

        await this.restaurantCollection.doc(doc.id).update({
          category: updatedItems
        })
      }
    }

    await this.categoryCollection.doc(categoryId).update({
      ...resDishBody,
      image: urlImage,
      updatedAt: new Date()
    })
  }

  async deleteCategory(categoryId: string) {
    const dishesSnapshot = await databaseService.dishes.where('category.id', '==', categoryId).get()
    for (const doc of dishesSnapshot.docs) {
      await dishService.deleteDish(doc.id)
    }

    const restaurantSnapshot = await databaseService.restaurant_category.where('categoryId', '==', categoryId).get()
    for (const doc of restaurantSnapshot.docs) {
      await restaurant_categoryService.deleteRestaurant_Category(doc.id)
    }
    await this.categoryCollection.doc(categoryId).delete()
  }
}

const categoryService = new CategoryService()
export default categoryService
