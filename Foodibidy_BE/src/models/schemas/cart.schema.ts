import { DishType } from './dish.schema'

export interface CartType {
  id?: string
  userId: string
  dishes?: {
    dish: DishType
    quantity: number
  }[]
  createdAt?: Date
  updatedAt?: Date
}

export default class Cart {
  id?: string
  userId: string
  dishes?: {
    dish: DishType
    quantity: number | 0
  }[]
  createdAt?: Date
  updatedAt?: Date

  constructor(cart: CartType) {
    this.id = cart.id || ''
    this.userId = cart.userId || ''
    this.dishes = cart.dishes || []
    this.createdAt = cart.createdAt || new Date()
    this.updatedAt = cart.updatedAt || new Date()
  }

  toObject(): CartType {
    return {
      id: this.id,
      userId: this.userId,
      dishes: this.dishes,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }
  }
}
