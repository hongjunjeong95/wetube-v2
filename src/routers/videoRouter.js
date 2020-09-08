import express from 'express';

import routes from '../routes';
import {
  videoDetail,
  getUpload,
  postUpload,
  getEditVideo,
  postEditVideo,
  deleteVideo,
} from '../controller/videoController';
import { onlyPrivate, uploadVideo } from '../middleware';

const videoRouter = express.Router();

// Upload Video
videoRouter.get(routes.upload, onlyPrivate, getUpload);
videoRouter.post(routes.upload, onlyPrivate, uploadVideo, postUpload);

// Edit Video
videoRouter.get(routes.editVideo(), onlyPrivate, getEditVideo);
videoRouter.post(routes.editVideo(), onlyPrivate, postEditVideo);

videoRouter.get(routes.deleteVideo(), onlyPrivate, deleteVideo);

videoRouter.get(routes.videoDetail(), videoDetail);

export default videoRouter;
