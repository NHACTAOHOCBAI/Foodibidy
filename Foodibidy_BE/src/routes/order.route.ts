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
ordersRouter.get('/history/:orderId', wrapRequestHandler(getMyHistoryOrders))

/**
 * Get all user ongoing order
 * Path: /orders/onGoing/:orderId
 * Method: GET
 */
ordersRouter.get('/onGoing/:orderId', wrapRequestHandler(getMyOngoingOrders))

/**
 * Get all restaurant order
 * Path: /orders/restaurant/:orderId
 * Method: GET
 */
ordersRouter.get('/restaurant/:orderId', wrapRequestHandler(getOrderDetailByResId))

/**
 * Update an order by ID
 * Path: /orders/:orderId
 * Method: PUT
 */
ordersRouter.put('/:orderId', wrapRequestHandler(updateOrderDetail))

/**
 * Delete an order by ID
 * Path: /orders/:orderId
 * Method: DELETE
 */
ordersRouter.delete('/:orderId', wrapRequestHandler(deleteOrderDetail))

export default ordersRouter
