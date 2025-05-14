"use client";
import useChatStore from "@/store/useChatStore";
import useMessageStore from "@/store/useMessageStore";
import { useEffect, useRef } from "react";
import NoChatSelectedComponent from "./SubComponents/NoChatSelectedComponent";
import Navbar from "./Navbar";
import InputComponent from "./InputComponent";
import { UserButton, useUser } from "@clerk/nextjs";
import ReactMarkdown from "react-markdown";

const MessagesComponent = () => {
  const { selectedChat, tempChat } = useChatStore();
  const { getMessages, messages } = useMessageStore();
  const { user, isLoaded } = useUser();
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (selectedChat && user) {
      getMessages(user.id);
    }
  }, [selectedChat]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="h-full w-full">
      <div className="w-full h-[7%]">
        <Navbar />
      </div>
      <div
        className={`relative w-full ${
          tempChat ? "h-full" : "h-[73%]"
        } flex flex-col gap-2 px-5 py-3 overflow-y-auto`}
      >
        {selectedChat ? (
          <>
            <div className="w-full h-[80%] flex flex-col gap-5 px-5 pt-14">
              {messages &&
                messages.map((message) => (
                  <div key={message._id} className="flex flex-col gap-5">
                    <div className="chat chat-end">
                      <div className="chat-bubble bg-neutral-700 text-white">
                        {message.message}
                      </div>
                    </div>
                    <div className="w-full">
                      <div className="w-full bg-transparent text-white">
                        <ReactMarkdown>{message.reply}</ReactMarkdown>
                      </div>
                    </div>
                  </div>
                ))}
              <div ref={bottomRef} />
            </div>
          </>
        ) : (
          <div className="w-full h-full flex flex-col gap-3 justify-center items-center">
            <NoChatSelectedComponent />
            <InputComponent />
          </div>
        )}
      </div>
      <div
        className={`h-[20%] w-full mx-auto flex justify-center items-center mb-8 ${
          tempChat ? "hidden" : ""
        }`}
      >
        <InputComponent />
      </div>
    </div>
  );
};

export default MessagesComponent;
