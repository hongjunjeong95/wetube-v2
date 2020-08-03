import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema({
  title: String,
  description: String,
  videoUrl: String,
  createdAt: String,
  views: {
    type: Number,
    default: 0,
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  comments: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment',
  },
});

const model = mongoose.model('Video', videoSchema);

export default model;
