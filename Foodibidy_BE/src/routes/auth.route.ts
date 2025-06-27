import { Router } from 'express'
import {
  registerUser,
  getProfile,
  logoutUser,
  registerRestaurantOwner,
  updateProfile
} from '~/controllers/auth.controller'
import { authenticateFirebase } from '~/middlewares/auth.middlewares'

const router = Router()

router.post('/register', registerUser)
router.get('/profile', authenticateFirebase, getProfile)
router.put('/profile', authenticateFirebase, updateProfile)
router.post('/logout', authenticateFirebase, logoutUser)
router.post('/registerRestaurantOwner', registerRestaurantOwner)

export default router
