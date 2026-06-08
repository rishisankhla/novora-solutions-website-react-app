import type { PostgrestError } from '@supabase/supabase-js';
import { AppError } from '../utils/response.js';

export function mapSupabaseError(error: PostgrestError | Error | null): AppError {
  if (!error) return new AppError(500, 'DB_ERROR', 'Database operation failed');

  const pg = error as PostgrestError;
  const message = pg.message ?? error.message ?? 'Database error';

  if (pg.code === '23505') {
    return new AppError(409, 'DUPLICATE', 'Record already exists');
  }
  if (pg.code === 'PGRST116') {
    return new AppError(404, 'NOT_FOUND', 'Not found');
  }
  if (message.includes('JWT')) {
    return new AppError(401, 'AUTH_ERROR', 'Invalid Supabase credentials');
  }

  return new AppError(500, 'DB_ERROR', message);
}

export function isNotFoundError(error: unknown): boolean {
  return error instanceof AppError && error.code === 'NOT_FOUND';
}
