export interface Restaurant_CategoryType {
  id?: string
  restaurantId: string

  categoryId: string
}

export default class Restaurant_Category {
  id?: string
  restaurantId: string

  categoryId: string

  constructor(restaurant: Restaurant_CategoryType) {
    this.id = restaurant.id || ''
    this.restaurantId = restaurant.restaurantId || ''
    this.categoryId = restaurant.categoryId || ''
  }

  toObject(): Restaurant_CategoryType {
    return {
      id: this.id,
      restaurantId: this.categoryId,
      categoryId: this.categoryId
    }
  }
}
