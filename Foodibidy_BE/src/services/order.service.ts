import { CreateOrderReqBody } from '~/models/requests/order.request'

import { OrderStatus } from '~/constants/enums'

import orderDetailService from './orderDetail.service'

class OrderService {
  async createOrder(data: CreateOrderReqBody) {
    try {
      for (const order of data.order) {
        await orderDetailService.createOrderDetail({
          ...order,
          user: data.user,
          status: OrderStatus.PENDING
        })
      }
      console.log('Order created success')
      return
    } catch (error) {
      console.error('Error creating order:', error)
      throw new Error(`Failed to create order: ${error}`)
    }
  }
}

const orderService = new OrderService()
export default orderService
