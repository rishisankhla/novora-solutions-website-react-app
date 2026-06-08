import { FormEvent, useCallback, useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import toast from 'react-hot-toast';
import { adminApi, type BlogPost } from '../../lib/api';
import { AdminPageHeader, AdminCard, AdminInput, AdminTextarea, AdminSelect, AdminButton, LoadingState, StatusBadge, ConfirmDialog } from '../components/ui';
import { ImageField } from '../components/ImageField';

const empty = { title: '', excerpt: '', content: '', category: '', author: 'Novora Solutions Team', imageUrl: '', readTimeMinutes: 5, status: 'draft' };

export function BlogPage() {
  const [items, setItems] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<BlogPost | null>(null);
  const [form, setForm] = useState(empty);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await adminApi.getBlog('limit=50');
      setItems(data.items);
    } catch {
      toast.error('Failed to load blog posts');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const body = { ...form, readTimeMinutes: Number(form.readTimeMinutes) };
    if (!form.imageUrl.trim()) {
      toast.error('Add a cover image (upload or URL)');
      return;
    }
    try {
      if (editing) await adminApi.updateBlog(editing._id, body);
      else await adminApi.createBlog(body);
      toast.success('Saved');
      setFormOpen(false);
      load();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Save failed');
    }
  };

  return (
    <div>
      <AdminPageHeader title="Blog Posts" action={<AdminButton onClick={() => { setEditing(null); setForm(empty); setFormOpen(true); }}><Plus className="h-4 w-4" /> Add Post</AdminButton>} />
      {loading ? <LoadingState /> : (
        <AdminCard className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b"><tr><th className="p-3 text-left">Title</th><th className="p-3 text-left">Category</th><th className="p-3 text-left">Status</th><th className="p-3 text-right">Actions</th></tr></thead>
            <tbody>
              {items.map((p) => (
                <tr key={p._id} className="border-b hover:bg-slate-50">
                  <td className="p-3 font-medium">{p.title}</td>
                  <td className="p-3">{p.category}</td>
                  <td className="p-3"><StatusBadge status={p.status} /></td>
                  <td className="p-3 text-right space-x-2">
                    <AdminButton variant="secondary" onClick={() => { setEditing(p); setForm({ title: p.title, excerpt: p.excerpt, content: p.content, category: p.category, author: p.author, imageUrl: p.imageUrl, readTimeMinutes: p.readTimeMinutes, status: p.status }); setFormOpen(true); }}>Edit</AdminButton>
                    <AdminButton variant="danger" onClick={() => setDeleteId(p._id)}>Delete</AdminButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </AdminCard>
      )}
      {formOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <AdminCard className="max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
            <form onSubmit={handleSubmit} className="space-y-3">
              <AdminInput placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
              <AdminInput placeholder="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} required />
              <AdminTextarea placeholder="Excerpt" rows={2} value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} required />
              <AdminTextarea placeholder="Content (Markdown/HTML)" rows={6} value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} />
              <ImageField
                label="Cover image"
                value={form.imageUrl}
                onChange={(imageUrl) => setForm({ ...form, imageUrl })}
                folder="blog"
                required
                hint="JPEG or PNG — uploaded images are saved to the media library."
              />
              <AdminSelect value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}><option value="draft">Draft</option><option value="published">Published</option></AdminSelect>
              <div className="flex gap-2"><AdminButton type="submit">Save</AdminButton><AdminButton type="button" variant="secondary" onClick={() => setFormOpen(false)}>Cancel</AdminButton></div>
            </form>
          </AdminCard>
        </div>
      )}
      <ConfirmDialog open={!!deleteId} title="Delete post" message="Remove this blog post?" onConfirm={async () => { if (deleteId) { await adminApi.deleteBlog(deleteId); setDeleteId(null); load(); } }} onCancel={() => setDeleteId(null)} />
    </div>
  );
}
