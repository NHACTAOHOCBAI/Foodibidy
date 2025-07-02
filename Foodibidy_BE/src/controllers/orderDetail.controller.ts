import { Request, Response, NextFunction } from 'express'
import { ORDER_MESSAGES } from '~/constants/messages'
import {
  CreateOrderDetailReqBody,
  OrderDetailParams,
  UpdateOrderDetailReqBody
} from '~/models/requests/orderDetail.request'
import orderDetailService from '~/services/orderDetail.service'
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

export const getMyOngoingOrders = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Unauthorized' })
  }
  const limit = parseInt(req.query.limit as string, 10) || 0
  const page = parseInt(req.query.page as string, 10) || 0
  const result = await OrderDetailService.getMyOngoingOrders(limit, page, req.user.uid)
  return res.json({ message: ORDER_MESSAGES.GET_ALL_SUCCESS, data: result })
}

export const getMyHistoryOrders = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Unauthorized' })
  }
  const limit = parseInt(req.query.limit as string, 10) || 0
  const page = parseInt(req.query.page as string, 10) || 0
  const result = await OrderDetailService.getMyHistoryOrders(limit, page, req.user.uid)
  return res.json({ message: ORDER_MESSAGES.GET_ALL_SUCCESS, data: result })
}

export const getOrderDetailByResId = async (req: Request<OrderDetailParams>, res: Response, next: NextFunction) => {
  const limit = parseInt(req.query.limit as string, 10) || 0
  const page = parseInt(req.query.page as string, 10) || 0
  const result = await OrderDetailService.getOrderDetailByResId(limit, page, req.params.RestaurantId)
  return res.json({ message: ORDER_MESSAGES.GET_ALL_SUCCESS, data: result })
}

export const getAllOrderDetails = async (req: Request, res: Response, next: NextFunction) => {
  const limit = parseInt(req.query.limit as string, 10) || 0
  const page = parseInt(req.query.page as string, 10) || 0
  const result = await orderDetailService.getAllOrderDetails(limit, page)
  return res.json({ message: ORDER_MESSAGES.GET_ALL_SUCCESS, data: result })
}

export const updateOrderDetail = async (
  req: Request<OrderDetailParams, any, UpdateOrderDetailReqBody>,
  res: Response,
  next: NextFunction
) => {
  const result = await OrderDetailService.updateOrderDetail(req.params.orderId, req.body)
  return res.json({ message: ORDER_MESSAGES.UPDATE_SUCCESS, data: result })
}

export const deleteOrderDetail = async (req: Request<OrderDetailParams>, res: Response, next: NextFunction) => {
  const result = await OrderDetailService.deleteOrderDetail(req.params.OrderDetailId)
  return res.json({ message: ORDER_MESSAGES.DELETE_SUCCESS, data: result })
}
