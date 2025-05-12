import { Router } from 'express'
import { wrapRequestHandler } from '~/utils/handler'
import {
  createAddress,
  getAllAddresses,
  getAddress,
  updateAddress,
  deleteAddress
} from '~/controllers/address.controller'

const addressesRouter = Router()

/**
 * Create a new address
 * Path: /addresses
 * Method: POST
 */
addressesRouter.post('/', wrapRequestHandler(createAddress))

/**
 * Get all addresses
 * Path: /addresses
 * Method: GET
 */
addressesRouter.get('/', wrapRequestHandler(getAllAddresses))

/**
 * Get an address by ID
 * Path: /addresses/:addressId
 * Method: GET
 */
addressesRouter.get('/:addressId', wrapRequestHandler(getAddress))

/**
 * Update an address by ID
 * Path: /addresses/:addressId
 * Method: PUT
 */
addressesRouter.put('/:addressId', wrapRequestHandler(updateAddress))

/**
 * Delete an address by ID
 * Path: /addresses/:addressId
 * Method: DELETE
 */
addressesRouter.delete('/:addressId', wrapRequestHandler(deleteAddress))

export default addressesRouter
