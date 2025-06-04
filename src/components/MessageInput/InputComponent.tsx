"use client";
import useChatStore from "@/store/useChatStore";
import useMessageStore from "@/store/useMessageStore";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";

const InputComponent = () => {
  const [message, setMessage] = useState("");
  const { sendMessage } = useMessageStore();
  const { selectedChat, createChat, tempChat } = useChatStore();
  const { user } = useUser();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!message.trim()) {
      return;
    }

    if (tempChat) {
      await createChat(user!.id, message);
      await sendMessage({
        message: message,
        userId: user!.id,
        chatId: selectedChat?._id,
      });
    }

    if (selectedChat) {
      await sendMessage({
        message: message,
        userId: user!.id,
        chatId: selectedChat._id,
      });
    }

    setMessage("");
  };

  return (
    <div className="w-2/3 px-5 shadow-2xl py-3 border-2 border-gray-500 rounded-3xl h-full">
      <form onSubmit={handleSubmit} className="relative flex flex-col gap-2">
        <input
          type="text"
          className="w-full outline-none focus:ring-0 px-3 py-2 rounded pr-14"
          placeholder="Type your message here ..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          type="submit"
          className="absolute rounded-full bg-black hover:bg-black/75 px-3 py-2 right-0 cursor-pointer"
        >
          <i className="ri-arrow-up-line text-white"></i>
        </button>
      </form>
    </div>
  );
};

export default InputComponent;
