import { Router } from 'express'
import { wrapRequestHandler } from '~/utils/handler'
import {
  createReview,
  getAllReviews,
  getReview,
  updateReview,
  deleteReview,
  getReviewByFood
} from '~/controllers/review.controller'

const reviewsRouter = Router()

/**
 * Create a new review
 * Path: /reviews
 * Method: POST
 */
reviewsRouter.post('/', wrapRequestHandler(createReview))

/**
 * Get all reviews
 * Path: /reviews
 * Method: GET
 */
reviewsRouter.get('/', wrapRequestHandler(getAllReviews))

/**
 * Get a review by ID
 * Path: /reviews/:reviewId
 * Method: GET
 */
reviewsRouter.get('/:reviewId', wrapRequestHandler(getReview))

/**
 * Get a review by foodId
 * Path: /reviews/food/:foodId
 * Method: GET
 */
reviewsRouter.get('/:foodId', wrapRequestHandler(getReviewByFood))

/**
 * Update a review by ID
 * Path: /reviews/:reviewId
 * Method: PUT
 */
reviewsRouter.put('/:reviewId', wrapRequestHandler(updateReview))

/**
 * Delete a review by ID
 * Path: /reviews/:reviewId
 * Method: DELETE
 */
reviewsRouter.delete('/:reviewId', wrapRequestHandler(deleteReview))

export default reviewsRouter
