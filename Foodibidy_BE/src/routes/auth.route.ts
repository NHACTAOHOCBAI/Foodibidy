import { Router } from 'express'
import { registerUser, getProfile, logoutUser, registerRestaurantOwner } from '~/controllers/auth.controller'
import { authenticateFirebase } from '~/middlewares/auth.middlewares'

const router = Router()

router.post('/register', registerUser)
router.get('/profile', authenticateFirebase, getProfile)
router.post('/logout', authenticateFirebase, logoutUser)
router.post('/registerRestaurantOwner', registerRestaurantOwner)

export default router
