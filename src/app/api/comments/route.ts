import { NextRequest, NextResponse } from "next/server";
import { getSupabase, getSupabaseAdmin } from "@/lib/supabase";
import bcrypt from "bcryptjs";

// GET /api/comments?post=slug — 공개: 특정 글의 댓글 조회
export async function GET(req: NextRequest) {
  const postSlug = req.nextUrl.searchParams.get("post");

  if (!postSlug) {
    return NextResponse.json({ error: "post parameter required" }, { status: 400 });
  }

  const { data, error } = await getSupabase()
    .from("comments")
    .select("id, nickname, content, created_at")
    .eq("post_slug", postSlug)
    .order("created_at", { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

// POST /api/comments — 공개: 댓글 작성
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { post_slug, nickname, password, content } = body;

  if (!post_slug || !nickname || !password || !content) {
    return NextResponse.json(
      { error: "post_slug, nickname, password, content are required" },
      { status: 400 }
    );
  }

  if (nickname.length > 30) {
    return NextResponse.json({ error: "nickname too long" }, { status: 400 });
  }

  if (content.length > 2000) {
    return NextResponse.json({ error: "content too long (max 2000)" }, { status: 400 });
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const { data, error } = await getSupabaseAdmin().from("comments").insert({
    post_slug,
    nickname,
    password_hash: passwordHash,
    content,
  }).select("id, nickname, content, created_at").single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}

// DELETE /api/comments — 공개: 비밀번호 확인 후 댓글 삭제
export async function DELETE(req: NextRequest) {
  const body = await req.json();
  const { id, password } = body;

  if (!id || !password) {
    return NextResponse.json(
      { error: "id and password are required" },
      { status: 400 }
    );
  }

  // 비밀번호 확인을 위해 해시 조회
  const { data: comment, error: fetchError } = await getSupabaseAdmin()
    .from("comments")
    .select("password_hash")
    .eq("id", id)
    .single();

  if (fetchError || !comment) {
    return NextResponse.json({ error: "Comment not found" }, { status: 404 });
  }

  const valid = await bcrypt.compare(password, comment.password_hash);
  if (!valid) {
    return NextResponse.json({ error: "Wrong password" }, { status: 403 });
  }

  const { error } = await getSupabaseAdmin().from("comments").delete().eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
