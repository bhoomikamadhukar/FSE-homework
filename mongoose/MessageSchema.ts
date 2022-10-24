import mongoose, { Schema } from "mongoose";
import Message from '../models/Message';
const MessageSchema = new mongoose.Schema<Message>({
  message:{type:String},
  sentFrom: {type: Schema.Types.ObjectId, ref: "UserModel"},
  sentTo: {type: Schema.Types.ObjectId, ref: "UserModel"},
  sentOn:{type: Date, default: Date.now}
}, {collection: 'messages'});
export default MessageSchema;
