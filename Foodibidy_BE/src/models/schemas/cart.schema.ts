export interface CartType {
  id: string
  account_id: string
}

export default class Cart {
  id: string
  account_id: string

  constructor(cart: CartType) {
    this.id = cart.id
    this.account_id = cart.account_id
  }

  toObject(): CartType {
    return {
      id: this.id,
      account_id: this.account_id
    }
  }
}
