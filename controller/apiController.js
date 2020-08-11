/* eslint-disable import/prefer-default-export */
import Video from '../models/Video';

export const postRegisterView = async (req, res) => {
  try {
    const {
      params: { id },
    } = req;
    const video = await Video.findById(id);
    console.log(video.views);
    video.views++;
    video.save();
    res.status(200);
  } catch (error) {
    res.status(400);
  } finally {
    res.end();
  }
};
