import { ParamsDictionary, Query } from 'express-serve-static-core'
import { RestaurantStatus } from '~/constants/enums'
import { GetUserRes } from '../responses/user.response'
import { CategoryType } from '../schemas/category.schema'

export interface RestaurantParams extends ParamsDictionary {
  RestaurantId: string
}

export interface PaginationQuery {
  page: string
  limit: string
}

export interface CreateRestaurantReqBody {
  user: Pick<GetUserRes, 'id' | 'fullName' | 'phoneNumber'>
  restaurantName: string
  address: string
  phoneNumber: string
  category: Pick<CategoryType, 'id' | 'name'>[]
  bio: string
}

export interface UpdateRestaurantReqBody {
  userId?: string
  restaurantName?: string
  address?: string
  status?: RestaurantStatus
  restaurantImage?: string
  phoneNumber?: string
  rating?: number
  bio?: string
  createdAt?: Date
}
