import axios from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";
import useMessageStore from "./useMessageStore";

interface Chat {
  _id: string;
  chatName: string;
  userId: string;
}

interface ChatStore {
  selectedChat: Chat | null;
  tempChat: boolean;
  chats: Chat[];
  chatsLoader: boolean; 
  loadChats: (userId: string) => void;
  addChat: (user: any) => void;
  selectChat: (chat: Chat) => void;
  createChat: (userId: string, message: string) => void;
}

const useChatStore = create<ChatStore>((set, get) => ({
  selectedChat: null,
  tempChat: true,
  chats: [],
  chatsLoader: false,
  loadChats: async (userId) => {
    try {
      set({ chatsLoader: true });
      // if (useChatStore.getState().selectedChat) return null;
      const response = await axios.get("http://localhost:3000/api/chat", {
        headers: {
          userId: userId,
        },
      });
      set({ chatsLoader: false });
      set({ chats: response.data.chats });
    } catch (error) {
      console.log(error);
      toast.error("Error loading chats");
      set({ chatsLoader: false });
    }
  },
  addChat: async (user) => {
    try {
      useMessageStore.getState().messages = [];
      set({ selectedChat: null });
      set({ tempChat: true });
    } catch (error) {
      console.log(error);
      toast.error("Error adding chat");
    }
  },
  createChat: async (userId, message) => {
    try {
      const form = {
        message,
      };
      const response = await axios.post(
        "http://localhost:3000/api/chat",
        form,
        {
          headers: {
            userId: userId,
          },
        }
      );
      set({ selectedChat: response.data.chat });
      set({ tempChat: false });
      set({ chats: [response.data.chat, ...get().chats] });
    } catch (error) {
      console.log(error);
      toast.error("Error adding chat");
    }
  },
  selectChat: (chat) => {
    set({ tempChat: false });
    set({ selectedChat: chat });
  },
}));

export default useChatStore;
