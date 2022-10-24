import mongoose from "mongoose";
import BookmarkSchema from "./BookmarkSchema";
const BookmarkModel = mongoose.model('BookmarkSchema', BookmarkSchema);
export default BookmarkModel;
