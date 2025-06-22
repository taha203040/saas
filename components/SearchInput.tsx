"use client";

import Image from "next/image";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useState } from "react";
import { formUrlQuery, removeKeysFromUrlQuery } from "@jsmastery/utils";
const SearchInput = () => {
  // define the paarams
  const pathname = usePathname(); //
  const router = useRouter();
  const searchParams = useSearchParams();
  //   const query = searchParams.get("topic") || "";
  const [searchQuery, setsearchQuery] = useState("");

  useEffect(() => {
    const debounce = setTimeout(() => {
      if (searchQuery) {
        const newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: "topic",
          value: searchQuery,
        });
        router.push(newUrl, { scroll: false });
      } else {
        if (pathname === "/companions") {
          const newUrl = removeKeysFromUrlQuery({
            params: searchParams.toString(),
            keysToRemove: ["topic"],
          });
          router.push(newUrl, { scroll: false });
        }
      }
    }, 500);
  }, [searchParams, searchQuery, router, pathname]);
  return (
    <div className="relative flex items-center gap-2 px-3 py-1  rounded-xl border border-black ">
      <Image src="/icons/search.svg" width={15} height={15} alt="search" />
      <input
        style={{ outline: "none" }}
        className="outline-none border-black"
        type="text"
        placeholder="Search companion ...."
        value={searchQuery}
        onChange={(e) => setsearchQuery(e.target.value)}
      />
    </div>
  );
};

export default SearchInput;
