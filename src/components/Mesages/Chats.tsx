import useChatStore from "@/store/useChatStore";
import useMessageStore from "@/store/useMessageStore";
import { useEffect, useRef } from "react";
import { useUser } from "@clerk/nextjs";
import ReactMarkdown from "react-markdown";

const Chats = () => {
  const { selectedChat, tempChat } = useChatStore();
  const { getMessages, messages, sendMessageLoader } = useMessageStore();
  const { user } = useUser();
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
    <div className="w-full h-[90%] flex flex-col gap-5 overflow-y-scroll">
      {messages &&
        messages.map((message) => (
          <div
            key={message._id}
            className="flex flex-col gap-5 w-full px-3 py-2"
          >
            <div className="w-full text-right ">
              <span className="bg-gray-400 py-2 px-4 rounded-sm">
                {message.message}
              </span>
            </div>
            <div className="w-full">
              <div className="w-full bg-transparent">
                <ReactMarkdown>{message.reply}</ReactMarkdown>
              </div>
            </div>
          </div>
        ))}
      {sendMessageLoader && (
        <>
          <div className="flex flex-col gap-5 w-full px-3 py-2">
            <div className="w-full text-right ">
              <span className="bg-gray-400 py-2 px-4 rounded-sm">...</span>
            </div>
            <div className="w-full">
              <div className="w-full bg-transparent">...</div>
            </div>
          </div>
        </>
      )}
      <div ref={bottomRef} />
    </div>
  );
};

export default Chats;
