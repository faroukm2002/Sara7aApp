import express from 'express'
import { dbConnection } from './database/dbConnection.js'
import userRouter from './src/modules/user/user.routes.js'
import dotenv from 'dotenv';
import messageRouter from './src/modules/message/message.routes.js';
import { globalError } from './src/middleware/globalErrorMiddleware.js';
import { AppError } from './src/utils/AppError.js';

const app = express()
const port = 3000
app.use(express.json())
dotenv.config(); 


app.use(userRouter)
app.use('/message',messageRouter)


dbConnection()

  // url error
  app.use("*", (req, res, next) => {
    next(new AppError(`invalid url ${req.originalUrl}`, 404));
  });

  // globalError
  app.use(globalError);

app.get('/', (req, res) => res.send('Welcome to SarahaApp'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))


