import { NextFunction, Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { USER_DISH_MESSAGES } from '~/constants/messages'
import { DishParams } from '~/models/requests/dish.request'
import User_Dish from '~/models/schemas/user_dish.schema'
import user_dishService from '~/services/user_dish.service'

export const createUser_Dish = async (
  req: Request<ParamsDictionary, any, User_Dish>,
  res: Response,
  next: NextFunction
) => {
  const result = await user_dishService.createUser_Dish(req.body)
  return res.json({ message: USER_DISH_MESSAGES.CREATE_SUCCESS, data: result })
}

export const checkLikeDish = async (req: Request<User_Dish>, res: Response, next: NextFunction) => {
  const result = await user_dishService.checkLikeDish(req.body)
  if (result === '') return res.json({ message: USER_DISH_MESSAGES.NOT_FOUND, data: result })
  return res.json({ message: USER_DISH_MESSAGES.DISH_EXIST, data: result })
}
export const getDishesByUserId = async (req: Request<DishParams>, res: Response, next: NextFunction) => {
  const limit = parseInt(req.query.limit as string, 10) || 0
  const page = parseInt(req.query.page as string, 10) || 0
  const userId = req.user!.uid
  const result = await user_dishService.getDishesByUserId(limit, page, userId)
  return res.json({ message: USER_DISH_MESSAGES.GET_ALL_SUCCESS, data: result })
}

export const deleteUser_Dish = async (req: Request<DishParams>, res: Response, next: NextFunction) => {
  const result = await user_dishService.deleteUser_Dish(req.params.userId)
  return res.json({ message: USER_DISH_MESSAGES.DELETE_SUCCESS, data: result })
}
