import { ParamsDictionary } from 'express-serve-static-core'

export interface CategoryRequestBody {
    name: string
    description?: string
    restaurant_id?: string | null
}

export interface CategoryParams extends ParamsDictionary {
    categoryId: string
}
