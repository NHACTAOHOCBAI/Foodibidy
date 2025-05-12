class OrderService {
  private orderCollection = databaseService.orders

  async createOrder(data: CreateOrderReqBody) {
    const docRef = await this.orderCollection.add({ ...data, status: 'cho_xu_ly', created_at: new Date() })
    return docRef.id
  }

  async getOrder(id: string) {
    const doc = await this.orderCollection.doc(id).get()
    if (!doc.exists) throw new ErrorWithStatus({ message: 'Order not found', status: HTTP_STATUS.NOT_FOUND })
    return doc.data()
  }

  async getAllOrders() {
    const snapshot = await this.orderCollection.get()
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
  }

  async updateOrder(id: string, data: UpdateOrderReqBody) {
    await this.orderCollection.doc(id).update(data)
  }

  async deleteOrder(id: string) {
    await this.orderCollection.doc(id).delete()
  }
}

export const orderService = new OrderService()
