import { setHeader } from "h3";

import { verifyAdminCredentials } from "../../utils/admin/credentials";
import { createAdminSession } from "../../utils/admin/session";

export default defineEventHandler(async (event) => {
  setHeader(event, "Cache-Control", "no-store");

  const body = (await readBody(event).catch(() => null)) as
    | { username?: string; password?: string }
    | null;
  const username = typeof body?.username === "string" ? body.username : "";
  const password = typeof body?.password === "string" ? body.password : "";

  if (!username.trim() || !password) {
    throw createError({
      statusCode: 400,
      statusMessage: "Vui lòng nhập đầy đủ tài khoản và mật khẩu.",
    });
  }

  if (!verifyAdminCredentials(username, password)) {
    throw createError({
      statusCode: 401,
      statusMessage: "Tài khoản hoặc mật khẩu không đúng.",
    });
  }

  createAdminSession(event);
  return { ok: true };
});
