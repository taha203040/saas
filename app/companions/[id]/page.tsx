import { CompanionCom } from "@/components/CompaionCom";
import { getCompanion } from "@/lib/actions/companion.action";
import { getSubjectColor } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import { redirect } from "next/navigation";

interface CompanionSessionPageProps {
  params: Promise<{ id: string }>;
}
const Newrfc = async ({ params }: CompanionSessionPageProps) => {
  const { id } = await params;
  const companion = await getCompanion(id);
  const { subject, name, topic, duration } = companion || {};
  const user = await currentUser();
  if (!user) redirect("/sign-in");
  if (!companion) redirect("/companions");
  return (
    <main>
      <article className="flex rounded-border border-black justify-between p-6 max-md:flex-col ">
        <div className="flex items-center gap-2">
          <div
            className="size-[72px] flex items-center justify-center rounded-lg max-md:hiddend"
            style={{ backgroundColor: getSubjectColor(subject) }}
          >
            <Image
              src={`/icons/${subject}.svg`}
              alt="hello"
              width={30}
              height={30}
            />
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <p className="font-bold text-2xl">{name}</p>
              <div className="subject-badge max:sm:hidden">{subject}</div>
            </div>
            <p className="text-1xl">{topic}</p>
          </div>
        </div>
        <div className="items-start text-2xl max-md:hidden">{duration}mins</div>
      </article>
      <CompanionCom key={id} {...companion} companionId={id} />
    </main>
  );
};

export default Newrfc;
