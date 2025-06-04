"use client";
import useChatStore from "@/store/useChatStore";
import NoChatSelectedComponent from "../NoChatSelected/NoChatSelectedComponent";
import InputComponent from "../MessageInput/InputComponent";
import Chats from "./Chats";

const MessagesComponent = () => {
  const { selectedChat, tempChat } = useChatStore();

  return (
    <>
      {selectedChat ? (
        <div
          className={`relative w-full h-full ${
            tempChat ? "" : "h-[100%]"
          } flex flex-col gap-2 py-1 pt-2`}
        >
          <Chats />
          <div
            className={`h-[10%] w-full mx-auto flex justify-center items-center my-3 ${
              tempChat ? "hidden" : ""
            }`}
          >
            <InputComponent />
          </div>
        </div>
      ) : (
        <div className="w-full h-full flex flex-col gap-3 justify-center items-center">
          <NoChatSelectedComponent />
          <div className="w-full h-[10%] mx-auto flex justify-center items-center my-3">
            <InputComponent />
          </div>
        </div>
      )}
    </>
  );
};

export default MessagesComponent;
