/**
 * @file Implements the model that
 * uses dislikes schema in the dislikes collection
 */
import mongoose from "mongoose";
import DislikeSchema from "./DislikeSchema";
/**
 * @typedef DislikeModel is the implementation of Dislike model in mongoose
 */
const DislikeModel = mongoose.model('DislikeSchema', DislikeSchema);
export default DislikeModel;
