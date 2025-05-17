export interface CartDetailsType {
  id: string
  dish_id: string
  quantity: number
}

export default class CartDetails {
  id: string
  dish_id: string
  quantity: number

  constructor(cartDetails: CartDetailsType) {
    this.id = cartDetails.id || ''
    this.dish_id = cartDetails.dish_id
    this.quantity = cartDetails.quantity
  }

  toObject(): CartDetailsType {
    return {
      id: this.id,
      dish_id: this.dish_id,
      quantity: this.quantity
    }
  }
}
