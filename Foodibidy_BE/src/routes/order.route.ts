import { Router } from 'express'
import { wrapRequestHandler } from '~/utils/handler'
import { createOrder, getMyOrderDetail } from '~/controllers/order.controller'
import {
  deleteOrderDetail,
  getAllOrderDetails,
  getMyHistoryOrders,
  getMyOngoingOrders,
  getOrderDetailByResId,
  updateOrderDetail
} from '~/controllers/orderDetail.controller'

import { UserRole } from '~/constants/enums'
import { authenticateFirebase, authorizeRole } from '~/middlewares/auth.middlewares'

const ordersRouter = Router()

/**
 * Create a new order
 * Path: /orders
 * Method: POST
 */
ordersRouter.post('/', authenticateFirebase, authorizeRole([UserRole.CUSTOMER]), wrapRequestHandler(createOrder))

/**
 * Get all orders
 * Path: /orders
 * Method: GET
 */
ordersRouter.get('/', wrapRequestHandler(getAllOrderDetails))

/**
 * Get all user history orders
 * Path: /orders/myHistoryOrders
 * Method: GET
 */
ordersRouter.get(
  '/myHistoryOrders',
  authenticateFirebase,
  authorizeRole([UserRole.CUSTOMER]),
  authenticateFirebase,
  wrapRequestHandler(getMyHistoryOrders)
)

/**
 * Get all user ongoing order
 * Path: /orders/myOngoingOrders
 * Method: GET
 */
ordersRouter.get(
  '/myOngoingOrders',
  authenticateFirebase,
  authorizeRole([UserRole.CUSTOMER]),
  authenticateFirebase,
  wrapRequestHandler(getMyOngoingOrders)
)

/**
 * Get all restaurant order
 * Path: /orders/restaurant/:resId
 * Method: GET
 */
ordersRouter.get('/restaurant/:resId', wrapRequestHandler(getOrderDetailByResId))

/**
 * Get order by restaurant id
 * Path: /orders/myOrders
 * Method: GET
 */
ordersRouter.get(
  '/myOrders',
  authenticateFirebase,
  authorizeRole([UserRole.ADMIN, UserRole.RESTAURANT]),
  wrapRequestHandler(getMyOrderDetail)
)

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
