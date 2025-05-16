import { Router } from 'express'
import { wrapRequestHandler } from '~/utils/handler'
import { createReview, getAllReviews, getReview, updateReview, deleteReview } from '~/controllers/review.controller'
import { CreateReviewSchema } from '~/middlewares/review.middlewares'

const reviewsRouter = Router()

/**
 * Create a new review
 * Path: /reviews
 * Method: POST
 */
reviewsRouter.post('/', CreateReviewSchema, wrapRequestHandler(createReview))

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
