import databaseService from './database.service'
import Category, { CategoryType } from '~/models/schemas/category.schema'
import { CategoryRequestBody } from '~/models/requests/category.request'
import { ErrorWithStatus } from '~/models/errors'
import HTTP_STATUS from '~/constants/httpStatus'
import { CATEGORY_MESSAGES } from '~/constants/messages'

class CategoryService {
    private categoryCollection = databaseService.categories

    async createCategory(categoryData: CategoryRequestBody) {
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
        }
        return { id: doc.id, ...doc.data() }
    }

    async getAllCategories(): Promise<CategoryType[]> {
        const snapshot = await this.categoryCollection.get()
        const result: CategoryType[] = []
        snapshot.forEach((doc) => {
            result.push({ id: doc.id, ...doc.data() } as CategoryType)
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
