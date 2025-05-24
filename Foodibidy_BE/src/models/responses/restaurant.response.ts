import { RestaurantStatus, UserRole } from '~/constants/enums'
import { CategoryType } from '../schemas/category.schema'
import { GetUserRes } from './user.response'

export interface GetRestaurantRes {
  id?: string
  user: Pick<GetUserRes, 'id' | 'fullName' | 'phoneNumber'>
  category: Pick<CategoryType, 'id' | 'name'>[]
  name: string
  email: string
  status?: RestaurantStatus
  image: string
  phoneNumber: string
  rating: number
  description: string
  createdAt?: Date | string
  updatedAt?: Date | string
}
