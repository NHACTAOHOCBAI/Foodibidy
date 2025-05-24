import { Router } from 'express'
import { wrapRequestHandler } from '~/utils/handler'
import {
  createOrder,
  getAllOrders,
  updateOrder,
  deleteOrder,
  getMyHistoryOrders,
  getMyOngoingOrders
} from '~/controllers/order.controller'

const ordersRouter = Router()

/**
 * Create a new order
 * Path: /orders
 * Method: POST
 */
ordersRouter.post('/', wrapRequestHandler(createOrder))

/**
 * Get all orders
 * Path: /orders
 * Method: GET
 */
ordersRouter.get('/', wrapRequestHandler(getAllOrders))

/**
 * Get all user history orders
 * Path: /orders/history/:userId
 * Method: GET
 */
ordersRouter.get('/history/:userId', wrapRequestHandler(getMyHistoryOrders))

/**
 * Get all user ongoing order
 * Path: /Ongoing/:userId
 * Method: GET
 */
ordersRouter.get('/Ongoing/:userId', wrapRequestHandler(getMyOngoingOrders))

/**
 * Update an order by ID
 * Path: /orders/:orderId
 * Method: PUT
 */
ordersRouter.put('/:orderId', wrapRequestHandler(updateOrder))

/**
 * Delete an order by ID
 * Path: /orders/:orderId
 * Method: DELETE
 */
ordersRouter.delete('/:orderId', wrapRequestHandler(deleteOrder))

export default ordersRouter
