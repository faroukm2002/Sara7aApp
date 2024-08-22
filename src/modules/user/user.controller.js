import { userModel } from "../../../database/models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendEmail } from "../../emails/nodemailer.js";
import { catchAsyncError } from "../../utils/catchAsyncError.js";

const signUp = catchAsyncError(async (req, res) => {
    const { name, email, password, age } = req.body;
    const existingUser = await userModel.findOne({ email });
    if (existingUser) return res.json({ message: "Email already exists" });
    
    let hash = bcrypt.hashSync(password, parseInt(process.env.SALTROUND_KEY));
    const newUser = await userModel.create({ name, email, password: hash, age });

    let token = jwt.sign({ email: newUser.email }, process.env.JWT_KEY);
    const link = `${process.env.BASEURL}/confirmEmail/${token}`;
    await sendEmail({ email, link });

    res.json({ message: "Success, please verify your email" });
})

const signIn=catchAsyncError(async(req,res)=>{
    const  {email,password} = req.body;
    const user =await  userModel.findOne({email})
    if(user && bcrypt.compareSync(password,user.password)) {
        let token=jwt.sign({name:user.name,userId:user._id},process.env.JWT_KEY)
        return   res.json({message:"Success",token:token})
     } 
     res.json({message:"incorrect password or email"})
 
    }  )

const confirmEmail = catchAsyncError(async (req, res) => {
    const { token } = req.params;
    
    jwt.verify(token, process.env.JWT_KEY, async (err, decoded) => {
        if (err) {
            return res.json({ message: "Invalid token", error: err });
        }
        
        const email = decoded.email;
        await userModel.findOneAndUpdate({ email }, { verified: true }, { new: true });
        
        
            res.json({ message: "success"});
    });
})

export {
    signUp,
    signIn,
    confirmEmail
};
