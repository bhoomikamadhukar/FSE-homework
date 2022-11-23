/**
 * @file Interface that has method signatures for API for Dislikes related data access object methods
 */
import Dislike from "../models/Dislike";
import Tuit from "../models/Tuit";
import User from "../models/User";

export default interface DislikeDao {
    userDislikesTuit(uid: string, tid: string):Promise<any>;
    userReversesDislikedTuit(uid:string, tid:string):Promise<any>;
    findAllTuitsDislikedByUser(uid:string):Promise<Dislike[]>;
    findAllUsersThatDislikedTuit(tid:string):Promise<Dislike[]>;
    countHowManyDislikedTuit(tid:string):Promise<any>;
    findUserDislikesTuit(uid:string,tid:string):Promise<any>;
}
