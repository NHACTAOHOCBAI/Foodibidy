import { ParamsDictionary, Query } from 'express-serve-static-core'
import { OrderStatus } from '~/constants/enums'
import { DishType } from '../schemas/dish.schema'
import { RestaurantType } from '../schemas/restaurant.schema'
import { UserType } from '../schemas/user.schema'

export interface OrderParams extends ParamsDictionary {
  orderId: string
  userId: string
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
  orderTime: string
  deliveryPhone: string
  items: {
    dish: Pick<DishType, 'id' | 'dishName' | 'price'>
    quantity: number
  }[]
}

export interface UpdateOrderReqBody {
  user?: Pick<UserType, 'id' | 'fullName'>
  restaurant?: Pick<RestaurantType, 'id' | 'restaurantName'>
  totalPrice?: number
  status?: OrderStatus
  orderTime?: Date | string
  deliveryPhone?: string
  items?: {
    dish: Pick<DishType, 'id' | 'dishName' | 'price'>
    quantity: number
  }[]
}
