import { ParamsDictionary } from 'express-serve-static-core'
import { RestaurantType } from '../schemas/restaurant.schema'

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
