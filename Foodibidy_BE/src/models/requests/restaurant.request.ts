import { ParamsDictionary, Query } from 'express-serve-static-core'
import { RestaurantStatus } from '~/constants/enums'
import { GetUserRes } from '../responses/user.response'
import { CategoryType } from '../schemas/category.schema'
import { UploadedFile } from 'express-fileupload'

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
  restaurantImage?: UploadedFile
  bio: string
}

export interface UpdateRestaurantReqBody {
  restaurantName?: string
  address?: string
  status?: RestaurantStatus
  restaurantImage?: UploadedFile

  phoneNumber?: string

  bio?: string
}
