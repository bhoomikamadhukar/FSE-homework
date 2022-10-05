"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @file Implements an Express Node HTTP server.
 */
const UserDao_1 = __importDefault(require("./daos/UserDao"));
const mongoose_1 = __importDefault(require("mongoose"));
const UserController_1 = __importDefault(require("./controllers/UserController"));
const TuitDao_1 = __importDefault(require("./daos/TuitDao"));
const TuitController_1 = __importDefault(require("./controllers/TuitController"));
const express_1 = __importDefault(require("express"));
const cors = require('cors');
const app = (0, express_1.default)();
app.use(cors());
app.use(express_1.default.json());
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: false,
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    family: 4
};
mongoose_1.default.connect('mongodb://localhost:27017/tuiterdb', options);
const userDao = new UserDao_1.default();
const userController = new UserController_1.default(app, userDao);
const tuitDao = new TuitDao_1.default();
const tuitController = new TuitController_1.default(app, tuitDao);
/**
 * Start a server listening at port 4000 locally
 * but use environment variable PORT on Heroku if available.
 */
const PORT = 4000;
app.listen(process.env.PORT || PORT);
