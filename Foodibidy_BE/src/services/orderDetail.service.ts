import { OrderStatus } from '~/constants/enums'
import HTTP_STATUS from '~/constants/httpStatus'
import { DISH_MESSAGES, ORDER_MESSAGES, RESTAURANT_MESSAGES } from '~/constants/messages'
import { ErrorWithStatus } from '~/models/errors'
import { CreateOrderDetailReqBody, UpdateOrderDetailReqBody } from '~/models/requests/orderDetail.request'
import { OrderDetailType } from '~/models/schemas/orderDetail.schema'
import { UserType } from '~/models/schemas/user.schema'
import { handleFormatDate, validateFieldMatchById } from '~/utils/utils'
import databaseService from './database.service'
import restaurantService from './restaurant.service'
import dishService from './dish.service'

class OrderDetailService {
  private OrderDetailCollection = databaseService.order_details
  private dishCollection = databaseService.dishes
  async createOrderDetail(data: CreateOrderDetailReqBody) {
    try {
      const dishIds = await Promise.all(
        data.items.map(async (item) => {
          const dishRef = this.dishCollection.doc(item.dish.id as string)
          const dishDoc = (await dishRef.get()).data()
          if (!dishDoc)
            throw new ErrorWithStatus({ message: DISH_MESSAGES.DISH_NOT_FOUND, status: HTTP_STATUS.BAD_REQUEST })
          const currentQuantity = dishDoc.remainingQuantity as number
          const newQuantity = currentQuantity - item.quantity

          if (dishDoc.dishName !== item.dish.dishName)
            throw new ErrorWithStatus({
              message: DISH_MESSAGES.DISH_NOT_FOUND,
              status: HTTP_STATUS.BAD_REQUEST
            })

          if (newQuantity < 0)
            throw new ErrorWithStatus({
              message: 'Food remaining quantity is not enough, please reduce the number of dishes you ordered.',
              status: HTTP_STATUS.BAD_REQUEST
            })

          item.dish.price = dishDoc.price as number
          await dishRef.update({
            remainingQuantity: newQuantity
          })

          return item.dish.id as string
        })
      )
      console.log('user', data.items)

      const newOrderDetail = {
        ...data,
        dishIds: dishIds
      }
      const docRef = await this.OrderDetailCollection.add(newOrderDetail)
      console.log('OrderDetail created with ID:', docRef.id)
      return docRef.id
    } catch (error) {
      console.log(error)
      if (error instanceof ErrorWithStatus) {
        throw error
      } else {
        throw new ErrorWithStatus({
          message: `Unexpected error: ${JSON.stringify(error)}`,
          status: HTTP_STATUS.INTERNAL_SERVER_ERROR
        })
      }
    }
  }

  async getOrderDetail(id: string) {
    const doc = await this.OrderDetailCollection.doc(id).get()
    if (doc.exists) {
      console.log(`Get OrderDetail success with ID ${doc.id}`)
      const data = doc.data() as OrderDetailType
      let updatedAt = handleFormatDate(data.updatedAt as Date)
      let createdAt = handleFormatDate(data.createdAt as Date)
      return { ...doc.data(), id: doc.id, updatedAt, createdAt }
    } else {
      console.error(`Error getting OrderDetail with ID ${id}`)
    }
    throw new ErrorWithStatus({ message: ORDER_MESSAGES.ORDER_NOT_FOUND, status: HTTP_STATUS.NOT_FOUND })
  }

  async updateOrderDetail(id: string, data: Partial<UpdateOrderDetailReqBody>) {
    const doc = await this.OrderDetailCollection.doc(id).get()
    if (doc.exists && doc.data()?.status === OrderStatus.CANCELLED)
      throw new ErrorWithStatus({ message: 'Can not update an cancel order', status: HTTP_STATUS.BAD_REQUEST })

    const updatedOrderDetail = {
      ...data,
      updatedAt: new Date()
    }

    try {
      await this.OrderDetailCollection.doc(id).update(updatedOrderDetail)
      console.log(`Update OrderDetail success with ID ${doc.id}`)
    } catch {
      throw new ErrorWithStatus({ message: ORDER_MESSAGES.ORDER_NOT_FOUND, status: HTTP_STATUS.NOT_FOUND })
    }
  }

