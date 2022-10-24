import mongoose from "mongoose";
import MessageSchema from "./MessageSchema";
const MessageModel = mongoose.model('MessageSchema', MessageSchema);
export default MessageModel;
