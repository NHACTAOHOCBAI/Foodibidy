import { ErrorWithStatus } from '~/models/errors'
import databaseService from './database.service'
import Cart from '~/models/schemas/cart.schema'
import { ADDRESS_MESSAGES, CART_MESSAGES, DISH_MESSAGES } from '~/constants/messages'
import HTTP_STATUS from '~/constants/httpStatus'
import { AddDishToCart, CreateCartReqBody } from '~/models/requests/cart.request'
import dishService from './dish.service'

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
  async addDishToCart(id: string, Dish: AddDishToCart) {
    const doc = await this.cartCollection.doc(id).get()

    if (!doc.exists) {
      throw new ErrorWithStatus({ message: CART_MESSAGES.CART_NOT_FOUND, status: HTTP_STATUS.NOT_FOUND })
    }
    const dish = await dishService.getDish(Dish.dishId)
    if (!dish) {
      throw new ErrorWithStatus({ message: DISH_MESSAGES.DISH_NOT_FOUND, status: HTTP_STATUS.NOT_FOUND })
    }

    try {
      const cartDish = doc.data()?.dishes || []
      const dishIndex = cartDish.findIndex((d) => d.dish.id === Dish.dishId)
      console.log(dishIndex)
      if (dishIndex !== -1) {
        cartDish[dishIndex].quantity += Dish.quantity
      } else cartDish.push({ dish, quantity: Dish.quantity })

      const updatedCart = {
        dishes: cartDish,
        updatedAt: new Date()
      }

      await this.cartCollection.doc(id).update(updatedCart)
      console.log(`Update cart success with ID ${doc.id}`)
    } catch (error) {
      console.error('Error updating cart:', error)
      throw new ErrorWithStatus({ message: CART_MESSAGES.SERVER_FAIL, status: HTTP_STATUS.NOT_FOUND })
    }
  }

  async getCart(id: string) {
    const doc = await this.cartCollection.doc(id).get()
    if (doc.exists) {
      console.log(`Get cart success with ID ${doc.id}`)
      return { ...doc.data(), id: doc.id } as Cart
    }
    throw new ErrorWithStatus({ message: ADDRESS_MESSAGES.ADDRESS_NOT_FOUND, status: HTTP_STATUS.NOT_FOUND })
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
