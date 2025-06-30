import { CreateOrderReqBody } from '~/models/requests/order.request'

import { OrderStatus } from '~/constants/enums'

import HTTP_STATUS from '~/constants/httpStatus'
import { USER_MESSAGES } from '~/constants/messages'
import { RESTAURANT_MESSAGES } from '~/constants/messages'
import { ErrorWithStatus } from '~/models/errors'
import { UserType } from '~/models/schemas/user.schema'
import { OrderDetailType } from '~/models/schemas/orderDetail.schema'
import { validateFieldMatchById, handleFormatDate } from '~/utils/utils'
import orderDetailService from './orderDetail.service'
import usersService from './user.service'
import restaurantService from './restaurant.service'
import databaseService from './database.service'

class OrderService {
  private order_detailCollection = databaseService.order_details
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

  async getMyOrderDetail(userId: string) {
    try {
      const restaurant = await restaurantService.getRestaurantByUserId(userId)
      if (!restaurant) {
        throw new ErrorWithStatus({
          message: RESTAURANT_MESSAGES.NOT_FOUND,
          status: HTTP_STATUS.NOT_FOUND
        })
      }

      const orderSnapshot = await this.order_detailCollection.where('restaurant.id', '==', restaurant.id).get()

      const orders: OrderDetailType[] = []
      orderSnapshot.forEach((doc) => {
        const data = doc.data()
        orders.push({
          id: doc.id,
          ...data,
          createdAt: handleFormatDate(data.createdAt as Date),
          updatedAt: handleFormatDate(data.updatedAt as Date)
        } as OrderDetailType)
      })

      return orders
    } catch (error) {
      console.error('Error getting my order details:', error)
      throw error
    }
  }
}


const orderService = new OrderService()
export default orderService
