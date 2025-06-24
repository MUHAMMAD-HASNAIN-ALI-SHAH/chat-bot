"use client";
import Link from "next/link";
import { SidebarTrigger } from "../ui/sidebar";
import { Button } from "@/components/ui/button";
import DropDown from "./DropDown";
import useThemeStore from "@/store/useThemeStore";

const Navbar = ({ session }: { session: any }) => {
  const { theme } = useThemeStore();
  const user = session?.user;
  return (
    <div
      className={`h-[10vh] select-none ${
        theme === "dark"
          ? "bg-[#212121] text-[#ECECEC] border-b-2 border-[#181818]"
          : "bg-white text-black  border-b-2 border-gray-300"
      } w-full flex justify-between items-center py-5 px-3`}
    >
      <div className="flex items-center gap-4">
        <SidebarTrigger
          className={`cursor-pointer ${
            theme === "dark"
              ? "hover:bg-[#212121] text-white"
              : "hover:bg-white"
          } `}
        />
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
