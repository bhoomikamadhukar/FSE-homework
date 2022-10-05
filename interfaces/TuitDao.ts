import Tuit from "../models/Tuit";

export default interface TuitDao {
    findAllTuits(): Promise<Tuit[]>;

    findTuitById(tid: string): Promise<Tuit>;

    createTuit(tuit: Tuit): Promise<Tuit>;

    updateTuit(tid: string, tuit: Tuit): Promise<any>;

    deleteTuit(tid: string): Promise<any>;

    findTuitsByUser(uid: string): Promise<any>;
}
