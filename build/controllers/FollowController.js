"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const FollowDao_1 = __importDefault(require("../daos/FollowDao"));
class FollowController {
    constructor() {
        this.findAllFollowing = (req, res) => FollowController.followDao.findAllFollowing(req.params.uid)
            .then(follows => res.json(follows));
        this.findAllFollowers = (req, res) => FollowController.followDao.findAllFollowers(req.params.uid)
            .then(follows => res.json(follows));
        this.userFollowsUser = (req, res) => FollowController.followDao.userFollowsUser(req.params.uid1, req.params.uid2)
            .then(follows => res.json(follows));
        this.userUnFollowsUser = (req, res) => FollowController.followDao.userUnFollowsUser(req.params.uid1, req.params.uid2)
            .then(status => res.send(status));
    }
}
exports.default = FollowController;
FollowController.followDao = FollowDao_1.default.getInstance();
FollowController.FollowController = null;
FollowController.getInstance = (app) => {
    if (FollowController.FollowController === null) {
        FollowController.FollowController = new FollowController();
        app.post("/api/users/:uid1/follows/:uid2", FollowController.FollowController.userFollowsUser);
        app.get("/api/users/:uid/followedBy", FollowController.FollowController.findAllFollowers);
        app.get("/api/users/:uid/following", FollowController.FollowController.findAllFollowing);
        app.delete("/api/users/:uid1/unfollows/:uid2", FollowController.FollowController.userUnFollowsUser);
    }
    return FollowController.FollowController;
};
;
