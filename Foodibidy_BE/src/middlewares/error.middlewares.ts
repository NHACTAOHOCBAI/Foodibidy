import { NextFunction, Request, Response } from 'express'
import { omit } from 'lodash'
import HTTP_STATUS from '~/constants/httpStatus'
import { ErrorWithStatus } from '~/models/errors'

export const defaultErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ErrorWithStatus) {
    console.log(err)
    return res.status(err.status).json(omit(err, ['status']))
  }
  // lưu ý: không được dùng Object.keys(err) vì nó sẽ không lấy được các key không enumerable
  // thêm enumerable: true cho các key không enumerable để Object.keys(err) lấy được
  Object.getOwnPropertyNames(err).forEach((key) => {
    Object.defineProperty(err, key, { enumerable: true })
  })
  console.log(err)
  res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
    message: err.message,
    errorInfo: omit(err, ['stack'])
  })
}
