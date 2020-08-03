import routes from '../routes';
import Video from '../models/Video';

const getDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  month = month < 10 ? `0${month}` : month;
  day = day < 10 ? `0${day}` : day;

  return `${year}-${month}-${day}`;
};

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
    console.log(getDate());
    const newVideo = await Video.create({
      title,
      description,
      videoUrl: path,
      creator: id,
      createdAt: getDate(),
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
