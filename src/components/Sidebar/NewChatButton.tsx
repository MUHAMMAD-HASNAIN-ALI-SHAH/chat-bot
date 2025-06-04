"use client";
import useChatStore from "@/store/useChatStore";
import { useUser } from "@clerk/nextjs";
import React from "react";

const NewChatButton = () => {
  const { addChat } = useChatStore();
  const { user } = useUser();
  return (
    <div
      onClick={() => addChat(user)}
      className="w-full rounded-md px-1 py-2 flex gap-3 hover:bg-gray-300 cursor-pointer"
    >
      <i className="ri-chat-3-line"></i> New Chat
    </div>
  );
};

export default NewChatButton;
