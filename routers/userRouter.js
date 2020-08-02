import express from 'express';

import routes from '../routes';
import {
  userDetail,
  editProfile,
  changePassword,
} from '../controller/userController';
import { onlyPrivate } from '../middleware';

const userRouter = express.Router();

userRouter.get(routes.userDetail, onlyPrivate, userDetail);
userRouter.get(routes.editProfile, onlyPrivate, editProfile);
userRouter.get(routes.changePassword, onlyPrivate, changePassword);

export default userRouter;
