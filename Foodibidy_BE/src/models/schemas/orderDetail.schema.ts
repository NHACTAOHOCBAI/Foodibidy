export interface OrderDetailType {
  id: string
  dish_id: string
  quantity: number
  unit_price: number
  created_at?: Date | string
  updated_at?: Date | string
}

export default class OrderDetail {
  id: string
  dish_id: string
  quantity: number
  unit_price: number
  created_at?: Date | string
  updated_at?: Date | string

  constructor(orderDetail: OrderDetailType) {
    this.id = orderDetail.id || ''
    this.dish_id = orderDetail.dish_id
    this.quantity = orderDetail.quantity
    this.unit_price = orderDetail.unit_price
    this.created_at = orderDetail.created_at || new Date()
    this.updated_at = orderDetail.updated_at || new Date()
  }

  toObject(): OrderDetailType {
    return {
      id: this.id,
      dish_id: this.dish_id,
      quantity: this.quantity,
      unit_price: this.unit_price,
      created_at: this.created_at,
      updated_at: this.updated_at
    }
  }
}
