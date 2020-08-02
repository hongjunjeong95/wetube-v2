import express from 'express';
import routes from '../routes';
import { home, search } from '../controller/videoController';
import {
  postLogin,
  logout,
  getJoin,
  postJoin,
  getLogin,
  getMe,
} from '../controller/userController';
import { uploadAvatar } from '../middleware';

const globalRouter = express.Router();

globalRouter.get(routes.home, home);
globalRouter.get(routes.search, search);
globalRouter.get(routes.me, getMe);

// Join
globalRouter.get(routes.join, getJoin);
globalRouter.post(routes.join, uploadAvatar, postJoin, postLogin);

// Login
globalRouter.get(routes.login, getLogin);
globalRouter.post(routes.login, postLogin);

// Log out
globalRouter.get(routes.logout, logout);

export default globalRouter;
