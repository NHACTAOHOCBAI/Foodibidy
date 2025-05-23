import { ErrorWithStatus } from '~/models/errors'
import databaseService from './database.service'
import { CreateNotificationReqBody, UpdateNotificationReqBody } from '~/models/requests/notification.request'
import Notification, { NotificationType } from '~/models/schemas/notification.schema'
import { NOTIFICATION_MESSAGES } from '~/constants/messages'
import HTTP_STATUS from '~/constants/httpStatus'
import { handleFormatDate } from '~/utils/utils'

class NotificationService {
  private notificationCollection = databaseService.notifications

  async createNotification(data: CreateNotificationReqBody) {
    try {
      const newNotification = new Notification({
        ...data
      }).toObject()

      const docRef = await this.notificationCollection.add(newNotification)
      console.log('Notification created with ID:', docRef.id)
      return docRef.id
    } catch (error) {
      console.error('Error creating notification:', error)
      throw new Error(`Failed to create notification: ${error}`)
    }
  }

  async getNotification(id: string) {
    const doc = await this.notificationCollection.doc(id).get()
    if (doc.exists) {
      console.log(`Get notification success with ID ${doc.id}`)
      const data = doc.data() as NotificationType
      let updatedAt = handleFormatDate(data.updatedAt as Date)
      let createdAt = handleFormatDate(data.createdAt as Date)
      return { id: doc.id, ...doc.data(), updatedAt, createdAt }
    } else {
      console.error(`Error getting notification with ID ${id}`)
    }
    throw new ErrorWithStatus({ message: NOTIFICATION_MESSAGES.NOTIFICATION_NOT_FOUND, status: HTTP_STATUS.NOT_FOUND })
  }

  async updateNotification(id: string, data: UpdateNotificationReqBody) {
    const doc = await this.notificationCollection.doc(id).get()
    const updatedNotification = {
      ...data,
      updatedAt: new Date()
    }

    try {
      await this.notificationCollection.doc(id).update(updatedNotification)
      console.log(`Update notification success with ID ${doc.id}`)
    } catch {
      throw new ErrorWithStatus({
        message: NOTIFICATION_MESSAGES.NOTIFICATION_NOT_FOUND,
        status: HTTP_STATUS.NOT_FOUND
      })
    }
  }

  async deleteNotification(id: string) {
    try {
      await this.notificationCollection.doc(id).delete()
      console.log(`Notification with ID ${id} deleted successfully`)
    } catch (error) {
      console.error(`Error deleting notification with ID ${id}:`, error)
      throw new ErrorWithStatus({
        message: NOTIFICATION_MESSAGES.NOTIFICATION_NOT_FOUND,
        status: HTTP_STATUS.NOT_FOUND
      })
    }
  }

  async getAllNotifications(): Promise<NotificationType[]> {
    try {
      const snapshot = await this.notificationCollection.get()
      const notifications: NotificationType[] = []
      snapshot.forEach((doc) => {
        const data = doc.data()
        console.log(doc.id)
        let updatedAt = handleFormatDate(data.updatedAt as Date)
        let createdAt = handleFormatDate(data.createdAt as Date)
        notifications.push({ ...doc.data(), id: doc.id, createdAt, updatedAt } as NotificationType)
      })
      console.log('All notifications:', notifications)
      return notifications
    } catch (error) {
      console.error('Error getting all notifications:', error)
      throw new Error(`Failed to get all notifications: ${error}`)
    }
  }
}

const notificationService = new NotificationService()
export default notificationService
