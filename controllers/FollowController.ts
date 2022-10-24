import {Express, Request, Response} from "express";
import FollowDao from "../daos/FollowDao";
import FollowControllerI from "../interfaces/FollowController";

export default class FollowController implements FollowControllerI {
    private static followDao: FollowDao = FollowDao.getInstance();
    private static FollowController: FollowController | null = null;
    public static getInstance = (app: Express): FollowController => {
        if(FollowController.FollowController === null) {
            FollowController.FollowController = new FollowController();
            app.post("/api/users/:uid1/follows/:uid2", FollowController.FollowController.userFollowsUser);
            app.get("/api/users/:uid/followedBy", FollowController.FollowController.findAllFollowers);
            app.get("/api/users/:uid/following", FollowController.FollowController.findAllFollowing);
            app.delete("/api/users/:uid1/unfollows/:uid2", FollowController.FollowController.userUnFollowsUser);
        }
        return FollowController.FollowController;
    }

    private constructor() {}


    findAllFollowing = (req: Request, res: Response) =>
        FollowController.followDao.findAllFollowing(req.params.uid)
            .then(follows => res.json(follows));


    findAllFollowers = (req: Request, res: Response) =>
        FollowController.followDao.findAllFollowers(req.params.uid)
            .then(follows => res.json(follows));


    userFollowsUser = (req: Request, res: Response) =>
        FollowController.followDao.userFollowsUser(req.params.uid1, req.params.uid2)
            .then(follows => res.json(follows));


    userUnFollowsUser = (req: Request, res: Response) =>
        FollowController.followDao.userUnFollowsUser(req.params.uid1, req.params.uid2)
            .then(status => res.send(status));
};