  async deleteOrderDetail(id: string) {
    try {
      await this.OrderDetailCollection.doc(id).delete()
      console.log(`OrderDetail with ID ${id} deleted successfully`)
    } catch (error) {
      console.error(`Error deleting OrderDetail with ID ${id}:`, error)
      throw new ErrorWithStatus({ message: ORDER_MESSAGES.ORDER_NOT_FOUND, status: HTTP_STATUS.NOT_FOUND })
    }
  }

  async getAllOrderDetails(pageSize: number, page: number): Promise<OrderDetailType[]> {
    try {
      let query = this.OrderDetailCollection.orderBy('updatedAt', 'desc')
      const offset = (page - 1) * pageSize
      if (offset > 0) query = query.offset(offset)
      if (pageSize > 0) query = query.limit(pageSize)
      const snapshot = await query.get()

      const OrderDetails: OrderDetailType[] = []
      snapshot.forEach((doc) => {
        const data = doc.data()
        console.log(doc.id)
        let updatedAt = handleFormatDate(data.updatedAt as Date)
        let createdAt = handleFormatDate(data.createdAt as Date)
        OrderDetails.push({ ...doc.data(), id: doc.id, createdAt, updatedAt } as OrderDetailType)
      })
      console.log('All OrderDetails:', OrderDetails)
      return OrderDetails
    } catch (error) {
      console.error('Error getting all OrderDetails:', error)
      throw new Error(`Failed to get all OrderDetails: ${error}`)
    }
  }

  async getMyOngoingOrders(pageSize: number, page: number, userId: String): Promise<OrderDetailType[]> {
    try {
      let query = this.OrderDetailCollection.where('user.id', '==', userId).where('status', 'in', [
        OrderStatus.PROCESSING,
        OrderStatus.PENDING
      ])
      const offset = (page - 1) * pageSize
      if (offset > 0) query = query.offset(offset)
      if (pageSize > 0) query = query.limit(pageSize)

      const snapshot = await query.get()
      const orders: OrderDetailType[] = []
      snapshot.forEach((doc) => {
        const data = doc.data()
        console.log(doc.id)
        let updatedAt = handleFormatDate(data.updatedAt as Date)
        let createdAt = handleFormatDate(data.createdAt as Date)
        orders.push({ ...doc.data(), id: doc.id, createdAt, updatedAt } as OrderDetailType)
      })
      console.log('All orders:', orders)
      return orders
    } catch (error) {
      console.error('Error getting all orders:', error)
      throw new Error(`Failed to get all orders: ${error}`)
    }
  }
  async getMyHistoryOrders(pageSize: number, page: number, userId: String): Promise<OrderDetailType[]> {
    try {
      let query = this.OrderDetailCollection.where('user.id', '==', userId).where('status', 'in', [
        OrderStatus.DELIVERED,
        OrderStatus.CANCELLED
      ])
      const offset = (page - 1) * pageSize
      if (offset > 0) query = query.offset(offset)
      if (pageSize > 0) query = query.limit(pageSize)

      const snapshot = await query.get()
      const orders: OrderDetailType[] = []
      snapshot.forEach((doc) => {
        const data = doc.data()
        console.log(doc.id)
        let updatedAt = handleFormatDate(data.updatedAt as Date)
        let createdAt = handleFormatDate(data.createdAt as Date)
        orders.push({ ...doc.data(), id: doc.id, createdAt, updatedAt } as OrderDetailType)
      })
      console.log('All orders:', orders)
      return orders
    } catch (error) {
      console.error('Error getting all orders:', error)
      throw new Error(`Failed to get all orders: ${error}`)
    }
  }

  async getOrderDetailByResId(pageSize: number, page: number, resId: String): Promise<OrderDetailType[]> {
    try {
      let query = this.OrderDetailCollection.where('restaurant.id', '==', resId)
      const offset = (page - 1) * pageSize
      if (offset > 0) query = query.offset(offset)
      if (pageSize > 0) query = query.limit(pageSize)

      const snapshot = await query.get()
      const orders: OrderDetailType[] = []
      snapshot.forEach((doc) => {
        const data = doc.data()
        console.log(doc.id)
        let updatedAt = handleFormatDate(data.updatedAt as Date)
        let createdAt = handleFormatDate(data.createdAt as Date)
        orders.push({ ...doc.data(), id: doc.id, createdAt, updatedAt } as OrderDetailType)
      })
      console.log('All orders:', orders)
      return orders
    } catch (error) {
      console.error('Error getting all orders:', error)
      throw new Error(`Failed to get all orders: ${error}`)
    }
  }
}

const orderDetailService = new OrderDetailService()
export default orderDetailService
