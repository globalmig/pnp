import { NextRequest, NextResponse } from "next/server";
import { getEnv } from "@/lib/cf-env";
import { cookies } from "next/headers";

type GalleryRow = {
  id: string;
  title: string;
  image_links: string;
  created_at: string;
  updated_at: string;
};

async function checkAuth() {
  const session = (await cookies()).get("admin_session");
  return session?.value === "authenticated";
}

export async function GET() {
  try {
    const env = await getEnv();
    const result = await env.DB.prepare("SELECT * FROM gallery ORDER BY created_at DESC").all();
    const data = (result.results as GalleryRow[]).map((row) => ({
      ...row,
      image_links: JSON.parse(row.image_links || "[]"),
    }));
    return NextResponse.json(data);
  } catch (error) {
    console.error("GET error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = (await request.json()) as Record<string, unknown>;
    const title = String(body?.title ?? "").trim();
    const raw = body?.image_links ?? body?.image_link ?? body?.image ?? body?.images;
    const image_links: string[] = Array.isArray(raw)
      ? raw.map((v) => (typeof v === "string" ? v : v?.url)).filter(Boolean)
      : typeof raw === "string"
      ? [raw]
      : [];

    if (!title) {
      return NextResponse.json({ error: "title is required" }, { status: 400 });
    }

    if (image_links.length === 0) {
      return NextResponse.json({ error: "At least one image is required" }, { status: 400 });
    }

    const env = await getEnv();
    const id = crypto.randomUUID();
    const now = new Date().toISOString();

    await env.DB.prepare(
      "INSERT INTO gallery (id, title, image_links, created_at, updated_at) VALUES (?, ?, ?, ?, ?)"
    )
      .bind(id, title, JSON.stringify(image_links), now, now)
      .run();

    const row = (await env.DB.prepare("SELECT * FROM gallery WHERE id = ?").bind(id).first()) as GalleryRow;
    return NextResponse.json({ ...row, image_links: JSON.parse(row.image_links || "[]") });
  } catch (error) {
    return NextResponse.json({ error: "Server error", details: String(error) }, { status: 500 });
  }
}
