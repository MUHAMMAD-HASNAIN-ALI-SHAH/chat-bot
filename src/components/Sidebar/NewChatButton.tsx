"use client";
import useChatStore from "@/store/useChatStore";
import React from "react";

const NewChatButton = ({ session }: { session: any }) => {
  const { addChat } = useChatStore();
  const user = session?.user;
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
