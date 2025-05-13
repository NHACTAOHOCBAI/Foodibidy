import { Router } from 'express'
import { wrapRequestHandler } from '~/utils/handler'
import {
  createRestaurant,
  getAllRestaurants,
  getRestaurant,
  updateRestaurant,
  deleteRestaurant
} from '~/controllers/restaurant.controller'
// import { CreateRestaurantSchema } from '~/middlewares/restaurant.middlewares'

const restaurantsRouter = Router()

/**
 * Create a new restaurant
 * Path: /restaurants
 * Method: POST
 */
restaurantsRouter.post('/', wrapRequestHandler(createRestaurant))

/**
 * Get all restaurants
 * Path: /restaurants
 * Method: GET
 */
restaurantsRouter.get('/', wrapRequestHandler(getAllRestaurants))

/**
 * Get a restaurant by ID
 * Path: /restaurants/:restaurantId
 * Method: GET
 */
restaurantsRouter.get('/:restaurantId', wrapRequestHandler(getRestaurant))

/**
 * Update a restaurant by ID
 * Path: /restaurants/:restaurantId
 * Method: PUT
 */
restaurantsRouter.put('/:restaurantId', wrapRequestHandler(updateRestaurant))

/**
 * Delete a restaurant by ID
 * Path: /restaurants/:restaurantId
 * Method: DELETE
 */
restaurantsRouter.delete('/:restaurantId', wrapRequestHandler(deleteRestaurant))

export default restaurantsRouter
