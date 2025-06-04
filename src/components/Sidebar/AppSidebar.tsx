import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import SideBarList from "./SideBarList";
import NewChatButton from "./NewChatButton";

export function AppSidebar() {
  return (
    <Sidebar className="bg-white">
      <SidebarHeader>
        <div className="mt-10">
          <NewChatButton />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <div className="w-full">
            <SideBarList />
          </div>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
