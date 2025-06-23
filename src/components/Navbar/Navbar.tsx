"use client";
import Link from "next/link";
import { SidebarTrigger } from "../ui/sidebar";
import { Button } from "@/components/ui/button";
import DropDown from "./DropDown";

const Navbar = ({ session }: { session: any }) => {
  const user = session?.user;
  return (
    <div className="h-[10vh] select-none bg-white w-full flex justify-between items-center py-5 px-3 border-b-2 border-gray-300">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="cursor-pointer hover:bg-white" />
        <Link href={"/"} className="font-semibold">
          AskAI
        </Link>
      </div>
      <div className="">
        <div>
          {user ? (
            <DropDown user={user} />
          ) : (
            <Button className="btn btn-ghost text-lg font-semibold">
              Sign In
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
