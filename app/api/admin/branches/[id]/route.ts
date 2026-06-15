import { NextRequest, NextResponse } from "next/server";
import { getEnv } from "@/lib/cf-env";
import { cookies } from "next/headers";

type Ctx = { params: Promise<{ id: string }> };

async function checkAuth() {
  const session = (await cookies()).get("admin_session");
  return session?.value === "authenticated";
}

export async function GET(request: NextRequest, context: Ctx) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;
  const env = await getEnv();
  const row = await env.DB.prepare("SELECT * FROM branches WHERE id = ?").bind(id).first();

  if (!row) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(row);
}

export async function PUT(request: NextRequest, context: Ctx) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;
  const body = await request.json() as { name?: string; location?: string; phone?: string; map_link?: string };
  const { name, location, phone, map_link } = body;
  const now = new Date().toISOString();

  const env = await getEnv();
  await env.DB.prepare(
    "UPDATE branches SET name = ?, location = ?, phone = ?, map_link = ?, updated_at = ? WHERE id = ?"
  )
    .bind(name, location, phone, map_link, now, id)
    .run();

  const row = await env.DB.prepare("SELECT * FROM branches WHERE id = ?").bind(id).first();
  return NextResponse.json(row);
}

export async function DELETE(request: NextRequest, context: Ctx) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;
  const env = await getEnv();
  await env.DB.prepare("DELETE FROM branches WHERE id = ?").bind(id).run();

  return NextResponse.json({ success: true });
}
