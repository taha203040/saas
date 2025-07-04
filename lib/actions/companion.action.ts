"use server";
import { auth } from "@clerk/nextjs/server";
import { createSupabaseClient } from "../supabase";
import { th } from "zod/v4/locales";

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

export const getAllCompanion = async ({
  limit = 10,
  page = 1,
  subject,
  topic,
}: GetAllCompanions) => {
  const supabase = createSupabaseClient(); // connect oto DB
  const { userId } = await auth(); // get the user id
  let query = supabase.from("Companions").select().eq("author", userId);
  if (subject && topic) {
    query = query.or(
      `subject.ilike.%${subject}%,topic.ilike.%${topic}%,name.ilike.%${topic}%`
    );
  } else if (subject) {
    query = query.ilike("subject", `%${subject}%`);
  } else if (topic) {
    query = query.or(`topic.ilike.%${topic}%,name.ilike.%${topic}%`);
  }

  query = query.range((page - 1) * limit, page * limit - 1);
  const { data: companions, error } = await query;
  if (error) throw new Error(error.message);
  return companions;
};

export const getCompanion = async (id: string) => {
  const supabase = createSupabaseClient();
  const { data, error } = await supabase
    .from("Companions")
    .select()
    .eq("id", id);

  if (error) return console.log(error);
  return data[0];
};
export const addToSessionHistory = async (companionId: string) => {
  // defind the use with userid
  const { userId } = await auth();
  console.log("User ID:", userId);
  console.log("Companion ID:", companionId);
  // connect to supabase
  const supabase = createSupabaseClient();
  // insert the companion session in to db
  const { data, error } = await supabase.from("session_history").insert({
    companion_id: companionId,
    user_id: userId,
  });
  if (error) {
    // console.log(data)
    console.error("Error adding to session history:", error);
    throw new Error(error.message || "Failed to add to session history");
  }
  return data;
};
export const getRecentSession = async (limit = 10) => {
  const supabase = createSupabaseClient();
  const { data, error } = await supabase
    .from("session_history")
    .select("Companions:companion_id(*)")
    .order("created_at", { ascending: false })
    .limit(limit);
  if (error)
    throw new Error(error.message || "Failed to fetch recent sessions");
  return data.map(({ Companions }) => Companions); // ✅
};
export const getUserSession = async (userId: string, limit = 10) => {
  const supabase = createSupabaseClient();
  const { data, error } = await supabase
    .from("session_history")
    .select("Companions:companion_id(*)")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(limit);
  if (error)
    throw new Error(error.message || "Failed to fetch recent sessions");
  return data.map(({ Companions }) => Companions); // ✅
};
export const getUserCompanions = async (userId: string) => {
  const supabase = createSupabaseClient();
  const { data, error } = await supabase
    .from("Companions")
    .select()
    .eq("author", userId);

  if (error) return console.log(error);
  return data;
};

export const canAccesscompanion = async () => {
  // supabase connection
  let limit: number = 0;
  const supabase = createSupabaseClient();
  // get user id and needed methods to work
  const { userId, has } = await auth();
  //

  // check if the user has acces by the slug feature
  if (has({ plan: "boos" })) {
    return true;
  } else if (has({ feature: "3_activ_companions_month" })) {
    limit = 3;
  } else if (has({ feature: "10_companion_limit" })) {
    limit = 10;
  }
  // setup the database query
  const { data, error } = await supabase
    .from("Companions")
    .select("id", { count: "exact" })
    .eq("author", userId);

  if (error) {
    throw new Error(error.message || "Failed to fetch companions");
  }
  console.log("User ID:", userId);
  console.log("Companion data:", data);
  const countCompanion: number = data?.length;
  console.log("Count of companions:", countCompanion);
  console.log("Limit for companions:", limit);
  console.log("condition ", countCompanion >= limit);
  if (countCompanion >= limit) {
    return false; // Limit reached, cannot create more companions
  } else {
    return true;
  }
};
export const bookCompanion = async (companion_id: string) => {
  // get data
  const { userId } = await auth();
  const supabase = createSupabaseClient();
  const { data, error: fetchError } = await supabase
    .from("Companions")
    .select("isBoocked")
    .eq("id", companion_id)
    .single();
  const currentIsboocked = data?.isBoocked ?? false;
  const newIsboocked = !currentIsboocked; // Toggle the booking status

  const { error } = await supabase
    .from("Companions")
    .update({ isBoocked: newIsboocked })
    .eq("author", userId)
    .eq("id", companion_id);

  if (error) throw new Error(error.message || "Failed to book companion");

  return newIsboocked;
};
