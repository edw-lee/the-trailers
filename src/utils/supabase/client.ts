import { createBrowserClient as supabseCreateBrowserClient } from "@supabase/ssr";

export const createBrowserClient = () =>
  supabseCreateBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
