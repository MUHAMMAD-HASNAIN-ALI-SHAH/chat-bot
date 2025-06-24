"use client";
import { signOut } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Profile } from "../profile/Profile";

const DropDown = ({ user }: { user: any }) => {
  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" }); // redirects to home after logout
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer">
          {user?.image ? (
            <img
              src={user.image}
              alt={user.name}
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <span className="text-gray-600 font-semibold">
              {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
            </span>
          )}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <Profile />
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={handleLogout}
          className="cursor-pointer hover:bg-gray-200 transition duration-200"
        >
          <i className="ri-logout-box-r-line"></i> Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropDown;
