import { Router } from 'express'
import { getCart, deleteCart } from '~/controllers/cart.controller'
import { wrapRequestHandler } from '~/utils/handler'

const cartsRouter = Router()

/**
 * Create a new cart
 * Path: /carts
 * Method: POST
 */
cartsRouter.post('/', wrapRequestHandler(createCart))

/**
 * Get all carts
 * Path: /carts
 * Method: GET
 */
cartsRouter.get('/', wrapRequestHandler(getAllCarts))

/**
 * Get a cart by ID
 * Path: /carts/:cartId
 * Method: GET
 */
cartsRouter.get('/:cartId', wrapRequestHandler(getCart))

/**
 * Update a cart by ID
 * Path: /carts/:cartId
 * Method: PUT
 */
cartsRouter.put('/:cartId', wrapRequestHandler(updateCart))

/**
 * Delete a cart by ID
 * Path: /carts/:cartId
 * Method: DELETE
 */
cartsRouter.delete('/:cartId', wrapRequestHandler(deleteCart))

export default cartsRouter
