import CompanionsCard from "@/components/CompanionsCard";
import SearchInput from "@/components/SearchInput";
import { getAllCompanion } from "@/lib/actions/companion.action";
import { getSubjectColor } from "@/lib/utils";
import React from "react";

const Companions = async ({ searchParams }: SearchParams) => {
  const filters = await searchParams;
  const subject = filters.subject ? filters.subject : "";
  const topic = filters.topic ? filters.topic : "";
  const companion = await getAllCompanion({ subject, topic });
  console.log(companion);
  
  return (
    <main>
      <section className="flex justify-between gap-4 max-sm:flex-col">
        <h1>Companion Library</h1>
        <SearchInput />
        
      </section>
      <section>
        <div className="companions-grid">
          {companion.map((companion) => (
            <CompanionsCard
            duration={companion.duration}
              key={companion.id}
              {...companion}
              color={getSubjectColor(companion.subject)}
            />
          ))}
        </div>
      </section>
    </main>
  );
};
export default Companions;
