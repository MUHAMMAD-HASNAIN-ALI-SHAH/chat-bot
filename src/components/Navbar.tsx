"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

const Navbar = () => {
  const router = useRouter();

  return (
    <div className="navbar absolute top-0 left-0 z-10">
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
