import { ParamsDictionary, Query } from 'express-serve-static-core'
import { OrderStatus } from '~/constants/enums'
import { DishType } from '../schemas/dish.schema'
import { RestaurantType } from '../schemas/restaurant.schema'
import { UserType } from '../schemas/user.schema'

export interface OrderParams extends ParamsDictionary {
  orderId: string
}

export interface PaginationQuery {
  page: string
  limit: string
}

export interface CreateOrderReqBody {
  user: Pick<UserType, 'id' | 'fullName'>
  restaurant: Pick<RestaurantType, 'id' | 'restaurantName'>
  totalPrice: number
  status: OrderStatus
  orderTime: Date
  deliveryPhone: string
  items: {
    dish: Pick<DishType, 'id' | 'dishName' | 'price'>
    quantity: number
  }[]
}

export interface UpdateOrderReqBody {
  userId?: string
  restaurantId?: string
  totalPrice?: number
  status?: OrderStatus
  orderTime?: Date
  deliveryPhone?: string
  items?: {
    dish: Pick<DishType, 'id' | 'dishName' | 'price'>
    quantity: number
  }[]
}
