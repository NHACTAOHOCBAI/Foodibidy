import { OrderStatus } from '~/constants/enums'
import { DishType } from './dish.schema'
import { RestaurantType } from './restaurant.schema'
import { UserType } from './user.schema'

export interface OrderDetailType {
  id?: string
  shipperName?: string
  shipperPhone?: string
  user?: Pick<UserType, 'id' | 'fullName' | 'phoneNumber'>
  restaurant: Pick<RestaurantType, 'id' | 'restaurantName'>
  status: OrderStatus
  items: {
    dish: Pick<DishType, 'id' | 'dishName' | 'price'>
    quantity: number
  }[]
  dishIds: string[]
  createdAt?: Date | string
  updatedAt?: Date | string
  receivedAt?: Date | string
}

export default class OrderDetail {
  id?: string
  shipperName?: string
  shipperPhone?: string
  user?: Pick<UserType, 'id' | 'fullName' | 'phoneNumber'>
  restaurant: Pick<RestaurantType, 'id' | 'restaurantName'>
  status: OrderStatus
  items: {
    dish: Pick<DishType, 'id' | 'dishName' | 'price'>
    quantity: number
  }[]
  dishIds: string[]
  createdAt?: Date | string
  updatedAt?: Date | string
  receivedAt?: Date | string

  constructor(orderDetail: OrderDetailType) {
    this.id = orderDetail.id || ''
    this.user = orderDetail.user
    this.shipperPhone = orderDetail.shipperPhone || ''
    this.shipperName = orderDetail.shipperName || ''
    this.restaurant = orderDetail.restaurant || {}
    this.status = orderDetail.status || OrderStatus.PENDING
    this.items = orderDetail.items || {}
    this.dishIds = orderDetail.dishIds || []
    this.createdAt = orderDetail.createdAt || new Date()
    this.updatedAt = orderDetail.updatedAt || new Date()
    this.receivedAt = orderDetail.receivedAt || new Date()
  }

  toObject(): OrderDetailType {
    return {
      id: this.id,
      shipperName: this.shipperName,
      shipperPhone: this.shipperPhone,
      user: this.user,
      items: this.items,
      restaurant: this.restaurant,
      dishIds: this.dishIds,
      status: this.status,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      receivedAt: this.receivedAt
    }
  }
}
