import { Request, Response, NextFunction } from 'express'
import { ORDER_MESSAGES } from '~/constants/messages'
import { CreateOrderReqBody, OrderParams } from '~/models/requests/order.request'
import orderService from '~/services/order.service'

export const createOrder = async (req: Request<any, any, CreateOrderReqBody>, res: Response, next: NextFunction) => {
  const result = await orderService.createOrder(req.body)
  return res.json({ message: ORDER_MESSAGES.CREATE_SUCCESS, data: result })
}

export const getOrder = async (req: Request<OrderParams>, res: Response, next: NextFunction) => {
  const result = await orderService.getOrder(req.params.orderId)
  return res.json({ message: ORDER_MESSAGES.GET_SUCCESS, data: result })
}

export const getAllOrders = async (req: Request, res: Response, next: NextFunction) => {
  const result = await orderService.getAllOrders()
  return res.json({ message: ORDER_MESSAGES.GET_ALL_SUCCESS, data: result })
}

export const updateOrder = async (
  req: Request<OrderParams, any, Partial<CreateOrderReqBody>>,
  res: Response,
  next: NextFunction
) => {
  const result = await orderService.updateOrder(req.params.orderId, req.body)
  return res.json({ message: ORDER_MESSAGES.UPDATE_SUCCESS, data: result })
}

export const deleteOrder = async (req: Request<OrderParams>, res: Response, next: NextFunction) => {
  const result = await orderService.deleteOrder(req.params.orderId)
  return res.json({ message: ORDER_MESSAGES.DELETE_SUCCESS, data: result })
}
