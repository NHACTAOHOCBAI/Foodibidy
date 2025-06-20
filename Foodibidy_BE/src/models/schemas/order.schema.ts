import { OrderStatus } from '~/constants/enums'
import { DishType } from './dish.schema'
import { RestaurantType } from './restaurant.schema'
import { UserType } from './user.schema'

export interface OrderType {
  id?: string
  user: Pick<UserType, 'id' | 'fullName'>
  restaurant: Pick<RestaurantType, 'id' | 'restaurantName'>
  totalPrice: number
  status?: OrderStatus
  orderTime?: Date | string
  items: {
    dish: Pick<DishType, 'id' | 'dishName' | 'price'>
    quantity: number
  }[]
  createdAt?: Date | string
  updatedAt?: Date | string
  receivedAt?: Date | string
}

export default class Order {
  id?: string
  user: Pick<UserType, 'id' | 'fullName'>
  restaurant: Pick<RestaurantType, 'id' | 'restaurantName'>
  totalPrice: number
  status: OrderStatus
  orderTime: Date | string
  items: {
    dish: Pick<DishType, 'id' | 'dishName' | 'price'>
    quantity: number
  }[]
  createdAt?: Date | string
  updatedAt?: Date | string
  receivedAt?: Date | string

  constructor(order: OrderType) {
    this.id = order.id || ''
    this.user = order.user
    this.restaurant = order.restaurant
    this.totalPrice = order.totalPrice
    this.status = order.status || OrderStatus.PENDING
    this.orderTime = order.orderTime || new Date()
    this.items = order.items || []
    this.createdAt = order.createdAt || new Date()
    this.updatedAt = order.updatedAt || new Date()
    this.receivedAt = order.receivedAt || new Date()
  }

  toObject(): OrderType {
    return {
      id: this.id,
      user: this.user,
      restaurant: this.restaurant,
      totalPrice: this.totalPrice,
      status: this.status,
      orderTime: this.orderTime,
      items: this.items,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      receivedAt: this.receivedAt
    }
  }
}
