import { FormEvent, useCallback, useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import toast from 'react-hot-toast';
import { adminApi, type Portfolio } from '../../lib/api';
import { AdminPageHeader, AdminCard, AdminInput, AdminTextarea, AdminSelect, AdminButton, LoadingState, StatusBadge, ConfirmDialog } from '../components/ui';
import { ImageField } from '../components/ImageField';

const empty = { title: '', category: '', description: '', imageUrl: '', tags: '', sortOrder: 0, status: 'published' };

export function PortfolioPage() {
  const [items, setItems] = useState<Portfolio[]>([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Portfolio | null>(null);
  const [form, setForm] = useState(empty);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await adminApi.getPortfolio('limit=50');
      setItems(data.items);
    } catch {
      toast.error('Failed to load portfolio');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const body = { ...form, tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean), sortOrder: Number(form.sortOrder) };
    if (!form.imageUrl.trim()) {
      toast.error('Add a project image (upload or URL)');
      return;
    }
    try {
      if (editing) await adminApi.updatePortfolio(editing._id, body);
      else await adminApi.createPortfolio(body);
      toast.success('Saved');
      setFormOpen(false);
      load();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Save failed');
    }
  };

  return (
    <div>
      <AdminPageHeader title="Portfolio" action={<AdminButton onClick={() => { setEditing(null); setForm(empty); setFormOpen(true); }}><Plus className="h-4 w-4" /> Add Project</AdminButton>} />
      {loading ? <LoadingState /> : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {items.map((p) => (
            <AdminCard key={p._id} className="overflow-hidden">
              <img src={p.imageUrl} alt={p.title} className="h-40 w-full object-cover" />
              <div className="p-4">
                <div className="flex justify-between items-start mb-2"><h3 className="font-semibold">{p.title}</h3><StatusBadge status={p.status} /></div>
                <p className="text-sm text-slate-500 line-clamp-2 mb-3">{p.description}</p>
                <div className="flex gap-2">
                  <AdminButton variant="secondary" onClick={() => { setEditing(p); setForm({ title: p.title, category: p.category, description: p.description, imageUrl: p.imageUrl, tags: p.tags.join(', '), sortOrder: p.sortOrder, status: p.status }); setFormOpen(true); }}>Edit</AdminButton>
                  <AdminButton variant="danger" onClick={() => setDeleteId(p._id)}>Delete</AdminButton>
                </div>
              </div>
            </AdminCard>
          ))}
        </div>
      )}
      {formOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <AdminCard className="max-w-lg w-full max-h-[90vh] overflow-y-auto p-6">
            <form onSubmit={handleSubmit} className="space-y-3">
              <AdminInput placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
              <AdminInput placeholder="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} required />
              <AdminTextarea placeholder="Description" rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required />
              <ImageField
                label="Project image"
                value={form.imageUrl}
                onChange={(imageUrl) => setForm({ ...form, imageUrl })}
                folder="portfolio"
                required
              />
              <AdminInput placeholder="Tags (comma separated)" value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} />
              <AdminSelect value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}><option value="published">Published</option><option value="draft">Draft</option></AdminSelect>
              <div className="flex gap-2"><AdminButton type="submit">Save</AdminButton><AdminButton type="button" variant="secondary" onClick={() => setFormOpen(false)}>Cancel</AdminButton></div>
            </form>
          </AdminCard>
        </div>
      )}
      <ConfirmDialog open={!!deleteId} title="Delete project" message="Remove this portfolio item?" onConfirm={async () => { if (deleteId) { await adminApi.deletePortfolio(deleteId); setDeleteId(null); load(); } }} onCancel={() => setDeleteId(null)} />
    </div>
  );
}
