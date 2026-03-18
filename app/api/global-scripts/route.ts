import { NextResponse } from "next/server";

import { getActiveScripts } from "@/lib/admin/scripts-store";

export async function GET() {
  const scripts = await getActiveScripts();

  return NextResponse.json(
    { scripts },
    {
      headers: {
        "Cache-Control": "no-store",
      },
    },
  );
}
