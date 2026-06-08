import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { env } from '../config/env.js';
import { repo } from '../data/index.js';
import { uploadMediaFile } from '../supabase/storage.js';
import { AppError } from '../utils/response.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const LOCAL_MEDIA_ROOT = path.resolve(__dirname, '../../uploads/media');

const ALLOWED_MIME = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/jpg']);
const MAX_IMAGE_BYTES = 5 * 1024 * 1024;

function sanitizeFileName(name: string): string {
  return name.replace(/[^a-zA-Z0-9._-]/g, '_');
}

export async function processImageUpload(input: {
  fileName: string;
  mimeType: string;
  folder: string;
  imageData: string;
  altText?: string;
  uploadedBy?: string;
}) {
  const mimeType = input.mimeType === 'image/jpg' ? 'image/jpeg' : input.mimeType;
  if (!ALLOWED_MIME.has(mimeType)) {
    throw new AppError(400, 'INVALID_FILE', 'Only JPEG, PNG, and WebP images are allowed');
  }

  const buffer = Buffer.from(input.imageData, 'base64');
  if (buffer.length > MAX_IMAGE_BYTES) {
    throw new AppError(400, 'FILE_TOO_LARGE', 'Image must be 5 MB or smaller');
  }

  const safeName = sanitizeFileName(input.fileName);
  const folder = sanitizeFileName(input.folder || 'general');

  let url: string;
  let storagePath: string | undefined;

  if (env.dataSource === 'supabase' && env.supabaseConfigured) {
    const uploaded = await uploadMediaFile(folder, safeName, mimeType, buffer);
    url = uploaded.publicUrl;
    storagePath = uploaded.path;
  } else {
    const relPath = `${folder}/${Date.now()}-${safeName}`;
    const fullPath = path.join(LOCAL_MEDIA_ROOT, relPath);
    await fs.mkdir(path.dirname(fullPath), { recursive: true });
    await fs.writeFile(fullPath, buffer);
    storagePath = relPath;
    url = `/uploads/media/${relPath}`;
  }

  const item = await repo.createMediaAsset({
    filename: safeName,
    originalName: input.fileName,
    mimeType,
    size: buffer.length,
    url,
    storagePath,
    folder,
    altText: input.altText,
    uploadedBy: input.uploadedBy,
  });

  return item;
}
