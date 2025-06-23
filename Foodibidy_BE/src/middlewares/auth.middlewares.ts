import { Request, Response, NextFunction } from 'express'
import { admin, auth } from '~/services/database.service'
import { DecodedIdToken } from 'firebase-admin/auth'

// Extend Request để có thêm user
declare global {
    namespace Express {
        interface Request {
            user?: {
                uid: string
                email?: string
                role: string
            }
        }
    }
}

export const authenticateFirebase = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'No token provided' })
    }

    const idToken = authHeader.split(' ')[1]

    try {
        const decodedToken = await auth.verifyIdToken(idToken, true)  // <-- bật kiểm tra revoked
        console.log(decodedToken.uid)
        const userDoc = await admin.firestore().collection('Users').doc(decodedToken.uid).get()
        //  xuat ra thong tin user
        if (!userDoc.exists) {
            return res.status(401).json({ message: 'User not found' })
        }
        const userData = userDoc.data()
        req.user = {
            ...decodedToken,
            role: userData?.role || 'USER'
        } as DecodedIdToken
        next()
    } catch (error) {
        return res.status(401).json({ message: 'Invalid or revoked token', error })
    }
}

// Middleware phân quyền theo role
export const authorizeRole = (allowedRoles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!req.user) {
            return res.status(401).json({ message: 'Unauthorized' })
        }
        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Forbidden: Access denied' })
        }
        next()
    }
}
