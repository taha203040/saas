"use server";
import { auth } from "@clerk/nextjs/server";
import { createSupabaseClient } from "../supabase";

export const createCompanion = async (formData: CreateCompanion) => {
  const { userId: authorId } = await auth();
  const supabase = createSupabaseClient();

  const { data, error } = await supabase
    .from("Companions")
    .insert({ ...formData, author: authorId })
    .select();
  if (error || !data) {
    console.error("Supabase error:", error);
    throw new Error(error?.message || "Failed to create the companion");
  }

  return data[0];
};
