import { ErrorWithStatus } from '~/models/errors'
import databaseService from './database.service'
import { CreateOrderReqBody, UpdateOrderReqBody } from '~/models/requests/order.request'
import Order, { OrderType } from '~/models/schemas/order.schema'
import { ORDER_MESSAGES } from '~/constants/messages'
import HTTP_STATUS from '~/constants/httpStatus'
import { handleFormatDate } from '~/utils/utils'
import { OrderStatus } from '~/constants/enums'

class OrderService {
  private orderCollection = databaseService.orders

  async createOrder(data: CreateOrderReqBody) {
    try {
      const newOrder = new Order({
        ...data
      }).toObject()

      const docRef = await this.orderCollection.add(newOrder)
      console.log('Order created with ID:', docRef.id)
      return docRef.id
    } catch (error) {
      console.error('Error creating order:', error)
      throw new Error(`Failed to create order: ${error}`)
    }
  }

  async getOrder(id: string) {
    const doc = await this.orderCollection.doc(id).get()
    if (doc.exists) {
      console.log(`Get order success with ID ${doc.id}`)
      const data = doc.data() as OrderType
      let updatedAt = handleFormatDate(data.updatedAt as Date)
      let createdAt = handleFormatDate(data.createdAt as Date)
      return { id: doc.id, ...doc.data(), updatedAt, createdAt }
    } else {
      console.error(`Error getting order with ID ${id}`)
    }
    throw new ErrorWithStatus({ message: ORDER_MESSAGES.ORDER_NOT_FOUND, status: HTTP_STATUS.NOT_FOUND })
  }

  async updateOrder(id: string, data: UpdateOrderReqBody) {
    const doc = await this.orderCollection.doc(id).get()
    const updatedOrder = {
      ...data,
      updatedAt: new Date()
    }

    try {
      await this.orderCollection.doc(id).update(updatedOrder)
      console.log(`Update order success with ID ${doc.id}`)
    } catch {
      throw new ErrorWithStatus({ message: ORDER_MESSAGES.ORDER_NOT_FOUND, status: HTTP_STATUS.NOT_FOUND })
    }
  }

  async deleteOrder(id: string) {
    try {
      await this.orderCollection.doc(id).delete()
      console.log(`Order with ID ${id} deleted successfully`)
    } catch (error) {
      console.error(`Error deleting order with ID ${id}:`, error)
      throw new ErrorWithStatus({ message: ORDER_MESSAGES.ORDER_NOT_FOUND, status: HTTP_STATUS.NOT_FOUND })
    }
  }

  async getAllOrders(): Promise<OrderType[]> {
    try {
      const snapshot = await this.orderCollection.get()
      const orders: OrderType[] = []
      snapshot.forEach((doc) => {
        const data = doc.data()
        console.log(doc.id)
        let updatedAt = handleFormatDate(data.updatedAt as Date)
        let createdAt = handleFormatDate(data.createdAt as Date)
        orders.push({ ...doc.data(), id: doc.id, createdAt, updatedAt } as OrderType)
      })
      console.log('All orders:', orders)
      return orders
    } catch (error) {
      console.error('Error getting all orders:', error)
      throw new Error(`Failed to get all orders: ${error}`)
    }
  }
  async getMyHistoryOrders(pageSize: number, page: number): Promise<OrderType[]> {
    try {
      let query = this.orderCollection.where('status', '==', OrderStatus.DELIVERED)
      const offset = (page - 1) * pageSize
      if (offset > 0) query = query.offset(offset)
      if (pageSize > 0) query = query.limit(pageSize)

      const snapshot = await query.get()
      const orders: OrderType[] = []
      snapshot.forEach((doc) => {
        const data = doc.data()
        console.log(doc.id)
        let updatedAt = handleFormatDate(data.updatedAt as Date)
        let createdAt = handleFormatDate(data.createdAt as Date)
        orders.push({ ...doc.data(), id: doc.id, createdAt, updatedAt } as OrderType)
      })
      console.log('All orders:', orders)
      return orders
    } catch (error) {
      console.error('Error getting all orders:', error)
      throw new Error(`Failed to get all orders: ${error}`)
    }
  }
}

const orderService = new OrderService()
export default orderService
