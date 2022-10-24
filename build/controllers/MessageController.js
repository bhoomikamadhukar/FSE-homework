"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MessageDao_1 = __importDefault(require("../daos/MessageDao"));
class MessageController {
    constructor() {
        this.findAllSentMessages = (req, res) => MessageController.messageDao.findAllSentMessages(req.params.uid)
            .then((message) => res.json(message));
        this.findAllRecievedMessages = (req, res) => MessageController.messageDao.findAllRecievedMessages(req.params.uid)
            .then((message) => res.json(message));
        this.userMessagesUser = (req, res) => MessageController.messageDao.userMessagesUser(req.body)
            .then((message) => res.json(message));
        this.userDeletesMessage = (req, res) => MessageController.messageDao.userDeletesMessage(req.params.mid)
            .then(status => res.send(status));
    }
}
exports.default = MessageController;
MessageController.messageDao = MessageDao_1.default.getInstance();
MessageController.MessageController = null;
MessageController.getInstance = (app) => {
    if (MessageController.MessageController === null) {
        MessageController.MessageController = new MessageController();
        app.post("/api/users/:uid1/messages/:uid2", MessageController.MessageController.userMessagesUser);
        app.get("/api/users/:uid/sentMessages", MessageController.MessageController.findAllSentMessages);
        app.get("/api/users/:uid/recievedMessages", MessageController.MessageController.findAllRecievedMessages);
        app.delete("/api/users/:uid1/messages/:uid2", MessageController.MessageController.userDeletesMessage);
    }
    return MessageController.MessageController;
};
;
