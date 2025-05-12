import { ErrorWithStatus } from '~/models/errors'
import databaseService from './database.service'
import Cart from '~/models/schemas/cart.schema'
import { ADDRESS_MESSAGES } from '~/constants/messages'
import HTTP_STATUS from '~/constants/httpStatus'
import { CreateCartReqBody } from '~/models/requests/cart.request'

class CartService {
  private cartCollection = databaseService.carts

  async createCart(data: CreateCartReqBody) {
    try {
      const newCart = new Cart({
        ...data
      }).toObject()

      const docRef = await this.cartCollection.add(newCart)
      console.log('Cart created with ID:', docRef.id)
      return docRef.id
    } catch (error) {
      console.error('Error creating cart:', error)
      throw new Error(`Failed to create cart: ${error}`)
    }
  }

  async getCart(id: string) {
    const doc = await this.cartCollection.doc(id).get()
    if (doc.exists) {
      console.log(`Get cart success with ID ${doc.id}`)
      return { id: doc.id, ...doc.data() } as Cart
    }
    throw new ErrorWithStatus({ message: ADDRESS_MESSAGES.ADDRESS_NOT_FOUND, status: HTTP_STATUS.NOT_FOUND })
  }

  async updateCart(id: string, data: CreateCartReqBody) {
    const doc = await this.cartCollection.doc(id).get()

    if (!doc.exists) {
      throw new ErrorWithStatus({ message: ADDRESS_MESSAGES.ADDRESS_NOT_FOUND, status: HTTP_STATUS.NOT_FOUND })
    }

    const updatedCart = {
      ...data,
      updated_at: new Date()
    }

    try {
      await this.cartCollection.doc(id).update(updatedCart)
      console.log(`Update cart success with ID ${doc.id}`)
    } catch (error) {
      console.error('Error updating cart:', error)
      throw new ErrorWithStatus({ message: ADDRESS_MESSAGES.ADDRESS_NOT_FOUND, status: HTTP_STATUS.NOT_FOUND })
    }
  }

  async deleteCart(id: string) {
    try {
      await this.cartCollection.doc(id).delete()
      console.log(`Cart with ID ${id} deleted successfully`)
    } catch (error) {
      console.error(`Error deleting cart with ID ${id}:`, error)
      throw new ErrorWithStatus({ message: ADDRESS_MESSAGES.ADDRESS_NOT_FOUND, status: HTTP_STATUS.NOT_FOUND })
    }
  }

  async getAllCartes(): Promise<Cart[]> {
    try {
      const snapshot = await this.cartCollection.get()
      const cartes: Cart[] = []
      snapshot.forEach((doc) => {
        cartes.push({ id: doc.id, ...doc.data() } as Cart)
      })
      console.log('All cartes:', cartes)
      return cartes
    } catch (error) {
      console.error('Error getting all cartes:', error)
      throw new Error(`Failed to get all cartes: ${error}`)
    }
  }
}

const cartService = new CartService()
export default cartService
