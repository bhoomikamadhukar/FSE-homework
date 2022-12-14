import {Request, Response, Express} from "express";
import UserDao from "../daos/UserDao";
const bcrypt = require('bcrypt');
const saltRounds = 10;

const AuthenticationController = (app: Express) => {

  const userDao: UserDao = UserDao.getInstance()

  const signup = async (req: any, res: any) => {
    const newUser = req.body;
    const password = newUser.password;
    const hash = await bcrypt.hash(password, saltRounds);
    newUser.password = hash;

    const existingUser = await userDao.findUserByUsername(req.body.username);
    if (existingUser) {
      res.sendStatus(403);
      return;
    } else {
      const insertedUser = await userDao.createUser(newUser);
      //@ts-ignore
      req.session['profile'] = insertedUser;
      res.json(insertedUser);
    }
  }

  const profile = (req: Request, res: Response) => {
    //@ts-ignore
    const profile = req.session['profile'];
    if (profile) {
      res.json(profile);
    } else {
      res.sendStatus(403);
    }
  }

  const logout = (req: Request, res: Response) => {
    //@ts-ignore
    req.session.destroy();
    res.sendStatus(200);
  }

  const login = async (req: Request, res: Response) => {
    const user = req.body;
    const username = user.username;
    const password = user.password;
    const existingUser = await userDao
    .findUserByUsername(username);
    if (!existingUser) {
      res.sendStatus(403);
      return;
    }
    const match = await bcrypt
    .compare(password, existingUser.password);

    if (match) {
      //@ts-ignore
      req.session['profile'] = existingUser;
      res.json(existingUser);
    } else {
      res.sendStatus(403);
      console.log("Passwords do not match");
    }
  };

  app.post("/auth/login", login);
  app.post("/auth/profile", profile);
  app.post("/auth/logout", logout);
  app.post("/auth/signup", signup);
}

export default AuthenticationController;
