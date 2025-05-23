import { Router } from 'express'
import { createUser_Dish, deleteUser_Dish, getDishesByUserId } from '~/controllers/user_dish.controller'
import { wrapRequestHandler } from '~/utils/handler'
const user_dishRouter = Router()

/**
 * Description. Like a food
 * Path: /userDish
 * Method: POST
 * Body : { email: string, password: string , confirmPassword:string, dateOfBirth:string }
 */
user_dishRouter.post('/', wrapRequestHandler(createUser_Dish))

/**
 * Description. Get all dishes have userId
 * Path: /userDish/:userId
 * Method: GET
 */
user_dishRouter.get('/:userId', wrapRequestHandler(getDishesByUserId))

/**
 * Description. Delete a user
 * Path: /userDish/:userId
 * Method: Delete
 */
user_dishRouter.delete('/:userId', wrapRequestHandler(deleteUser_Dish))
export default user_dishRouter
