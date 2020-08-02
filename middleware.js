import multer from 'multer';
import routes from './routes';

const multerAvatar = multer({ dest: 'uploads/avatars' });
const multerVideo = multer({ dest: 'uploads/videos' });

export const localMiddleware = (req, res, next) => {
  res.locals.pagetitle = 'WeTube';
  res.locals.routes = routes;
  res.locals.loggedUser = req.user || null;
  next();
};

export const uploadAvatar = multerAvatar.single('avatar');
export const uploadVideo = multerVideo.single('video');
