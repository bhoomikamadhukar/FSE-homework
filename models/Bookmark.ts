import User from "./User";
import Tuit from "./Tuit"

export default interface Bookmark {
    bookmarkedBy: User,
    bookmarkedTuit: Tuit
};
