import { getRouterParam, setHeader } from "h3";

import {
  parseScriptInput,
  updateScript,
} from "../../../utils/admin/scripts-store";
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

    const body = await readBody(event);
    const input = parseScriptInput(body);
    const script = await updateScript(id, input);
    return { script };
  } catch (error) {
    throw createError({
      statusCode: 400,
      statusMessage:
        error instanceof Error ? error.message : "Không thể cập nhật script.",
    });
  }
});
