globalThis.__timing__.logStart('Load chunks/routes/api/admin/login.post');import { c as defineEventHandler, e as setHeader, r as readBody, f as createError } from '../../../_/nitro.mjs';
import { v as verifyAdminCredentials, c as createAdminSession } from '../../../_/session.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';

const login_post = defineEventHandler(async (event) => {
  setHeader(event, "Cache-Control", "no-store");
  const body = await readBody(event).catch(() => null);
  const username = typeof (body == null ? void 0 : body.username) === "string" ? body.username : "";
  const password = typeof (body == null ? void 0 : body.password) === "string" ? body.password : "";
  if (!username.trim() || !password) {
    throw createError({
      statusCode: 400,
      statusMessage: "Vui l\xF2ng nh\u1EADp \u0111\u1EA7y \u0111\u1EE7 t\xE0i kho\u1EA3n v\xE0 m\u1EADt kh\u1EA9u."
    });
  }
  if (!verifyAdminCredentials(username, password)) {
    throw createError({
      statusCode: 401,
      statusMessage: "T\xE0i kho\u1EA3n ho\u1EB7c m\u1EADt kh\u1EA9u kh\xF4ng \u0111\xFAng."
    });
  }
  createAdminSession(event);
  return { ok: true };
});

export { login_post as default };;globalThis.__timing__.logEnd('Load chunks/routes/api/admin/login.post');
//# sourceMappingURL=login.post.mjs.map
