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
  address: string
  order: {
    restaurant: Pick<RestaurantType, 'id' | 'restaurantName'>
    items: {
      dish: { id: string; dishName: string; price: number }
      quantity: number
    }[]
  }[]
}
