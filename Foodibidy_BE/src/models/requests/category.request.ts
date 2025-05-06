import { ParamsDictionary } from 'express-serve-static-core'

export interface CreateCategoryReqBody {
  name: string
  description?: string
  restaurant_id?: string
}

export interface CategoryParams extends ParamsDictionary {
  categoryId: string
}
