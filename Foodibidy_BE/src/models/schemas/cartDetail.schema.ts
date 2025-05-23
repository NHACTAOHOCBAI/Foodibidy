export interface CartDetailsType {
  id: string
  dishId: string
  quantity: number
}

export default class CartDetails {
  id: string
  dishId: string
  quantity: number

  constructor(cartDetails: CartDetailsType) {
    this.id = cartDetails.id || ''
    this.dishId = cartDetails.dishId
    this.quantity = cartDetails.quantity
  }

  toObject(): CartDetailsType {
    return {
      id: this.id,
      dishId: this.dishId,
      quantity: this.quantity
    }
  }
}
