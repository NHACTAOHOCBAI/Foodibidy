import cors, { CorsOptions } from 'cors'
import express from 'express'
import fileUpload from 'express-fileupload'
import { defaultErrorHandler } from './middlewares/error.middlewares'
import authRoutes from './routes/auth.route'
import cartsRouter from './routes/cart.route'
import categoriesRouter from './routes/category.route'
import dishesRouter from './routes/dish.route'
import ordersRouter from './routes/order.route'
import restaurantsRouter from './routes/restaurant.route'
import reviewsRouter from './routes/review.route'
import usersRouter from './routes/user.route'
import user_dishRouter from './routes/user_dish.route'
import databaseService from './services/database.service'
const app = express()

const port = 4000
const corsOptions: CorsOptions = {
  origin: '*'
}

app.use(cors(corsOptions))
app.use(express.json())
app.use(fileUpload())

//routes
app.use('/api/v1/users', usersRouter)
app.use('/api/v1/categories', categoriesRouter)
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/restaurants', restaurantsRouter)
app.use('/api/v1/userDish', user_dishRouter)
// app.use('/api/v1/addresses', addressesRouter)
app.use('/api/v1/carts', cartsRouter)
app.use('/api/v1/orders', ordersRouter)
app.use('/api/v1/dishes', dishesRouter)
app.use('/api/v1/reviews', reviewsRouter)

// app.use('/api/v1/notifications', notificationsRouter)

//handle loi
app.use(defaultErrorHandler)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
  databaseService.connect()
})
