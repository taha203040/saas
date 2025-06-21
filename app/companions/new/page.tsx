import CompanionForm from "@/components/CompanionForm";

const NewCompanion = () => {
  return (
    <main className="min-lg:w-1/3 min-md:w-2/3  justify-center items-center">
      <article className="w-full gap-4 flex flex-col">
        <h1> hi create your companions</h1>
        <CompanionForm />
      </article>
    </main>
  );
};
export default NewCompanion;
