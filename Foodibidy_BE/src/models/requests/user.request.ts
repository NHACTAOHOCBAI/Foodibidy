import { ParamsDictionary } from 'express-serve-static-core'
import { UserRole } from '~/constants/enums'

export interface CreateUserReqBody {
  name: string
  email: string
  password: string
  confirm_password: string
  date_of_birth: string
}

export interface UpdateUserReqBody {
  role_id?: UserRole
  name?: string
  email?: string
  date_of_birth?: Date
  phone_number?: string | ''
  avatar_url?: string | ''
}

export interface GetProfileRequestParams extends ParamsDictionary {
  userId: string
}
