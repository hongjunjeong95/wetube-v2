import express from 'express';
import routes from '../routes';
import { home, search } from '../controller/videoController';
import {
  postLogin,
  logout,
  getJoin,
  postJoin,
  getLogin,
} from '../controller/userController';

const globalRouter = express.Router();

globalRouter.get(routes.home, home);
globalRouter.get(routes.search, search);

// Join
globalRouter.get(routes.join, getJoin);
globalRouter.post(routes.join, postJoin, postLogin);

// Login
globalRouter.get(routes.login, getLogin);
globalRouter.post(routes.login, postLogin);

// Log out
globalRouter.get(routes.logout, logout);

export default globalRouter;
