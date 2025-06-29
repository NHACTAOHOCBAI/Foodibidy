import { Request, Response, NextFunction } from 'express'
import { UploadedFile } from 'express-fileupload'
import { limit } from 'firebase/firestore'
import { DISH_MESSAGES } from '~/constants/messages'
import { CreateDishReqBody, DishParams, UpdateDishReqBody } from '~/models/requests/dish.request'
import dishService from '~/services/dish.service'

export const createDish = async (req: Request<any, any, CreateDishReqBody>, res: Response, next: NextFunction) => {
  const dishImage = req.files?.dishImage as UploadedFile
  const category = JSON.parse(req.body.category as unknown as string)
  const restaurant = { id: req.user!.uid, restaurantName: '' }
  const result = await dishService.createDish({ ...req.body, category, restaurant, dishImage })
  return res.json({ message: DISH_MESSAGES.CREATE_SUCCESS, data: result })
}

export const getDish = async (req: Request<DishParams>, res: Response, next: NextFunction) => {
  const result = await dishService.getDish(req.params.dishId)
  return res.json({ message: DISH_MESSAGES.GET_SUCCESS, data: result })
}

export const getAllDishes = async (req: Request, res: Response, next: NextFunction) => {
  const limit = parseInt(req.query.limit as string, 10) || 0
  const page = parseInt(req.query.page as string, 10) || 0
  const filter = req.query.filter as string | undefined
  console.log('filter', filter)
  const result = await dishService.getAllDishes(limit, page, filter)
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
  const dishImage = req.files?.dishImage as UploadedFile
  let category = undefined
  if (req.body.category) category = JSON.parse(req.body.category as unknown as string)

  const result = await dishService.updateDish(req.params.dishId, { ...req.body, category, dishImage })
  return res.json({ message: DISH_MESSAGES.UPDATE_SUCCESS, data: result })
}

export const deleteDish = async (req: Request<DishParams>, res: Response, next: NextFunction) => {
  const result = await dishService.deleteDish(req.params.dishId)
  return res.json({ message: DISH_MESSAGES.DELETE_SUCCESS, data: result })
}

export const getMyDishes = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user!.uid

    const result = await dishService.getMyDishes(userId)
    return res.json({
      message: DISH_MESSAGES.GET_SUCCESS,
      data: result
    })
  } catch (error) {
    next(error)
  }
}
