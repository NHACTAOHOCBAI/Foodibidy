import { Router } from 'express'
import {
  createDish,
  deleteDish,
  getAllDishes,
  getDish,
  getDishesByCategoryId,
  getDishesByRestaurantId,
  updateDish
} from '~/controllers/dish.controller'
import { wrapRequestHandler } from '~/utils/handler'
const dishesRouter = Router()

/**
 * Description. Create a dishe
 * Path: /dishes
 * Method: POST
 * Body : { email: string, password: string , confirmPassword:string, dateOfBirth:string }
 */
dishesRouter.post('/', wrapRequestHandler(createDish))

/**
 * Description. Get all dishes have categoryId
 * Path: /dishes/category/:categoryId
 * Method: GET
 */
dishesRouter.get('/category/:categoryId', wrapRequestHandler(getDishesByCategoryId))

/**
 * Description. Get all dishes have restaurantId
 * Path: /dishes/restaurant/:restaurantId
 * Method: GET
 */
dishesRouter.get('/restaurant/:restaurantId', wrapRequestHandler(getDishesByRestaurantId))

/**
 * Description. Get a dish
 * Path: /dishs/:dishId
 * Method: GET
 */
dishesRouter.get('/:dishId', wrapRequestHandler(getDish))

/**
 * Description. Get all dishs
 * Path: /dishs
 * Method: GET
 */
dishesRouter.get('/', wrapRequestHandler(getAllDishes))

/**
 * Description. Update a dish
 * Path: /dishs/:dishId
 * Method: PUT
 * Body : {roleId?: dishRole email?: string, name?: string, phoneNumber?: string, dateOfBirth?: string, avatar?: string }
 */
dishesRouter.put('/:dishId', wrapRequestHandler(updateDish))

/**
 * Description. Delete a dish
 * Path: /dishs/:dishId
 * Method: Delete
 */
dishesRouter.delete('/:dishId', wrapRequestHandler(deleteDish))
export default dishesRouter
