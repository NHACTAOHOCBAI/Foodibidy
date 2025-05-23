import { ParamsDictionary, Query } from 'express-serve-static-core'
import { RestaurantStatus } from '~/constants/enums'

export interface RestaurantParams extends ParamsDictionary {
  RestaurantId: string
}

export interface PaginationQuery {
  page: string
  limit: string
}

export interface CreateRestaurantReqBody {
  userId: string
  restaurantName: string
  address: string
  phoneString: string
  category: { categoryId: string; categoryName: string }[]
}

export interface UpdateRestaurantReqBody {
  userId?: string
  restaurantName?: string
  address?: string
  status?: RestaurantStatus
  restaurantImage?: string
  phoneString?: string
  rating?: string
  createdAt?: Date
}
