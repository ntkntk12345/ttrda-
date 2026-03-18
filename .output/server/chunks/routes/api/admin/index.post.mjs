globalThis.__timing__.logStart('Load chunks/routes/api/admin/index.post');import { c as defineEventHandler, e as setHeader, f as createError, r as readBody, p as parseScriptInput, k as createScript } from '../../../_/nitro.mjs';
import { i as isAdminAuthenticated } from '../../../_/session.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';

const index_post = defineEventHandler(async (event) => {
  setHeader(event, "Cache-Control", "no-store");
  if (!isAdminAuthenticated(event)) {
    throw createError({
      statusCode: 401,
      statusMessage: "B\u1EA1n ch\u01B0a \u0111\u0103ng nh\u1EADp admin."
    });
  }
  try {
    const body = await readBody(event);
    const input = parseScriptInput(body);
    const script = await createScript(input);
    return { script };
  } catch (error) {
    throw createError({
      statusCode: 400,
      statusMessage: error instanceof Error ? error.message : "Kh\xF4ng th\u1EC3 t\u1EA1o script."
    });
  }
});

export { index_post as default };;globalThis.__timing__.logEnd('Load chunks/routes/api/admin/index.post');
//# sourceMappingURL=index.post.mjs.map
