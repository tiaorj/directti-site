import { getSupabaseAdmin } from "@/lib/supabase-admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BODY_SIZE = 20_000;

const ALLOWED_INTERESTS = new Set([
  "Legado360",
  "Modernização",
  "Desenvolvimento",
  "Sustentação",
  "Integrações",
  "Dados e BI",
  "IA e automação",
  "Outro",
]);

type LeadPayload = {
  name?: unknown;
  company?: unknown;
  email?: unknown;
  interest?: unknown;
  message?: unknown;

  website?: unknown;

  sourceType?: unknown;
  sourcePath?: unknown;
  referrer?: unknown;

  utmSource?: unknown;
  utmMedium?: unknown;
  utmCampaign?: unknown;
  utmContent?: unknown;
  utmTerm?: unknown;
};

function stringValue(value: unknown) {
  return typeof value === "string"
    ? value.trim()
    : "";
}

function nullableString(
  value: unknown,
  maxLength: number,
) {
  const normalized = stringValue(value);

  if (!normalized) {
    return null;
  }

  return normalized.slice(0, maxLength);
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
    email,
  );
}

export async function POST(request: Request) {
  try {
        const origin =
        request.headers.get("origin");

        const allowedOrigins = new Set([
        "https://directti.dev.br",
        "https://www.directti.dev.br",
        ]);

        if (
        process.env.NODE_ENV === "production" &&
        origin &&
        !allowedOrigins.has(origin)
        ) {
        return Response.json(
            {
            ok: false,
            error: "ORIGIN_NOT_ALLOWED",
            },
            {
            status: 403,
            },
        );
        }    
    const contentType =
      request.headers.get("content-type") ?? "";

    if (
      !contentType
        .toLowerCase()
        .includes("application/json")
    ) {
      return Response.json(
        {
          ok: false,
          error: "UNSUPPORTED_CONTENT_TYPE",
        },
        {
          status: 415,
        },
      );
    }

    const contentLength = Number(
      request.headers.get("content-length") ?? "0",
    );

    if (
      Number.isFinite(contentLength) &&
      contentLength > MAX_BODY_SIZE
    ) {
      return Response.json(
        {
          ok: false,
          error: "PAYLOAD_TOO_LARGE",
        },
        {
          status: 413,
        },
      );
    }

    const payload =
      (await request.json()) as LeadPayload;

    /*
     * Honeypot.
     *
     * Usuários reais nunca preencherão "website".
     * Bots costumam preencher todos os campos.
     *
     * Respondemos como sucesso para não ensinar
     * ao bot como contornar a proteção.
     */
    if (stringValue(payload.website)) {
    if (process.env.NODE_ENV !== "production") {
        console.warn(
        "[leads] Honeypot preenchido. Registro ignorado.",
        );
    }

    return Response.json(
        {
        ok: true,
        },
        {
        status: 201,
        },
    );
    }

    const name = stringValue(payload.name);

    const company =
      stringValue(payload.company);

    const email = stringValue(
      payload.email,
    ).toLowerCase();

    const interest = stringValue(
      payload.interest,
    );

    const message = stringValue(
      payload.message,
    );

    if (
      name.length < 2 ||
      name.length > 120
    ) {
      return Response.json(
        {
          ok: false,
          error: "INVALID_NAME",
        },
        {
          status: 400,
        },
      );
    }

    if (
      email.length < 5 ||
      email.length > 254 ||
      !isValidEmail(email)
    ) {
      return Response.json(
        {
          ok: false,
          error: "INVALID_EMAIL",
        },
        {
          status: 400,
        },
      );
    }

    if (!ALLOWED_INTERESTS.has(interest)) {
      return Response.json(
        {
          ok: false,
          error: "INVALID_INTEREST",
        },
        {
          status: 400,
        },
      );
    }

    if (
      message.length < 10 ||
      message.length > 5000
    ) {
      return Response.json(
        {
          ok: false,
          error: "INVALID_MESSAGE",
        },
        {
          status: 400,
        },
      );
    }

    if (company.length > 160) {
      return Response.json(
        {
          ok: false,
          error: "INVALID_COMPANY",
        },
        {
          status: 400,
        },
      );
    }

    const supabase = getSupabaseAdmin();

    const { error } = await supabase
      .from("leads")
      .insert({
        name,
        company: company || null,
        email,
        interest,
        message,

        source_type:
          nullableString(
            payload.sourceType,
            50,
          ) ?? "contact_form",

        source_path: nullableString(
          payload.sourcePath,
          500,
        ),

        referrer: nullableString(
          payload.referrer,
          1000,
        ),

        utm_source: nullableString(
          payload.utmSource,
          200,
        ),

        utm_medium: nullableString(
          payload.utmMedium,
          200,
        ),

        utm_campaign: nullableString(
          payload.utmCampaign,
          200,
        ),

        utm_content: nullableString(
          payload.utmContent,
          200,
        ),

        utm_term: nullableString(
          payload.utmTerm,
          200,
        ),
      });

    if (error) {
      console.error(
        "[leads] Falha ao persistir lead:",
        {
          code: error.code,
          message: error.message,
        },
      );

      return Response.json(
        {
          ok: false,
          error: "LEAD_PERSISTENCE_FAILED",
        },
        {
          status: 500,
        },
      );
    }

    return Response.json(
      {
        ok: true,
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    console.error(
      "[leads] Erro inesperado:",
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