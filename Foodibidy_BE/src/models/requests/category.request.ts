import { UploadedFile } from 'express-fileupload'
import { ParamsDictionary } from 'express-serve-static-core'

export interface CategoryParams extends ParamsDictionary {
  categoryId: string
  restaurantId: string
}

export interface PaginationQuery {
  page: string
  limit: string
}

export interface CreateCategoryReqBody {
  name: string
  description?: string
  purchase?: number
  cateImage?: UploadedFile
}

export interface UpdateDishReqBody {}
