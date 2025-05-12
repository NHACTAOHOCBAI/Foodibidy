export interface NotificationType {
  id: string
  account_id: string
  content: string
  is_read: boolean
}

export default class Notification {
  id: string
  account_id: string
  content: string
  is_read: boolean

  constructor(notification: NotificationType) {
    this.id = notification.id
    this.account_id = notification.account_id
    this.content = notification.content
    this.is_read = notification.is_read
  }

  toObject(): NotificationType {
    return {
      id: this.id,
      account_id: this.account_id,
      content: this.content,
      is_read: this.is_read
    }
  }
}
