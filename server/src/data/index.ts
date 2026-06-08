import { env } from '../config/env.js';
import * as mongoRepo from './mongoRepo.js';
import * as supabaseRepo from './supabaseRepo.js';

export const repo = env.dataSource === 'supabase' ? supabaseRepo : mongoRepo;

export type DataRepository = typeof mongoRepo;

export async function pingDatabase(): Promise<void> {
  if (env.dataSource === 'supabase') {
    await supabaseRepo.pingSupabase();
  } else {
    await mongoRepo.pingMongo();
  }
}
