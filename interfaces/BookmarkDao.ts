import Bookmark from "../models/Bookmark";
import User from "../models/User";
import Tuit from "../models/Tuit"

export default interface BookmarkDaoI {
    userBookmarksTuit(uid: string, tid: string):Promise<any>;
    userRemovesBookmarkTuit(uid:string, tid:string):Promise<any>;
    findAllTuitsBookmarkedByUser(uid:string):Promise<Bookmark[]>;
    findAllUsersThatBookmarkedTuit(tid:string):Promise<Bookmark[]>;
}
