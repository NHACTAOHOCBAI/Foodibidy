import { Router } from 'express'
import {
  loginUser,
  refreshToken,
  registerUser,
  getProfile,
  logoutUser,
  registerRestaurantOwner,
  updateProfile,
  updateMyRes
} from '~/controllers/auth.controller'
import { authenticateFirebase } from '~/middlewares/auth.middlewares'

const router = Router()
router.post('/login', loginUser)
router.post('/refresh', refreshToken)
router.post('/register', registerUser)
router.get('/profile', authenticateFirebase, getProfile)
router.put('/profile', authenticateFirebase, updateProfile)
router.put('/profile/myRes', authenticateFirebase, updateMyRes)
router.post('/logout', authenticateFirebase, logoutUser)
router.post('/registerRestaurantOwner', registerRestaurantOwner)

export default router
