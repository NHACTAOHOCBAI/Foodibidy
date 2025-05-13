import { Request, Response, NextFunction } from 'express'

import { admin } from '../services/database.service'
exports.registerUser = async (req: Request, res: Response) => {
    const { email, password } = req.body
    try {
        const userRecord = await admin.auth().createUser({
            email,
            password
        });
        res.status(201).json({ message: 'User created successfully', userId: userRecord.uid });
    }
    catch (error) {
        res.status(400).json({ message: 'Error creating user', error });
    }
}

exports.loginUser = async (req: Request, res: Response) => {
    res.status(200).json({ message: 'User logged in successfully' });
}
exports.getUser = async (req: Request, res: Response) => {
    const { email } = req.body
    try {
        const userRecord = await admin.auth().getUserByEmail(email);
        res.status(200).json({ message: 'User logged in successfully', userId: userRecord.uid });
    }
    catch (error) {
        res.status(400).json({ message: 'Error logging in user', error });
    }
}
