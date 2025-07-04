import Image from "next/image";
import React, { use } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  getUserCompanions,
  getUserSession,
} from "@/lib/actions/companion.action";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import CompanionList from "@/components/CompaionsList";
const Profile = async () => {
  const user = await currentUser();
  if (!user) redirect("/sign-in");
  const companions = await getUserCompanions(user.id);
  const sessionHistory = await getUserSession(user.id);
  return (
    <main className="min-lg::w3/4">
      <section className="flex justify-between gap-4 max-sm:flex-col">
        <div className="flex gap-4">
          <Image
            src={user.imageUrl}
            width={100}
            height={100}
            // @ts-ignore
            alt={user.firstName}
            className="rounded-lg"
          />
          <div className="flex flex-col gap-2">
            <h1 className="font-bold text-2xl">
              {user.firstName} {user.lastName}
            </h1>
            <p className="text-sm text-muted-foreground">
              {user.emailAddresses[0]?.emailAddress}
            </p>
          </div>
        </div>
        <div className="flex gap-4 ">
          <div className="border-black border p-3 rounded-lg gap-2 flex flex-col h-fit">
            <div className="flex gap2 items-center">
              <Image width={22} height={22} alt="done" src="/icons/check.svg" />
              <p className="text-2xl font-bold">{sessionHistory.length}</p>{" "}
            </div>
            <div>Lessons Completed</div>
          </div>
          <div className="border-black border p-3 rounded-lg gap-2 flex flex-col h-fit">
            <div className="flex gap2 items-center">
              <Image width={22} height={22} alt="done" src="/icons/cap.svg" />
              {/* @ts-ignore */}
              <p className="text-2xl font-bold">{companions.length}</p>{" "}
            </div>
            <div>Companions Created</div>
          </div>
        </div>
      </section>
      <Accordion type="multiple">
        <AccordionItem value="recent">
          <AccordionTrigger className="text-2xl font-bold">
            Recent Sessions
          </AccordionTrigger>
          <AccordionContent>
            <CompanionList title="Recent Session" companions={sessionHistory} />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="companions">
          <AccordionTrigger className="text-2xl font-bold">
            My Companions
            {
              // @ts-ignore */
              `(${companions.length})`
            }
          </AccordionTrigger>
          <AccordionContent>
            <CompanionList
              title="My Companions"
              // @ts-ignore
              companions={companions}
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </main>
  );
};

export default Profile;
