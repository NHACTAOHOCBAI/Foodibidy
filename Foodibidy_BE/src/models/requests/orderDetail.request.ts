import { ParamsDictionary, Query } from 'express-serve-static-core'
import { UserType } from '../schemas/user.schema'
import { OrderStatus } from '~/constants/enums'
import { DishType } from '../schemas/dish.schema'
import { RestaurantType } from '../schemas/restaurant.schema'

export interface OrderDetailParams extends ParamsDictionary {
  orderId: string
  RestaurantId: string
}

export interface PaginationQuery {
  page: string
  limit: string
}

export interface CreateOrderDetailReqBody {
  user?: UserType
  restaurant: Pick<RestaurantType, 'id' | 'restaurantName'>
  status: OrderStatus
  items: {
    dish: Pick<DishType, 'id' | 'dishName' | 'price'>
    quantity: number
  }[]
  address?: string
  createdAt?: Date | string
  updatedAt?: Date | string
}

export interface UpdateOrderDetailReqBody {
  status?: OrderStatus
  shipperName?: string
  shipperPhone?: string
  createdAt?: Date | string
  updatedAt?: Date | string
}
