export interface NotificationType {
  id?: string
  userId: string
  content: string
  read?: boolean
  createdAt?: Date | string
  updatedAt?: Date | string
}

export default class Notification {
  id?: string
  userId: string
  content: string
  read?: boolean
  createdAt?: Date | string
  updatedAt?: Date | string

  constructor(notification: NotificationType) {
    this.id = notification.id || ''
    this.userId = notification.userId
    this.content = notification.content
    this.read = notification.read
    this.createdAt = notification.createdAt || new Date()
    this.updatedAt = notification.updatedAt || new Date()
  }

  toObject(): NotificationType {
    return {
      id: this.id,
      userId: this.userId,
      content: this.content,
      read: this.read,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }
  }
}
