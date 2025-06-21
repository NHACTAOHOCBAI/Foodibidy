import { Request, Response, NextFunction } from 'express'
import { REVIEW_MESSAGES } from '~/constants/messages'
import { CreateReviewReqBody, ReviewParams } from '~/models/requests/review.request'
import reviewService from '~/services/review.service'

export const createReview = async (req: Request<any, any, CreateReviewReqBody>, res: Response, next: NextFunction) => {
  const result = await reviewService.createReview(req.body)
  return res.json({ message: REVIEW_MESSAGES.CREATE_SUCCESS, data: result })
}

export const getReview = async (req: Request<ReviewParams>, res: Response, next: NextFunction) => {
  const result = await reviewService.getReview(req.params.reviewId)
  return res.json({ message: REVIEW_MESSAGES.GET_SUCCESS, data: result })
}

export const getAllReviews = async (req: Request, res: Response, next: NextFunction) => {
  const result = await reviewService.getAllReviews()
  return res.json({ message: REVIEW_MESSAGES.GET_ALL_SUCCESS, data: result })
}

export const getReviewByFood = async (req: Request<ReviewParams>, res: Response, next: NextFunction) => {
  const result = await reviewService.getReviewByFood(req.params.foodId)
  return res.json({ message: REVIEW_MESSAGES.GET_ALL_SUCCESS, data: result })
}

export const updateReview = async (
  req: Request<ReviewParams, any, Partial<CreateReviewReqBody>>,
  res: Response,
  next: NextFunction
) => {
  const result = await reviewService.updateReview(req.params.reviewId, req.body)
  return res.json({ message: REVIEW_MESSAGES.UPDATE_SUCCESS, data: result })
}

export const deleteReview = async (req: Request<ReviewParams>, res: Response, next: NextFunction) => {
  const result = await reviewService.deleteReview(req.params.reviewId)
  return res.json({ message: REVIEW_MESSAGES.DELETE_SUCCESS, data: result })
}
