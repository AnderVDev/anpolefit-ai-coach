"use client";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const routes = [
  {
    name: "Chat",
    path: "/",
  },
  {
    name: "Calculator",
    path: "/calculator",
  },
  {
    name: "Recipes",
    path: "/recipes",
  },
  {
    name: "Profile",
    path: "/profile",
  },
];

function Navbar() {
  const pathname = usePathname();
  return (
    <div className="p-4 flex flex-row justify-between items-center b text-white">
      <Link href="/">
        <h1 className="text-xl font-bold">AnpoleFit AI</h1>
      </Link>
      <div className="flex gap-x-6 text-sm items-center">
        {routes.map((route, idx) => (
          <Link
            key={idx}
            href={route.path}
            className={
              pathname === route.path
                ? "border-b-2 border-gray-500 font-extrabold"
                : ""
            }
          >
            {route.name}
          </Link>
        ))}

        <UserButton />
        {/* <UserButton fallbackRedirectUrl="/"/> */}
        {/* <UserButton afterSignOutUrl="" /> */}
      </div>
    </div>
  );
}

export default Navbar;
