import { useCallback, useEffect, useRef, useState } from 'react';
import { ImagePlus, Loader2, Plus } from 'lucide-react';
import toast from 'react-hot-toast';
import { adminApi, type MediaItem } from '../../lib/api';
import { fileToBase64 } from '../../lib/fileUtils';
import { AdminPageHeader, AdminCard, AdminInput, AdminSelect, AdminButton, LoadingState, ConfirmDialog } from '../components/ui';

const ACCEPT = 'image/jpeg,image/png,image/webp';

export function MediaPage() {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [folder, setFolder] = useState('general');
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await adminApi.getMedia('limit=50');
      setItems(data.items);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to load media');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!ACCEPT.split(',').includes(file.type)) {
      toast.error('Only JPEG, PNG, or WebP images are allowed');
      return;
    }

    setUploading(true);
    try {
      const imageData = await fileToBase64(file);
      await adminApi.uploadMedia({
        fileName: file.name,
        mimeType: file.type,
        folder,
        imageData,
        altText: file.name,
      });
      toast.success('Image uploaded and saved');
      load();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = '';
    }
  };

  return (
    <div>
      <AdminPageHeader
        title="Media Library"
        description="Upload JPEG/PNG images — stored on disk or Supabase and tracked in the database."
        action={
          <div className="flex flex-wrap items-center gap-2">
            <AdminSelect value={folder} onChange={(e) => setFolder(e.target.value)} className="w-36">
              <option value="general">General</option>
              <option value="team">Team</option>
              <option value="portfolio">Portfolio</option>
            </AdminSelect>
            <AdminButton onClick={() => fileRef.current?.click()} disabled={uploading}>
              {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
              Upload image
            </AdminButton>
            <input ref={fileRef} type="file" accept={ACCEPT} className="hidden" onChange={handleUpload} />
          </div>
        }
      />

      {loading ? (
        <LoadingState />
      ) : items.length === 0 ? (
        <AdminCard className="p-12 text-center">
          <ImagePlus className="h-10 w-10 text-slate-300 mx-auto mb-3" />
          <p className="text-slate-600 font-medium">No media yet</p>
          <p className="text-sm text-slate-500 mt-1">Upload images from here or from team and portfolio forms.</p>
        </AdminCard>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
          {items.map((m) => (
            <AdminCard key={m._id} className="overflow-hidden">
              {m.mimeType.startsWith('image/') ? (
                <img src={m.url} alt={m.originalName} className="h-32 w-full object-cover" />
              ) : (
                <div className="h-32 bg-slate-100 flex items-center justify-center text-slate-400 text-sm">
                  {m.mimeType}
                </div>
              )}
              <div className="p-3">
                <p className="text-sm font-medium truncate">{m.originalName}</p>
                <p className="text-xs text-slate-500">{m.folder}</p>
                <p className="text-xs text-slate-400 truncate mt-1">{m.url}</p>
                <AdminButton variant="danger" className="mt-2 w-full" onClick={() => setDeleteId(m._id)}>
                  Delete
                </AdminButton>
              </div>
            </AdminCard>
          ))}
        </div>
      )}

      <ConfirmDialog
        open={!!deleteId}
        title="Delete media"
        message="Remove this media record? Linked content may show a broken image."
        onConfirm={async () => {
          if (deleteId) {
            try {
              await adminApi.deleteMedia(deleteId);
              setDeleteId(null);
              load();
            } catch (err) {
              toast.error(err instanceof Error ? err.message : 'Delete failed');
            }
          }
        }}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}
