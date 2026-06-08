import { getSupabaseAdmin } from './client.js';
import { mapSupabaseError } from './errors.js';

const RESUMES_BUCKET = 'resumes';
const MEDIA_BUCKET = 'media';

export async function uploadResume(
  applicationId: string,
  fileName: string,
  mimeType: string,
  base64Data: string
): Promise<{ path: string; size: number }> {
  const client = getSupabaseAdmin();
  const buffer = Buffer.from(base64Data, 'base64');
  const safeName = fileName.replace(/[^a-zA-Z0-9._-]/g, '_');
  const path = `${applicationId}/${Date.now()}-${safeName}`;

  const { error } = await client.storage.from(RESUMES_BUCKET).upload(path, buffer, {
    contentType: mimeType,
    upsert: false,
  });

  if (error) throw mapSupabaseError(error);
  return { path, size: buffer.length };
}

export async function downloadResume(storagePath: string): Promise<{
  buffer: Buffer;
  mimeType: string;
}> {
  const client = getSupabaseAdmin();
  const { data, error } = await client.storage.from(RESUMES_BUCKET).download(storagePath);
  if (error || !data) throw mapSupabaseError(error ?? new Error('File not found'));

  const buffer = Buffer.from(await data.arrayBuffer());
  return { buffer, mimeType: data.type || 'application/octet-stream' };
}

export async function uploadMediaFile(
  folder: string,
  fileName: string,
  mimeType: string,
  buffer: Buffer
): Promise<{ path: string; publicUrl: string }> {
  const client = getSupabaseAdmin();
  const safeName = fileName.replace(/[^a-zA-Z0-9._-]/g, '_');
  const path = `${folder}/${Date.now()}-${safeName}`;

  const { error } = await client.storage.from(MEDIA_BUCKET).upload(path, buffer, {
    contentType: mimeType,
    upsert: false,
  });
  if (error) throw mapSupabaseError(error);

  const { data: urlData } = client.storage.from(MEDIA_BUCKET).getPublicUrl(path);
  return { path, publicUrl: urlData.publicUrl };
}

export async function deleteStorageObject(bucket: 'resumes' | 'media', path: string): Promise<void> {
  const client = getSupabaseAdmin();
  const { error } = await client.storage.from(bucket).remove([path]);
  if (error) throw mapSupabaseError(error);
}
