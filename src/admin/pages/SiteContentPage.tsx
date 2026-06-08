import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { adminApi, type SiteContentItem } from '../../lib/api';
import { AdminPageHeader, AdminCard, AdminTextarea, AdminButton, LoadingState } from '../components/ui';

export function SiteContentPage() {
  const [items, setItems] = useState<SiteContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [edited, setEdited] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await adminApi.getSiteContent();
      setItems(data.items);
      const initial: Record<string, string> = {};
      data.items.forEach((i) => {
        initial[i.key] = JSON.stringify(i.content, null, 2);
      });
      setEdited(initial);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const save = async (key: string) => {
    setSaving(key);
    try {
      const content = JSON.parse(edited[key]);
      await adminApi.upsertSiteContent(key, content);
      toast.success(`${key} updated`);
      load();
    } catch {
      toast.error('Invalid JSON or save failed');
    } finally {
      setSaving(null);
    }
  };

  return (
    <div>
      <AdminPageHeader title="Site Content" description="Edit website sections (JSON format)" />
      {loading ? (
        <LoadingState />
      ) : (
        <div className="space-y-6">
          {items.map((item) => (
            <AdminCard key={item._id} className="p-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold capitalize">{item.key.replace('_', ' ')}</h3>
                <AdminButton onClick={() => save(item.key)} disabled={saving === item.key}>
                  {saving === item.key ? 'Saving...' : 'Save'}
                </AdminButton>
              </div>
              <AdminTextarea
                rows={8}
                value={edited[item.key] ?? ''}
                onChange={(e) => setEdited({ ...edited, [item.key]: e.target.value })}
                className="font-mono text-xs"
              />
            </AdminCard>
          ))}
        </div>
      )}
    </div>
  );
}
