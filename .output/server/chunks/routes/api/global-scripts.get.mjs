globalThis.__timing__.logStart('Load chunks/routes/api/global-scripts.get');import { c as defineEventHandler, e as setHeader, o as getActiveScripts } from '../../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';

const globalScripts_get = defineEventHandler(async (event) => {
  setHeader(event, "Cache-Control", "no-store");
  const scripts = await getActiveScripts();
  return { scripts };
});

export { globalScripts_get as default };;globalThis.__timing__.logEnd('Load chunks/routes/api/global-scripts.get');
//# sourceMappingURL=global-scripts.get.mjs.map
