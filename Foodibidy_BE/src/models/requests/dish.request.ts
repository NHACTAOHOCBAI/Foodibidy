import { ParamsDictionary, Query } from 'express-serve-static-core'
import { CategoryType } from '../schemas/category.schema'
import { RestaurantType } from '../schemas/restaurant.schema'

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
  price: string
  dishImage?: string
}

export interface UpdateDishReqBody {
  restaurantId?: string
  categoryId?: string
  dishName?: string
  description?: string
  price?: string
  dishImage?: string
  purchase_count?: string
  available?: boolean
  remaining_quantity?: string | null
  createdAt?: Date
  updatedAt?: Date
  rating?: string
}
