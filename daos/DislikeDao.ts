/**
 * @file Implements DAO managing data storage of likes. Uses mongoose LikeModel
 * to integrate to intergrate with MongoDB.
 */
import Dislike from "../models/Dislike";
import DislikeModel from "../mongoose/DislikeModel";
import DislikeDaoI from "../interfaces/DislikeDao";
import User from "../models/User";
import Tuit from "../models/Tuit";

/**
 * @class DislikeDao Implements Data Access Object managing data storage
 * of Likes
 * @property {LikeDao} likeDao Private single instance of LikeDao
 */
export default class DislikeDao implements DislikeDaoI {
  /**
   * Inserts likes instance into the database
   * @param {string} uid User who likes a user tuit instance is added to the database.
   * @param {string} tid Tuit which is liked by User.
   * @returns Promise To be notified when likes is inserted into the database
   */
    userDislikesTuit = async (uid: string, tid: string): Promise<any> =>
        DislikeModel.create({tuit: tid, dislikedBy: uid});
  /**
   * Deletes likes instance from the database
   * @param {string} uid User's primary key
   * @param {string} tid Tuits primary key
   * @returns Promise To be acknowledge when like is deleted.
   */
    userReversesDislikedTuit = async (uid: string, tid: string): Promise<any> =>
        DislikeModel.deleteOne({tuit: tid, dislikedBy: uid});
    /**
     * Uses LikeModel to retrieve all likes to a
     * particular tuit.
     * @param {string} tid Tuits's primary key
     * @returns Promise To be notified when the likes are retrieved from
     * database
     */
    findAllUsersThatDislikedTuit = async (tid: string): Promise<Dislike[]> =>
        DislikeModel
            .find({tuit: tid})
            .populate("dislikedBy")
            .exec();
    /**
     * Uses LikeModel to retrieve all tuits liked by a particular
     * user
     * @param {string} uid User's primary key
     * @returns Promise To be notified when the messages are retrieved from
     * database
     */
     findAllTuitsDislikedByUser = async (uid:string):Promise<Dislike[]> =>
      DislikeModel
        .find({dislikedBy: uid})
        .populate({
         path: "tuit",
         populate: {
           path: "postedBy"
         }
       }).exec();

  findUserDislikesTuit = async (uid: string, tid: string): Promise<any> =>
        DislikeModel
            .find({ dislikedBy: uid, tuit: tid });

    countHowManyDislikedTuit =
      async (tid:string):Promise<any> =>
        DislikeModel.count({tuit: tid});

    /**
     * Creates singleton DAO instance
     * @returns LikesDao
     */
    private static dislikeDao: DislikeDao | null = null;
    public static getInstance = (): DislikeDao => {
        if(DislikeDao.dislikeDao === null) {
            DislikeDao.dislikeDao = new DislikeDao();
        }
        return DislikeDao.dislikeDao;
    }

}
