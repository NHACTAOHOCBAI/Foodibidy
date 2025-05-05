import express from 'express'
import usersRouter from './routes/user.route'
import cors from 'cors'
import databaseService from './services/database.service'
import usersService from './services/user.service'
import { defaultErrorHandler } from './middlewares/error.middlewares'
const app = express()

const port = 3000

app.use(cors())

app.use(express.json())
app.use('/users', usersRouter)

//handle loi
app.use(defaultErrorHandler)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
  databaseService.connect()
})
