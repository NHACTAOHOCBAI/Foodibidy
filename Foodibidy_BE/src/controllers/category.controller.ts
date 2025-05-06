import { Request, Response, NextFunction } from 'express'
import categoryService from '~/services/category.service'
import { CategoryRequestBody, CategoryParams } from '~/models/requests/category.request'
import { CATEGORY_MESSAGES } from '~/constants/messages'

export const createCategory = async (
    req: Request<any, any, CategoryRequestBody>,
    res: Response,
    next: NextFunction
) => {
    const result = await categoryService.createCategory(req.body)
    return res.json({ message: CATEGORY_MESSAGES.CREATE_SUCCESS, result })
}

export const getCategory = async (req: Request<CategoryParams>, res: Response, next: NextFunction) => {
    const result = await categoryService.getCategory(req.params.categoryId)
    return res.json({ message: CATEGORY_MESSAGES.GET_SUCCESS, result })
}

export const getAllCategories = async (req: Request, res: Response, next: NextFunction) => {
    const result = await categoryService.getAllCategories()
    return res.json({ message: CATEGORY_MESSAGES.GET_ALL_SUCCESS, result })
}

export const updateCategory = async (
    req: Request<CategoryParams, any, Partial<CategoryRequestBody>>,
    res: Response,
    next: NextFunction
) => {
    const result = await categoryService.updateCategory(req.params.categoryId, req.body)
    return res.json({ message: CATEGORY_MESSAGES.UPDATE_SUCCESS, result })
}

export const deleteCategory = async (req: Request<CategoryParams>, res: Response, next: NextFunction) => {
    const result = await categoryService.deleteCategory(req.params.categoryId)
    return res.json({ message: CATEGORY_MESSAGES.DELETE_SUCCESS, result })
}
