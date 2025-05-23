import { ErrorWithStatus } from '~/models/errors'
import databaseService from './database.service'
import { CreateOrderDetailReqBody, UpdateOrderDetailReqBody } from '~/models/requests/orderDetail.request'
import OrderDetail, { OrderDetailType } from '~/models/schemas/orderDetail.schema'
import { ORDER_MESSAGES } from '~/constants/messages'
import HTTP_STATUS from '~/constants/httpStatus'
import { handleFormatDate } from '~/utils/utils'

class OrderDetailService {
  private OrderDetailCollection = databaseService.order_details

  async createOrderDetail(data: CreateOrderDetailReqBody) {
    try {
      const newOrderDetail = new OrderDetail({
        ...data
      }).toObject()

      const docRef = await this.OrderDetailCollection.add(newOrderDetail)
      console.log('OrderDetail created with ID:', docRef.id)
      return docRef.id
    } catch (error) {
      console.error('Error creating OrderDetail:', error)
      throw new Error(`Failed to create OrderDetail: ${error}`)
    }
  }

  async getOrderDetail(id: string) {
    const doc = await this.OrderDetailCollection.doc(id).get()
    if (doc.exists) {
      console.log(`Get OrderDetail success with ID ${doc.id}`)
      const data = doc.data() as OrderDetailType
      let updatedAt = handleFormatDate(data.updatedAt as Date)
      let createdAt = handleFormatDate(data.createdAt as Date)
      return { id: doc.id, ...doc.data(), updatedAt, createdAt }
    } else {
      console.error(`Error getting OrderDetail with ID ${id}`)
    }
    throw new ErrorWithStatus({ message: ORDER_MESSAGES.ORDER_NOT_FOUND, status: HTTP_STATUS.NOT_FOUND })
  }

  async updateOrderDetail(id: string, data: UpdateOrderDetailReqBody) {
    const doc = await this.OrderDetailCollection.doc(id).get()
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

  async getAllOrderDetails(): Promise<OrderDetailType[]> {
    try {
      const snapshot = await this.OrderDetailCollection.get()
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
}

const orderDetailService = new OrderDetailService()
export default orderDetailService
