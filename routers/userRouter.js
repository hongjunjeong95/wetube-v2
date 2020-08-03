import express from 'express';

import routes from '../routes';
import {
  userDetail,
  changePassword,
  getEditProfile,
  postEditProfile,
} from '../controller/userController';
import { onlyPrivate, uploadAvatar } from '../middleware';

const userRouter = express.Router();

userRouter.get(routes.userDetail, onlyPrivate, userDetail);

// Edit Profile
userRouter.get(routes.editProfile, onlyPrivate, getEditProfile);
userRouter.post(routes.editProfile, uploadAvatar, postEditProfile);

userRouter.get(routes.changePassword, onlyPrivate, changePassword);

export default userRouter;
