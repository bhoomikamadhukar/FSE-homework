"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const LikeSchema_1 = __importDefault(require("./LikeSchema"));
const LikeModel = mongoose_1.default.model('LikeSchema', LikeSchema_1.default);
exports.default = LikeModel;
