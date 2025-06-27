import { Router } from 'express'
import { wrapRequestHandler } from '~/utils/handler'
import {
  createRestaurant,
  getAllRestaurants,
  getRestaurant,
  updateRestaurant,
  deleteRestaurant
} from '~/controllers/restaurant.controller'
import { authenticateFirebase, authorizeRole } from '~/middlewares/auth.middlewares'
import { UserRole } from '~/constants/enums'
// import { CreateRestaurantSchema } from '~/middlewares/restaurant.middlewares'

const restaurantsRouter = Router()

/**
 * Create a new restaurant
 * Path: /restaurants
 * Method: POST
 */
restaurantsRouter.post('/',
  authenticateFirebase,
  authorizeRole([UserRole.ADMIN, UserRole.RESTAURANT]),
  wrapRequestHandler(createRestaurant)
)

/**
 * Get all restaurants (public)
 * Path: /restaurants
 * Method: GET
 */
restaurantsRouter.get('/', authenticateFirebase,
  authorizeRole([UserRole.ADMIN, UserRole.RESTAURANT, UserRole.CUSTOMER]),
  wrapRequestHandler(getAllRestaurants)
)

/**
 * Get a restaurant by ID (public)
 * Path: /restaurants/:restaurantId
 * Method: GET
 */
restaurantsRouter.get('/:restaurantId', authenticateFirebase,
  authorizeRole([UserRole.ADMIN, UserRole.RESTAURANT, UserRole.CUSTOMER]),
  wrapRequestHandler(getRestaurant)
)

/**
 * Update a restaurant by ID
 * Path: /restaurants/:restaurantId
 * Method: PUT
 * Roles allowed: ADMIN, RESTAURANT
 */
restaurantsRouter.put('/:restaurantId',
  authenticateFirebase,
  authorizeRole([UserRole.ADMIN, UserRole.RESTAURANT]),
  wrapRequestHandler(updateRestaurant)
)

/**
 * Delete a restaurant by ID
 * Path: /restaurants/:restaurantId
 * Method: DELETE
 * Roles allowed: ADMIN, RESTAURANT
 */
restaurantsRouter.delete('/:restaurantId',
  authenticateFirebase,
  authorizeRole([UserRole.ADMIN, UserRole.RESTAURANT]),
  wrapRequestHandler(deleteRestaurant)
)

export default restaurantsRouter