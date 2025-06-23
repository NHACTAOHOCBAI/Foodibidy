import { Request, Response, NextFunction } from 'express'
import { ORDER_MESSAGES } from '~/constants/messages'
import { CreateOrderReqBody, OrderParams } from '~/models/requests/order.request'
import { UpdateOrderDetailReqBody } from '~/models/requests/orderDetail.request'
import orderService from '~/services/order.service'

import orderDetailService from '~/services/orderDetail.service'

export const createOrder = async (req: Request<any, any, CreateOrderReqBody>, res: Response, next: NextFunction) => {
  const result = await orderService.createOrder(req.body)
  return res.json({ message: ORDER_MESSAGES.CREATE_SUCCESS, data: result })
}
