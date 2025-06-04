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
  sendMessageLoader: boolean;
  getMessagesLoader: boolean;
  sendMessage: (form: {
    message: String;
    userId: String;
    chatId?: String;
  }) => void;
  getMessages: (userId: string) => void;
}

const useMessageStore = create<MessageStore>((set, get) => ({
  messages: [],
  sendMessageLoader: false,
  getMessagesLoader: false,

  sendMessage: async (form) => {
    try {
      set({ sendMessageLoader: true });
      form.chatId = useChatStore.getState().selectedChat?._id || "";
      const response = await axios.post(
        "http://localhost:3000/api/message",
        form
      );
      set({ sendMessageLoader: false });
      set({ messages: [...get().messages, response.data.data] });
    } catch (error) {
      console.log(error);
      toast.error("Error sending response");
      set({ sendMessageLoader: false });
    }
  },
  getMessages: async (userId) => {
    try {
      if (useChatStore.getState().selectedChat === null) return;
      set({ messages: [] });
      set({ getMessagesLoader: true });
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
      set({ getMessagesLoader: false });
      set({ messages: response.data });
    } catch (error) {
      console.log(error);
      toast.error("Error getting response");
      set({ getMessagesLoader: false });
    }
  },
}));

export default useMessageStore;
