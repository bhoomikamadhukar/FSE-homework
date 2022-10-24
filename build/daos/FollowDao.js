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
const FollowModel_1 = __importDefault(require("../mongoose/FollowModel"));
class FollowDao {
    constructor() {
        this.userFollowsUser = (uid1, uid2) => __awaiter(this, void 0, void 0, function* () { return FollowModel_1.default.create({ followedBy: uid1, currUser: uid2 }); });
        this.userUnFollowsUser = (uid1, uid2) => __awaiter(this, void 0, void 0, function* () { return FollowModel_1.default.deleteOne({ followedBy: uid1, currUser: uid2 }); });
        this.findAllFollowers = (uid) => __awaiter(this, void 0, void 0, function* () {
            return FollowModel_1.default
                .find({ currUser: uid })
                .populate("followedBy")
                .exec();
        });
        this.findAllFollowing = (uid) => __awaiter(this, void 0, void 0, function* () {
            return FollowModel_1.default
                .find({ followedBy: uid })
                .populate("currUser")
                .exec();
        });
    }
}
exports.default = FollowDao;
FollowDao.followDao = null;
FollowDao.getInstance = () => {
    if (FollowDao.followDao === null) {
        FollowDao.followDao = new FollowDao();
    }
    return FollowDao.followDao;
};
