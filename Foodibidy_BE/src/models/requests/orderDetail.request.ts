import { ParamsDictionary, Query } from 'express-serve-static-core'

export interface OrderDetailParams extends ParamsDictionary {
  OrderDetail_id: string
}

export interface PaginationQuery {
  page: string
  limit: string
}

export interface CreateOrderDetailReqBody {
  id: string
  dish_id: string
  quantity: number
  unit_price: number
}

export interface UpdateOrderDetailReqBody {
  // id: string
  dish_id: string
  quantity: number
  unit_price: number
}
