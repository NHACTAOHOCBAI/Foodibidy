class NotificationService {
  private notificationCollection = databaseService.notifications

  async createNotification(data: CreateNotificationReqBody) {
    const docRef = await this.notificationCollection.add({ ...data, read: false, created_at: new Date() })
    return docRef.id
  }

  async getNotification(id: string) {
    const doc = await this.notificationCollection.doc(id).get()
    if (!doc.exists) throw new ErrorWithStatus({ message: 'Notification not found', status: HTTP_STATUS.NOT_FOUND })
    return doc.data()
  }

  async getAllNotifications() {
    const snapshot = await this.notificationCollection.get()
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
  }

  async updateNotification(id: string, data: UpdateNotificationReqBody) {
    await this.notificationCollection.doc(id).update(data)
  }

  async deleteNotification(id: string) {
    await this.notificationCollection.doc(id).delete()
  }
}

export const notificationService = new NotificationService()
