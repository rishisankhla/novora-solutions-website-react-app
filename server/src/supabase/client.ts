import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { env, assertSupabaseServerConfig } from '../config/env.js';

let adminClient: SupabaseClient | null = null;

export function getSupabaseAdmin(): SupabaseClient {
  if (!adminClient) {
    assertSupabaseServerConfig();
    adminClient = createClient(env.supabaseUrl, env.supabaseServiceKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }
  return adminClient;
}

export async function verifySupabaseConnection(): Promise<{ ok: boolean; error?: string }> {
  try {
    const client = getSupabaseAdmin();
    const { error } = await client.from('users').select('id').limit(1);
    if (error && error.code !== 'PGRST116') {
      return { ok: false, error: error.message };
    }
    return { ok: true };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : 'Unknown error' };
  }
}

export async function ensureStorageBuckets(): Promise<void> {
  const client = getSupabaseAdmin();
  for (const bucket of ['resumes', 'media'] as const) {
    const { data } = await client.storage.getBucket(bucket);
    if (!data) {
      await client.storage.createBucket(bucket, {
        public: bucket === 'media',
        fileSizeLimit: bucket === 'resumes' ? 5 * 1024 * 1024 : 10 * 1024 * 1024,
      });
    }
  }
}
