import React from "react";
import CompanionsCard from "../components/CompanionsCard";
import Cta from "../components/Cta";
import CompanionList from "../components/CompaionsList";
// import { CompaionsList } from "@/components/CompaionsList";
const Page = () => {
  return (
    <main>
      <h1 className="text-2xl underline">Dashboard</h1>

      <section className="home-section">
        <CompanionsCard
          subject="Sience"
          id="12"
          name="Neura the Brainy Explorer"
          topic="Neural Network of the Brain"
          duriation={45}
          color=" #E5D0FF"
        />
        <CompanionsCard
          subject="Sience"
          id="12"
          name="Countsy the Number Wizard"
          topic="Topic: Derivatives & Integrals"
          duriation={45}
          color="#FFDA6E"
        />
        <CompanionsCard
          subject="Sience"
          id="12"
          name="Verba the Vocabulary Builder"
          topic="Topic: English Literature "
          duriation={45}
          color="#BDE7FF"
        />
      </section>
      <section className="home-section">
        <Cta />
        <CompanionList title="a;sldkfj;alskf" />
      </section>
    </main>
  );
};

export default Page;
