  /**
 * @file Implements an Express Node HTTP server.
 */
 import express, {Request, Response} from 'express';
 import mongoose from "mongoose";
 import UserController from "./controllers/UserController";
 import TuitController from "./controllers/TuitController";
 import FollowController from "./controllers/FollowController";
 import LikeController from "./controllers/LikeController";
 import MessageController from './controllers/MessageController';
 import BookmarkController from './controllers/BookmarkController';
 import AuthenticationController from './controllers/auth-Controller';
  import DislikeController from "./controllers/DislikeController";
 const session = require("express-session");


 mongoose.connect("mongodb+srv://admin:root@cluster0.0lgzi8v.mongodb.net/tuiterdb?retryWrites=true&w=majority");
 // const userName = process.env.USERNAME;
 // const password = process.env.PASSWORD;
 // const url = `mongodb+srv://${userName}:${password}@cluster0.f6urgn7.mongodb.net/Tuiter?retryWrites=true&w=majority`;
 // mongoose.connect(url)
 const cors = require('cors')
 const app = express();
 const corsOptions ={
    origin:true,
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}

 let sess = {
     secret: 'process.env.SECRET',
     cookie: {
         secure: false
     }
  }
  app.use(cors(corsOptions));
  app.use(session(sess));
  app.use(express.json());
  if (process.env.ENV === 'PRODUCTION') {
     app.set('trust proxy', 1) // trust first proxy
     sess.cookie.secure = true // serve secure cookies
  }

  const userController = UserController.getInstance(app);
  const tuitController = TuitController.getInstance(app);
  const likesController = LikeController.getInstance(app);
  const followController = FollowController.getInstance(app);
  const bookmarkController = BookmarkController.getInstance(app);
  const messageController = MessageController.getInstance(app);
  const dislikeController = DislikeController.getInstance(app);
 AuthenticationController(app);



 /**
  * Start a server listening at port 4000 locally
  * but use environment variable PORT on Heroku if available.
  */
 const PORT = 4000;
 app.listen(process.env.PORT || PORT);
