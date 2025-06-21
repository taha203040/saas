import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

export const checkAndRedirect = async () => {
  const { userId } = await auth();
  if (!userId) {
    redirect("/sign-in");
  }
};
