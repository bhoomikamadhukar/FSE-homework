import {Express, Request, Response} from "express";
import MessageDao from "../daos/MessageDao";
import MessageControllerI from "../interfaces/MessageController";
import Message from "../models/Message"

export default class MessageController implements MessageControllerI {
    private static messageDao: MessageDao = MessageDao.getInstance();
    private static MessageController: MessageController | null = null;
    public static getInstance = (app: Express): MessageController => {
        if(MessageController.MessageController === null) {
            MessageController.MessageController = new MessageController();
            app.post("/api/users/:uid1/messages/:uid2", MessageController.MessageController.userMessagesUser);
            app.get("/api/users/:uid/sentMessages", MessageController.MessageController.findAllSentMessages);
            app.get("/api/users/:uid/recievedMessages", MessageController.MessageController.findAllRecievedMessages);
            app.delete("/api/users/:uid1/messages/:uid2", MessageController.MessageController.userDeletesMessage);
        }
        return MessageController.MessageController;
    }

    private constructor() {}


    findAllSentMessages = (req: Request, res: Response) =>
        MessageController.messageDao.findAllSentMessages(req.params.uid)
            .then((message: Message[]) => res.json(message));


    findAllRecievedMessages = (req: Request, res: Response) =>
        MessageController.messageDao.findAllRecievedMessages(req.params.uid)
            .then((message: Message[]) => res.json(message));


    userMessagesUser = (req: Request, res: Response) =>
        MessageController.messageDao.userMessagesUser(req.body)
            .then((message: Message) => res.json(message));


    userDeletesMessage = (req: Request, res: Response) =>
        MessageController.messageDao.userDeletesMessage(req.params.mid)
            .then(status => res.send(status));
};
