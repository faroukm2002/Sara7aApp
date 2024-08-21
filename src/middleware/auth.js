
 import jwt from 'jsonwebtoken';
export const auth =(req,res,next) => {
    let token=req.header('token')
     jwt.verify(token,process.env.JWT_KEY ,async(err,decoded)=>{
        if(err) return res.json({message:"error in token or not provided token"})
            req.userId=decoded.userId
        next()
    })

}