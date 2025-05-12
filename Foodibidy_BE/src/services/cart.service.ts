import HTTP_STATUS from '~/constants/httpStatus'
import { ErrorWithStatus } from '~/models/errors'
import databaseService from './database.service'

class CartService {
  private cartCollection = databaseService.carts

  async createCart(data: CreateCartReqBody) {
    const docRef = await this.cartCollection.add(data)
    return docRef.id
  }

  async getCart(id: string) {
    const doc = await this.cartCollection.doc(id).get()
    if (!doc.exists) throw new ErrorWithStatus({ message: 'Cart not found', status: HTTP_STATUS.NOT_FOUND })
    return doc.data()
  }

  async getAllCarts() {
    const snapshot = await this.cartCollection.get()
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
  }

  async updateCart(id: string, data: UpdateCartReqBody) {
    await this.cartCollection.doc(id).update(data)
  }

  async deleteCart(id: string) {
    await this.cartCollection.doc(id).delete()
  }
}

export const cartService = new CartService()
