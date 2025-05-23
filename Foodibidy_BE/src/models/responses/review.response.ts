import { DishType } from '../schemas/dish.schema'
import { UserType } from '../schemas/user.schema'

export interface GetReviewRes {
  id?: string
  user: Pick<UserType, 'id' | 'fullName'>
  dish: Pick<DishType, 'id' | 'dishName'>
  rating: number
  comment: string
  createdAt?: Date | string
  updatedAt?: Date | string
}
