import { Request, Response, NextFunction } from 'express'
import { DISH_MESSAGES } from '~/constants/messages'
import { CreateDishReqBody, DishParams, UpdateDishReqBody } from '~/models/requests/dish.request'
import dishService from '~/services/dish.service'

export const createDish = async (req: Request<any, any, CreateDishReqBody>, res: Response, next: NextFunction) => {
  const result = await dishService.createDish(req.body)
  return res.json({ message: DISH_MESSAGES.CREATE_SUCCESS, data: result })
}

export const getDish = async (req: Request<DishParams>, res: Response, next: NextFunction) => {
  const result = await dishService.getDish(req.params.dishId)
  return res.json({ message: DISH_MESSAGES.GET_SUCCESS, data: result })
}

export const getAllDishes = async (req: Request, res: Response, next: NextFunction) => {
  const limit = parseInt(req.query.limit as string, 10) || 0
  const page = parseInt(req.query.page as string, 10) || 0
  const result = await dishService.getAllDishes(limit, page)
  return res.json({ message: DISH_MESSAGES.GET_ALL_SUCCESS, data: result })
}
export const getDishesByCategoryId = async (req: Request<DishParams>, res: Response, next: NextFunction) => {
  const limit = parseInt(req.query.limit as string, 10) || 0
  const page = parseInt(req.query.page as string, 10) || 0
  const result = await dishService.getDishesByCategoryId(limit, page, req.params.categoryId)
  return res.json({ message: DISH_MESSAGES.GET_ALL_SUCCESS, data: result })
}
export const getDishesByRestaurantId = async (req: Request<DishParams>, res: Response, next: NextFunction) => {
  const limit = parseInt(req.query.limit as string, 10) || 0
  const page = parseInt(req.query.page as string, 10) || 0
  const result = await dishService.getDishesByRestaurantId(limit, page, req.params.restaurantId)
  return res.json({ message: DISH_MESSAGES.GET_ALL_SUCCESS, data: result })
}

export const updateDish = async (
  req: Request<DishParams, any, UpdateDishReqBody>,
  res: Response,
  next: NextFunction
) => {
  const result = await dishService.updateDish(req.params.dishId, req.body)
  return res.json({ message: DISH_MESSAGES.UPDATE_SUCCESS, data: result })
}

export const deleteDish = async (req: Request<DishParams>, res: Response, next: NextFunction) => {
  const result = await dishService.deleteDish(req.params.dishId)
  return res.json({ message: DISH_MESSAGES.DELETE_SUCCESS, data: result })
}
