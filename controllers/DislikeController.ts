/**
 * @file Controller RESTful Web service API for likes resource
 */
 import {Express, Request, Response} from "express";
 import DislikeDao from "../daos/DislikeDao";
 import LikeDao from "../daos/LikeDao";
 import TuitDao from "../daos/TuitDao";
 import DislikeControllerI from "../interfaces/DislikeController";


 /**
  * @class DislikeController Implements RESTful Web service API for likes resource.
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
  * @property {DislikeDao} likeDao Singleton DAO implementing likes CRUD operations
  * @property {DislikeController} DislikeController Singleton controller implementing
  * RESTful Web service API
  */
 export default class DislikeController implements DislikeControllerI {
     private static dislikeDao: DislikeDao = DislikeDao.getInstance();
     private static dislikeController: DislikeController | null = null;
     private static tuitDao: TuitDao = TuitDao.getInstance();
    private static likeDao: LikeDao = LikeDao.getInstance();


     public static getInstance = (app: Express): DislikeController => {
         if(DislikeController.dislikeController === null) {
             DislikeController.dislikeController = new DislikeController();
             app.get("/api/users/:uid/dislikes", DislikeController.dislikeController.findAllTuitsDislikedByUser);
             app.get("/api/tuits/:tid/dislikes", DislikeController.dislikeController.findAllUsersThatDislikedTuit);
             app.post("/api/users/:uid/dislikes/:tid", DislikeController.dislikeController.userDislikesTuit);
             app.delete("/api/users/:uid/reversedislikes/:tid", DislikeController.dislikeController.userReversesDislikedTuit);
             app.put("/api/users/:uid/dislikes/:tid", DislikeController.dislikeController.userTogglesTuitDislikes);
            app.get("/api/tuits/:tid/dislikes/count", DislikeController.dislikeController.countHowManyDislikedTuit);
            app.get("/api/users/:uid/disliked/:tid", DislikeController.dislikeController.findUserDislikesTuit);
         }
         return DislikeController.dislikeController;
     }

     private constructor() { }

     /**
      * Retrieves all users that liked a tuit from the database
      * @param {Request} req Represents request from client, including the path
      * parameter tid representing the liked tuit
      * @param {Response} res Represents response to client, including the
      * body formatted as JSON arrays containing the user objects
      */
     findAllUsersThatDislikedTuit = (req: Request, res: Response) =>
         DislikeController.dislikeDao.findAllUsersThatDislikedTuit(req.params.tid)
             .then(dislikes => res.json(dislikes));

     /**
      * Retrieves all tuits liked by a user from the database
      * @param {Request} req Represents request from client, including the path
      * parameter uid representing the user liked the tuits
      * @param {Response} res Represents response to client, including the
      * body formatted as JSON arrays containing the tuit objects that were liked
      */
      findAllTuitsDislikedByUser = (req: any, res: any) => {
        const uid = req.params.uid;
        const profile = req.session['profile'];
         //@ts-ignore
        const userId = uid === "me" && profile ?
            profile._id : uid;
            //@ts-ignore
        DislikeController.dislikeDao.findAllTuitsDislikedByUser(userId)
            .then(dislikes => {
                const dislikesNonNullTuits =
                    dislikes.filter(dislike => dislike.tuit);
                const tuitsFromDislikes =
                    dislikesNonNullTuits.map(dislike => dislike.tuit);
                res.json(tuitsFromDislikes);
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
     userDislikesTuit = (req: Request, res: Response) =>
         DislikeController.dislikeDao.userDislikesTuit(req.params.uid, req.params.tid)
             .then(dislikes => res.json(dislikes));

     /**
      * @param {Request} req Represents request from client, including the
      * path parameters uid and tid representing the user that is unliking
      * the tuit and the tuit being unliked
      * @param {Response} res Represents response to client, including status
      * on whether deleting the like was successful or not
      */
     userReversesDislikedTuit = (req: any, res: any) =>
         DislikeController.dislikeDao.userReversesDislikedTuit(req.params.uid, req.params.tid)
             .then(status => res.send(status));

   findUserDislikesTuit = (req: any, res: any) => {
    const uid = req.params.uid;
    const tid = req.params.tid;
    const profile = req.session['profile'];
    //@ts-ignore
    const userId = uid === "me" && profile ?
        profile._id : uid;
     //@ts-ignore
    DislikeController.dislikeDao.findUserDislikesTuit(userId, tid)
        .then(dislikes => res.json(dislikes));

}

  countHowManyDislikedTuit = (req: Request, res: Response) =>
   DislikeController.dislikeDao.countHowManyDislikedTuit(req.params.tid)
       .then(dislikes => res.json(dislikes));


   userTogglesTuitDislikes = async (req: any, res: any) => {
       const uid = req.params.uid;
       const tid = req.params.tid;
       const profile = req.session['profile'];
         //@ts-ignore
       const userId = uid === "me" && profile ?
           profile._id : uid;
       try {
           const userAlreadyDislikedTuit = await DislikeController.dislikeDao
               .findUserDislikesTuit(userId, tid);
           const howManyDislikedTuit = await DislikeController.dislikeDao
               .countHowManyDislikedTuit(tid);

           const userAlreadyLikedTuit = await DislikeController.likeDao
               .findUserLikesTuit(userId, tid);
           const howManyLikedTuit = await DislikeController.likeDao
               .countHowManyLikedTuit(tid);

           let tuit = await DislikeController.tuitDao.findTuitById(tid);
           if (userAlreadyDislikedTuit.length == 1 && howManyDislikedTuit > 0) {
               await DislikeController.dislikeDao.userReversesDislikedTuit(uid, tid);
               tuit.stats.dislikes = howManyDislikedTuit - 1;
           } else {
               if (howManyLikedTuit > 0) {

                   await DislikeController.likeDao.userUnlikesTuit(userId, tid);
                   tuit.stats.likes = howManyLikedTuit - 1;
                   await DislikeController.tuitDao.updateLikes(tid, tuit.stats);
               }

               await DislikeController.dislikeDao.userDislikesTuit(userId, tid);
               tuit.stats.dislikes = howManyDislikedTuit + 1;
           };

           await DislikeController.tuitDao.updateDislikes(tid, tuit.stats);
           res.sendStatus(200);
       } catch (e) {
           res.sendStatus(404);
       }
   };

       }
