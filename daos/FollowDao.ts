import Follow from "../models/Follow";
import FollowModel from "../mongoose/FollowModel";
import FollowDaoI from "../interfaces/FollowDao";
import User from "../models/User";


export default class FollowDao implements FollowDaoI {
    userFollowsUser = async (uid1: string, uid2: string): Promise<any> =>
        FollowModel.create({followedBy: uid1, currUser: uid2});

    userUnFollowsUser = async (uid1: string, uid2: string): Promise<any> =>
        FollowModel.deleteOne({followedBy: uid1, currUser: uid2});

    findAllFollowers = async (uid: string): Promise<Follow[]> =>
        FollowModel
            .find({currUser: uid})
            .populate("followedBy")
            .exec();

    findAllFollowing = async (uid: string): Promise<Follow[]> =>
        FollowModel
            .find({followedBy: uid})
            .populate("currUser")
            .exec();

    private static followDao: FollowDao | null = null;
    public static getInstance = (): FollowDao => {
        if(FollowDao.followDao === null) {
            FollowDao.followDao = new FollowDao();
        }
        return FollowDao.followDao;
    }

}
