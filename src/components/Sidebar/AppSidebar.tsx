import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import SideBarList from "./SideBarList";
import NewChatButton from "./NewChatButton";
import { auth } from "@/lib/auth";

export async function AppSidebar() {
  const session = await auth();
  return (
    <Sidebar className="bg-white">
      <SidebarHeader>
        <div className="mt-10">
          <NewChatButton session={session} />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <div className="w-full">
            <SideBarList session={session} />
          </div>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
