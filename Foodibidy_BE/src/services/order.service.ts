import { ErrorWithStatus } from '~/models/errors'
import databaseService from './database.service'
import { CreateOrderReqBody, UpdateOrderReqBody } from '~/models/requests/order.request'
import Order, { OrderType } from '~/models/schemas/order.schema'
import { ORDER_MESSAGES } from '~/constants/messages'
import HTTP_STATUS from '~/constants/httpStatus'

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
      return { ...doc.data() } as Order
    } else {
      console.error(`Error getting order with ID ${id}`)
    }
    throw new ErrorWithStatus({ message: ORDER_MESSAGES.ORDER_NOT_FOUND, status: HTTP_STATUS.NOT_FOUND })
  }

  async updateOrder(id: string, data: UpdateOrderReqBody) {
    const doc = await this.orderCollection.doc(id).get()
    const updatedOrder = {
      ...data,
      updated_at: new Date()
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
        orders.push({ ...doc.data(), id: doc.id } as OrderType)
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
