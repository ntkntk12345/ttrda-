import { setHeader } from "h3";

import { clearAdminSession } from "../../utils/admin/session";

export default defineEventHandler((event) => {
  setHeader(event, "Cache-Control", "no-store");
  clearAdminSession(event);
  return { ok: true };
});
