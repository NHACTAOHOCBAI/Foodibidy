import { Router } from 'express'
import { UserRole } from '~/constants/enums'
import {
  createDish,
  deleteDish,
  getAllDishes,
  getDish,
  getDishesByCategoryId,
  getDishesByRestaurantId,
  getMyDishes,
  updateDish
} from '~/controllers/dish.controller'
import { authenticateFirebase, authorizeRole } from '~/middlewares/auth.middlewares'
import { wrapRequestHandler } from '~/utils/handler'
const dishesRouter = Router()

/**
 * Description. Create a dishes
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
 * Description. Get all dishes have restaurantId
 * Path: /dishes/myDishes
 * Method: GET
 */
dishesRouter.get(
  '/myDishes',
  authenticateFirebase,
  authorizeRole([UserRole.ADMIN, UserRole.RESTAURANT]),
  wrapRequestHandler(getMyDishes)
)

/**
 * Description. Get a dish
 * Path: /dishes/:dishId
 * Method: GET
 */
dishesRouter.get('/:dishId', wrapRequestHandler(getDish))

/**
 * Description. Get all dishes
 * Path: /dishes
 * Method: GET
 */
dishesRouter.get('/', wrapRequestHandler(getAllDishes))

/**
 * Description. Update a dish
 * Path: /dishes/:dishId
 * Method: PUT
 * Body : {roleId?: dishRole email?: string, name?: string, phoneNumber?: string, dateOfBirth?: string, avatar?: string }
 */
dishesRouter.put('/:dishId', wrapRequestHandler(updateDish))

/**
 * Description. Delete a dish
 * Path: /dishes/:dishId
 * Method: Delete
 */
dishesRouter.delete('/:dishId', wrapRequestHandler(deleteDish))
export default dishesRouter
