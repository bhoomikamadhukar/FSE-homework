import mongoose from "mongoose";
import LikeSchema from "./LikeSchema";
const LikeModel = mongoose.model('LikeSchema', LikeSchema);
export default LikeModel;
