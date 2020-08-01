import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  avatarUrl: String,
  githubID: Number,
  googleID: Number,
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  videos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Video",
    },
  ],
});

const model = mongoose.model("User", userSchema);

export default model;
