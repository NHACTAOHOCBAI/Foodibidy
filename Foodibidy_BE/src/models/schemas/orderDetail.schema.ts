import { OrderStatus } from '~/constants/enums'
import { DishType } from './dish.schema'
import { RestaurantType } from './restaurant.schema'
import { UserType } from './user.schema'

export interface OrderDetailType {
  id?: string

  user?: Pick<UserType, 'id' | 'fullName' | 'phoneNumber'>
  restaurant: Pick<RestaurantType, 'id' | 'restaurantName'>
  status: OrderStatus
  items: {
    dish: Pick<DishType, 'id' | 'dishName'>
    quantity: number
  }[]
  createdAt?: Date | string
  updatedAt?: Date | string
  receivedAt?: Date | string
}

export default class OrderDetail {
  id?: string

  user?: Pick<UserType, 'id' | 'fullName' | 'phoneNumber'>
  restaurant: Pick<RestaurantType, 'id' | 'restaurantName'>
  status: OrderStatus
  items: {
    dish: Pick<DishType, 'id' | 'dishName'>
    quantity: number
  }[]

  createdAt?: Date | string
  updatedAt?: Date | string
  receivedAt?: Date | string

  constructor(orderDetail: OrderDetailType) {
    this.id = orderDetail.id || ''
    this.user = orderDetail.user

    this.restaurant = orderDetail.restaurant || {}
    this.status = orderDetail.status || OrderStatus.PENDING
    this.items = orderDetail.items || {}
    this.createdAt = orderDetail.createdAt || new Date()
    this.updatedAt = orderDetail.updatedAt || new Date()
    this.receivedAt = orderDetail.receivedAt || new Date()
  }

  toObject(): OrderDetailType {
    return {
      id: this.id,

      user: this.user,
      items: this.items,
      restaurant: this.restaurant,
      status: this.status,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      receivedAt: this.receivedAt
    }
  }
}
