export interface Restaurant_CategoryType {
  id?: string
  restaurantId: string
  restaurantName: string
  categoryId: string
  categoryName: string
}

export default class Restaurant_Category {
  id?: string
  restaurantId: string
  restaurantName: string
  categoryId: string
  categoryName: string

  constructor(restaurant: Restaurant_CategoryType) {
    this.id = restaurant.id || ''
    this.restaurantId = restaurant.restaurantId || ''
    this.restaurantName = restaurant.restaurantName || ''
    this.categoryId = restaurant.categoryId || ''
    this.categoryName = restaurant.categoryName || ''
  }

  toObject(): Restaurant_CategoryType {
    return {
      id: this.id,
      restaurantId: this.categoryId,
      restaurantName: this.categoryName,
      categoryId: this.categoryId,
      categoryName: this.categoryName
    }
  }
}
