import { Router } from 'express'
import { UserRole } from '~/constants/enums'
import { getAdminDashboard, getRestaurantDashboard } from '~/controllers/Dashboard.controller'
import { authenticateFirebase, authorizeRole } from '~/middlewares/auth.middlewares'
import { wrapRequestHandler } from '~/utils/handler'
const dashboardRouter = Router()

dashboardRouter.get('/admin-dashboard', wrapRequestHandler(getAdminDashboard))

dashboardRouter.get('/restaurant-dashboard', authenticateFirebase, wrapRequestHandler(getRestaurantDashboard))


export default dashboardRouter