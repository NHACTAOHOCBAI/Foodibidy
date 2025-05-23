import { ParamsDictionary, Query } from 'express-serve-static-core'
import { AddressTypeName } from '~/constants/enums'

export interface AddressParams extends ParamsDictionary {
  addressId: string
}

export interface PaginationQuery {
  page: string
  limit: string
}

export interface CreateAddressReqBody {
  addressName: string
  userId: string
  typeName: AddressTypeName
}

export interface UpdateAddressReqBody {
  userId?: string
  addressName: string
}
