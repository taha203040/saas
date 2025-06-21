/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const navItems = [
  {
    label: "Home",
    href: "/",
  },

  {
    label: "companions",
    href: "/companions",
  },
  {
    label: "subscribtion",
    href: "/subscribtion",
  },
  {
    label: "my journey",
    href: "/my-journey",
  },
];
const NavItems = () => {
  const pathname = usePathname();
  return (
    <nav className="flex items-center gap-4">
      {navItems.map(({ label, href }) => (
        <Link
          href={href}
          key={label}
          className={cn(
            "text-gray-500 hover:text-primary transition-colors",
            pathname === href && "text-primary font-semibold "
          )}
        >
          {label}
        </Link>
      ))}
    </nav>
  );
};

export default NavItems;
