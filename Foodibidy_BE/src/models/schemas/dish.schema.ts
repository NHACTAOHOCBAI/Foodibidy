import { CategoryType } from './category.schema'
import { RestaurantType } from './restaurant.schema'

export interface DishType {
  id?: string
  restaurant: Pick<RestaurantType, 'id' | 'restaurantName'>
  category: Pick<CategoryType, 'id' | 'name'>
  dishName: string
  description: string
  price: number
  dishImage?: string
  soldQuantity?: number
  available?: boolean
  remainingQuantity?: number
  rating?: number
  createdAt?: Date | string
  updatedAt?: Date | string
}

export default class Dish {
  id: string
  restaurant: Pick<RestaurantType, 'id' | 'restaurantName'>
  category: Pick<CategoryType, 'id' | 'name'>
  dishName: string
  description: string
  price: number
  dishImage?: string
  soldQuantity?: number
  available?: boolean
  remainingQuantity?: number
  rating?: number
  createdAt?: Date | string
  updatedAt?: Date | string

  constructor(dish: DishType) {
    this.id = dish.id || ''
    this.restaurant = dish.restaurant || {}
    this.category = dish.category || {}
    this.dishName = dish.dishName
    this.description = dish.description
    this.price = dish.price
    this.dishImage = dish.dishImage
    this.soldQuantity = dish.soldQuantity || 0
    this.available = dish.available || false
    this.remainingQuantity = dish.remainingQuantity || 0
    this.rating = dish.rating || 0
    this.createdAt = dish.createdAt || new Date()
    this.updatedAt = dish.updatedAt || new Date()
  }

  toObject(): DishType {
    return {
      id: this.id,
      restaurant: this.restaurant,
      category: this.category,
      dishName: this.dishName,
      description: this.description,
      price: this.price,
      dishImage: this.dishImage,
      soldQuantity: this.soldQuantity,
      available: this.available,
      remainingQuantity: this.remainingQuantity,
      rating: this.rating,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }
  }
}
