import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getSupabaseAdmin } from "@/lib/supabase";

function unauthorized() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

function verifyApiKey(req: NextRequest) {
  const key = req.headers.get("x-api-key");
  return key === process.env.BLOG_API_KEY;
}

// GET /api/clips — 공개: 최신 클리핑 조회
export async function GET(req: NextRequest) {
  const limit = parseInt(req.nextUrl.searchParams.get("limit") ?? "20");
  const offset = parseInt(req.nextUrl.searchParams.get("offset") ?? "0");

  const { data, error } = await getSupabaseAdmin()
    .from("clips")
    .select("id, title, summary, source_url, source_name, tags, created_at")
    .order("created_at", { ascending: false })
    .range(offset, offset + Math.min(limit, 50) - 1);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

// POST /api/clips — Agent 전용: 클리핑 등록
export async function POST(req: NextRequest) {
  if (!verifyApiKey(req)) return unauthorized();

  const body = await req.json();
  const { title, summary, source_url, source_name, tags } = body;

  if (!title || !summary) {
    return NextResponse.json(
      { error: "title and summary are required" },
      { status: 400 }
    );
  }

  const { data, error } = await getSupabaseAdmin()
    .from("clips")
    .insert({
      title,
      summary,
      source_url: source_url ?? null,
      source_name: source_name ?? null,
      tags: tags ?? [],
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  revalidatePath("/");
  revalidatePath("/news");

  return NextResponse.json(data, { status: 201 });
}

// DELETE /api/clips — Agent 전용: 클리핑 삭제
export async function DELETE(req: NextRequest) {
  if (!verifyApiKey(req)) return unauthorized();

  const { id } = await req.json();

  if (!id) {
    return NextResponse.json({ error: "id is required" }, { status: 400 });
  }

  const { error } = await getSupabaseAdmin().from("clips").delete().eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  revalidatePath("/");
  revalidatePath("/news");

  return NextResponse.json({ success: true });
}
