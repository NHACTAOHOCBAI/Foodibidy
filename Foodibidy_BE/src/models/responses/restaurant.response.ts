import { RestaurantStatus, UserRole } from '~/constants/enums'
import { CategoryType } from '../schemas/category.schema'
import { GetUserRes } from './user.response'

export interface GetRestaurantRes {
  id?: string
  user: GetUserRes
  categories: Pick<CategoryType, 'id' | 'name'>
  email: string
  status?: RestaurantStatus
  image: string
  phoneNumber: string
  rating: number
  description: string
  createdAt?: Date | string
  updatedAt?: Date | string
}
