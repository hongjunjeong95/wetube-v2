import express from 'express';

import routes from '../routes';
import {
  videoDetail,
  getUpload,
  postUpload,
  deleteVideo,
  editVideo,
} from '../controller/videoController';
import { onlyPrivate, onlyPublic, uploadVideo } from '../middleware';

const videoRouter = express.Router();

videoRouter.get(routes.videoDetail, onlyPublic, videoDetail);
videoRouter.get(routes.upload, onlyPrivate, getUpload);
videoRouter.post(routes.upload, onlyPrivate, uploadVideo, postUpload);
videoRouter.get(routes.editVideo, onlyPrivate, editVideo);
videoRouter.get(routes.deleteVideo, onlyPrivate, deleteVideo);

export default videoRouter;
