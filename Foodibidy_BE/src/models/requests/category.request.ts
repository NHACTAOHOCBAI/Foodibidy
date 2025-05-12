import { ParamsDictionary } from 'express-serve-static-core'

export interface CategoryParams extends ParamsDictionary {
  categoryId: string
}

export interface CreateCategoryReqBody {
  name: string
  description?: string
  purchase?: number
  image?: string
}
