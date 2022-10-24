import User from "./User";

export default interface Message {
    message: string,
    sentFrom: User,
    sentTo : User,
    sentOn : Date
};
