import {Express, Request, Response} from "express";
import BookmarkDao from "../daos/BookmarkDao";
import BookmarkControllerI from "../interfaces/BookmarkController";

export default class BookmarkController implements BookmarkControllerI {
    private static bookmarkDao: BookmarkDao = BookmarkDao.getInstance();
    private static BookmarkController: BookmarkController | null = null;
    public static getInstance = (app: Express): BookmarkController => {
        if(BookmarkController.BookmarkController === null) {
            BookmarkController.BookmarkController = new BookmarkController();
            app.post("/api/users/:uid/bookmarks/:tid", BookmarkController.BookmarkController.userBookmarksTuit);
            app.get("/api/users/:uid/bookmarks", BookmarkController.BookmarkController.findAllTuitsBookmarkedByUser);
            app.get("/api/tuits/:tid/bookmarks", BookmarkController.BookmarkController.findAllUsersThatBookmarkedTuit);
            app.delete("/api/users/:uid/bookmarks/:tid", BookmarkController.BookmarkController.userRemovesBookmarkTuit);
        }
        return BookmarkController.BookmarkController;
    }

    private constructor() {}


    userBookmarksTuit = (req: Request, res: Response) =>
        BookmarkController.bookmarkDao.userBookmarksTuit(req.params.uid, req.params.tid)
            .then(bookmarks => res.json(bookmarks));


    userRemovesBookmarkTuit = (req: Request, res: Response) =>
        BookmarkController.bookmarkDao.userRemovesBookmarkTuit(req.params.uid, req.params.tid)
            .then(status => res.send(status));


    findAllTuitsBookmarkedByUser = (req: Request, res: Response) =>
        BookmarkController.bookmarkDao.findAllTuitsBookmarkedByUser(req.params.uid)
            .then(bookmarks => res.json(bookmarks));


    findAllUsersThatBookmarkedTuit = (req: Request, res: Response) =>
        BookmarkController.bookmarkDao.findAllUsersThatBookmarkedTuit(req.params.tid)
            .then(bookmarks => res.send(bookmarks));
};
