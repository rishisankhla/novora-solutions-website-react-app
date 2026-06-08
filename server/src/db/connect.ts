import mongoose from 'mongoose';
import { env } from '../config/env.js';

export async function connectDatabase(): Promise<void> {
  if (env.dataSource === 'supabase') {
    console.log('Using Supabase as primary data store (MongoDB skipped)');
    return;
  }
  mongoose.set('strictQuery', true);
  await mongoose.connect(env.mongoUri);
  console.log('MongoDB connected');
}
