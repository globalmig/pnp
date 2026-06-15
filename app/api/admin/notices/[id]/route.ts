import { NextRequest, NextResponse } from "next/server";
import { getEnv } from "@/lib/cf-env";
import { r2Delete } from "@/lib/r2";
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

type Ctx = { params: Promise<{ id: string }> };

async function checkAuth() {
  const session = (await cookies()).get("admin_session");
  return session?.value === "authenticated";
}

export async function GET(request: NextRequest, context: Ctx) {
  const { id } = await context.params;
  if (!(await checkAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const env = await getEnv();
  const row = (await env.DB.prepare("SELECT * FROM notices WHERE id = ?").bind(id).first()) as NoticeRow | null;

  if (!row) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ ...row, image_links: JSON.parse(row.image_links || "[]") });
}

export async function PUT(request: NextRequest, context: Ctx) {
  const { id } = await context.params;
  if (!(await checkAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { title, description, posted_at, image_links } = body;
  const now = new Date().toISOString();

  const env = await getEnv();
  await env.DB.prepare(
    "UPDATE notices SET title = ?, description = ?, posted_at = ?, image_links = ?, updated_at = ? WHERE id = ?"
  )
    .bind(title, description, posted_at, JSON.stringify(Array.isArray(image_links) ? image_links : []), now, id)
    .run();

  const row = (await env.DB.prepare("SELECT * FROM notices WHERE id = ?").bind(id).first()) as NoticeRow;
  return NextResponse.json({ ...row, image_links: JSON.parse(row.image_links || "[]") });
}

export async function DELETE(request: NextRequest, context: Ctx) {
  const { id } = await context.params;
  if (!(await checkAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const env = await getEnv();

  const row = (await env.DB.prepare("SELECT image_links FROM notices WHERE id = ?").bind(id).first()) as { image_links: string } | null;
  if (row) {
    const imageLinks: string[] = JSON.parse(row.image_links || "[]");
    await Promise.all(
      imageLinks.map((url) => {
        const fileName = url.split("/").pop();
        return fileName ? r2Delete(fileName, env) : Promise.resolve();
      })
    );
  }

  await env.DB.prepare("DELETE FROM notices WHERE id = ?").bind(id).run();

  return NextResponse.json({ success: true });
}
