import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import { env } from './config/env.js';
import { connectDatabase } from './db/connect.js';
import { pingDatabase } from './data/index.js';
import { verifySupabaseConnection, ensureStorageBuckets } from './supabase/client.js';
import publicRoutes from './routes/public.routes.js';
import adminRoutes from './routes/admin.routes.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const uploadsDir = path.resolve(__dirname, '../uploads');

app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));
app.use('/uploads', express.static(uploadsDir));
app.use(
  cors({
    origin: env.clientOrigin,
    credentials: true,
  })
);
app.use(morgan(env.nodeEnv === 'production' ? 'combined' : 'dev'));
app.use(express.json({ limit: '8mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/api/health', async (_req, res) => {
  const health: Record<string, unknown> = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    dataSource: env.dataSource,
    supabaseConfigured: env.supabaseConfigured,
  };

  try {
    await pingDatabase();
    health.database = 'connected';
  } catch (err) {
    health.database = 'error';
    health.databaseError = err instanceof Error ? err.message : 'Unknown error';
    health.status = 'degraded';
  }

  if (env.supabaseConfigured) {
    const supabase = await verifySupabaseConnection();
    health.supabase = supabase.ok ? 'connected' : 'error';
    if (!supabase.ok) {
      health.supabaseError = supabase.error;
      health.status = 'degraded';
    }
  } else if (env.supabaseUrl) {
    health.supabase = 'missing_service_key';
  }

  const statusCode = health.status === 'ok' ? 200 : 503;
  res.status(statusCode).json({ success: health.status === 'ok', data: health });
});

app.use('/api/v1/public', publicRoutes);
app.use('/api/v1/admin', adminRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

async function start() {
  await connectDatabase();

  if (env.dataSource === 'supabase' && env.supabaseConfigured) {
    try {
      await ensureStorageBuckets();
      console.log('Supabase storage buckets verified');
    } catch (err) {
      console.warn('Supabase storage bucket setup:', err instanceof Error ? err.message : err);
    }
  }

  app.listen(env.port, () => {
    console.log(`API server running on http://localhost:${env.port} [${env.dataSource}]`);
  });
}

start().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});

export default app;
