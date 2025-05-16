export interface OrderDetailsType {
  id: string
  dish_id: string
  quantity: number
  unit_price: number
}

export default class OrderDetails {
  id: string
  dish_id: string
  quantity: number
  unit_price: number

  constructor(orderDetails: OrderDetailsType) {
    this.id = orderDetails.id
    this.dish_id = orderDetails.dish_id
    this.quantity = orderDetails.quantity
    this.unit_price = orderDetails.unit_price
  }

  toObject(): OrderDetailsType {
    return {
      id: this.id,
      dish_id: this.dish_id,
      quantity: this.quantity,
      unit_price: this.unit_price
    }
  }
}
