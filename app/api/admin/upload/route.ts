import { NextRequest, NextResponse } from "next/server";
import { getEnv } from "@/lib/cf-env";
import { r2Put, r2Delete } from "@/lib/r2";
import { cookies } from "next/headers";

async function checkAuth() {
  const session = (await cookies()).get("admin_session");
  return session?.value === "authenticated";
}

export async function POST(request: NextRequest) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "파일이 없습니다." }, { status: 400 });
    }

    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif"];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: "이미지 파일만 업로드 가능합니다. (jpg, png, webp, gif)" }, { status: 400 });
    }

    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json({ error: "파일 크기는 10MB를 초과할 수 없습니다." }, { status: 400 });
    }

    const EXT_MAP: Record<string, string> = {
      "image/jpeg": "jpg",
      "image/jpg": "jpg",
      "image/png": "png",
      "image/webp": "webp",
      "image/gif": "gif",
    };
    const timestamp = Date.now();
    const randomStr = Math.random().toString(36).substring(2, 15);
    const fileExt = EXT_MAP[file.type] ?? file.name.split(".").pop()?.replace(/[^a-zA-Z0-9]/g, "").toLowerCase() ?? "jpg";
    const fileName = `${timestamp}-${randomStr}.${fileExt}`;

    const env = await getEnv();
    const arrayBuffer = await file.arrayBuffer();
    const url = await r2Put(fileName, arrayBuffer, file.type, env);

    return NextResponse.json({ success: true, url, fileName });
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error("Upload error:", msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { fileName } = await request.json() as { fileName: string };

    if (!fileName) {
      return NextResponse.json({ error: "파일명이 필요합니다." }, { status: 400 });
    }

    const env = await getEnv();
    await r2Delete(fileName, env);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json({ error: "서버 오류가 발생했습니다." }, { status: 500 });
  }
}
