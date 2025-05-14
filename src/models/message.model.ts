import mongoose from "mongoose";

const messageModal = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  reply: {
    type: String,
    required: true,
  },
  chatId: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Message =
  mongoose.models.message || mongoose.model("message", messageModal);

export default Message;
