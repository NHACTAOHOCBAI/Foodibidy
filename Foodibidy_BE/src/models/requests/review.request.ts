import { ParamsDictionary, Query } from 'express-serve-static-core'

export interface ReviewParams extends ParamsDictionary {
  reviewId: string
  foodId: string
}

export interface PaginationQuery {
  page: string
  limit: string
}

export interface CreateReviewReqBody {
  dishId: string
  rating: number
  comment: string
}

export interface UpdateReviewReqBody {
  userId?: string
  dishId?: string
  rating?: number
  comment?: string
}
