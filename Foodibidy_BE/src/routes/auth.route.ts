const express = require('express')
const authMiddleware = require('../middlewares/auth.middlewares')
const { registerUser, loginUser, getUser } = require('../controllers/auth.controller')

const router = express.Router()

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/user', authMiddleware, getUser)

export default router;