import express from 'express'
import bodyParser from 'body-parser'
import { userRouter } from './routes/user_routes.js'

const app = express()

const port = 3000

app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.urlencoded({ extended: false }))

app.use('/user', userRouter)

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Server is running on port localhost:${port}`)
})