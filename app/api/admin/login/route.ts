import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123"; // 환경변수로 설정 권장

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json() as { password: string };

    if (password === ADMIN_PASSWORD) {
      // 쿠키에 세션 토큰 저장
      (
        await // 쿠키에 세션 토큰 저장
        cookies()
      ).set("admin_session", "authenticated", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24, // 24시간
      });

      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "비밀번호가 올바르지 않습니다." }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ error: "서버 오류가 발생했습니다." }, { status: 500 });
  }
}
