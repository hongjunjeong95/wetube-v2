import routes from '../routes';
import Video from '../models/Video';
import User from '../models/User';

export const getDate = () => {
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

export const search = async (req, res) => {
  const {
    query: { term: searchingBy },
  } = req;
  let videos = [];

  try {
    videos = await Video.find({
      title: { $regex: searchingBy, $options: 'i' },
    }).populate('creator');
  } catch (error) {
    console.log(error);
  }

  res.render('search', { pageTitle: 'search', searchingBy, videos });
};

export const videoDetail = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const avatarUrl =
      req.user !== undefined
        ? req.user.avatarUrl
        : 'uploads/avatars/b30202f398381ab2729d2528d27eb686';
    const user =
      req.user === undefined ? undefined : await User.findById(req.user.id);
    const video = await Video.findById(id)
      .populate('creator')
      .populate({
        path: 'comments',
        populate: {
          path: 'creator',
        },
      });

    res.render('videoDetail', {
      pageTitle: video.title,
      video,
      avatarUrl,
      user,
    });
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};

// Upload video
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
      createdAt: getDate(),
    });
    req.user.videos.push(newVideo.id);
    req.user.save();
    res.redirect(routes.videoDetail(newVideo.id));
  } catch (error) {
    console.log(error);
    res.redirect(routes.upload);
  }
};

export const getEditVideo = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id);
    if (String(video.creator) !== req.user.id) {
      throw Error();
    } else {
      console.log(video);
      res.render('editVideo', { pageTitle: `Edit ${video.title}`, video });
    }
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};

export const postEditVideo = async (req, res) => {
  const {
    body: { title, description },
    params: { id },
  } = req;
  try {
    await Video.findByIdAndUpdate(id, { title, description });
    res.redirect(routes.videoDetail(id));
  } catch (error) {
    res.render('editVideo', { pageTitle: 'editVideo' });
  }
};

export const deleteVideo = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id);
    if (String(video.creator) !== req.user.id) {
      throw Error();
    } else {
      await Video.findOneAndRemove({ _id: id });
    }
  } catch (error) {
    console.log(error);
  }
  res.redirect(routes.home);
};
