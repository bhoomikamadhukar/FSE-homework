"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @file Controller RESTful Web service API for users resource
 */
const UserDao_1 = __importDefault(require("../daos/UserDao"));
/**
  * @class UserController Implements RESTful Web service API for tuits resource.
  * Defines the following HTTP endpoints:
  * <ul>
  *     <li>POST /api/users to create a new users</li>
  *     <li>GET /api/users/:uid to retrieve all the users by id </li>
  *     <li>GET /api/users to retrieve all users instances</li>
  *     <li>PUT /api/users/:uid to modify an individual user instance </li>
  *     <li>DELETE /api/users/:uid to remove a particular user instance</li>
  * </ul>
  * @property {UserDao} userDao Singleton DAO implementing user CRUD operations
  * @property {UserController} userController Singleton controller implementing
  * RESTful Web service API
  */
class UserController {
    constructor() {
        /**
          * Retrieves all users from the database and returns an array of users.
          * @param {Request} req Represents request from client
          * @param {Response} res Represents response to client, including the
          * body formatted as JSON arrays containing the users objects
          */
        this.findAllUsers = (req, res) => UserController.userDao.findAllUsers()
            .then((users) => res.json(users));
        /**
         * Retrieves user object from the database for a particular user id and returns
         * a user object.
         * @param {Request} req Represents request from client
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON arrays containing the user objects
         */
        this.findUserById = (req, res) => UserController.userDao.findUserById(req.params.uid)
            .then((user) => res.json(user));
        /**
          * @param {Request} req Represents request from client
          * @param {Response} res Represents response to client, including the
          * body formatted as JSON containing the user object
          */
        this.createUser = (req, res) => UserController.userDao.createUser(req.body)
            .then((user) => res.json(user));
        /**
          * @param {Request} req Represents request from client, including path
          * parameter tid identifying the primary key of the user to be modified
          * @param {Response} res Represents response to client, including status
          * on whether updating a user was successful or not
          */
        this.updateUser = (req, res) => UserController.userDao.updateUser(req.params.uid, req.body)
            .then((status) => res.send(status));
        this.deleteUser = (req, res) => UserController.userDao.deleteUser(req.params.uid)
            .then((status) => res.send(status));
    }
}
exports.default = UserController;
UserController.userDao = UserDao_1.default.getInstance();
UserController.userController = null;
/**
  * Creates singleton controller instance
  * @param {Express} app Express instance to declare the RESTful Web service
  * API
  * @return UserController
  */
UserController.getInstance = (app) => {
    if (UserController.userController === null) {
        UserController.userController = new UserController();
        app.get("/api/users", UserController.userController.findAllUsers);
        app.get("/api/users/:uid", UserController.userController.findUserById);
        app.post("/api/users", UserController.userController.createUser);
        app.put("/api/users/:uid", UserController.userController.updateUser);
        app.delete("/api/users/:uid", UserController.userController.deleteUser);
    }
    return UserController.userController;
};
;
