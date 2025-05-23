import { Router } from 'express'
import { getCart, deleteCart, addDishToCart } from '~/controllers/cart.controller'
import { wrapRequestHandler } from '~/utils/handler'

const cartsRouter = Router()

/**
 * Get a cart by ID
 * Path: /carts/:cartId
 * Method: GET
 */
cartsRouter.get('/:cartId', wrapRequestHandler(getCart))

/**
 * Add dish/ update dish to cart
 * Path: /carts/:cartId
 * Method: PUT
 */
cartsRouter.put('/:cartId', wrapRequestHandler(addDishToCart))

/**
 * Delete a cart by ID
 * Path: /carts/:cartId
 * Method: DELETE
 */
cartsRouter.delete('/:cartId', wrapRequestHandler(deleteCart))

export default cartsRouter
