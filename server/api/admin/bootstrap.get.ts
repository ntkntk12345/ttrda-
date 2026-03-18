import { setHeader } from "h3";

import { getAllScripts } from "../../utils/admin/scripts-store";
import { isAdminAuthenticated } from "../../utils/admin/session";

export default defineEventHandler(async (event) => {
  setHeader(event, "Cache-Control", "no-store");

  const authenticated = isAdminAuthenticated(event);
  const scripts = authenticated ? await getAllScripts() : [];

  return {
    authenticated,
    scripts,
  };
});
