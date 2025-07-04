/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
interface companionsProps {
  id: string;
  name: string;
  topic: string;
  color: string;
  duration: number;
  subject: string;
}
import { bookCompanion } from "@/lib/actions/companion.action";
const CompanionsCard = ({
  color,
  id,
  name,
  topic,
  duration,
  subject,
}: companionsProps) => {
  const [bookmarked, setBookmarked] = useState(false);
  const [isloading, setIsloading] = useState(false);
  useEffect(() => {
    const fetchBookmarkStatus = async () => {
      try {
        const booking = await bookCompanion(id);
        if (booking) {
          setBookmarked(true);
        } else {
          setBookmarked(false);
        }
      } catch (error) {
        console.error("Error fetching bookmark status:", error);
      }
    };
    fetchBookmarkStatus();
  }, [id]);
  const toggleBookmark = async () => {
    try {
      setIsloading(true);
      const updateBookmark = await bookCompanion(id);
      if (updateBookmark) {
        setBookmarked(true);
      } else {
        setBookmarked(false);
      }
    } catch (error) {
      console.error("Error toggling bookmark:", error);
    } finally {
      setIsloading(false);
    }
  };
  return (
    <article className="companion-card" style={{ background: color }}>
      <div className="flex justify-between items-center">
        <div className="subject-badge">{subject}</div>
        <button className="companion-bookmark" onClick={toggleBookmark}>
          <Image
            src={
              bookmarked ? "/icons/bookmark-filled.svg" : "/icons/bookmark.svg"
            }
            width={20}
            height={20}
            alt="bookmark"
          />
        </button>
      </div>
      <h2 className="text-2xl font-bold"> {name}</h2>
      <p className="text-sm">{topic}</p>
      <div className="flex items-center gap-2">
        <Image
          src="/icons/clock.svg"
          width={13.5}
          height={13.5}
          alt="duration"
        />
        <p className="text-sm"> {duration} minutes</p>
      </div>
      <Link href={`/companions/${id}`} className="w-full">
        <button className="btn-primary w-full justify-center">
          Lunch lesson
        </button>
      </Link>
    </article>
  );
};

export default CompanionsCard;
