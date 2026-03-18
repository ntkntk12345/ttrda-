globalThis.__timing__.logStart('Load chunks/routes/api/admin/scripts/_id_.put');import { c as defineEventHandler, e as setHeader, f as createError, h as getRouterParam, r as readBody, p as parseScriptInput, j as updateScript } from '../../../../_/nitro.mjs';
import { i as isAdminAuthenticated } from '../../../../_/session.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';

const _id__put = defineEventHandler(async (event) => {
  setHeader(event, "Cache-Control", "no-store");
  if (!isAdminAuthenticated(event)) {
    throw createError({
      statusCode: 401,
      statusMessage: "B\u1EA1n ch\u01B0a \u0111\u0103ng nh\u1EADp admin."
    });
  }
  try {
    const id = getRouterParam(event, "id");
    if (!id) {
      throw new Error("Thi\u1EBFu id script.");
    }
    const body = await readBody(event);
    const input = parseScriptInput(body);
    const script = await updateScript(id, input);
    return { script };
  } catch (error) {
    throw createError({
      statusCode: 400,
      statusMessage: error instanceof Error ? error.message : "Kh\xF4ng th\u1EC3 c\u1EADp nh\u1EADt script."
    });
  }
});

export { _id__put as default };;globalThis.__timing__.logEnd('Load chunks/routes/api/admin/scripts/_id_.put');
//# sourceMappingURL=_id_.put.mjs.map
