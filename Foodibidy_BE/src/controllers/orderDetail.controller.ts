import { Request, Response, NextFunction } from 'express'
import { ORDER_MESSAGES } from '~/constants/messages'
import { CreateOrderDetailReqBody, OrderDetailParams } from '~/models/requests/orderDetail.request'
import OrderDetailService from '~/services/orderDetail.service'

export const createOrderDetail = async (
  req: Request<any, any, CreateOrderDetailReqBody>,
  res: Response,
  next: NextFunction
) => {
  const result = await OrderDetailService.createOrderDetail(req.body)
  return res.json({ message: ORDER_MESSAGES.CREATE_SUCCESS, data: result })
}

export const getOrderDetail = async (req: Request<OrderDetailParams>, res: Response, next: NextFunction) => {
  const result = await OrderDetailService.getOrderDetail(req.params.OrderDetailId)
  return res.json({ message: ORDER_MESSAGES.GET_SUCCESS, data: result })
}

export const getAllOrderDetails = async (req: Request, res: Response, next: NextFunction) => {
  const result = await OrderDetailService.getAllOrderDetails()
  return res.json({ message: ORDER_MESSAGES.GET_ALL_SUCCESS, data: result })
}

export const updateOrderDetail = async (
  req: Request<OrderDetailParams, any, CreateOrderDetailReqBody>,
  res: Response,
  next: NextFunction
) => {
  const result = await OrderDetailService.updateOrderDetail(req.params.OrderDetailId, req.body)
  return res.json({ message: ORDER_MESSAGES.UPDATE_SUCCESS, data: result })
}

export const deleteOrderDetail = async (req: Request<OrderDetailParams>, res: Response, next: NextFunction) => {
  const result = await OrderDetailService.deleteOrderDetail(req.params.OrderDetailId)
  return res.json({ message: ORDER_MESSAGES.DELETE_SUCCESS, data: result })
}
