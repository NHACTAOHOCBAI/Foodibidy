import { Request, Response, NextFunction } from 'express'
import cartService from '~/services/cart.service'
import { AddDishToCart, CartParams } from '~/models/requests/cart.request'
import { CART_MESSAGES } from '~/constants/messages'
import { CartType } from '~/models/schemas/cart.schema'

export const getCart = async (req: Request<CartParams>, res: Response, next: NextFunction) => {
  const result = await cartService.getCart(req.params.cartId)
  return res.json({ message: CART_MESSAGES.GET_SUCCESS, data: result })
}

export const getMyCart = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.user!.uid

  const result = await cartService.getMyCart(userId)
  return res.json({ message: CART_MESSAGES.GET_SUCCESS, data: result })
}

export const addDishToCart = async (
  req: Request<CartParams, any, AddDishToCart>,
  res: Response,
  next: NextFunction
) => {
  const userId = req.user!.uid
  const result = await cartService.addDishToCart(userId, req.body)
  return res.json({ message: CART_MESSAGES.ADD_SUCCESS, data: result })
}

// export const removeItemFromCart = async (req: Request<CartParams>, res: Response, next: NextFunction) => {
//   const result = await cartService.removeItemFromCart(req.params.cartId, req.body)
//   return res.json({ message: CART_MESSAGES.REMOVE_SUCCESS, data: result })
// }

export const deleteCart = async (req: Request<CartParams>, res: Response, next: NextFunction) => {
  const result = await cartService.deleteCart(req.params.cartId)
  return res.json({ message: CART_MESSAGES.DELETE_SUCCESS, data: result })
}
