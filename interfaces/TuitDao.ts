/**
 * @file Interface that has method signatures for API for Tuits related data access object methods
 */
import Tuit from "../models/Tuit";
import Stats from "../models/Stats";
export default interface TuitDaoI {
    findAllTuits(): Promise<Tuit[]>;
    findAllTuitsByUser(uid: string): Promise<Tuit[]>;
    findTuitById(tid: string): Promise<Tuit>;
    createTuitByUser(uid: string, tuit: Tuit): Promise<Tuit>;
    updateTuit(tid: string, tuit: Tuit): Promise<any>;
    deleteTuit(tid: string): Promise<any>;
    updateLikes(tid:string,newStats:Stats): Promise<any>;
    updateDislikes(tid:string,newStats:Stats): Promise<any>;
}
