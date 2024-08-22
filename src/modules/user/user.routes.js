import express from 'express';
import { confirmEmail, signIn, signUp } from './user.controller.js';

const userRouter = express.Router();

userRouter.post('/signUp', signUp);
userRouter.post('/signIn', signIn);
userRouter.get('/confirmEmail/:token', confirmEmail);

export default userRouter;
