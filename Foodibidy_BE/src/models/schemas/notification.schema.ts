export interface NotificationType {
  id?: string
  account_id: string
  content: string
  is_read?: boolean
  created_at?: Date | string
  updated_at?: Date | string
}

export default class Notification {
  id?: string
  account_id: string
  content: string
  is_read?: boolean
  created_at?: Date | string
  updated_at?: Date | string

  constructor(notification: NotificationType) {
    this.id = notification.id || ''
    this.account_id = notification.account_id
    this.content = notification.content
    this.is_read = notification.is_read
    this.created_at = notification.created_at || new Date()
    this.updated_at = notification.updated_at || new Date()
  }

  toObject(): NotificationType {
    return {
      id: this.id,
      account_id: this.account_id,
      content: this.content,
      is_read: this.is_read,
      created_at: this.created_at,
      updated_at: this.updated_at
    }
  }
}
