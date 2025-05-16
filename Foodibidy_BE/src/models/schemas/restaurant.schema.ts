import { RestaurantStatus } from '~/constants/enums'

export interface RestaurantType {
  id?: string
  accountId: string
  restaurant_name: string
  address?: string
  purchase?: number
  status?: RestaurantStatus
  restaurant_image?: string
  phone_string?: string
  rating?: string
  created_at?: Date | string
  updated_at?: Date | string
}

export default class Restaurant {
  id: string
  accountId: string
  restaurant_name: string
  address: string
  purchase?: number
  status: RestaurantStatus
  restaurant_image: string
  phone_string: string
  rating: string
  created_at: Date | string
  updated_at: Date | string

  constructor(restaurant: RestaurantType) {
    this.id = restaurant.id || ''
    this.accountId = restaurant.accountId
    this.restaurant_name = restaurant.restaurant_name
    this.purchase = restaurant.purchase || 0
    this.address = restaurant.address || ''
    this.status = restaurant.status || RestaurantStatus.ACTIVE
    this.restaurant_image = restaurant.restaurant_image || ''
    this.phone_string = restaurant.phone_string || ''
    this.rating = restaurant.rating || ''
    this.created_at = restaurant.created_at || new Date()
    this.updated_at = restaurant.updated_at || new Date()
  }

  toObject(): RestaurantType {
    return {
      id: this.id,
      accountId: this.accountId,
      restaurant_name: this.restaurant_name,
      address: this.address,
      purchase: this.purchase,
      status: this.status,
      restaurant_image: this.restaurant_image,
      phone_string: this.phone_string,
      rating: this.rating,
      created_at: this.created_at,
      updated_at: this.updated_at
    }
  }
}
