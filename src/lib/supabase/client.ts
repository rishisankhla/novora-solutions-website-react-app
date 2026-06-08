import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    '[Supabase] VITE_SUPABASE_URL or VITE_SUPABASE_PUBLISHABLE_KEY is missing. Client features are disabled.'
  );
}

/**
 * Browser-safe Supabase client (anon/publishable key only).
 * All privileged writes go through the Express API with the service role.
 */
export const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey, {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
        },
      })
    : null;

export function isSupabaseConfigured(): boolean {
  return Boolean(supabase);
}

/** Lightweight connectivity check for diagnostics / admin status UI */
export async function checkSupabaseHealth(): Promise<{
  ok: boolean;
  error?: string;
}> {
  if (!supabase) {
    return { ok: false, error: 'Supabase client not configured' };
  }
  try {
    const { error } = await supabase.from('blog_posts').select('id').limit(1);
    if (error && error.code !== 'PGRST116') {
      return { ok: false, error: error.message };
    }
    return { ok: true };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : 'Unknown error' };
  }
}
