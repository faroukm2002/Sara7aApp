import { messageModel } from "../../../database/models/message.model.js"



const addMsg=async (req,res)=>{
    const {message,receivedId}=req.body
    await messageModel.insertMany({message,receivedId})

    res.json({message:"success"})

}

const getUserMsg=async (req,res)=>{
    const {receivedId}=req.body
    const message=await messageModel.find({receivedId:req.userId})
    res.json({message:"success",message})


}

export{
    addMsg,
    getUserMsg
}     