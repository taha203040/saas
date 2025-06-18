import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import Link from "next/link";
interface CompanionListProps {
  title: string;
  companions?: Companion[];
  classNames?: string;
}
const CompanionList = ({
  title,
  companions,
  classNames,
}: CompanionListProps) => {
  return (
    <article className={cn("companion-list", classNames)}>
      <h2 className="text-3xl font-bold">Recent Sessions</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-lg w-2/3 ">Lessons</TableHead>
            <TableHead className="text-lg">Subject</TableHead>
            <TableHead className="text-lg text-right">Durations</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {companions?.map(({id , subject , name , topic , duration}) => (
            <TableRow>
              <TableCell>
                <Link href={`/companions/${id}`}>
                  {subject}
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </article>
  );
};
export default CompanionList;