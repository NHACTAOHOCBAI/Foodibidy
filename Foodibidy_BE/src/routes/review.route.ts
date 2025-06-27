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
import { authenticateFirebase, authorizeRole } from '~/middlewares/auth.middlewares'
import { UserRole } from '~/constants/enums'

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
reviewsRouter.get('/', authenticateFirebase,
  authorizeRole([UserRole.CUSTOMER, UserRole.RESTAURANT]), wrapRequestHandler(getAllReviews))

/**
 * Get a review by ID
 * Path: /reviews/:reviewId
 * Method: GET
 */
reviewsRouter.get('/:reviewId', authorizeRole([UserRole.CUSTOMER, UserRole.RESTAURANT]), wrapRequestHandler(getReview))

/**
 * Get a review by foodId
 * Path: /reviews/food/:foodId
 * Method: GET
 */
reviewsRouter.get('/food/:foodId', authorizeRole([UserRole.CUSTOMER, UserRole.RESTAURANT]), wrapRequestHandler(getReviewByFood))

/**
 * Update a review by ID
 * Path: /reviews/:reviewId
 * Method: PUT
 */
reviewsRouter.put('/:reviewId', authorizeRole([UserRole.CUSTOMER]), wrapRequestHandler(updateReview))

/**
 * Delete a review by ID
 * Path: /reviews/:reviewId
 * Method: DELETE
 */
reviewsRouter.delete('/:reviewId', authorizeRole([UserRole.CUSTOMER]), wrapRequestHandler(deleteReview))

export default reviewsRouter
