import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

function unauthorized() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

function verifyApiKey(req: NextRequest) {
  const key = req.headers.get("x-api-key");
  return key === process.env.BLOG_API_KEY;
}

// GET /api/posts — 공개: 발행된 글 목록
export async function GET() {
  const { data, error } = await getSupabaseAdmin()
    .from("posts")
    .select("slug, title, summary, category, created_at, updated_at")
    .eq("published", true)
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

// POST /api/posts — Agent 전용: 글 작성
export async function POST(req: NextRequest) {
  if (!verifyApiKey(req)) return unauthorized();

  const body = await req.json();
  const { slug, title, summary, category, content, published } = body;

  if (!slug || !title || !content) {
    return NextResponse.json(
      { error: "slug, title, content are required" },
      { status: 400 }
    );
  }

  const { data, error } = await getSupabaseAdmin().from("posts").insert({
    slug,
    title,
    summary: summary ?? "",
    category: category ?? "General",
    content,
    published: published ?? true,
  }).select().single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}

// PUT /api/posts — Agent 전용: 글 수정
export async function PUT(req: NextRequest) {
  if (!verifyApiKey(req)) return unauthorized();

  const body = await req.json();
  const { slug, ...updates } = body;

  if (!slug) {
    return NextResponse.json({ error: "slug is required" }, { status: 400 });
  }

  const { data, error } = await getSupabaseAdmin()
    .from("posts")
    .update(updates)
    .eq("slug", slug)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

// DELETE /api/posts — Agent 전용: 글 삭제
export async function DELETE(req: NextRequest) {
  if (!verifyApiKey(req)) return unauthorized();

  const { slug } = await req.json();

  if (!slug) {
    return NextResponse.json({ error: "slug is required" }, { status: 400 });
  }

  const { error } = await getSupabaseAdmin().from("posts").delete().eq("slug", slug);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
