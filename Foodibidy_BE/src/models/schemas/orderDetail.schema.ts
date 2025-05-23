export interface OrderDetailType {
  id: string
  dishId: string
  quantity: number
  unitPrice: number
  createdAt?: Date | string
  updatedAt?: Date | string
}

export default class OrderDetail {
  id: string
  dishId: string
  quantity: number
  unitPrice: number
  createdAt?: Date | string
  updatedAt?: Date | string

  constructor(orderDetail: OrderDetailType) {
    this.id = orderDetail.id || ''
    this.dishId = orderDetail.dishId
    this.quantity = orderDetail.quantity
    this.unitPrice = orderDetail.unitPrice
    this.createdAt = orderDetail.createdAt || new Date()
    this.updatedAt = orderDetail.updatedAt || new Date()
  }

  toObject(): OrderDetailType {
    return {
      id: this.id,
      dishId: this.dishId,
      quantity: this.quantity,
      unitPrice: this.unitPrice,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }
  }
}
