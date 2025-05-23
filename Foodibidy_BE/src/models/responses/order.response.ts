import { OrderStatus } from '~/constants/enums'
import { RestaurantType } from '../schemas/restaurant.schema'
import { UserType } from '../schemas/user.schema'
import { DishType } from '../schemas/dish.schema'

export interface GetOrderRes {
  id?: string
  user: Pick<UserType, 'id' | 'fullName'>
  restaurant: Pick<RestaurantType, 'id' | 'restaurantName'>
  totalPrice: number
  status: OrderStatus
  orderTime: Date | string
  deliveryPhone: string
  items: {
    dish: Pick<DishType, 'id' | 'dishName' | 'price'>
    quantity: number
  }
  createdAt?: Date | string
  updatedAt?: Date | string
}
