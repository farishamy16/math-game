import { createBrowserClient } from "@supabase/ssr";

// Create a single instance that can be reused
let supabaseClient: ReturnType<typeof createBrowserClient>;

export const createClient = () => {
  if (supabaseClient) {
    return supabaseClient;
  }

  supabaseClient = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    }
  );

  return supabaseClient;
};
