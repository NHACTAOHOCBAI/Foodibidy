import { UserRole } from '~/constants/enums'
import { AddressType } from '../schemas/address.schema'
import { DishType } from '../schemas/dish.schema'

export interface GetUserRes {
  id?: string
  role?: UserRole
  fullName: string
  email: string
  passwordHash: string
  dateOfBirth?: Date
  phoneNumber?: string | ''
  avatar?: string | ''
  address?: AddressType[] | []
  cart?: {
    cartId: string
    dish: Pick<DishType, 'id' | 'dishName' | 'price'>
    quantity: number
  }

  createdAt?: Date | string
  updatedAt?: Date | string
}
