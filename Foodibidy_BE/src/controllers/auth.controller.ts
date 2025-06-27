import { Request, Response } from 'express'
import { auth } from '~/services/database.service'
import databaseService from '~/services/database.service'
import User, { UserType } from '~/models/schemas/user.schema'
import { UserRole } from '~/constants/enums'
import {
  accountInfo,
  CreateRestaurantOwnerReqBody,
  CreateUserReqBody,
  restaurantInfo
} from '~/models/requests/user.request'
import usersService from '~/services/user.service'
import { CreateRestaurantReqBody } from '~/models/requests/restaurant.request'
import restaurantService from '~/services/restaurant.service'
import { UploadedFile } from 'express-fileupload'
import console from 'console'

// Controller: Đăng ký người dùng
export const registerUser = async (req: Request, res: Response) => {
  try {
    const userData: CreateUserReqBody = {
      email: req.body.email,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
      fullName: req.body.fullName
    }

    // Gọi service để tạo user
    const newUserId = await usersService.createUser(userData)

    res.status(201).json({
      message: 'User created successfully',
      userId: newUserId
    })
  } catch (error) {
    console.error('Error creating user:', error)
    res.status(400).json({
      message: 'Error creating user',
      error: error instanceof Error ? error.message : error
    })
  }
}
// Controller: Đăng ký chủ nhà hàng
export const registerRestaurantOwner = async (req: Request, res: Response) => {
  try {
    const account: accountInfo = JSON.parse(req.body.account)
    const restaurant: restaurantInfo = JSON.parse(req.body.restaurant)

    const userData: CreateUserReqBody = {
      email: account.email,
      password: account.password,
      confirmPassword: account.confirmPassword,
      fullName: account.fullName
    }

    const newUserId = await usersService.createUser({ ...userData, role: UserRole.RESTAURANT })

    const restaurantData: CreateRestaurantReqBody = {
      user: { id: newUserId, fullName: account.fullName, phoneNumber: restaurant.phoneNumber },
      restaurantName: restaurant.restaurantName,
      address: restaurant.address,
      phoneNumber: restaurant.phoneNumber,
      category: restaurant.category,
      bio: restaurant.bio
    }

    const newRestaurantId = await restaurantService.createRestaurant(restaurantData)

    res.status(201).json({
      message: 'Restaurant Owner created successfully',
      userId: newUserId,
      restaurantId: newRestaurantId
    })
  } catch (error) {
    console.error('Error creating user:', error)
    res.status(400).json({
      message: 'Error creating user',
      error: error instanceof Error ? error.message : error
    })
  }
}

// Controller: Lấy profile người dùng (sau khi xác thực Firebase token)
export const getProfile = async (req: Request, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  try {
    const userDoc = await databaseService.users.doc(req.user.uid).get()

    if (!userDoc.exists) {
      return res.status(404).json({ message: 'User profile not found' })
    }

    const userData = userDoc.data()
    const user = new User(userData!).toObject()

    res.status(200).json(user)
  } catch (error) {
    console.error('Error getting user profile:', error)
    res.status(500).json({ message: 'Error getting user profile', error })
  }
}

export const updateProfile = async (req: Request, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  try {
    const userDoc = await databaseService.users.doc(req.user.uid).get()

    if (!userDoc.exists) {
      return res.status(404).json({ message: 'User profile not found' })
    }
    const avatar = req.files?.avatar as UploadedFile
    const address = JSON.parse(req.body.address as unknown as string)
    usersService.updateUser(req.user.uid, { ...req.body, address, avatar: avatar })
    res.status(200).json({
      message: 'Update my profile successfully',
      userId: req.user.uid
    })
  } catch (error) {
    console.error('Error getting user profile:', error)
    res.status(500).json({ message: 'Error getting user profile', error })
  }
}

// Logout Controller
export const logoutUser = async (req: Request, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  try {
    await auth.revokeRefreshTokens(req.user.uid)
    res.status(200).json({ message: 'Logout successful. Tokens revoked.' })
  } catch (error) {
    console.error('Error during logout:', error)
    res.status(500).json({ message: 'Error during logout', error })
  }
}
