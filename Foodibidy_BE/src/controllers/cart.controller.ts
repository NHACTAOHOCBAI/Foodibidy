import { Request, Response, NextFunction } from 'express'
import cartService from '~/services/cart.service'
import { CartParams } from '~/models/requests/cart.request'
import { CART_MESSAGES } from '~/constants/messages'

export const getCart = async (req: Request<CartParams>, res: Response, next: NextFunction) => {
  const result = await cartService.getCart(req.params.cartId)
  return res.json({ message: CART_MESSAGES.GET_SUCCESS, data: result })
}

export const addItemToCart = async (req: Request<CartParams>, res: Response, next: NextFunction) => {
  const result = await cartService.addItemToCart(req.params.cartId, req.body)
  return res.json({ message: CART_MESSAGES.ADD_SUCCESS, data: result })
}

export const removeItemFromCart = async (req: Request<CartParams>, res: Response, next: NextFunction) => {
  const result = await cartService.removeItemFromCart(req.params.cartId, req.body)
  return res.json({ message: CART_MESSAGES.REMOVE_SUCCESS, data: result })
}

export const updateCartItem = async (req: Request<CartParams>, res: Response, next: NextFunction) => {
  const result = await cartService.updateCartItem(req.params.cartId, req.body)
  return res.json({ message: CART_MESSAGES.UPDATE_SUCCESS, data: result })
}

export const deleteCart = async (req: Request<CartParams>, res: Response, next: NextFunction) => {
  const result = await cartService.deleteCart(req.params.cartId)
  return res.json({ message: CART_MESSAGES.DELETE_SUCCESS, data: result })
}
