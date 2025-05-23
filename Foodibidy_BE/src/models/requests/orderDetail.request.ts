import { ParamsDictionary, Query } from 'express-serve-static-core'

export interface OrderDetailParams extends ParamsDictionary {
  OrderDetailId: string
}

export interface PaginationQuery {
  page: string
  limit: string
}

export interface CreateOrderDetailReqBody {
  id: string
  dishId: string
  quantity: number
  unitPrice: number
}

export interface UpdateOrderDetailReqBody {
  // id: string
  dishId: string
  quantity: number
  unitPrice: number
}
