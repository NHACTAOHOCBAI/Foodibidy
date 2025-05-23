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

const categoriesRouter = Router()

/**
 * Description. Create a category
 * Path: /categories
 * Method: POST
 */
categoriesRouter.post('/', CreateCategoryValidator, wrapRequestHandler(createCategory))

/**
 * Description. Get all categories
 * Path: /categories
 * Method: GET
 */
categoriesRouter.get('/', wrapRequestHandler(getAllCategories))

/**
 * Description. Get categories by restaurant
 * Path: /categories/restaurantId/:restaurantId
 * Method: GET
 */
categoriesRouter.get('/restaurantId/:restaurantId', wrapRequestHandler(getAllCategoriesByRestaurantId))

/**
 * Description. Get a category by ID
 * Path: /categories/:categoryId
 * Method: GET
 */
categoriesRouter.get('/:categoryId', wrapRequestHandler(getCategory))

/**
 * Description. Update a category by ID
 * Path: /categories/:categoryId
 * Method: PUT
 */
categoriesRouter.put('/:categoryId', wrapRequestHandler(updateCategory))

/**
 * Description. Delete a category by ID
 * Path: /categories/:categoryId
 * Method: DELETE
 */
categoriesRouter.delete('/:categoryId', wrapRequestHandler(deleteCategory))

export default categoriesRouter
