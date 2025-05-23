import { CategoryType } from '../schemas/category.schema'
import { RestaurantType } from '../schemas/restaurant.schema'

export interface GetDishRes {
  id?: string
  restaurant: Pick<RestaurantType, 'id' | 'restaurantName'>
  category: Pick<CategoryType, 'id' | 'name'>
  dishName: string
  description: string
  price: string
  dishImage?: string
  soldQuantity?: number
  available?: boolean
  remainingQuantity?: number
  rating?: number
  createdAt?: Date | string
  updatedAt?: Date | string
}
