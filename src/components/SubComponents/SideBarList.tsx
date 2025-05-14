"use client";
import useChatStore from "@/store/useChatStore";
import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";

const SideBarList = () => {
  const { loadChats, chats, selectedChat, selectChat } = useChatStore();
  const { user,isLoaded } = useUser();

  useEffect(() => {
    const fetchChats = async () => {
      loadChats(user!.id);
    }
    if (isLoaded && user) {
      fetchChats();
    }
  }, [user, loadChats]);

  return (
    <>
      {chats.length > 0 ? (
        chats.map((chat) => (
          <button
            onClick={() => selectChat(chat)}
            key={chat._id}
            className={`btn btn-ghost text-start ${
              selectedChat?._id === chat._id ? "bg-gray-100 text-black" : ""
            }`}
          >
            {chat.chatName ? chat.chatName : "New Chat"}
          </button>
        ))
      ) : (
        <div className="flex flex-col gap-2">
          <h1 className="text-sm">No chats found</h1>
        </div>
      )}
    </>
  );
};

export default SideBarList;
