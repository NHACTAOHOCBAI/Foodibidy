import { Router } from 'express'
import { wrapRequestHandler } from '~/utils/handler'
import { createOrder, getAllOrders, getOrder, updateOrder, deleteOrder } from '~/controllers/order.controller'
import { CreateOrderSchema } from '~/middlewares/order.middlewares'

const ordersRouter = Router()

/**
 * Create a new order
 * Path: /orders
 * Method: POST
 */
ordersRouter.post('/', CreateOrderSchema, wrapRequestHandler(createOrder))

/**
 * Get all orders
 * Path: /orders
 * Method: GET
 */
ordersRouter.get('/', wrapRequestHandler(getAllOrders))

/**
 * Get an order by ID
 * Path: /orders/:orderId
 * Method: GET
 */
ordersRouter.get('/:orderId', wrapRequestHandler(getOrder))

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
