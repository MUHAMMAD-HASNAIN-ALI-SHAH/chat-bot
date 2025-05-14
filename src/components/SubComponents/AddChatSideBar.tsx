"use client";
import useChatStore from "@/store/useChatStore";
import { useUser } from "@clerk/nextjs";

const AddChatSideBar = () => {
  const { addChat } = useChatStore();
  const {user} = useUser();

  return (
    <div className="">
      <div onClick={() => addChat(user)} className="w-full rounded-md px-1 py-2 flex gap-3 hover:bg-neutral-500 cursor-pointer">
        <i className="ri-chat-3-line"></i> New Chat
      </div>
    </div>
  );
};

export default AddChatSideBar;
