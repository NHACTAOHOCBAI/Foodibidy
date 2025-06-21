import { Router } from 'express'
import { registerUser, getProfile } from '~/controllers/auth.controller'
import { authenticateFirebase } from '~/middlewares/auth.middlewares'

const router = Router()

router.post('/register', registerUser)
router.get('/profile', authenticateFirebase, getProfile)

export default router
