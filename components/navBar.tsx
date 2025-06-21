import Link from "next/link";
import React from "react";
import Image from "next/image";
import { SignInButton, SignUpButton, UserButton, SignedIn, SignedOut } from "@clerk/nextjs";
import "../app/globals.css";
const NavBar = () => {
  return (
    <nav className="navbar">
      <Link href="/" className="flex items-center gap-2.5 cursor-pointer">
        <div>
          <Image src="/images/logo.svg" alt="" width={46} height={44} />
        </div>
      </Link>
      <div className="flex items-center gap-8">
        <p>Home</p>
        <p>My journy</p>
        <SignedOut>
          <SignInButton />
          <SignUpButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
        <p>Companions</p>
      </div>
    </nav>
  );
};

export default NavBar;
