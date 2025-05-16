import { ParamsDictionary, Query } from 'express-serve-static-core'
import { RestaurantStatus } from '~/constants/enums'

export interface RestaurantParams extends ParamsDictionary {
  RestaurantId: string
}

export interface RestaurantQuery extends PaginationQuery, Query {
  tweet_type: string
}

export interface PaginationQuery {
  page: string
  limit: string
}

export interface CreateRestaurantReqBody {
  accountId: string
  restaurant_name: string
  address: string
  phone_string: string
}

export interface UpdateRestaurantReqBody {
  accountId?: string
  restaurant_name?: string
  address?: string
  status?: RestaurantStatus
  restaurant_image?: string
  phone_string?: string
  rating?: string
  created_at?: Date
}
