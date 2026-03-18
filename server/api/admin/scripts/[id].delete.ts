import { getRouterParam, setHeader } from "h3";

import { deleteScript } from "../../../utils/admin/scripts-store";
import { isAdminAuthenticated } from "../../../utils/admin/session";

export default defineEventHandler(async (event) => {
  setHeader(event, "Cache-Control", "no-store");

  if (!isAdminAuthenticated(event)) {
    throw createError({
      statusCode: 401,
      statusMessage: "Bạn chưa đăng nhập admin.",
    });
  }

  try {
    const id = getRouterParam(event, "id");

    if (!id) {
      throw new Error("Thiếu id script.");
    }

    await deleteScript(id);
    return { ok: true };
  } catch (error) {
    throw createError({
      statusCode: 400,
      statusMessage:
        error instanceof Error ? error.message : "Không thể xóa script.",
    });
  }
});
