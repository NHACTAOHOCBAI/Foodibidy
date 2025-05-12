import { Request, Response, NextFunction } from 'express'
import { NOTIFICATION_MESSAGES } from '~/constants/messages'
import { CreateNotificationReqBody, NotificationParams } from '~/models/requests/notification.request'
import { notificationService } from '~/services/notification.service'

export const createNotification = async (
  req: Request<any, any, CreateNotificationReqBody>,
  res: Response,
  next: NextFunction
) => {
  const result = await notificationService.createNotification(req.body)
  return res.json({ message: NOTIFICATION_MESSAGES.CREATE_SUCCESS, data: result })
}

export const getNotification = async (req: Request<NotificationParams>, res: Response, next: NextFunction) => {
  const result = await notificationService.getNotification(req.params.notificationId)
  return res.json({ message: NOTIFICATION_MESSAGES.GET_SUCCESS, data: result })
}

export const getAllNotifications = async (req: Request, res: Response, next: NextFunction) => {
  const result = await notificationService.getAllNotifications()
  return res.json({ message: NOTIFICATION_MESSAGES.GET_ALL_SUCCESS, data: result })
}

export const updateNotification = async (
  req: Request<NotificationParams, any, Partial<CreateNotificationReqBody>>,
  res: Response,
  next: NextFunction
) => {
  const result = await notificationService.updateNotification(req.params.notificationId, req.body)
  return res.json({ message: NOTIFICATION_MESSAGES.UPDATE_SUCCESS, data: result })
}

export const deleteNotification = async (req: Request<NotificationParams>, res: Response, next: NextFunction) => {
  const result = await notificationService.deleteNotification(req.params.notificationId)
  return res.json({ message: NOTIFICATION_MESSAGES.DELETE_SUCCESS, data: result })
}
