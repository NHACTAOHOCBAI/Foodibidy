import { ParamsDictionary } from 'express-serve-static-core'
import { UserRole } from '~/constants/enums'
import { AddressType } from '../schemas/address.schema'

export interface CreateUserReqBody {
  fullName: string
  email: string
  password: string
  confirmPassword: string
  dateOfBirth: string
  address: Omit<AddressType, 'userId' | 'id'>[] | []
}

export interface UpdateUserReqBody {
  role?: UserRole
  fullName?: string
  email?: string
  dateOfBirth?: string
  phoneNumber?: string | ''
  avatar?: string | ''
  address?: AddressType[] | []
}

export interface GetProfileRequestParams extends ParamsDictionary {
  userId: string
}

export interface PaginationQuery {
  page: string
  limit: string
}
