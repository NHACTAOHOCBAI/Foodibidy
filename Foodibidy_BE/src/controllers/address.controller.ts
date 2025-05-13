import { Request, Response, NextFunction } from 'express'
import { ADDRESS_MESSAGES } from '~/constants/messages'
import { CreateAddressReqBody, AddressParams } from '~/models/requests/address.request'
import { addressService } from '~/services/address.service'

export const createAddress = async (
  req: Request<any, any, CreateAddressReqBody>,
  res: Response,
  next: NextFunction
) => {
  const result = await addressService.createAddress(req.body)
  return res.json({ message: ADDRESS_MESSAGES.CREATE_SUCCESS, data: result })
}

export const getAddress = async (req: Request<AddressParams>, res: Response, next: NextFunction) => {
  const result = await addressService.getAddress(req.params.addressId)
  return res.json({ message: ADDRESS_MESSAGES.GET_SUCCESS, data: result })
}

export const getAllAddresses = async (req: Request, res: Response, next: NextFunction) => {
  const result = await addressService.getAllAddresses()
  return res.json({ message: ADDRESS_MESSAGES.GET_ALL_SUCCESS, data: result })
}

export const updateAddress = async (
  req: Request<AddressParams, any, Partial<CreateAddressReqBody>>,
  res: Response,
  next: NextFunction
) => {
  const result = await addressService.updateAddress(req.params.addressId, req.body)
  return res.json({ message: ADDRESS_MESSAGES.UPDATE_SUCCESS, data: result })
}

export const deleteAddress = async (req: Request<AddressParams>, res: Response, next: NextFunction) => {
  const result = await addressService.deleteAddress(req.params.addressId)
  return res.json({ message: ADDRESS_MESSAGES.DELETE_SUCCESS, data: result })
}
