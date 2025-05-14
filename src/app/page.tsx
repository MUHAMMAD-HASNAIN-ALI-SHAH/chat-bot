import MessagesComponent from "@/components/MessagesComponent";
import Sidebar from "@/components/Sidebar";

export default function Home() {
  return (
    <div className="w-full h-screen bg-neutral-800 relative">
      <div className="flex w-full h-full 2xl:mx-auto">
        <div className="flex w-full">
          <div className="w-[300px]">
            <Sidebar />
          </div>
          <div className="w-full">
            <MessagesComponent />
          </div>
        </div>
      </div>
    </div>
  );
}
