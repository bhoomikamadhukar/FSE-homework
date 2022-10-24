import Bookmark from "../models/Bookmark";
import BookmarkModel from "../mongoose/BookmarkModel";
import BookmarkDaoI from "../interfaces/BookmarkDao";
import User from "../models/User";
import Tuit from "../models/Tuit"


export default class BookmarkDao implements BookmarkDaoI {
    userBookmarksTuit = async (uid: string, tid: string): Promise<any> =>
        BookmarkModel.create({bookmarkedBy: uid, bookmarkedTuit: tid});

    userRemovesBookmarkTuit = async (uid: string, tid: string): Promise<any> =>
        BookmarkModel.deleteOne({bookmarkedBy: uid, bookmarkedTuit: tid});

        findAllUsersThatBookmarkedTuit = async (tid: string): Promise<Bookmark[]> =>
            BookmarkModel
                .find({bookmarkedTuit: tid})
                .populate("bookmarkedBy")
                .exec();
        findAllTuitsBookmarkedByUser = async (uid: string): Promise<Bookmark[]> =>
            BookmarkModel
                .find({bookmarkedBy: uid})
                .populate("bookmarkedTuit")
                .exec();

    private static bookmarkDao: BookmarkDao | null = null;
    public static getInstance = (): BookmarkDao => {
        if(BookmarkDao.bookmarkDao === null) {
            BookmarkDao.bookmarkDao = new BookmarkDao();
        }
        return BookmarkDao.bookmarkDao;
    }

}
