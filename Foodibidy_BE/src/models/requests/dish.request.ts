import { ParamsDictionary, Query } from 'express-serve-static-core'
import { CategoryType } from '../schemas/category.schema'
import { RestaurantType } from '../schemas/restaurant.schema'
import { UploadedFile } from 'express-fileupload'

export interface DishParams extends ParamsDictionary {
  dishId: string
  categoryId: string
  restaurantId: string
}

export interface PaginationQuery {
  page: string
  limit: string
}

export interface CreateDishReqBody {
  restaurant: Pick<RestaurantType, 'id' | 'restaurantName'>
  category: Pick<CategoryType, 'id' | 'name'>
  dishName: string
  description: string
  price: number
  dishImage?: UploadedFile
}

export interface UpdateDishReqBody {
  restaurant?: Pick<RestaurantType, 'id' | 'restaurantName'>
  category?: Pick<CategoryType, 'id' | 'name'>
  dishName?: string
  description?: string
  price?: number
  dishImage?: UploadedFile
  soldQuantity?: number
  available?: boolean
  remainingQuantity?: number | null
  createdAt?: Date
  updatedAt?: Date
  rating?: string
}
