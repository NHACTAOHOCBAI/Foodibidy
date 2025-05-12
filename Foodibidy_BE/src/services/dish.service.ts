import HTTP_STATUS from '~/constants/httpStatus'
import { ErrorWithStatus } from '~/models/errors'
import databaseService from './database.service'

class DishService {
  private dishCollection = databaseService.dishes

  async createDish(data: CreateDishReqBody) {
    const docRef = await this.dishCollection.add({ ...data, created_at: new Date(), purchase: 0 })
    return docRef.id
  }

  async getDish(id: string) {
    const doc = await this.dishCollection.doc(id).get()
    if (!doc.exists) throw new ErrorWithStatus({ message: 'Dish not found', status: HTTP_STATUS.NOT_FOUND })
    return doc.data()
  }

  async getAllDishes() {
    const snapshot = await this.dishCollection.get()
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
  }

  async updateDish(id: string, data: UpdateDishReqBody) {
    await this.dishCollection.doc(id).update(data)
  }

  async deleteDish(id: string) {
    await this.dishCollection.doc(id).delete()
  }
}

export const dishService = new DishService()
