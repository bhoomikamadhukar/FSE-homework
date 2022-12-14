/**
 * @file Controller RESTful Web service API for likes resource
 */
 import {Express, Request, Response} from "express";
 import LikeDao from "../daos/LikeDao";
 import TuitDao from "../daos/TuitDao";
 import LikeControllerI from "../interfaces/LikeController";


 /**
  * @class LikeController Implements RESTful Web service API for likes resource.
  * Defines the following HTTP endpoints:
  * <ul>
  *     <li>GET /api/users/:uid/likes to retrieve all the tuits liked by a user
  *     </li>
  *     <li>GET /api/tuits/:tid/likes to retrieve all users that liked a tuit
  *     </li>
  *     <li>POST /api/users/:uid/likes/:tid to record that a user likes a tuit
  *     </li>
  *     <li>DELETE /api/users/:uid/unlikes/:tid to record that a user
  *     no longer likes a tuit</li>
  * </ul>
  * @property {LikeDao} likeDao Singleton DAO implementing likes CRUD operations
  * @property {LikeController} LikeController Singleton controller implementing
  * RESTful Web service API
  */
 export default class LikeController implements LikeControllerI {
     private static likeDao: LikeDao = LikeDao.getInstance();
     private static likeController: LikeController | null = null;
     private static tuitDao: TuitDao = TuitDao.getInstance();


     public static getInstance = (app: Express): LikeController => {
         if(LikeController.likeController === null) {
             LikeController.likeController = new LikeController();
             app.get("/api/users/:uid/likes", LikeController.likeController.findAllTuitsLikedByUser);
             app.get("/api/tuits/:tid/likes", LikeController.likeController.findAllUsersThatLikedTuit);
             app.post("/api/users/:uid/likes/:tid", LikeController.likeController.userLikesTuit);
             app.delete("/api/users/:uid/unlikes/:tid", LikeController.likeController.userUnlikesTuit);
             app.put("/api/users/:uid/likes/:tid", LikeController.likeController.userTogglesTuitLikes);
            app.get("/api/tuits/:tid/likes/count", LikeController.likeController.countHowManyLikedTuit);
            app.get("/api/users/:uid/liked/:tid", LikeController.likeController.findUserLikesTuit);
         }
         return LikeController.likeController;
     }

     private constructor() { }

     /**
      * Retrieves all users that liked a tuit from the database
      * @param {Request} req Represents request from client, including the path
      * parameter tid representing the liked tuit
      * @param {Response} res Represents response to client, including the
      * body formatted as JSON arrays containing the user objects
      */
     findAllUsersThatLikedTuit = (req: Request, res: Response) =>
         LikeController.likeDao.findAllUsersThatLikedTuit(req.params.tid)
             .then(likes => res.json(likes));

     /**
      * Retrieves all tuits liked by a user from the database
      * @param {Request} req Represents request from client, including the path
      * parameter uid representing the user liked the tuits
      * @param {Response} res Represents response to client, including the
      * body formatted as JSON arrays containing the tuit objects that were liked
      */
      findAllTuitsLikedByUser = (req: any, res: any) => {
        const uid = req.params.uid;
        const profile = req.session['profile'];
         //@ts-ignore
        const userId = uid === "me" && profile ?
            profile._id : uid;
 //@ts-ignore
        LikeController.likeDao.findAllTuitsLikedByUser(userId)
            .then(likes => {
                const likesNonNullTuits =
                    likes.filter(like => like.tuit);
                const tuitsFromLikes =
                    likesNonNullTuits.map(like => like.tuit);
                res.json(tuitsFromLikes);
            });

    }


     /**
      * @param {Request} req Represents request from client, including the
      * path parameters uid and tid representing the user that is liking the tuit
      * and the tuit being liked
      * @param {Response} res Represents response to client, including the
      * body formatted as JSON containing the new likes that was inserted in the
      * database
      */
     userLikesTuit = (req: Request, res: Response) =>
         LikeController.likeDao.userLikesTuit(req.params.uid, req.params.tid)
             .then(likes => res.json(likes));

     /**
      * @param {Request} req Represents request from client, including the
      * path parameters uid and tid representing the user that is unliking
      * the tuit and the tuit being unliked
      * @param {Response} res Represents response to client, including status
      * on whether deleting the like was successful or not
      */
     userUnlikesTuit = (req: any, res: any) =>
         LikeController.likeDao.userUnlikesTuit(req.params.uid, req.params.tid)
             .then(status => res.send(status));

         findUserLikesTuit = (req: any, res: any) => {
          const uid = req.params.uid;
          const tid = req.params.tid;
          const profile = req.session['profile'];
          //@ts-ignore
          const userId = uid === "me" && profile ?
              profile._id : uid;
           //@ts-ignore
          LikeController.likeDao.findUserLikesTuit(userId, tid)
              .then(likes => res.json(likes));

      }

      countHowManyLikedTuit = (req: Request, res: Response) =>
       LikeController.likeDao.countHowManyLikedTuit(req.params.tid)
           .then(likes => res.json(likes));


      userTogglesTuitLikes = async (req:any, res:any) => {
           const uid = req.params.uid;
           const tid = req.params.tid;
           const profile = req.session['profile'];
           const userId = uid === "me" && profile ?
                 profile._id : uid;
           try {
             const userAlreadyLikedTuit = await LikeController.likeDao
                 .findUserLikesTuit(userId, tid);
             const howManyLikedTuit = await LikeController.likeDao
                 .countHowManyLikedTuit(tid);
             let tuit = await LikeController.tuitDao.findTuitById(tid);
             if (userAlreadyLikedTuit.length==1 && howManyLikedTuit>0) {
                 //@ts-ignore
                await LikeController.likeDao.userUnlikesTuit(userId, tid);
                tuit.stats.likes = howManyLikedTuit - 1;
             } else {
               await LikeController.likeDao.userLikesTuit(userId, tid);
               tuit.stats.likes = howManyLikedTuit + 1;
             };
             await LikeController.tuitDao.updateLikes(tid, tuit.stats);
             res.sendStatus(200);
           } catch (e) {
             res.sendStatus(404);
           }
         };
       }
