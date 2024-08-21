import { userModel } from "../../../database/models/user.model.js";
import bcrypt from "bcrypt" 
  import jwt from "jsonwebtoken"


 const signUp=async(req,res)=>{
    const  {name,email,password,age} = req.body;
    const user =await  userModel.findOne({email})
    if(user) return res.json({message:"email already Exists"})
    let hash=bcrypt.hashSync(password,parseInt(process.env.SALTROUND_KEY))  
    await userModel.insertMany({name,email,password:hash,age})
    res.json({message:"success"})
    
    }  

    const signIn=async(req,res)=>{
        const  {email,password} = req.body;
        const user =await  userModel.findOne({email})
        if(user && bcrypt.compareSync(password,user.password)) {
            let token=jwt.sign({name:user.name,userId:user._id},process.env.SECRET_KEY)
            return   res.json({message:"Success",token:token})
         } 
         res.json({message:"incorrect password or email"})
     
        }  

        export {
            signUp,
            signIn,
        }