import mongoose from "mongoose";



export const dbConnection=()=>{
    mongoose.connect('mongodb://127.0.0.1:27017/SarahaApp_week7')
    .then(()=>{
        console.log("database connection")
    }).catch((err)=>{
        console.log("error connecting")
    });
} 
 