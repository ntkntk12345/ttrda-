globalThis.__timing__.logStart('Load chunks/routes/api/admin/bootstrap.get');import { c as defineEventHandler, e as setHeader, g as getAllScripts } from '../../../_/nitro.mjs';
import { i as isAdminAuthenticated } from '../../../_/session.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';

const bootstrap_get = defineEventHandler(async (event) => {
  setHeader(event, "Cache-Control", "no-store");
  const authenticated = isAdminAuthenticated(event);
  const scripts = authenticated ? await getAllScripts() : [];
  return {
    authenticated,
    scripts
  };
});

export { bootstrap_get as default };;globalThis.__timing__.logEnd('Load chunks/routes/api/admin/bootstrap.get');
//# sourceMappingURL=bootstrap.get.mjs.map
