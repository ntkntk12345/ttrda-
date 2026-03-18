import { setHeader } from "h3";

import { getActiveScripts } from "../utils/admin/scripts-store";

export default defineEventHandler(async (event) => {
  setHeader(event, "Cache-Control", "no-store");

  const scripts = await getActiveScripts();
  return { scripts };
});
