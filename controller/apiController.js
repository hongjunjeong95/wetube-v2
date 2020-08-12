import Video from '../models/Video';
import Comment from '../models/Comment';
import { getDate } from './videoController';

export const postRegisterView = async (req, res) => {
  try {
    const {
      params: { id },
    } = req;
    const video = await Video.findById(id);
    video.views++;
    video.save();
    res.status(200);
  } catch (error) {
    res.status(400);
  } finally {
    res.end();
  }
};

export const postAddComment = async (req, res) => {
  const {
    params: { id },
    body: { comment },
    user,
  } = req;
  try {
    const video = await Video.findById(id);
    console.log(comment);
    const newComment = await Comment.create({
      text: comment,
      creator: user.id,
      createdAt: getDate(),
    });
    video.comments.push(newComment.id);
    video.save();
  } catch (error) {
    res.status(400);
  } finally {
    res.end();
  }
};
