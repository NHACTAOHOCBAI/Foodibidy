import { ParamsDictionary, Query } from 'express-serve-static-core'

export interface NotificationParams extends ParamsDictionary {
  notification_id: string
}

export interface PaginationQuery {
  page: string
  limit: string
}

export interface CreateNotificationReqBody {
  account_id: string
  content: string
}

export interface UpdateNotificationReqBody {
  account_id?: string
  content?: string
  is_read?: boolean
}
