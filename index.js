import express from 'express'
import { dbConnection } from './database/dbConnection.js'
import userRouter from './src/modules/user/user.routes.js'
import dotenv from 'dotenv';
import messageRouter from './src/modules/message/message.routes.js';

const app = express()
const port = 3000
app.use(express.json())
dotenv.config(); 


app.use(userRouter)
app.use('/message',messageRouter)


dbConnection()
app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))