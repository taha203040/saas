// import CompanionForm from "@/components/CompanionForm";
// import { auth } from "@clerk/nextjs/server";
// import { redirect } from "next/navigation";

// const NewCompanion = async () => {
//   const { userId } = await auth();
//   if (!userId) {
//     redirect("/sign-in");
//   }
//   return (
//     <main className="min-lg:w-1/3 min-md:w-2/3  justify-center items-center">
//       <article className="w-full gap-4 flex flex-col">
//         <h1> hi create your companions</h1>
//         <CompanionForm key={1} />
//       </article>
//     </main>
//   );
// };
// export default NewCompanion;
import CompanionForm from "@/components/CompanionForm";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const NewCompanion = async () => {
  return (
    <main className="w-full md:w-2/3 lg:w-1/3 mx-auto flex justify-center items-center">
      <article className="w-full gap-4 flex flex-col">
        <h1 className="text-2xl font-bold mb-4">Create Your Companion</h1>
        <CompanionForm key={12} />
      </article>
    </main>
  );
};

export default NewCompanion;
