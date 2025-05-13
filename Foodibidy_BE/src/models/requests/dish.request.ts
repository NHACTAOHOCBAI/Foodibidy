import { ParamsDictionary, Query } from 'express-serve-static-core'

export interface DishParams extends ParamsDictionary {
  dish_id: string
}

export interface PaginationQuery {
  page: string
  limit: string
}

export interface CreateDishReqBody {
  restaurant_id: string
  category_id: string
  dish_name: string
  description: string
  price: string
  dish_image?: string
}

export interface UpdateDishReqBody {
  restaurant_id?: string
  category_id?: string
  dish_name?: string
  description?: string
  price?: string
  dish_image?: string
  purchase_count?: string
  available?: boolean
  remaining_quantity?: string | null
  created_at?: Date
  updated_at?: Date
  rating?: string
}
