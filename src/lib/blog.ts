import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { getSupabaseAdmin } from "./supabase";

const POSTS_DIR = path.join(process.cwd(), "src/content/blog");

export interface Post {
  slug: string;
  title: string;
  date: string;
  category: string;
  summary: string;
  readingTime: string;
  content: string;
}

// ── 로컬 마크다운 파일에서 읽기 (fallback / seed 데이터) ──

function getLocalPosts(): Post[] {
  if (!fs.existsSync(POSTS_DIR)) return [];

  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".md"));

  return files.map((file) => {
    const slug = file.replace(/\.md$/, "");
    const raw = fs.readFileSync(path.join(POSTS_DIR, file), "utf-8");
    const { data, content } = matter(raw);
    const stats = readingTime(content);

    return {
      slug,
      title: data.title ?? slug,
      date: data.date ?? "",
      category: data.category ?? "General",
      summary: data.summary ?? "",
      readingTime: stats.text,
      content,
    };
  });
}

// ── Supabase에서 읽기 ──

async function getSupabasePosts(): Promise<Post[]> {
  const { data, error } = await getSupabaseAdmin()
    .from("posts")
    .select("*")
    .eq("published", true)
    .order("created_at", { ascending: false });

  if (error || !data) return [];

  return data.map((row) => ({
    slug: row.slug,
    title: row.title,
    date: new Date(row.created_at).toISOString().split("T")[0],
    category: row.category ?? "General",
    summary: row.summary ?? "",
    readingTime: readingTime(row.content).text,
    content: row.content,
  }));
}

async function getSupabasePostBySlug(slug: string): Promise<Post | null> {
  const { data, error } = await getSupabaseAdmin()
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (error || !data) return null;

  return {
    slug: data.slug,
    title: data.title,
    date: new Date(data.created_at).toISOString().split("T")[0],
    category: data.category ?? "General",
    summary: data.summary ?? "",
    readingTime: readingTime(data.content).text,
    content: data.content,
  };
}

// ── 통합: Supabase 우선, 로컬 fallback 병합 ──

export async function getAllPosts(): Promise<Post[]> {
  const [dbPosts, localPosts] = await Promise.all([
    getSupabasePosts().catch(() => [] as Post[]),
    Promise.resolve(getLocalPosts()),
  ]);

  // DB 글의 slug 셋
  const dbSlugs = new Set(dbPosts.map((p) => p.slug));

  // 로컬 글 중 DB에 없는 것만 추가 (로컬은 시드/개발용)
  const merged = [
    ...dbPosts,
    ...localPosts.filter((p) => !dbSlugs.has(p.slug)),
  ];

  return merged.sort((a, b) => (a.date > b.date ? -1 : 1));
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  // Supabase 먼저
  const dbPost = await getSupabasePostBySlug(slug).catch(() => null);
  if (dbPost) return dbPost;

  // 로컬 fallback
  const filePath = path.join(POSTS_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const stats = readingTime(content);

  return {
    slug,
    title: data.title ?? slug,
    date: data.date ?? "",
    category: data.category ?? "General",
    summary: data.summary ?? "",
    readingTime: stats.text,
    content,
  };
}
