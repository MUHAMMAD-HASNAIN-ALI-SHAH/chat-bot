"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import SideBarList from "./SideBarList";
import NewChatButton from "./NewChatButton";
import Mode from "./Mode";
import useThemeStore from "@/store/useThemeStore";

export function AppSidebar({ session }: { session: any }) {
  const { theme } = useThemeStore();
  return (
    <Sidebar
      className={`${
        theme === "dark" ? "bg-[#181818] border-r border-[#181818] text-[#ECECEC]" : "bg-white text-black"
      }`}
    >
      <SidebarHeader
        className={`${
          theme === "dark"
            ? "bg-[#181818] text-[#ECECEC]"
            : "bg-white text-black"
        }`}
      >
        <div className="mt-10">
          <NewChatButton session={session} />
        </div>
      </SidebarHeader>
      <SidebarContent
        className={`${
          theme === "dark"
            ? "bg-[#181818] text-[#ECECEC]"
            : "bg-white text-black"
        }`}
      >
        <SidebarGroup>
          <div className="w-full">
            <SideBarList session={session} />
          </div>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter
        className={`${
          theme === "dark"
            ? "bg-[#181818] text-[#ECECEC]"
            : "bg-white text-black"
        }`}
      >
        <Mode />

        <div className="flex justify-center items-center w-full h-10 text-gray-500 text-sm">
          <p>Made with ❤️ by AskAI</p>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
