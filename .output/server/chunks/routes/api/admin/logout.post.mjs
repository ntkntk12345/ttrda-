globalThis.__timing__.logStart('Load chunks/routes/api/admin/logout.post');import { c as defineEventHandler, e as setHeader } from '../../../_/nitro.mjs';
import { a as clearAdminSession } from '../../../_/session.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';

const logout_post = defineEventHandler((event) => {
  setHeader(event, "Cache-Control", "no-store");
  clearAdminSession(event);
  return { ok: true };
});

export { logout_post as default };;globalThis.__timing__.logEnd('Load chunks/routes/api/admin/logout.post');
//# sourceMappingURL=logout.post.mjs.map
