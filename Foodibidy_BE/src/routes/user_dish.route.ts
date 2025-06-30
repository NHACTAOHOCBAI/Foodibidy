import { Router } from 'express'
import { UserRole } from '~/constants/enums'
import { checkLikeDish, createUser_Dish, deleteUser_Dish, getDishesByUserId } from '~/controllers/user_dish.controller'
import { authenticateFirebase, authorizeRole } from '~/middlewares/auth.middlewares'
import { wrapRequestHandler } from '~/utils/handler'
const user_dishRouter = Router()

/**
 * Description. add or delete favorite food
 * Path: /userDish
 * Method: POST
 * Body : {userId: string,dishId: string  }
 */
user_dishRouter.post('/', wrapRequestHandler(createUser_Dish))

/**
 * Description.check a dish is in favorite list or not
 * Path: /userDish/checkDish
 * Method: POST
 * Body : {userId: string,dishId: string  }
 */
user_dishRouter.post('/checkDish', wrapRequestHandler(checkLikeDish))

/**
 * Description. Get all dishes have userId
 * Path: /userDish/:userId
 * Method: GET
 */
user_dishRouter.get(
  '/',
  authenticateFirebase,
  authorizeRole([UserRole.CUSTOMER]),
  wrapRequestHandler(getDishesByUserId)
)

/**
 * Description. Delete a favorite dish
 * Path: /userDish/:userId
 * Method: Delete
 */
user_dishRouter.delete('/:userId', wrapRequestHandler(deleteUser_Dish))
export default user_dishRouter
