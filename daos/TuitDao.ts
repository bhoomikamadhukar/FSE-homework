/**
 * @file Implements DAO managing data storage of tuits. Uses mongoose TuitModel
 * to integrate with MongoDB
 */
import Tuit from "../models/Tuit";
import TuitDaoI from "../interfaces/TuitDao";
import TuitModel from "../mongoose/TuitModel";
import Stats from "../models/Stats";
/**
 * @class TuitDao Implements Data Access Object managing data storage
 * of Tuits
 * @property {TuitDao} tuitDao Private single instance of TuitDao
 */
export default class TuitDao implements TuitDaoI {
    private static tuitDao: TuitDao | null = null;

    /**
     * Creates singleton DAO instance
     * @returns TuitDao
     */
    public static getInstance(): TuitDao {
        if (TuitDao.tuitDao === null) {
            TuitDao.tuitDao = new TuitDao();
        }
        return TuitDao.tuitDao;
    }

    private constructor() {}

    /**
     * Uses TuitModel to retrieve all tuits documents from tuits collection
     * @returns Promise To be notified when the tuits are retrieved from
     * database
     */
    findAllTuits = async (): Promise<Tuit[]> =>
        TuitModel.find();

    /**
     * Uses TuitModel to retrieve all tuits documents posted by a particular
     * user from tuits collection
     * @param {string} uid User's primary key
     * @returns Promise To be notified when the tuits are retrieved from
     * database
     */
     findAllTuitsByUser = async (uid: string): Promise<Tuit[]> =>
          TuitModel.find({ postedBy: uid })
              .populate("postedBy")
              .exec();

    /**
     * Uses TuitModel to retrieve single tuit document from tuits collection
     * @param {string} tid Tuit's primary key
     * @returns Promise To be notified when the tuit is retrieved from database
     */
    findTuitById = async (tid: string): Promise<any> =>
        TuitModel.findById(tid).populate("postedBy").exec();

    /**
     * Inserts tuit instance for a particular user into the database
     * @param {string} uid User's primary key
     * @param {Tuit} tuit Instance to be inserted into the database
     * @returns Promise To be notified when tuit is inserted into the database
     */
    createTuitByUser = async (uid: string, tuit: Tuit): Promise<Tuit> =>
        TuitModel.create({...tuit, postedBy: uid})

    /**
     * Updates tuit with new values in database
     * @param {string} tid Tuit's primary key
     * @param {Tuit} tuit Tuit object containing properties and their new values
     * @returns Promise To be notified when tuit is updated in the database
     */
    updateTuit = async (tid: string, tuit: Tuit): Promise<any> =>
        TuitModel.updateOne({_id: tid}, {$set: tuit})

    /**
     * Removes tuit from the database
     * @param {string} tid Tuit's primary key
     * @returns Promise To be notified when tuit is removed from the database
     */
    deleteTuit = async (tid: string): Promise<any> =>
        TuitModel.deleteOne({_id: tid});



    updateLikes =
        async (tid: string, newStats: Stats) =>
            TuitModel.updateOne(
                { _id: tid },
                { $set: { stats: newStats } });
      updateDislikes =
          async (tid: string, newStats: Stats) =>
              TuitModel.updateOne(
                  { _id: tid },
                  { $set: { stats: newStats } });



}
