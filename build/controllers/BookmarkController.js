"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BookmarkDao_1 = __importDefault(require("../daos/BookmarkDao"));
class BookmarkController {
    constructor() {
        this.userBookmarksTuit = (req, res) => BookmarkController.bookmarkDao.userBookmarksTuit(req.params.uid, req.params.tid)
            .then(bookmarks => res.json(bookmarks));
        this.userRemovesBookmarkTuit = (req, res) => BookmarkController.bookmarkDao.userRemovesBookmarkTuit(req.params.uid, req.params.tid)
            .then(status => res.send(status));
        this.findAllTuitsBookmarkedByUser = (req, res) => BookmarkController.bookmarkDao.findAllTuitsBookmarkedByUser(req.params.uid)
            .then(bookmarks => res.json(bookmarks));
        this.findAllUsersThatBookmarkedTuit = (req, res) => BookmarkController.bookmarkDao.findAllUsersThatBookmarkedTuit(req.params.tid)
            .then(bookmarks => res.send(bookmarks));
    }
}
exports.default = BookmarkController;
BookmarkController.bookmarkDao = BookmarkDao_1.default.getInstance();
BookmarkController.BookmarkController = null;
BookmarkController.getInstance = (app) => {
    if (BookmarkController.BookmarkController === null) {
        BookmarkController.BookmarkController = new BookmarkController();
        app.post("/api/users/:uid/bookmarks/:tid", BookmarkController.BookmarkController.userBookmarksTuit);
        app.get("/api/users/:uid/bookmarks", BookmarkController.BookmarkController.findAllTuitsBookmarkedByUser);
        app.get("/api/tuits/:tid/bookmarks", BookmarkController.BookmarkController.findAllUsersThatBookmarkedTuit);
        app.delete("/api/users/:uid/bookmarks/:tid", BookmarkController.BookmarkController.userRemovesBookmarkTuit);
    }
    return BookmarkController.BookmarkController;
};
;
