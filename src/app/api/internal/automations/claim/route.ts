import {
  isAutomationAuthorized,
} from "@/lib/automation-auth";

import {
  getSupabaseAdmin,
} from "@/lib/supabase-admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(
  request: Request,
) {
  if (
    !isAutomationAuthorized(request)
  ) {
    return Response.json(
      {
        ok: false,
        error: "UNAUTHORIZED",
      },
      {
        status: 401,
      },
    );
  }

  try {
    const supabase =
      getSupabaseAdmin();

    const { data, error } =
      await supabase.rpc(
        "claim_automation_outbox",
        {
          p_limit: 5,
        },
      );

    if (error) {
      console.error(
        "[automation] claim failed",
        {
          code: error.code,
          message: error.message,
        },
      );

      return Response.json(
        {
          ok: false,
          error: "CLAIM_FAILED",
        },
        {
          status: 500,
        },
      );
    }

    return Response.json({
      ok: true,
      events: data ?? [],
    });
  } catch (error) {
    console.error(
      "[automation] unexpected claim error",
      error instanceof Error
        ? error.message
        : "unknown",
    );

    return Response.json(
      {
        ok: false,
        error: "INTERNAL_ERROR",
      },
      {
        status: 500,
      },
    );
  }
}