import { ParamsDictionary, Query } from 'express-serve-static-core'

export interface ReviewParams extends ParamsDictionary {
  review_id: string
}

export interface PaginationQuery {
  page: string
  limit: string
}

export interface CreateReviewReqBody {
  account_id: string
  dish_id: string
  rating: number
  comment: string
}

export interface UpdateReviewReqBody {
  account_id?: string
  dish_id?: string
  rating?: number
  comment?: string
}
