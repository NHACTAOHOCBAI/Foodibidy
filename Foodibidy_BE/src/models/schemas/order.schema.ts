import { OrderStatus } from '~/constants/enums'

export interface OrderType {
  id?: string
  account_id: string
  restaurant_id: string
  total_amount: number
  status: OrderStatus
  order_time: Date
  delivery_phone: string
}

export default class Order {
  id?: string
  account_id: string
  restaurant_id: string
  total_amount: number
  status: OrderStatus
  order_time: Date
  delivery_phone: string

  constructor(order: OrderType) {
    this.id = order.id
    this.account_id = order.account_id
    this.restaurant_id = order.restaurant_id
    this.total_amount = order.total_amount
    this.status = order.status
    this.order_time = order.order_time
    this.delivery_phone = order.delivery_phone
  }

  toObject(): OrderType {
    return {
      id: this.id,
      account_id: this.account_id,
      restaurant_id: this.restaurant_id,
      total_amount: this.total_amount,
      status: this.status,
      order_time: this.order_time,
      delivery_phone: this.delivery_phone
    }
  }
}
