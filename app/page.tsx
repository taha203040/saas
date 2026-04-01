import React from "react";
import CompanionsCard from "../components/CompanionsCard";
import Cta from "../components/Cta";
import CompanionList from "../components/CompaionsList";
import {
  getAllCompanion,
  getRecentSession,
} from "@/lib/actions/companion.action";
import { getSubjectColor } from "@/lib/utils";
const Page = async () => {
  const companionList = await getAllCompanion({ limit: 3 });
  const recentSessionCompanions = await getRecentSession(3);
  return (
    <main>
      <h1 className="text-2xl underline">Dashboard</h1>

      <section className="home-section">
        {companionList.map(
          ({  id, name, subject, topic, duration }) => (
            <CompanionsCard
              color={getSubjectColor(subject)}
              key={id}
              id={id}
              name={name}
              subject={subject}
              topic={topic}
              duration={duration}
            />
          )
        )}
      </section>
      <section className="home-section">
        <CompanionList
          title="Some Title"
          companions={recentSessionCompanions}
          classNames="w-2/3 max-lg:w-full"
        />
        <Cta />
      </section>
    </main>
  );
};

export default Page;
