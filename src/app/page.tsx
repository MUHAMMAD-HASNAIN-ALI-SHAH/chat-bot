import MessagesComponent from "@/components/Mesages/MessagesComponent";
import Navbar from "@/components/Navbar/Navbar";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/Sidebar/AppSidebar";

export default async function Home() {
  const session = await auth();
  if (!session) {
    redirect("/signin");
  }
  return (
    <SidebarProvider>
      <AppSidebar session={session} />
      <div className="w-full h-screen bg-gray-200 overflow-hidden">
        <Navbar session={session} />
        <div className="flex w-full h-[90vh] overflow-hidden">
          <MessagesComponent session={session} />
        </div>
      </div>
    </SidebarProvider>
  );
}
