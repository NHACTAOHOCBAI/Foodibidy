import { Request, Response, NextFunction } from 'express'
import categoryService from '~/services/category.service'
import { CreateCategoryReqBody, CategoryParams } from '~/models/requests/category.request'
import { CATEGORY_MESSAGES } from '~/constants/messages'
import { UploadedFile } from 'express-fileupload'

export const createCategory = async (
  req: Request<any, any, CreateCategoryReqBody>,
  res: Response,
  next: NextFunction
) => {
  const cateImage = req.files?.cateImage as UploadedFile

  const result = await categoryService.createCategory({ ...req.body, cateImage })
  return res.json({ message: CATEGORY_MESSAGES.CREATE_SUCCESS, data: result })
}

export const getCategory = async (req: Request<CategoryParams>, res: Response, next: NextFunction) => {
  const result = await categoryService.getCategory(req.params.categoryId)
  return res.json({ message: CATEGORY_MESSAGES.GET_SUCCESS, data: result })
}

export const getAllCategories = async (req: Request, res: Response, next: NextFunction) => {
  const limit = parseInt(req.query.limit as string, 10) || 0
  const page = parseInt(req.query.page as string, 10) || 0
  const result = await categoryService.getAllCategories(limit, page)
  return res.json({ message: CATEGORY_MESSAGES.GET_ALL_SUCCESS, data: result })
}

export const getAllCategoriesByRestaurantId = async (
  req: Request<CategoryParams>,
  res: Response,
  next: NextFunction
) => {
  const limit = parseInt(req.query.limit as string, 10) || 0
  const page = parseInt(req.query.page as string, 10) || 0
  const result = await categoryService.getAllCategoriesByRestaurantId(limit, page, req.params.restaurantId)
  return res.json({ message: CATEGORY_MESSAGES.GET_ALL_SUCCESS, data: result })
}

export const updateCategory = async (
  req: Request<CategoryParams, any, Partial<CreateCategoryReqBody>>,
  res: Response,
  next: NextFunction
) => {
  const cateImage = req.files?.cateImage as UploadedFile
  const result = await categoryService.updateCategory(req.params.categoryId, { ...req.body, cateImage })
  return res.json({ message: CATEGORY_MESSAGES.UPDATE_SUCCESS, data: result })
}

export const deleteCategory = async (req: Request<CategoryParams>, res: Response, next: NextFunction) => {
  const result = await categoryService.deleteCategory(req.params.categoryId)
  return res.json({ message: CATEGORY_MESSAGES.DELETE_SUCCESS, data: result })
}
