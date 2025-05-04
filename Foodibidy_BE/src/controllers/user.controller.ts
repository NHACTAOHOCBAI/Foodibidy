import { NextFunction, Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { USERS_MESSAGES } from '~/constants/messages'
import { CreateUserRequest } from '~/models/requests/user.request'
import usersService from '~/services/user.service'
export const createUser = async (
  req: Request<ParamsDictionary, any, CreateUserRequest>,
  res: Response,
  next: NextFunction
) => {
  const result = await usersService.createUser(req.body)
  return res.json({ message: USERS_MESSAGES.REGISTER_SUCCESS, result })
}
