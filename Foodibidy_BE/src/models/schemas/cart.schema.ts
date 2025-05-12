export interface CartType {
  id?: string
  account_id: string
  created_at?: Date
  updated_at?: Date
}

export default class Cart {
  id?: string
  account_id: string
  created_at?: Date
  updated_at?: Date

  constructor(cart: CartType) {
    this.id = cart.id
    this.account_id = cart.account_id
    this.created_at = cart.created_at || new Date()
    this.updated_at = cart.updated_at || new Date()
  }

  toObject(): CartType {
    return {
      id: this.id,
      account_id: this.account_id,
      created_at: this.created_at,
      updated_at: this.updated_at
    }
  }
}
