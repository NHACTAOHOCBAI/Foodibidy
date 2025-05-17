import { OrderStatus } from '~/constants/enums'

export interface OrderType {
  id?: string
  account_id: string
  restaurant_id: string
  total_amount: number
  status: OrderStatus
  order_time: Date
  delivery_phone: string
  created_at?: Date | string
  updated_at?: Date | string
}

export default class Order {
  id?: string
  account_id: string
  restaurant_id: string
  total_amount: number
  status: OrderStatus
  order_time: Date
  delivery_phone: string
  created_at: Date | string
  updated_at: Date | string

  constructor(order: OrderType) {
    this.id = order.id || ''
    this.account_id = order.account_id
    this.restaurant_id = order.restaurant_id
    this.total_amount = order.total_amount
    this.status = order.status
    this.order_time = order.order_time
    this.delivery_phone = order.delivery_phone
    this.created_at = order.created_at || new Date()
    this.updated_at = order.updated_at || new Date()
  }

  toObject(): OrderType {
    return {
      id: this.id,
      account_id: this.account_id,
      restaurant_id: this.restaurant_id,
      total_amount: this.total_amount,
      status: this.status,
      order_time: this.order_time,
      delivery_phone: this.delivery_phone,
      created_at: this.created_at,
      updated_at: this.updated_at
    }
  }
}
