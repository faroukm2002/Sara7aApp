import { messageModel } from "../../../database/models/message.model.js"
import { catchAsyncError } from "../../utils/catchAsyncError.js"



const addMsg=catchAsyncError(async (req,res)=>{
    const {message,receivedId}=req.body
    await messageModel.insertMany({message,receivedId})

    res.json({message:"success"})

})

const getUserMsg=catchAsyncError(async (req,res)=>{
    const message=await messageModel.find({receivedId:req.userId})
    res.json({message:"success",message})


})

export{
    addMsg,
    getUserMsg
}     