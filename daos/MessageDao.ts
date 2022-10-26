import Message from "../models/Message";
import MessageModel from "../mongoose/MessageModel";
import MessageDaoI from "../interfaces/MessageDao";
import User from "../models/User";



export default class MessageDao implements MessageDaoI {
    userMessagesUser =  async (uid1: string, uid2: string, message: Message): Promise<Message> =>
        MessageModel.create({...message, sentTo: uid2, sentFrom: uid1});

    userDeletesMessage = async (mid:string): Promise<any> =>
        MessageModel.deleteOne({_id:mid});

    findAllSentMessages = async (uid: string): Promise<Message[]> =>
        MessageModel
            .find({sentFrom: uid})
            .populate("message")
            .exec();

    findAllRecievedMessages = async (uid: string): Promise<Message[]> =>
        MessageModel
            .find({sentTo: uid})
            .populate("message")
            .exec();

    private static messageDao: MessageDao | null = null;
    public static getInstance = (): MessageDao => {
        if(MessageDao.messageDao === null) {
            MessageDao.messageDao = new MessageDao();
        }
        return MessageDao.messageDao;
    }

}
