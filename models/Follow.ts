import User from "./User";

export default interface Follow {
    followedBy: User,
    currUser: User
};
