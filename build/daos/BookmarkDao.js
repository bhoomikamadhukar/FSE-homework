"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BookmarkModel_1 = __importDefault(require("../mongoose/BookmarkModel"));
class BookmarkDao {
    constructor() {
        this.userBookmarksTuit = (uid, tid) => __awaiter(this, void 0, void 0, function* () { return BookmarkModel_1.default.create({ bookmarkedBy: uid, bookmarkedTuit: tid }); });
        this.userRemovesBookmarkTuit = (uid, tid) => __awaiter(this, void 0, void 0, function* () { return BookmarkModel_1.default.deleteOne({ bookmarkedBy: uid, bookmarkedTuit: tid }); });
        this.findAllUsersThatBookmarkedTuit = (tid) => __awaiter(this, void 0, void 0, function* () {
            return BookmarkModel_1.default
                .find({ bookmarkedTuit: tid })
                .populate("bookmarkedBy")
                .exec();
        });
        this.findAllTuitsBookmarkedByUser = (uid) => __awaiter(this, void 0, void 0, function* () {
            return BookmarkModel_1.default
                .find({ bookmarkedBy: uid })
                .populate("bookmarkedTuit")
                .exec();
        });
    }
}
exports.default = BookmarkDao;
BookmarkDao.bookmarkDao = null;
BookmarkDao.getInstance = () => {
    if (BookmarkDao.bookmarkDao === null) {
        BookmarkDao.bookmarkDao = new BookmarkDao();
    }
    return BookmarkDao.bookmarkDao;
};