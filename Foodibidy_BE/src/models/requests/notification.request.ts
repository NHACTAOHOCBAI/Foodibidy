import { ParamsDictionary, Query } from 'express-serve-static-core'

export interface NotificationParams extends ParamsDictionary {
  notificationId: string
}

export interface PaginationQuery {
  page: string
  limit: string
}

export interface CreateNotificationReqBody {
  userId: string
  content: string
}

export interface UpdateNotificationReqBody {
  userId?: string
  content?: string
  read?: boolean
}
