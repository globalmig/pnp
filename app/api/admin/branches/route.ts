import { NextRequest, NextResponse } from "next/server";
import { getEnv } from "@/lib/cf-env";
import { cookies } from "next/headers";

async function checkAuth() {
  const session = (await cookies()).get("admin_session");
  return session?.value === "authenticated";
}

export async function GET() {
  try {
    const env = await getEnv();
    const result = await env.DB.prepare("SELECT * FROM branches ORDER BY created_at DESC").all();
    return NextResponse.json(result.results);
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
    const body = await request.json() as { name?: string; location?: string; phone?: string; map_link?: string };
    const { name, location, phone, map_link } = body;

    if (!name || !location || !phone || !map_link) {
      return NextResponse.json({ error: "name, location, phone, map_link are required" }, { status: 400 });
    }

    const env = await getEnv();
    const id = crypto.randomUUID();
    const now = new Date().toISOString();

    await env.DB.prepare(
      "INSERT INTO branches (id, name, location, phone, map_link, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?)"
    )
      .bind(id, name, location, phone, map_link, now, now)
      .run();

    const row = await env.DB.prepare("SELECT * FROM branches WHERE id = ?").bind(id).first();
    return NextResponse.json(row);
  } catch (error) {
    console.error("POST error:", error);
    return NextResponse.json({ error: "Server error", details: String(error) }, { status: 500 });
  }
}
