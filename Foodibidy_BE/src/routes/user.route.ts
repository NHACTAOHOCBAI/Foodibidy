import { Router } from 'express'
import { createUser } from '~/controllers/user.controller'
import { wrapRequestHandler } from '~/utils/handler'
const usersRouter = Router()

/**
 * Description. Create a user
 * Path: /users
 * Method: POST
 * Body : { email: string, password: string , confirm_password:string, date_of_birth:string }
 */
usersRouter.post('/', wrapRequestHandler(createUser))
export default usersRouter
