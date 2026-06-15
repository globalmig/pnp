import { NextRequest, NextResponse } from "next/server";
import { getEnv } from "@/lib/cf-env";
import { cookies } from "next/headers";

type NoticeRow = {
  id: string;
  title: string;
  description: string;
  posted_at: string;
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
    const result = await env.DB.prepare("SELECT * FROM notices ORDER BY posted_at DESC").all();
    const data = (result.results as NoticeRow[]).map((row) => ({
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
    const body = await request.json();
    const { title, description, posted_at, image_links } = body;

    if (!title || !description || !posted_at) {
      return NextResponse.json({ error: "title, description, posted_at are required" }, { status: 400 });
    }

    const env = await getEnv();
    const id = crypto.randomUUID();
    const now = new Date().toISOString();
    const imageLinksJson = JSON.stringify(Array.isArray(image_links) ? image_links : []);

    await env.DB.prepare(
      "INSERT INTO notices (id, title, description, posted_at, image_links, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?)"
    )
      .bind(id, title, description, posted_at, imageLinksJson, now, now)
      .run();

    const row = (await env.DB.prepare("SELECT * FROM notices WHERE id = ?").bind(id).first()) as NoticeRow;
    return NextResponse.json({ ...row, image_links: JSON.parse(row.image_links || "[]") });
  } catch (error) {
    console.error("POST error:", error);
    return NextResponse.json({ error: "Server error", details: String(error) }, { status: 500 });
  }
}
