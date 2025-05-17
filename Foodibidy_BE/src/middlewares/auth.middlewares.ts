const databaseService = require('../services/database.service')
import { Request, Response, NextFunction } from 'express'

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1]

    if (!token) return res.status(401).json({ message: 'Unauthorized' })

    try {
        const decodedToken = await databaseService.auth().verifyIdToken(token)
        req.user = decodedToken
        next()
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' })
    }
};

module.exports = authMiddleware;