globalThis.__timing__.logStart('Load chunks/routes/api/movies/_slug_.get');import { c as defineEventHandler, h as getRouterParam, f as createError, e as setHeader } from '../../../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';

const API_HOST = "https://ophim1.com";
const _slug__get = defineEventHandler(async (event) => {
  const slug = getRouterParam(event, "slug");
  if (!slug) {
    throw createError({
      statusCode: 400,
      statusMessage: "Slug is required"
    });
  }
  try {
    const data = await $fetch(`${API_HOST}/v1/api/phim/${slug}`);
    setHeader(event, "Cache-Control", "s-maxage=3600");
    return data;
  } catch (error) {
    throw createError({
      statusCode: (error == null ? void 0 : error.statusCode) || 500,
      statusMessage: "Failed to fetch from OPhim"
    });
  }
});

export { _slug__get as default };;globalThis.__timing__.logEnd('Load chunks/routes/api/movies/_slug_.get');
//# sourceMappingURL=_slug_.get.mjs.map
