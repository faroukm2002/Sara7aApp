import express from 'express'
import { dbConnection } from './database/dbConnection.js'
import userRouter from './src/modules/user/user.routes.js'
import dotenv from 'dotenv';

const app = express()
const port = 3000
app.use(express.json())
dotenv.config(); 


app.use(userRouter)
dbConnection()
app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))