import {
  isAutomationAuthorized,
} from "@/lib/automation-auth";

import {
  getSupabaseAdmin,
} from "@/lib/supabase-admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Payload = {
  eventId?: unknown;
  leaseToken?: unknown;
  error?: unknown;
};

function value(
  input: unknown,
) {
  return typeof input === "string"
    ? input.trim()
    : "";
}

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

  const payload =
    (await request.json()) as Payload;

  const eventId =
    value(payload.eventId);

  const leaseToken =
    value(payload.leaseToken);

  const errorMessage =
    value(payload.error) ||
    "UNKNOWN_AUTOMATION_ERROR";

  if (!eventId || !leaseToken) {
    return Response.json(
      {
        ok: false,
        error: "INVALID_PAYLOAD",
      },
      {
        status: 400,
      },
    );
  }

  const supabase =
    getSupabaseAdmin();

  const { data, error } =
    await supabase.rpc(
      "fail_automation_outbox",
      {
        p_outbox_id: eventId,
        p_lease_token: leaseToken,
        p_error: errorMessage,
      },
    );

  if (error) {
    return Response.json(
      {
        ok: false,
        error: "FAIL_UPDATE_FAILED",
      },
      {
        status: 500,
      },
    );
  }

  if (!data) {
    return Response.json(
      {
        ok: false,
        error: "LEASE_MISMATCH",
      },
      {
        status: 409,
      },
    );
  }

  return Response.json({
    ok: true,
  });
}