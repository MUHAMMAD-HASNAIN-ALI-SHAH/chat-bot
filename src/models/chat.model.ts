import mongoose from "mongoose";

const chatModal = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  chatName: {
    type: String,
  },
  totalChats: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Chat = mongoose.models.Chat || mongoose.model("Chat", chatModal);

export default Chat;
