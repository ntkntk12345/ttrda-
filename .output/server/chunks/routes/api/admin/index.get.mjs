globalThis.__timing__.logStart('Load chunks/routes/api/admin/index.get');import { c as defineEventHandler, e as setHeader, f as createError, g as getAllScripts } from '../../../_/nitro.mjs';
import { i as isAdminAuthenticated } from '../../../_/session.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';

const index_get = defineEventHandler(async (event) => {
  setHeader(event, "Cache-Control", "no-store");
  if (!isAdminAuthenticated(event)) {
    throw createError({
      statusCode: 401,
      statusMessage: "B\u1EA1n ch\u01B0a \u0111\u0103ng nh\u1EADp admin."
    });
  }
  const scripts = await getAllScripts();
  return { scripts };
});

export { index_get as default };;globalThis.__timing__.logEnd('Load chunks/routes/api/admin/index.get');
//# sourceMappingURL=index.get.mjs.map
