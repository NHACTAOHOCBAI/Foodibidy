export interface DishType {
  id?: string
  restaurant_id: string
  category_id: string
  dish_name: string
  description: string
  price: string
  dish_image?: string
  purchase_count?: number
  available?: boolean
  remaining_quantity?: number
  rating?: string
  created_at?: Date | string
  updated_at?: Date | string
}

export default class Dish {
  id: string
  restaurant_id: string
  category_id: string
  dish_name: string
  description: string
  price: string
  dish_image?: string
  purchase_count?: number
  available?: boolean
  remaining_quantity?: number
  rating?: string
  created_at?: Date | string
  updated_at?: Date | string

  constructor(dish: DishType) {
    this.id = dish.id || ''
    this.restaurant_id = dish.restaurant_id || ''
    this.category_id = dish.category_id
    this.dish_name = dish.dish_name
    this.description = dish.description
    this.price = dish.price
    this.dish_image = dish.dish_image
    this.purchase_count = dish.purchase_count || 0
    this.available = dish.available || false
    this.remaining_quantity = dish.remaining_quantity || 0
    this.rating = dish.rating || ''
    this.created_at = dish.created_at || new Date()
    this.updated_at = dish.updated_at || new Date()
  }

  toObject(): DishType {
    return {
      id: this.id,
      restaurant_id: this.restaurant_id,
      category_id: this.category_id,
      dish_name: this.dish_name,
      description: this.description,
      price: this.price,
      dish_image: this.dish_image,
      purchase_count: this.purchase_count,
      available: this.available,
      remaining_quantity: this.remaining_quantity,
      rating: this.rating,
      created_at: this.created_at,
      updated_at: this.updated_at
    }
  }
}
