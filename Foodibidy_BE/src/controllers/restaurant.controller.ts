import { Request, Response, NextFunction } from 'express'
import { UploadedFile } from 'express-fileupload'

import { RESTAURANT_MESSAGES } from '~/constants/messages'
import {
  CreateRestaurantReqBody,
  RestaurantParams,
  UpdateRestaurantReqBody
} from '~/models/requests/restaurant.request'
import restaurantService from '~/services/restaurant.service'

export const createRestaurant = async (
  req: Request<any, any, CreateRestaurantReqBody>,
  res: Response,
  next: NextFunction
) => {
  const user = JSON.parse(req.body.user as unknown as string)
  const restaurantImage = req.files?.restaurantImage as UploadedFile
  const result = await restaurantService.createRestaurant({ ...req.body, user, restaurantImage })
  return res.json({ message: RESTAURANT_MESSAGES.CREATE_SUCCESS, data: result })
}

export const getRestaurant = async (req: Request<RestaurantParams>, res: Response, next: NextFunction) => {
  const result = await restaurantService.getRestaurant(req.params.restaurantId)
  return res.json({ message: RESTAURANT_MESSAGES.GET_SUCCESS, data: result })
}

export const getAllRestaurants = async (req: Request, res: Response, next: NextFunction) => {
  const limit = parseInt(req.query.limit as string, 10) || 0
  const page = parseInt(req.query.page as string, 10) || 0
  const result = await restaurantService.getAllRestaurants(limit, page)
  return res.json({ message: RESTAURANT_MESSAGES.GET_ALL_SUCCESS, data: result })
}

export const updateRestaurant = async (
  req: Request<RestaurantParams, any, Partial<UpdateRestaurantReqBody>>,
  res: Response,
  next: NextFunction
) => {
  const restaurantImage = req.files?.restaurantImage as UploadedFile
  const result = await restaurantService.updateRestaurant(req.params.restaurantId, {
    ...req.body,

    restaurantImage
  })
  return res.json({ message: RESTAURANT_MESSAGES.UPDATE_SUCCESS, data: result })
}

export const deleteRestaurant = async (req: Request<RestaurantParams>, res: Response, next: NextFunction) => {
  const result = await restaurantService.deleteRestaurant(req.params.restaurantId)
  return res.json({ message: RESTAURANT_MESSAGES.DELETE_SUCCESS, data: result })
}
