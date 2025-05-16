import { ParamsDictionary, Query } from 'express-serve-static-core'

export interface AddressParams extends ParamsDictionary {
  address_id: string
}

export interface PaginationQuery {
  page: string
  limit: string
}

export interface CreateAddressReqBody {
  address_name: string
  account_id: string
}

export interface UpdateAddressReqBody {
  account_id?: string
  address_name: string
}
