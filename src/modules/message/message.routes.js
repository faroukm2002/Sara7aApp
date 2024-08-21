
import express from 'express';
import { addMsg, getUserMsg } from './message.controller.js';


 const messageRouter=express.Router();
    messageRouter.post('/',addMsg)
    messageRouter.get('/',getUserMsg)


 export default messageRouter 