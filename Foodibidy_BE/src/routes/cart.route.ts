import { Router } from 'express'
import { UserRole } from '~/constants/enums'
import { getCart, deleteCart, addDishToCart, getMyCart } from '~/controllers/cart.controller'
import { authenticateFirebase, authorizeRole } from '~/middlewares/auth.middlewares'
import { wrapRequestHandler } from '~/utils/handler'

const cartsRouter = Router()

// /**
//  * Get a cart by ID
//  * Path: /carts/:cartId
//  * Method: GET
//  */
// cartsRouter.get('/:cartId', authenticateFirebase, wrapRequestHandler(getCart))

/**
 * Get my cart
 * Path: /carts/myCart
 * Method: GET
 */
cartsRouter.get('/myCart', authenticateFirebase, authorizeRole([UserRole.CUSTOMER]), wrapRequestHandler(getMyCart))

/**
 * Add dish/ update dish to cart
 * Path: /carts
 * Method: PUT
 */
cartsRouter.put('/', authenticateFirebase, authorizeRole([UserRole.CUSTOMER]), wrapRequestHandler(addDishToCart))

/**
 * Delete a cart by ID
 * Path: /carts/:cartId
 * Method: DELETE
 */
cartsRouter.delete('/:cartId', authenticateFirebase, authorizeRole([UserRole.CUSTOMER]), wrapRequestHandler(deleteCart))

export default cartsRouter
