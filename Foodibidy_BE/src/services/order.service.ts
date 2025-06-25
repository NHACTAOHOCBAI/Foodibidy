import { CreateOrderReqBody } from '~/models/requests/order.request'

import { OrderStatus } from '~/constants/enums'

import orderDetailService from './orderDetail.service'
import HTTP_STATUS from '~/constants/httpStatus'
import { ErrorWithStatus } from '~/models/errors'
import { error } from 'console'

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
      console.log(error)
      if (error instanceof ErrorWithStatus) throw error

      throw new ErrorWithStatus({
        message: 'Unknown internal server error',
        status: HTTP_STATUS.INTERNAL_SERVER_ERROR
      })
    }
  }
}

const orderService = new OrderService()
export default orderService
