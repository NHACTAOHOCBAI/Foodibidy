import { Router } from 'express'
import { createUser, deleteUser, getAllUsers, getUser, updateUser } from '~/controllers/user.controller'
import { wrapRequestHandler } from '~/utils/handler'
const usersRouter = Router()

/**
 * Description. Create a user
 * Path: /users
 * Method: POST
 * Body : { email: string, password: string , confirm_password:string, date_of_birth:string }
 */
usersRouter.post('/', wrapRequestHandler(createUser))

/**
 * Description. Get a user
 * Path: /users/:userId
 * Method: GET
 */
usersRouter.get('/:userId', wrapRequestHandler(getUser))

/**
 * Description. Get all users
 * Path: /users
 * Method: GET
 */
usersRouter.get('/', wrapRequestHandler(getAllUsers))

/**
 * Description. Update a user
 * Path: /users/:userId
 * Method: PUT
 * Body : {role_id?: UserRole email?: string, name?: string, phone_number?: string, date_of_birth?: string, avatar_url?: string }
 */
usersRouter.put('/:userId', wrapRequestHandler(updateUser))

/**
 * Description. Delete a user
 * Path: /users/:userId
 * Method: Delete
 */
usersRouter.delete('/:userId', wrapRequestHandler(deleteUser))
export default usersRouter
