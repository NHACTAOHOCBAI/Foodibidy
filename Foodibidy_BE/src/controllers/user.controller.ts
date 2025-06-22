import { NextFunction, Request, Response } from 'express'
import { UploadedFile } from 'express-fileupload'
import { ParamsDictionary } from 'express-serve-static-core'
import { USER_MESSAGES } from '~/constants/messages'
import { CreateUserReqBody, GetProfileRequestParams, UpdateUserReqBody } from '~/models/requests/user.request'
import usersService from '~/services/user.service'

export const createUser = async (
  req: Request<ParamsDictionary, any, CreateUserReqBody>,
  res: Response,
  next: NextFunction
) => {
  try {
    const avatar = req.files?.avatar as UploadedFile

    // const address = JSON.parse(req.body.address as unknown as string)
    // console.log(address)
    const result = await usersService.createUser({
      ...req.body,
      // address,
      avatar
    })

    return res.status(201).json({ message: USER_MESSAGES.REGISTER_SUCCESS, data: result })
  } catch (error) {
    next(error)
  }
}

export const getUser = async (req: Request<GetProfileRequestParams>, res: Response, next: NextFunction) => {
  const result = await usersService.getUser(req.params.userId)
  return res.json({ message: USER_MESSAGES.GET_PROFILE_SUCCESS, data: result })
}

export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  const result = await usersService.getAllUsers()
  return res.json({ message: USER_MESSAGES.GET_ALL_PROFILE_SUCCESS, data: result })
}

export const updateUser = async (
  req: Request<GetProfileRequestParams, any, UpdateUserReqBody>,
  res: Response,
  next: NextFunction
) => {
  const result = await usersService.updateUser(req.params.userId, req.body)
  return res.json({ message: USER_MESSAGES.UPDATE_SUCCESS, data: result })
}

export const deleteUser = async (req: Request<GetProfileRequestParams>, res: Response, next: NextFunction) => {
  const result = await usersService.deleteUser(req.params.userId)
  return res.json({ message: USER_MESSAGES.DELETE_SUCCESS, data: result })
}
