import { Request, Response } from 'express'
import { auth } from '~/services/database.service'
import databaseService from '~/services/database.service'
import User, { UserType } from '~/models/schemas/user.schema'
import { UserRole } from '~/constants/enums'
import { CreateUserReqBody } from '~/models/requests/user.request'
import usersService from '~/services/user.service'
import { CreateRestaurantReqBody } from '~/models/requests/restaurant.request'
import restaurantService from '~/services/restaurant.service'

// Controller: Đăng ký người dùng
export const registerUser = async (req: Request, res: Response) => {
    try {
        // Chuyển đổi request body về đúng kiểu dữ liệu CreateUserReqBody
        const userData: CreateUserReqBody = {
            email: req.body.email,
            password: req.body.password,
            confirmPassword: req.body.confirmPassword, // nếu có validate confirmPassword
            fullName: req.body.fullName,
            // dateOfBirth: req.body.dateOfBirth,
            avatar: req.body.avatar,
            // address: req.body.address || []
        }

        // Gọi service để tạo user
        const newUserId = await usersService.createUser(userData)
        // tạo restaurantData từ user vừa được tạo 
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
        // Chuyển đổi request body về đúng kiểu dữ liệu CreateUserReqBody
        const userData: CreateUserReqBody = {
            email: req.body.accountInfo.email,
            password: req.body.accountInfo.password,
            confirmPassword: req.body.accountInfo.confirmPassword, // nếu có validate confirmPassword
            fullName: req.body.accountInfo.fullName,
            // dateOfBirth: req.body.dateOfBirth,
            avatar: req.body.accountInfo.avatar,
            // address: req.body.address || []
        }

        // Gọi service để tạo user
        const newUserId = await usersService.createRestaurantOwner(userData)

        // tạo restaurantData từ user vừa đồc tạo 
        const restaurantData: CreateRestaurantReqBody = {
            user: { id: newUserId, fullName: req.body.restaurantInfo.name, phoneNumber: req.body.restaurantInfo.phoneNumber },
            restaurantName: req.body.restaurantInfo.name,
            address: req.body.restaurantInfo.address,
            phoneNumber: req.body.restaurantInfo.phoneNumber,
            category: req.body.restaurantInfo.category,
            bio: req.body.restaurantInfo.bio,
        }

        const newRestaurantId = await restaurantService.createRestaurant(restaurantData)
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
// Controller: Lấy profile người dùng (sau khi xác thực Firebase token)
export const getProfile = async (req: Request, res: Response) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized' })
    }

    try {
        const userDoc = await databaseService.users.doc(req.user.uid).get()

        if (!userDoc.exists) {
            return res.status(404).json({ message: 'User profile not found in Firestore' })
        }

        const userData = userDoc.data()
        const user = new User(userData!).toObject()

        res.status(200).json(user)
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
