import { Router } from 'express'
import { UserRole } from '~/constants/enums'
import { checkLikeDish, updateUser_Dish, deleteUser_Dish, getDishesByUserId } from '~/controllers/user_dish.controller'
import { authenticateFirebase, authorizeRole } from '~/middlewares/auth.middlewares'
import { wrapRequestHandler } from '~/utils/handler'
const user_dishRouter = Router()

/**
 * Description. add or delete favorite food
 * Path: /userDish
 * Method: POST
 * Body : {userId: string,dishId: string  }
 */
user_dishRouter.post('/', authenticateFirebase, authorizeRole([UserRole.CUSTOMER]), wrapRequestHandler(updateUser_Dish))

/**
 * Description.check a dish is in favorite list or not
 * Path: /userDish/checkDish
 * Method: POST
 * Body : {userId: string,dishId: string  }
 */
user_dishRouter.post(
  '/checkDish',
  authenticateFirebase,
  authorizeRole([UserRole.CUSTOMER]),
  wrapRequestHandler(checkLikeDish)
)

/**
 * Description. Get all dishes have userId
 * Path: /userDish/myFavoriteDishes
 * Method: GET
 */

user_dishRouter.get(
  '/myFavoriteDishes',
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
