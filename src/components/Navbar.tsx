"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { UserButton } from "@clerk/nextjs";

const Navbar = () => {
  const router = useRouter();

  return (
    <div className="navbar">
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
