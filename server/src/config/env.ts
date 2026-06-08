import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

function required(name: string, fallback?: string): string {
  const value = process.env[name] ?? fallback;
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

const supabaseUrl =
  process.env.SUPABASE_URL ?? process.env.VITE_SUPABASE_URL ?? '';
const supabaseAnonKey =
  process.env.VITE_SUPABASE_PUBLISHABLE_KEY ??
  process.env.SUPABASE_ANON_KEY ??
  '';
const supabaseServiceKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ??
  process.env.SUPABASE_SECRET_KEY ??
  '';

const supabaseConfigured = Boolean(supabaseUrl && supabaseServiceKey);
const dataSourceEnv = process.env.DATA_SOURCE?.toLowerCase();

export const env = {
  nodeEnv: process.env.NODE_ENV ?? 'development',
  port: Number(process.env.API_PORT ?? 5000),
  mongoUri: process.env.MONGODB_URI ?? 'mongodb://127.0.0.1:27017/novora_cms',
  jwtSecret: required('JWT_SECRET', 'dev-jwt-secret-change-in-production'),
  jwtExpiresIn: process.env.JWT_EXPIRES_IN ?? '7d',
  clientOrigin: process.env.CLIENT_ORIGIN ?? 'http://localhost:3000',
  adminEmail: process.env.ADMIN_EMAIL ?? 'admin@novorasolutions.com',
  adminPassword: process.env.ADMIN_PASSWORD ?? 'Admin@123456',
  enableEmailNotifications: process.env.ENABLE_EMAIL_NOTIFICATIONS === 'true',
  smtpHost: process.env.SMTP_HOST ?? '',
  smtpPort: Number(process.env.SMTP_PORT ?? 587),
  smtpSecure: process.env.SMTP_SECURE === 'true',
  smtpUser: process.env.SMTP_USER ?? '',
  smtpPass: process.env.SMTP_PASS ?? '',
  smtpFrom: process.env.SMTP_FROM ?? 'Novora Careers <careers@novorasolutions.com>',
  careersReplyTo: process.env.CAREERS_REPLY_TO ?? 'careers@novorasolutions.com',
  supabaseUrl,
  supabaseAnonKey,
  supabaseServiceKey,
  supabaseConfigured,
  /** Primary data backend: supabase when service key is set, else mongodb */
  dataSource:
    dataSourceEnv === 'supabase'
      ? ('supabase' as const)
      : dataSourceEnv === 'mongodb'
        ? ('mongodb' as const)
        : supabaseConfigured
          ? ('supabase' as const)
          : ('mongodb' as const),
} as const;

export function isEmailConfigured(): boolean {
  return (
    env.enableEmailNotifications &&
    Boolean(env.smtpHost && env.smtpUser && env.smtpPass)
  );
}

export function assertSupabaseServerConfig(): void {
  if (!supabaseUrl) {
    throw new Error('Supabase URL missing. Set VITE_SUPABASE_URL or SUPABASE_URL.');
  }
  if (!supabaseServiceKey) {
    throw new Error(
      'Supabase service role key missing. Add SUPABASE_SERVICE_ROLE_KEY from your Supabase project settings (API keys).'
    );
  }
}
