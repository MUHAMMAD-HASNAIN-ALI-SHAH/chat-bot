"use client";
import useChatStore from "@/store/useChatStore";
import useMessageStore from "@/store/useMessageStore";
import { useEffect, useRef } from "react";
import NoChatSelectedComponent from "./SubComponents/NoChatSelectedComponent";
import Navbar from "./Navbar";
import InputComponent from "./InputComponent";
import { useUser } from "@clerk/nextjs";

const MessagesComponent = () => {
  const { selectedChat } = useChatStore();
  const { getMessages, messages } = useMessageStore();
  const { user, isLoaded } = useUser();
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (selectedChat && user) {
      getMessages(user.id);
    }
  }, [selectedChat, isLoaded]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="h-full w-full relative overflow-y-hidden overflow-x-hidden">
      <Navbar />
      {selectedChat ? (
        <>
          <div className="w-full h-full flex flex-col gap-3 px-5 pt-14">
            {messages &&
              messages.map((message) => (
                <div key={message._id}>
                  <div className="chat chat-end">
                    <div className="chat-bubble">{message.message}</div>
                  </div>
                  <div className="chat chat-start">
                    <div className="chat-bubble">{message.reply}</div>
                  </div>
                </div>
              ))}
            <div ref={bottomRef} />
            <div className="absolute bottom-0 w-full mx-auto flex justify-center items-center mb-8">
              <InputComponent />
            </div>
          </div>
          <div></div>
        </>
      ) : (
        <div className="w-full h-full flex flex-col gap-3 justify-center items-center">
          <NoChatSelectedComponent />
          <InputComponent />
        </div>
      )}
    </div>
  );
};

export default MessagesComponent;
