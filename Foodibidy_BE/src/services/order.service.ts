import { CreateOrderReqBody } from '~/models/requests/order.request'

import { OrderStatus } from '~/constants/enums'

import orderDetailService from './orderDetail.service'
import HTTP_STATUS from '~/constants/httpStatus'
import { ErrorWithStatus } from '~/models/errors'
import { error } from 'console'
import { UserType } from '~/models/schemas/user.schema'
import { CATEGORY_MESSAGES, USER_MESSAGES } from '~/constants/messages'
import { validateFieldMatchById } from '~/utils/utils'
import categoryService from './category.service'
import usersService from './user.service'

class OrderService {
  async createOrder(data: CreateOrderReqBody) {
    try {
      let user: Pick<UserType, 'id' | 'fullName' | 'phoneNumber'> = {
        fullName: '',
        phoneNumber: ''
      }
      if (data.user) {
        user = data.user

        await validateFieldMatchById(
          usersService.getUser.bind(usersService),
          user.id,
          'fullName',
          user.fullName,
          USER_MESSAGES.NOT_FOUND
        )
        await validateFieldMatchById(
          usersService.getUser.bind(usersService),
          user.id,
          'phoneNumber',
          user.phoneNumber,
          USER_MESSAGES.NOT_FOUND
        )
      }

      for (const order of data.order) {
        await orderDetailService.createOrderDetail({
          ...order,
          user: user,
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
