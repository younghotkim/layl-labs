import { getSupabaseAdmin } from "./supabase";

export interface Clip {
  id: string;
  title: string;
  summary: string;
  source_url: string | null;
  source_name: string | null;
  tags: string[];
  created_at: string;
}

export async function getRecentClips(limit = 10): Promise<Clip[]> {
  const { data, error } = await getSupabaseAdmin()
    .from("clips")
    .select("id, title, summary, source_url, source_name, tags, created_at")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error || !data) return [];

  return data;
}

export async function getAllClips(): Promise<Clip[]> {
  const { data, error } = await getSupabaseAdmin()
    .from("clips")
    .select("id, title, summary, source_url, source_name, tags, created_at")
    .order("created_at", { ascending: false });

  if (error || !data) return [];

  return data;
}
