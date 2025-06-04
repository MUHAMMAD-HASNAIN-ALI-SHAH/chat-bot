import MessagesComponent from "@/components/Mesages/MessagesComponent";
import Navbar from "@/components/Navbar/Navbar";

export default function Home() {
  return (
    <div className="w-full h-screen bg-white overflow-hidden">
      <Navbar />
      <div className="flex w-full h-[90vh] overflow-hidden">
        <MessagesComponent />
      </div>
    </div>
  );
}
