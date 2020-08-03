import routes from '../routes';
import Video from '../models/Video';

export const home = async (req, res) => {
  try {
    const videos = await Video.find({}).populate('creator').sort({ _id: -1 });
    res.render('home', { pageTitle: 'home', videos });
  } catch (error) {
    console.log(error);
    res.render('home', { pageTitle: 'home', videos: [] });
  }
};

export const search = (req, res) => {
  res.render('search');
};

export const videoDetail = (req, res) => {
  res.render('videoDetail');
};

export const getUpload = (req, res) => {
  res.render('upload', { pageTitle: 'upload' });
};

export const postUpload = async (req, res) => {
  const {
    body: { title, description },
    file: { path },
    user: { id },
  } = req;
  try {
    const newVideo = await Video.create({
      title,
      description,
      videoUrl: path,
      creator: id,
    });
    req.user.videos.push(newVideo.id);
    req.user.save();
    res.redirect(routes.home);
  } catch (error) {
    console.log(error);
    res.redirect(routes.upload);
  }
};

export const editVideo = (req, res) => {
  res.render('editVideo');
};

export const deleteVideo = (req, res) => {
  res.render('deleteVideo');
};
