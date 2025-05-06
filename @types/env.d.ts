/// <reference types="node" />
declare namespace NodeJS {
  interface ProcessEnv {
    TMDB_API_KEY: string;
    TMDB_BASE_URL: string;
    NEXT_PUBLIC_SUPABASE_URL: string;
    NEXT_PUBLIC_SUPABASE_ANON_KEY: string;
    NEXT_PUBLIC_BUNNY_CDN_URL: string;
    NEXT_PUBLIC_TMDB_IMAGE_URL: string;
  }
}
