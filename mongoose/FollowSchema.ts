import mongoose, { Schema } from "mongoose";
import Follow from '../models/Follow';
const FollowSchema = new mongoose.Schema<Follow>({
  followedBy: {type: Schema.Types.ObjectId, ref: "UserModel"},
  currUser: {type: Schema.Types.ObjectId, ref: "UserModel"},
}, {collection: 'follows'});
export default FollowSchema;
