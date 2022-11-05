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
/**
 * @file Implements DAO managing data storage of users. Uses mongoose UserModel
 * to integrate with MongoDB
 */
const UserModel_1 = __importDefault(require("../mongoose/UserModel"));
/**
 * Implements Data Access Object managing data storage
 * of Users
 * @implements {UserDaoI} UserDaoI
 * @property {UserDao} userDao Private single instance of UserDao
 */
class UserDao {
    constructor() {
        /**
          * Retrieves all users from the database and returns an array of users.
          */
        this.findAllUsers = () => __awaiter(this, void 0, void 0, function* () { return UserModel_1.default.find().exec(); });
        /**
          * Retrieves user object from the database for a particular user id and returns
          * a user object.
          * @param {String} uid user id
          */
        this.findUserById = (uid) => __awaiter(this, void 0, void 0, function* () { return UserModel_1.default.findById(uid); });
        /**
         * Create user
          * @param {User} user user object
          */
        this.createUser = (user) => __awaiter(this, void 0, void 0, function* () { return UserModel_1.default.create(user); });
        /** Update user
          * @param {String} uid user id
          * @param {User} user user object
          */
        this.updateUser = (uid, user) => __awaiter(this, void 0, void 0, function* () {
            return UserModel_1.default.updateOne({ _id: uid }, { $set: user });
        });
        /** Delete the user
          * @param {String} uid user id
        **/
        this.deleteUser = (uid) => __awaiter(this, void 0, void 0, function* () { return UserModel_1.default.deleteOne({ _id: uid }); });
    }
}
exports.default = UserDao;
UserDao.userDao = null;
UserDao.getInstance = () => {
    if (UserDao.userDao === null) {
        UserDao.userDao = new UserDao();
    }
    return UserDao.userDao;
};
;
