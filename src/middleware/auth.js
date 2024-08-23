 import jwt from 'jsonwebtoken';
 import { AppError } from '../utils/AppError.js';
 export const auth =(req,res,next) => {
     let token=req.header('token')
     if (!token || !token.startsWith('Bearer ')) {
        return next(new AppError("Token is required or invalid bearer key", 401));
    }

   // Remove 'Bearer ' prefix from the token
    const actualToken = token.split(' ')[1]; 

      jwt.verify(actualToken,process.env.JWT_KEY ,async(err,decoded)=>{
         if(err) return res.json({message:"error in token or not provided token"})
             req.userId=decoded.userId
         next()
     })
 
 }