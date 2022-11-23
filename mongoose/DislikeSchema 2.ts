/**
 * @file Implements schema for likes collection
 */
import mongoose, { Schema } from "mongoose";
import Dislike from '../models/Dislike';
/**
 * @typedef LikeSchema is the Likes Schema in mongoose
 * @property {Tuit} tuit tuit being liked
 * @property {User} likedBy user who likes the tuits
 */
const DislikeSchema = new mongoose.Schema<Dislike>({
  tuit: {type: Schema.Types.ObjectId, ref: "TuitModel"},
  dislikedBy: {type: Schema.Types.ObjectId, ref: "UserModel"},
}, {collection: 'dislikes'});
export default DislikeSchema;
