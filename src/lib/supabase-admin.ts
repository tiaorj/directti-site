import "server-only";

import {
  createClient,
  type SupabaseClient,
} from "@supabase/supabase-js";

let adminClient: SupabaseClient | null = null;

export function getSupabaseAdmin() {
  if (adminClient) {
    return adminClient;
  }

  const supabaseUrl =
    process.env.SUPABASE_URL?.trim();

  const supabaseSecretKey =
    process.env.SUPABASE_SECRET_KEY?.trim();

  if (!supabaseUrl || !supabaseSecretKey) {
    throw new Error(
      "Configuração server-side do Supabase ausente.",
    );
  }

  adminClient = createClient(
    supabaseUrl,
    supabaseSecretKey,
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
        detectSessionInUrl: false,
      },
    },
  );

  return adminClient;
}