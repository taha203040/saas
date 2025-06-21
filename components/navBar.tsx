import Link from "next/link";
import React from "react";
import Image from "next/image";
import { SignInButton, UserButton, SignedIn, SignedOut } from "@clerk/nextjs";
import "../app/globals.css";
import NavItems from "./navItems";
import { Button } from "./ui/button";
const NavBar = () => {
  return (
    <nav className="navbar">
      <Link href="/" className="flex items-center gap-2.5 cursor-pointer">
        <div>
          <Image src="/images/logo.svg" alt="" width={46} height={44} />
        </div>
      </Link>
      <NavItems />
      <SignedOut>
        <SignInButton mode="modal">
          <Button className="btn-signin">Sign in</Button>
        </SignInButton>
      </SignedOut>

      <SignedIn>
        <UserButton afterSignOutUrl="/" />
      </SignedIn>
    </nav>
  ); 
};

export default NavBar;
