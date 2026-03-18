import { NextResponse } from "next/server";

import { verifyAdminCredentials } from "@/lib/admin/credentials";
import { createAdminSession } from "@/lib/admin/session";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as
    | { username?: string; password?: string }
    | null;
  const username = typeof body?.username === "string" ? body.username : "";
  const password = typeof body?.password === "string" ? body.password : "";

  if (!username.trim() || !password) {
    return NextResponse.json(
      { error: "Vui lòng nhập đầy đủ tài khoản và mật khẩu." },
      {
        status: 400,
        headers: {
          "Cache-Control": "no-store",
        },
      },
    );
  }

  if (!verifyAdminCredentials(username, password)) {
    return NextResponse.json(
      { error: "Tài khoản hoặc mật khẩu không đúng." },
      {
        status: 401,
        headers: {
          "Cache-Control": "no-store",
        },
      },
    );
  }

  await createAdminSession();

  return NextResponse.json(
    { ok: true },
    {
      headers: {
        "Cache-Control": "no-store",
      },
    },
  );
}
