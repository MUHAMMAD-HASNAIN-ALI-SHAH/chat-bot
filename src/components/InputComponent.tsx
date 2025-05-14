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
    <div className="w-2/3 px-5 bg-neutral-700 py-3 rounded-3xl">
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input
          type="text"
          className="w-full outline-none focus:ring-0 text-white px-3 py-2 rounded"
          placeholder="Type your message here ..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <div className="flex justify-end">
          <button
            type="submit"
            className="rounded-full bg-white hover:bg-white/70"
          >
            <div className="px-2 py-1 cursor-pointer">
              <i className="ri-arrow-up-line text-black text-xl"></i>
            </div>
          </button>
        </div>
      </form>
    </div>
  );
};

export default InputComponent;
