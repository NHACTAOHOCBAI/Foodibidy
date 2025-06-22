import { ParamsDictionary } from 'express-serve-static-core'
import { TokenTypes, UserRole, UserVerifyStatus } from '~/constants/enums'
import { AddressType } from '../schemas/address.schema'
import { JwtPayload } from 'jsonwebtoken'
import { UploadedFile } from 'express-fileupload'
import { CreateRestaurantReqBody } from './restaurant.request'
import { CategoryType } from '../schemas/category.schema'

export interface CreateUserReqBody {
  fullName: string
  email: string
  password: string
  confirmPassword: string
  // dateOfBirth: string
  // address: Omit<AddressType, 'userId' | 'id'>[] | []
  avatar?: UploadedFile
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

export interface TokenPayload extends JwtPayload {
  user_id: string
  token_type: TokenTypes
  verify: UserVerifyStatus
  exp: number
  iat: number
}
// export  interface CreateRestaurantOwnerReqBody  {
//   fullName: string
//   email: string
//   password: string
//   confirmPassword: string
//   restaurantName: string
//   address: string
//   phoneNumber: string
//   category: Pick<CategoryType, 'id' | 'name'>[]
//   bio: string
//   avatar?: UploadedFile
// }
export interface accountInfo {
  fullName: string
  email: string
  password: string
  confirmPassword: string
}

export interface restaurantInfo {
  restaurantName: string
  address: string
  phoneNumber: string
  category: Pick<CategoryType, 'id' | 'name'>[]
  bio: string
}

export interface CreateRestaurantOwnerReqBody {
  account: accountInfo
  restaurant: restaurantInfo
  avatar?: UploadedFile
}
