"use client"
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { SidebarTrigger } from "../ui/sidebar";

const Navbar = () => {
  return (
    <div className="h-[10vh] w-full flex justify-between py-5 px-3 border-b-2 border-gray-300">
      <div>
        <SidebarTrigger />
      </div>
      <div className="flex-1">
        <Link href={"/"} className="px-3 text-xl font-bold">
          Hasnain Chat
        </Link>
      </div>
      <div className="flex gap-4">
        <div>
          <UserButton />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
