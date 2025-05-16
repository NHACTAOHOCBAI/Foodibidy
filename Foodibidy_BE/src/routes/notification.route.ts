import { Router } from 'express'
import { wrapRequestHandler } from '~/utils/handler'
import {
  createNotification,
  getAllNotifications,
  getNotification,
  updateNotification,
  deleteNotification
} from '~/controllers/notification.controller'
import { CreateNotificationSchema } from '~/middlewares/notification.middlewares'

const notificationsRouter = Router()

/**
 * Create a new notification
 * Path: /notifications
 * Method: POST
 */
notificationsRouter.post('/', CreateNotificationSchema, wrapRequestHandler(createNotification))

/**
 * Get all notifications
 * Path: /notifications
 * Method: GET
 */
notificationsRouter.get('/', wrapRequestHandler(getAllNotifications))

/**
 * Get a notification by ID
 * Path: /notifications/:notificationId
 * Method: GET
 */
notificationsRouter.get('/:notificationId', wrapRequestHandler(getNotification))

/**
 * Update a notification by ID
 * Path: /notifications/:notificationId
 * Method: PUT
 */
notificationsRouter.put('/:notificationId', wrapRequestHandler(updateNotification))

/**
 * Delete a notification by ID
 * Path: /notifications/:notificationId
 * Method: DELETE
 */
notificationsRouter.delete('/:notificationId', wrapRequestHandler(deleteNotification))

export default notificationsRouter
