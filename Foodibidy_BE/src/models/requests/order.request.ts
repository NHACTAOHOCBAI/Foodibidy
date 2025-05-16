import { ParamsDictionary, Query } from 'express-serve-static-core'
import { OrderStatus } from '~/constants/enums'

export interface OrderParams extends ParamsDictionary {
  order_id: string
}

export interface PaginationQuery {
  page: string
  limit: string
}

export interface CreateOrderReqBody {
  account_id: string
  restaurant_id: string
  total_amount: number
  status: OrderStatus
  order_time: Date
  delivery_phone: string
}

export interface UpdateOrderReqBody {
  account_id?: string
  restaurant_id?: string
  total_amount?: number
  status?: OrderStatus
  order_time?: Date
  delivery_phone?: string
}
