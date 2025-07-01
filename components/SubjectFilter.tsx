"use client";
import React, { useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { subjects } from "@/constants";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { formUrlQuery, removeKeysFromUrlQuery } from "@jsmastery/utils";
export const SubjectFilter = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("subject") || "";
  const [searchQuery, setsearchQuery] = useState(query);
  useEffect(() => {
    const debounce = setTimeout(() => {
      let newUrl = "";
      if (searchQuery === "all") {
        newUrl = removeKeysFromUrlQuery({
          params: searchParams.toString(),
          keysToRemove: ["subject"],
        });

        router.push(newUrl, { scroll: false });
      } else {
        newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: "subject",
          value: searchQuery,
        });
        router.push(newUrl, { scroll: false });
      }
    }, 300);
  }, [pathname, searchParams, searchQuery, router]);
  return (
    <Select
      onValueChange={(value) => setsearchQuery(value)}
      value={searchQuery}
    >
      <SelectTrigger className="w-[180px] border-black">
        <SelectValue placeholder="Select Subject" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem  value="all">All subjects</SelectItem>
        {subjects.map((subject) => (
          <SelectItem key={subject}  value={`${subject}`}>{subject}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
