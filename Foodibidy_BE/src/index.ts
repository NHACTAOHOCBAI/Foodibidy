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
import authRouter from '~/routes/auth.route'
import cookieParser from 'cookie-parser'

const app = express()
const allowedOrigins = ['http://localhost:5173']

const port = 3000
const corsOptions: CorsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true
}

app.use(cors(corsOptions))
app.use(express.json())
app.use(fileUpload())
app.use(cookieParser())

//routes
app.use('/api/v1/users', usersRouter)
app.use('/api/v1/categories', categoriesRouter)
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/restaurants', restaurantsRouter)
app.use('/api/v1/userDish', user_dishRouter)
app.use('/api/v1/carts', cartsRouter)
app.use('/api/v1/orders', ordersRouter)
app.use('/api/v1/dishes', dishesRouter)
app.use('/api/v1/reviews', reviewsRouter)
app.use('/api/v1/auth', authRouter)

// app.use('/api/v1/notifications', notificationsRouter)

//handle loi
app.use(defaultErrorHandler)

//
const listRoutes = (app: express.Application) => {
  console.log('>>>>>All registered routes:')
  app._router.stack.forEach((middleware: any) => {
    if (middleware.route) {
      // Route middleware
      const route = middleware.route
      const method = Object.keys(route.methods)[0].toUpperCase()
      console.log(`${method} ${route.path}`)
    } else if (middleware.name === 'router') {
      // Router middleware (for routes in separate files)
      middleware.handle.stack.forEach((handler: any) => {
        const route = handler.route
        if (route) {
          const method = Object.keys(route.methods)[0].toUpperCase()
          console.log(`${method} ${middleware.regexp} → ${route.path}`)
        }
      })
    }
  })
}

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
  // listRoutes(app)

  databaseService.connect()
})
