import { ParamsDictionary } from 'express-serve-static-core'

export interface CartParams extends ParamsDictionary {
  categoryId: string
}

export interface CreateCartReqBody {
  account_id: string
}
