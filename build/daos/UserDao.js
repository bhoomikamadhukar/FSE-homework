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
const User_1 = __importDefault(require("../models/User"));
const UserModel_1 = __importDefault(require("../mongoose/UserModel"));
class UserDao {
    findAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            const userMongooseModels = yield UserModel_1.default.find();
            const userModels = userMongooseModels
                .map((userMongooseModel) => {
                var _a, _b, _c;
                return new User_1.default((_a = userMongooseModel === null || userMongooseModel === void 0 ? void 0 : userMongooseModel._id.toString()) !== null && _a !== void 0 ? _a : '', (_b = userMongooseModel === null || userMongooseModel === void 0 ? void 0 : userMongooseModel.username) !== null && _b !== void 0 ? _b : '', (_c = userMongooseModel === null || userMongooseModel === void 0 ? void 0 : userMongooseModel.password) !== null && _c !== void 0 ? _c : '');
            });
            return userModels;
        });
    }
    findUserById(uid) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            const userMongooseModel = yield UserModel_1.default.findById(uid);
            return new User_1.default((_a = userMongooseModel === null || userMongooseModel === void 0 ? void 0 : userMongooseModel._id.toString()) !== null && _a !== void 0 ? _a : '', (_b = userMongooseModel === null || userMongooseModel === void 0 ? void 0 : userMongooseModel.username) !== null && _b !== void 0 ? _b : '', (_c = userMongooseModel === null || userMongooseModel === void 0 ? void 0 : userMongooseModel.password) !== null && _c !== void 0 ? _c : '');
        });
    }
    createUser(user) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            const userMongooseModel = yield UserModel_1.default.create(user);
            return new User_1.default((_a = userMongooseModel === null || userMongooseModel === void 0 ? void 0 : userMongooseModel._id.toString()) !== null && _a !== void 0 ? _a : '', (_b = userMongooseModel === null || userMongooseModel === void 0 ? void 0 : userMongooseModel.username) !== null && _b !== void 0 ? _b : '', (_c = userMongooseModel === null || userMongooseModel === void 0 ? void 0 : userMongooseModel.password) !== null && _c !== void 0 ? _c : '');
        });
    }
    deleteUser(uid) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield UserModel_1.default.deleteOne({ _id: uid });
        });
    }
    updateUser(uid, user) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield UserModel_1.default.updateOne({ _id: uid }, { $set: {
                    username: user.uName,
                    password: user.pass
                } });
        });
    }
}
exports.default = UserDao;
