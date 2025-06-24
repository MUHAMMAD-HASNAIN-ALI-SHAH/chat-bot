"use client";
import useChatStore from "@/store/useChatStore";
import NoChatSelectedComponent from "../NoChatSelected/NoChatSelectedComponent";
import InputComponent from "../MessageInput/InputComponent";
import Chats from "./Chats";
import useThemeStore from "@/store/useThemeStore";

const MessagesComponent = ({ session }: { session: any }) => {
  const { selectedChat, tempChat } = useChatStore();
  const { theme } = useThemeStore();
  return (
    <div
      className={`h-[100%] w-full ${
        theme === "dark" ? "bg-[#212121] text-[#ECECEC]" : "bg-white text-black"
      }`}
    >
      <div>
        <Chats session={session} />
        <div
          className={`h-[10%] w-full mx-auto flex justify-center items-center my-3 ${
            tempChat ? "hidden" : ""
          }`}
        ></div>
      </div>
    </div>
  );
};

export default MessagesComponent;
