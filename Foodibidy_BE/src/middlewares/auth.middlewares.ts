import { Request, Response, NextFunction } from 'express'
import { auth } from '~/services/database.service'
import { DecodedIdToken } from 'firebase-admin/auth'

// Extend Request để có thêm user
declare global {
    namespace Express {
        interface Request {
            user?: DecodedIdToken
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
        const decodedToken = await auth.verifyIdToken(idToken)
        req.user = decodedToken  // Gán luôn nguyên object verifyIdToken
        next()
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token', error })
    }
}
