import { Schema, SchemaTypes, model } from "mongoose";

const messageSchema = new Schema({
  message: {
    type: String,
    required: true,
  },

  receivedId:SchemaTypes.ObjecytId
  
},{timestamps: true});

export const messageModel=model('message',messageSchema)