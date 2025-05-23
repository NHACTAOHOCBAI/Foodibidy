import { RestaurantStatus } from '~/constants/enums'
import { GetUserRes } from '../responses/user.response'
import { CategoryType } from './category.schema'

export interface RestaurantType {
  id?: string
  user: Pick<GetUserRes, 'id' | 'fullName' | 'phoneNumber'>
  category: Pick<CategoryType, 'id' | 'name'>[]
  restaurantName: string
  address?: string
  purchase?: number
  status?: RestaurantStatus
  restaurantImage?: string
  phoneNumber?: string
  rating?: number
  bio?: string
  createdAt?: Date | string
  updatedAt?: Date | string
}

export default class Restaurant {
  id: string
  user: Pick<GetUserRes, 'id' | 'fullName' | 'phoneNumber'>
  category: Pick<CategoryType, 'id' | 'name'>[]
  restaurantName: string
  address: string
  purchase?: number
  status: RestaurantStatus
  restaurantImage: string
  phoneNumber: string
  rating: number
  bio: string
  createdAt: Date | string
  updatedAt: Date | string

  constructor(restaurant: RestaurantType) {
    this.id = restaurant.id || ''
    this.user = restaurant.user
    this.category = restaurant.category
    this.restaurantName = restaurant.restaurantName
    this.purchase = restaurant.purchase || 0
    this.address = restaurant.address || ''
    this.status = restaurant.status || RestaurantStatus.ACTIVE
    this.restaurantImage = restaurant.restaurantImage || ''
    this.phoneNumber = restaurant.phoneNumber || ''
    this.rating = restaurant.rating || 0
    this.bio = restaurant.bio || ''
    this.createdAt = restaurant.createdAt || new Date()
    this.updatedAt = restaurant.updatedAt || new Date()
  }

  toObject(): RestaurantType {
    return {
      id: this.id,
      user: this.user,
      category: this.category,
      restaurantName: this.restaurantName,
      address: this.address,
      purchase: this.purchase,
      status: this.status,
      restaurantImage: this.restaurantImage,
      phoneNumber: this.phoneNumber,
      rating: this.rating,
      bio: this.bio,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }
  }
}
