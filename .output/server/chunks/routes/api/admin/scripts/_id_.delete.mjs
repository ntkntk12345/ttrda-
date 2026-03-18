globalThis.__timing__.logStart('Load chunks/routes/api/admin/scripts/_id_.delete');import { c as defineEventHandler, e as setHeader, f as createError, h as getRouterParam, i as deleteScript } from '../../../../_/nitro.mjs';
import { i as isAdminAuthenticated } from '../../../../_/session.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';

const _id__delete = defineEventHandler(async (event) => {
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
    await deleteScript(id);
    return { ok: true };
  } catch (error) {
    throw createError({
      statusCode: 400,
      statusMessage: error instanceof Error ? error.message : "Kh\xF4ng th\u1EC3 x\xF3a script."
    });
  }
});

export { _id__delete as default };;globalThis.__timing__.logEnd('Load chunks/routes/api/admin/scripts/_id_.delete');
//# sourceMappingURL=_id_.delete.mjs.map
