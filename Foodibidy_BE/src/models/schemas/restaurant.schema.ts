import { RestaurantStatus } from '~/constants/enums'

export interface RestaurantType {
  id?: string
  userId: string
  restaurantName: string
  address?: string
  purchase?: number
  status?: RestaurantStatus
  restaurantImage?: string
  phoneString?: string
  rating?: string
  createdAt?: Date | string
  updatedAt?: Date | string
}

export default class Restaurant {
  id: string
  userId: string
  restaurantName: string
  address: string
  purchase?: number
  status: RestaurantStatus
  restaurantImage: string
  phoneString: string
  rating: string
  createdAt: Date | string
  updatedAt: Date | string

  constructor(restaurant: RestaurantType) {
    this.id = restaurant.id || ''
    this.userId = restaurant.userId
    this.restaurantName = restaurant.restaurantName
    this.purchase = restaurant.purchase || 0
    this.address = restaurant.address || ''
    this.status = restaurant.status || RestaurantStatus.ACTIVE
    this.restaurantImage = restaurant.restaurantImage || ''
    this.phoneString = restaurant.phoneString || ''
    this.rating = restaurant.rating || ''
    this.createdAt = restaurant.createdAt || new Date()
    this.updatedAt = restaurant.updatedAt || new Date()
  }

  toObject(): RestaurantType {
    return {
      id: this.id,
      userId: this.userId,
      restaurantName: this.restaurantName,
      address: this.address,
      purchase: this.purchase,
      status: this.status,
      restaurantImage: this.restaurantImage,
      phoneString: this.phoneString,
      rating: this.rating,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }
  }
}
