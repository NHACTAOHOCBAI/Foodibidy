import { Request, Response } from 'express'
import { auth } from '~/services/database.service'
import databaseService from '~/services/database.service'
import User, { UserType } from '~/models/schemas/user.schema'
import { UserRole } from '~/constants/enums'

// Controller: Đăng ký người dùng
export const registerUser = async (req: Request, res: Response) => {
    const { email, password, fullName, dateOfBirth, phoneNumber, avatar } = req.body

    try {
        // Tạo user trên Firebase Authentication
        const userRecord = await auth.createUser({
            email,
            password,
            displayName: fullName,
            photoURL: avatar,
            phoneNumber
        })

        // Tạo user object lưu vào Firestore
        const newUser: UserType = {
            id: userRecord.uid,
            fullName,
            email,
            passwordHash: '', // Firebase đã quản lý password
            role: UserRole.CUSTOMER,
            dateOfBirth,
            phoneNumber,
            avatar,
            address: [],
            cartId: '',
            createdAt: new Date(),
            updatedAt: new Date()
        }

        await databaseService.users.doc(userRecord.uid).set(newUser)

        res.status(201).json({ message: 'User created successfully', userId: userRecord.uid })
    } catch (error) {
        console.error('Error creating user:', error)
        res.status(400).json({ message: 'Error creating user', error })
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
// Trong controllers/auth.controller.ts


