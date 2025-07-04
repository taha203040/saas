import CompanionForm from "@/components/CompanionForm";
import { canAccesscompanion } from "@/lib/actions/companion.action";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

const NewCompanion = async () => {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");
  const canCreateCompaion = await canAccesscompanion();
  console.log("Can create companion:", canCreateCompaion);
  return (
    <main className="w-full md:w-2/3 lg:w-1/3 mx-auto flex justify-center items-center">
      {canCreateCompaion ? (
        <article className="w-full gap-4 flex flex-col">
          <h1 className="text-2xl font-bold mb-4">Create Your Companion</h1>
          {/* @ts-ignore */}
          <CompanionForm />
        </article>
      ) : (
        <article className="flex flex-col items-center justify-center gap-9">
          <Image
            src="/images/limit.svg"
            alt="Companion Limit reached"
            width={360}
            height={360}
          />
          <div className="cta-badge">Upgrade Your Plan</div>
          <h1>You’ve Reached Your Limit</h1>
          <p>
            You’ve reached your companion limit. Upgrade to create more
            companions and premium features.
          </p>
          <Link
            href="/subscribtion"
            className="btn-primary w-full justify-center"
          >
            Upgrade My Plan
          </Link>
        </article>
      )}
    </main>
  );
};

export default NewCompanion;
