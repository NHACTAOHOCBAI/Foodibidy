import { ParamsDictionary } from 'express-serve-static-core'
import { TokenTypes, UserRole, UserVerifyStatus } from '~/constants/enums'
import { AddressType } from '../schemas/address.schema'
import { JwtPayload } from 'jsonwebtoken'
import { UploadedFile } from 'express-fileupload'

export interface CreateUserReqBody {
  fullName: string
  email: string
  password: string
  confirmPassword: string
  address: Omit<AddressType, 'userId' | 'id'>[] | []
  avatar?: UploadedFile
}

export interface UpdateUserReqBody {
  role?: UserRole
  fullName?: string
  email?: string
  dateOfBirth?: string
  phoneNumber?: string | ''
  avatar?: UploadedFile
  address: Omit<AddressType, 'userId'>[] | []
}

export interface GetProfileRequestParams extends ParamsDictionary {
  userId: string
}

export interface PaginationQuery {
  page: string
  limit: string
}

export interface TokenPayload extends JwtPayload {
  user_id: string
  token_type: TokenTypes
  verify: UserVerifyStatus
  exp: number
  iat: number
}
