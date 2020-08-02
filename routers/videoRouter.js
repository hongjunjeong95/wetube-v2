import express from 'express';

import routes from '../routes';
import {
  videoDetail,
  upload,
  deleteVideo,
  editVideo,
} from '../controller/videoController';
import { onlyPrivate } from '../middleware';

const videoRouter = express.Router();

videoRouter.get(routes.videoDetail, videoDetail);
videoRouter.get(routes.upload, onlyPrivate, upload);
videoRouter.get(routes.editVideo, onlyPrivate, editVideo);
videoRouter.get(routes.deleteVideo, onlyPrivate, deleteVideo);

export default videoRouter;
