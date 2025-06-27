import { Router } from 'express'
import { wrapRequestHandler } from '~/utils/handler'
import { createOrder } from '~/controllers/order.controller'
import {
  deleteOrderDetail,
  getAllOrderDetails,
  getMyHistoryOrders,
  getMyOngoingOrders,
  getOrderDetailByResId,
  updateOrderDetail
} from '~/controllers/orderDetail.controller'
import { authenticateFirebase } from '~/middlewares/auth.middlewares'

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
ordersRouter.get('/', wrapRequestHandler(getAllOrderDetails))

/**
 * Get all user history orders
 * Path: /orders/history/:orderId
 * Method: GET
 */
ordersRouter.get('/history/:orderId', authenticateFirebase, wrapRequestHandler(getMyHistoryOrders))

/**
 * Get all user ongoing order
 * Path: /orders/onGoing/:orderId
 * Method: GET
 */
ordersRouter.get('/onGoing/:orderId', authenticateFirebase, wrapRequestHandler(getMyOngoingOrders))

/**
 * Get all restaurant order
 * Path: /orders/restaurant/:orderId
 * Method: GET
 */
ordersRouter.get('/restaurant/:orderId', authenticateFirebase, wrapRequestHandler(getOrderDetailByResId))

/**
 * Update an order by ID
 * Path: /orders/:orderId
 * Method: PUT
 */
ordersRouter.put('/:orderId', authenticateFirebase, wrapRequestHandler(updateOrderDetail))

/**
 * Delete an order by ID
 * Path: /orders/:orderId
 * Method: DELETE
 */
ordersRouter.delete('/:orderId', authenticateFirebase, wrapRequestHandler(deleteOrderDetail))

export default ordersRouter
