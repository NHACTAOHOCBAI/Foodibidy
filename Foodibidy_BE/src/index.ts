import express from 'express'
import usersRouter from './routes/user.route'
import cors, { CorsOptions } from 'cors'
import databaseService from './services/database.service'
import usersService from './services/user.service'
import { defaultErrorHandler } from './middlewares/error.middlewares'
import categoriesRouter from './routes/category.route'
import authRoutes from './routes/auth.route'
import restaurantsRouter from './routes/restaurant.route'
import addressesRouter from './routes/address.route'
import cartsRouter from './routes/cart.route'
import ordersRouter from './routes/order.route'
import dishesRouter from './routes/dish.route'
import reviewsRouter from './routes/review.route'
import notificationsRouter from './routes/notification.route'
const app = express()

const port = 3000
const corsOptions: CorsOptions = {
  origin: '*'
}

app.use(cors(corsOptions))
app.use(express.json())

//routes
app.use('/users', usersRouter)
app.use('/categories', categoriesRouter)
app.use('/api/auth', authRoutes);
app.use('/restaurants', restaurantsRouter)
// app.use('/addresses', addressesRouter)
// app.use('/carts', cartsRouter)
// app.use('/orders', ordersRouter)
app.use('/dishes', dishesRouter)
// app.use('/reviews', reviewsRouter)
// app.use('/notifications', notificationsRouter)

//handle loi
app.use(defaultErrorHandler)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
  databaseService.connect()
})
