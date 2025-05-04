import express from 'express'
import usersRouter from './routes/user.route'
import cors from 'cors'
const app = express()

const port = 3000

app.use(cors())

app.use(express.json())
app.use('/users', usersRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
