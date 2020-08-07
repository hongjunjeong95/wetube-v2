import express from 'express';

import routes from '../routes';
import {
  videoDetail,
  getUpload,
  postUpload,
  deleteVideo,
  editVideo,
} from '../controller/videoController';
import { onlyPrivate, uploadVideo } from '../middleware';

const videoRouter = express.Router();

// upload
videoRouter.get(routes.upload, onlyPrivate, getUpload);
videoRouter.post(routes.upload, onlyPrivate, uploadVideo, postUpload);

videoRouter.get(routes.videoDetail(), videoDetail);
videoRouter.get(routes.editVideo(), onlyPrivate, editVideo);
videoRouter.get(routes.deleteVideo, onlyPrivate, deleteVideo);

export default videoRouter;
