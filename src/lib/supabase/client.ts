import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let browserClient: SupabaseClient | undefined;

/**
 * Returns the public Supabase browser client.
 *
 * The environment is validated lazily so the static blog can still be built
 * before a Supabase project has been connected.
 */
export function getSupabaseBrowserClient(): SupabaseClient {
  if (browserClient) {
    return browserClient;
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !publishableKey) {
    throw new Error(
      "Supabase ist nicht konfiguriert. Trage NEXT_PUBLIC_SUPABASE_URL und " +
        "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY in .env.local ein.",
    );
  }

  browserClient = createClient(url, publishableKey);
  return browserClient;
}
