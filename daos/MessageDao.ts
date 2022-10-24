import Message from "../models/Message";
import MessageModel from "../mongoose/MessageModel";
import MessageDaoI from "../interfaces/MessageDao";
import User from "../models/User";



export default class MessageDao implements MessageDaoI {
    userMessagesUser = async (message:Message): Promise<Message> =>
        MessageModel.create({...message});

    userDeletesMessage = async (mid:string): Promise<any> =>
        MessageModel.deleteOne({_id:mid});

    findAllSentMessages = async (uid: string): Promise<Message[]> =>
        MessageModel
            .find({sentFrom: uid})
            .populate("sentFrom")
            .exec();

    findAllRecievedMessages = async (uid: string): Promise<Message[]> =>
        MessageModel
            .find({sentTo: uid})
            .populate("sentTo")
            .exec();

    private static messageDao: MessageDao | null = null;
    public static getInstance = (): MessageDao => {
        if(MessageDao.messageDao === null) {
            MessageDao.messageDao = new MessageDao();
        }
        return MessageDao.messageDao;
    }

}
