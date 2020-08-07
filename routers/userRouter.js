import express from 'express';

import routes from '../routes';
import {
  userDetail,
  getEditProfile,
  postEditProfile,
  getChangePassword,
  postChangePassword,
} from '../controller/userController';
import { onlyPrivate, uploadAvatar } from '../middleware';

const userRouter = express.Router();

userRouter.get(routes.userDetail(), onlyPrivate, userDetail);

// Edit Profile
userRouter.get(routes.editProfile, onlyPrivate, getEditProfile);
userRouter.post(routes.editProfile, onlyPrivate, uploadAvatar, postEditProfile);

// Change Password
userRouter.get(routes.changePassword, onlyPrivate, getChangePassword);
userRouter.post(routes.changePassword, onlyPrivate, postChangePassword);

export default userRouter;
