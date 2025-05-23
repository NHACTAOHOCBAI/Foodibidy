import { ParamsDictionary } from 'express-serve-static-core'

export interface CartParams extends ParamsDictionary {
  categoryId: string
  cartId: string
}

export interface CreateCartReqBody {
  userId: string
}

export interface AddDishToCart {
  dishId: string
  quantity: number
}

export interface PaginationQuery {
  page: string
  limit: string
}
