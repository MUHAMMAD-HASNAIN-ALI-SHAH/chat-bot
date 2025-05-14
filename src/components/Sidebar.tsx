import AddChatSideBar from "./SubComponents/AddChatSideBar";
import SideBarList from "./SubComponents/SideBarList";

const Sidebar = () => {
  return (
    <div className="flex flex-col gap-3 px-4 pt-9 overflow-y-auto h-full bg-neutral-900 w-full">
      <AddChatSideBar />
      <div className="flex flex-col gap-5 mt-10">
        <h1 className="text-sm">Your chats</h1>
        <SideBarList />
      </div>
    </div>
  );
};

export default Sidebar;
