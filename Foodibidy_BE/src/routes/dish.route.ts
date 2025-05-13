import { Router } from 'express'
import { createDish, deleteDish, getAllDishes, getDish, updateDish } from '~/controllers/dish.controller'
import { wrapRequestHandler } from '~/utils/handler'
const dishesRouter = Router()

/**
 * Description. Create a dishe
 * Path: /dishes
 * Method: POST
 * Body : { email: string, password: string , confirm_password:string, date_of_birth:string }
 */
dishesRouter.post('/', wrapRequestHandler(createDish))

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
 * Body : {role_id?: dishRole email?: string, name?: string, phone_number?: string, date_of_birth?: string, avatar_url?: string }
 */
dishesRouter.put('/:dishId', wrapRequestHandler(updateDish))

/**
 * Description. Delete a dish
 * Path: /dishs/:dishId
 * Method: Delete
 */
dishesRouter.delete('/:dishId', wrapRequestHandler(deleteDish))
export default dishesRouter
