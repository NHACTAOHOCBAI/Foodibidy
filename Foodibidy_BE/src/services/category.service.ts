import databaseService from './database.service'
import Category, { CategoryType } from '~/models/schemas/category.schema'
import { CreateCategoryReqBody } from '~/models/requests/category.request'
import { ErrorWithStatus } from '~/models/errors'
import HTTP_STATUS from '~/constants/httpStatus'
import { CATEGORY_MESSAGES } from '~/constants/messages'
import { GetAllCategoryResBody } from '~/models/responses/category.response'
import { handleFormatDate } from '~/utils/utils'

class CategoryService {
  private categoryCollection = databaseService.categories

  async createCategory(categoryData: CreateCategoryReqBody) {
    const newCategory = new Category({
      ...categoryData,
      created_at: new Date()
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
      let updated_at = handleFormatDate(data.updated_at)
      let created_at = handleFormatDate(data.created_at)
      return { id: doc.id, ...doc.data(), updated_at, created_at }
    }
  }

  async getAllCategories(): Promise<GetAllCategoryResBody[]> {
    const snapshot = await this.categoryCollection.orderBy('purchase', 'desc').get()
    const result: GetAllCategoryResBody[] = []

    snapshot.forEach((doc) => {
      const data = doc.data()

      let updated_at = handleFormatDate(data.updated_at)
      let created_at = handleFormatDate(data.created_at)
      result.push({
        id: doc.id,
        ...doc.data(),
        created_at,
        updated_at
      } as GetAllCategoryResBody)
    })
    return result
  }

  async updateCategory(categoryId: string, updateData: Partial<CategoryType>) {
    const doc = await this.categoryCollection.doc(categoryId).get()
    if (!doc.exists) {
      throw new ErrorWithStatus({ message: CATEGORY_MESSAGES.NOT_FOUND, status: HTTP_STATUS.NOT_FOUND })
    }

    await this.categoryCollection.doc(categoryId).update({
      ...updateData,
      updated_at: new Date()
    })
  }

  async deleteCategory(categoryId: string) {
    await this.categoryCollection.doc(categoryId).delete()
  }
}

const categoryService = new CategoryService()
export default categoryService
