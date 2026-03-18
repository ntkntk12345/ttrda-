import { setHeader } from "h3";

import { getAllScripts } from "../../../utils/admin/scripts-store";
import { isAdminAuthenticated } from "../../../utils/admin/session";

export default defineEventHandler(async (event) => {
  setHeader(event, "Cache-Control", "no-store");

  if (!isAdminAuthenticated(event)) {
    throw createError({
      statusCode: 401,
      statusMessage: "Bạn chưa đăng nhập admin.",
    });
  }

  const scripts = await getAllScripts();
  return { scripts };
});
