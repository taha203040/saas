/* eslint-disable @typescript-eslint/no-unused-vars */
import Image from "next/image";
import Link from "next/link";
interface companionsProps {
  id: string;
  name: string;
  topic: string;
  color: string;
  duration: number;
  subject: string;
}

const CompanionsCard = ({
  color,
  id,
  name,
  topic,
  duration,
  subject,
}: companionsProps) => {
  return (
    <article className="companion-card" style={{ background: color }}>
      <div className="flex justify-between items-center">
        <div className="subject-badge">{subject}</div>
        <button className="companion-bookmark">
          <Image
            src="/icons/bookmark.svg"
            alt="bookmark"
            width={12.5}
            height={15}
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
