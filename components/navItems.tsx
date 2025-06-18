/* eslint-disable @typescript-eslint/no-unused-vars */
"use Client ";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const navItems = [
  {
    label: "Home",
    herf: "/",
  },

  {
    label: "signin",
    herf: "/sign-in",
  },
  {
    label: "companions",
    herf: "/companions",
  },
  {
    label: "subscribtion",
    herf: "/subscribtion",
  },
  {
    label: "my journey",
    herf: "/my journey",
  },
];
const NavItems = () => {
  const pathname = usePathname();
  return (
    <nav className="flex items-center gap-4">
      {navItems.map(({ label, herf }) => (
        <Link
          href={herf}
          key={label}
          className={cn(pathname === herf && "text-primery font-semibold ")}
        >
          {label}
        </Link>
      ))}
    </nav>
  );
};

export default NavItems;
