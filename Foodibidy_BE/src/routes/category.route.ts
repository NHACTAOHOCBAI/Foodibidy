import { Router } from 'express'
import { wrapRequestHandler } from '~/utils/handler'
import {
  createCategory,
  getAllCategories,
  getCategory,
  updateCategory,
  deleteCategory,
  getAllCategoriesByRestaurantId
} from '~/controllers/category.controller'
import { CreateCategoryValidator } from '~/middlewares/category.middlewares'
import { authenticateFirebase, authorizeRole } from '~/middlewares/auth.middlewares'
import { UserRole } from '~/constants/enums'

const categoriesRouter = Router()

/**
 * Description. Create a category
 * Path: /categories
 * Method: POST
 */
categoriesRouter.post('/', authenticateFirebase,
  authorizeRole([UserRole.ADMIN, UserRole.RESTAURANT]), wrapRequestHandler(createCategory))

/**
 * Description. Get all categories
 * Path: /categories
 * Method: GET
 */
categoriesRouter.get('/', authenticateFirebase,
  authorizeRole([UserRole.ADMIN, UserRole.RESTAURANT, UserRole.CUSTOMER]), wrapRequestHandler(getAllCategories))

/**
 * Description. Get categories by restaurant
 * Path: /categories/restaurantId/:restaurantId
 * Method: GET
 */
categoriesRouter.get('/restaurantId/:restaurantId', authenticateFirebase,
  authorizeRole([UserRole.ADMIN, UserRole.RESTAURANT, UserRole.CUSTOMER]), wrapRequestHandler(getAllCategoriesByRestaurantId))

/**
 * Description. Get a category by ID
 * Path: /categories/:categoryId
 * Method: GET
 */
categoriesRouter.get('/:categoryId', authenticateFirebase,
  authorizeRole([UserRole.ADMIN, UserRole.RESTAURANT, UserRole.CUSTOMER]), wrapRequestHandler(getCategory))

/**
 * Description. Update a category by ID
 * Path: /categories/:categoryId
 * Method: PUT
 */
categoriesRouter.put('/:categoryId', authenticateFirebase,
  authorizeRole([UserRole.ADMIN, UserRole.RESTAURANT]), wrapRequestHandler(updateCategory))

/**
 * Description. Delete a category by ID
 * Path: /categories/:categoryId
 * Method: DELETE
 */
categoriesRouter.delete('/:categoryId', authenticateFirebase,
  authorizeRole([UserRole.ADMIN, UserRole.RESTAURANT]), wrapRequestHandler(deleteCategory))

export default categoriesRouter
