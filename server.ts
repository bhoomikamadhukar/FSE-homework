/**
 * @file Implements an Express Node HTTP server.
 */
 import UserDao from "./daos/UserDao";
 import mongoose from "mongoose";
 import UserController from "./controllers/UserController";
 import TuitDao from "./daos/TuitDao";
 import TuitController from "./controllers/TuitController";
 import LikeController from "./controllers/LikeController";
 import FollowController from "./controllers/FollowController";
 import BookmarkController from "./controllers/BookmarkController";
 import MessageController from "./controllers/MessageController";
 import express, {Request, Response} from 'express';
 const cors = require('cors')
 const app = express();
 app.use(cors());
 app.use(express.json());
 
 // const options = {
 //     useNewUrlParser: true,
 //     useUnifiedTopology: true,
 //     autoIndex: false,
 //     maxPoolSize: 10,
 //     serverSelectionTimeoutMS: 5000,
 //     socketTimeoutMS: 45000,
 //     family: 4
 // }
 mongoose.connect('mongodb+srv://admin:root@cluster0.0lgzi8v.mongodb.net/tuiterdb?retryWrites=true&w=majority');
 const userController = UserController.getInstance(app);
 const tuitController = TuitController.getInstance(app);
 const likeController = LikeController.getInstance(app);
 const followController = FollowController.getInstance(app);
 const bookmarkController = BookmarkController.getInstance(app);
 const messageController = MessageController.getInstance(app);
 /**
  * Start a server listening at port 4000 locally
  * but use environment variable PORT on Heroku if available.
  */
 
 
 const PORT = 4000;
 app.listen(process.env.PORT || PORT);
 