import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

function verifyApiKey(req: NextRequest) {
  const key = req.headers.get("x-api-key");
  return key === process.env.BLOG_API_KEY;
}

// GET /api/activities — 공개: 최근 활동 조회
export async function GET(req: NextRequest) {
  const limit = parseInt(req.nextUrl.searchParams.get("limit") ?? "4");

  const { data, error } = await getSupabaseAdmin()
    .from("activities")
    .select("id, type, title, description, metadata, created_at")
    .order("created_at", { ascending: false })
    .limit(Math.min(limit, 50));

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

// POST /api/activities — Agent 전용: 활동 기록
export async function POST(req: NextRequest) {
  if (!verifyApiKey(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { type, title, description, metadata } = body;

  if (!type || !title) {
    return NextResponse.json(
      { error: "type and title are required" },
      { status: 400 }
    );
  }

  const { data, error } = await getSupabaseAdmin()
    .from("activities")
    .insert({
      type,
      title,
      description: description ?? "",
      metadata: metadata ?? {},
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}
