const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, "");
const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

if (!url || !publishableKey) {
  console.error(
    "Fehlende Konfiguration: Kopiere .env.example nach .env.local und trage " +
      "NEXT_PUBLIC_SUPABASE_URL sowie NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ein.",
  );
  process.exit(1);
}
try {
  const response = await fetch(`${url}/auth/v1/settings`, {
    headers: {
      apikey: publishableKey,
    },
  });

  if (!response.ok) {
    throw new Error(`Supabase antwortet mit HTTP ${response.status}.`);
  }

  console.log("Supabase-Verbindung erfolgreich.");
} catch (error) {
  console.error(
    "Supabase-Verbindung fehlgeschlagen:",
    error instanceof Error ? error.message : error,
  );
  process.exit(1);
}
