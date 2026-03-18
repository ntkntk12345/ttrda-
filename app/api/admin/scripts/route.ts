import { NextResponse } from "next/server";

import {
  createScript,
  getAllScripts,
  parseScriptInput,
} from "@/lib/admin/scripts-store";
import { isAdminAuthenticated } from "@/lib/admin/session";

function unauthorizedResponse() {
  return NextResponse.json(
    { error: "Bạn chưa đăng nhập admin." },
    {
      status: 401,
      headers: {
        "Cache-Control": "no-store",
      },
    },
  );
}

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return unauthorizedResponse();
  }

  const scripts = await getAllScripts();

  return NextResponse.json(
    { scripts },
    {
      headers: {
        "Cache-Control": "no-store",
      },
    },
  );
}

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return unauthorizedResponse();
  }

  try {
    const body = await request.json();
    const input = parseScriptInput(body);
    const script = await createScript(input);

    return NextResponse.json(
      { script },
      {
        status: 201,
        headers: {
          "Cache-Control": "no-store",
        },
      },
    );
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Không thể tạo script.",
      },
      {
        status: 400,
        headers: {
          "Cache-Control": "no-store",
        },
      },
    );
  }
}
