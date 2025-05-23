export interface User_DishType {
  id?: string
  userId: string
  dishId: string
}

export default class User_Dish {
  id?: string
  userId: string
  dishId: string

  constructor(user: User_DishType) {
    this.id = user.id || ''
    this.userId = user.userId || ''
    this.dishId = user.dishId || ''
  }

  toObject(): User_DishType {
    return {
      id: this.id,
      userId: this.userId,
      dishId: this.dishId
    }
  }
}
