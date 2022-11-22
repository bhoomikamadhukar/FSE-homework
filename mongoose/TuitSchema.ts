/**
 * @file Implements schema for tuits collection
 */
import mongoose from "mongoose";
/**
 * @typedef TuitSchema is the Tuit Schema in mongoose
 * @property {string} tuit tuit being broadcast
 * @property {User} postedBy user who posted the Tuit
 * @property {Date} postedOn time the Tuit was posted
 */
const TuitSchema = new mongoose.Schema({
    tuit: {type: String, required: true},
    postedBy: {type: mongoose.Schema.Types.ObjectId, ref: "UserModel", required: true},
    postedOn: {type: Date, default: Date.now},
    stats: {
    replies: {type: Number, default: 0},
    retuits: {type: Number, default: 0},
    likes: {type: Number, default: 0},
    dislikes: {type: Number, default: 0},
  }
}, {collection: 'tuits'});
export default TuitSchema;
