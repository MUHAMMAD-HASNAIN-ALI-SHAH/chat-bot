import axios from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";
import useChatStore from "./useChatStore";

interface Message {
  _id?: string;
  chatId: string;
  userId: string;
  message: string;
  reply: string;
  createdAt: string;
}

interface MessageStore {
  messages: Message[];
  sendMessage: (form: {
    message: String;
    userId: String;
    chatId?: String;
  }) => void;
  getMessages: (userId: string) => void;
}

const useMessageStore = create<MessageStore>((set, get) => ({
  messages: [],

  sendMessage: async (form) => {
    try {
      form.chatId = useChatStore.getState().selectedChat?._id || "";
      const response = await axios.post(
        "http://localhost:3000/api/message",
        form
      );
      set({ messages: [...get().messages, response.data.data] });
    } catch (error) {
      console.log(error);
      toast.error("Error sending response");
    }
  },
  getMessages: async (userId) => {
    try {
      if (useChatStore.getState().selectedChat === null) return;
      const response = await axios.get(
        `http://localhost:3000/api/message/${
          useChatStore.getState().selectedChat!._id
        }`,
        {
          headers: {
            userId: userId,
          },
        }
      );
      set({ messages: response.data });
    } catch (error) {
      console.log(error);
      toast.error("Error getting response");
    }
  },
}));

export default useMessageStore;
