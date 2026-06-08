import { useRef, useState } from 'react';
import { ImagePlus, Loader2, Link2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { adminApi } from '../../lib/api';
import { fileToBase64 } from '../../lib/fileUtils';
import { AdminInput } from './ui';

const ACCEPT = 'image/jpeg,image/png,image/webp';
const MAX_BYTES = 5 * 1024 * 1024;

interface ImageFieldProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  folder: 'blog' | 'team' | 'portfolio' | 'general';
  required?: boolean;
  hint?: string;
}

export function ImageField({ label, value, onChange, folder, required, hint }: ImageFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [mode, setMode] = useState<'upload' | 'url'>('upload');

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!ACCEPT.split(',').includes(file.type)) {
      toast.error('Only JPEG, PNG, or WebP images are allowed');
      return;
    }
    if (file.size > MAX_BYTES) {
      toast.error('Image must be 5 MB or smaller');
      return;
    }

    setUploading(true);
    try {
      const imageData = await fileToBase64(file);
      const { item } = await adminApi.uploadMedia({
        fileName: file.name,
        mimeType: file.type,
        folder,
        imageData,
        altText: file.name,
      });
      onChange(item.url);
      toast.success('Image uploaded and saved to media library');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-2">
        <label className="block text-sm font-medium text-slate-700">
          {label}
          {required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
        <div className="flex rounded-lg border border-slate-200 p-0.5 text-xs">
          <button
            type="button"
            onClick={() => setMode('upload')}
            className={`px-2 py-1 rounded-md ${mode === 'upload' ? 'bg-slate-900 text-white' : 'text-slate-600'}`}
          >
            Upload
          </button>
          <button
            type="button"
            onClick={() => setMode('url')}
            className={`px-2 py-1 rounded-md ${mode === 'url' ? 'bg-slate-900 text-white' : 'text-slate-600'}`}
          >
            URL
          </button>
        </div>
      </div>

      {hint && <p className="text-xs text-slate-500">{hint}</p>}

      {value && (
        <div className="rounded-lg border border-slate-200 overflow-hidden bg-slate-50">
          <img src={value} alt="Preview" className="h-36 w-full object-cover" />
        </div>
      )}

      {mode === 'upload' ? (
        <label className="flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-slate-200 bg-slate-50/50 px-4 py-6 cursor-pointer hover:border-blue-300 hover:bg-blue-50/30 transition-colors">
          <input
            ref={inputRef}
            type="file"
            accept={ACCEPT}
            className="sr-only"
            onChange={handleFile}
            disabled={uploading}
          />
          {uploading ? (
            <>
              <Loader2 className="h-6 w-6 text-blue-600 animate-spin" />
              <span className="text-sm text-slate-600">Uploading…</span>
            </>
          ) : (
            <>
              <ImagePlus className="h-6 w-6 text-slate-400" />
              <span className="text-sm font-medium text-slate-700">Click to upload JPEG or PNG</span>
              <span className="text-xs text-slate-500">Saved to media library automatically</span>
            </>
          )}
        </label>
      ) : (
        <div className="relative">
          <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <AdminInput
            className="pl-9"
            placeholder="https://example.com/image.jpg"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            required={required && mode === 'url'}
          />
        </div>
      )}
    </div>
  );
}
