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
import { uploadAvatar, onlyPublic, onlyPrivate } from '../middleware';

const globalRouter = express.Router();

globalRouter.get(routes.home, home);
globalRouter.get(routes.search, search);
globalRouter.get(routes.me, onlyPublic, getMe);

// Join
globalRouter.get(routes.join, onlyPublic, getJoin);
globalRouter.post(routes.join, onlyPublic, uploadAvatar, postJoin, postLogin);

// Login
globalRouter.get(routes.login, onlyPublic, getLogin);
globalRouter.post(routes.login, onlyPublic, postLogin);

// Log out
globalRouter.get(routes.logout, onlyPrivate, logout);

export default globalRouter;
