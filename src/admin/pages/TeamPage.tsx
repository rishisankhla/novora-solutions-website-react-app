import { FormEvent, useCallback, useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import toast from 'react-hot-toast';
import { adminApi, type TeamMember } from '../../lib/api';
import {
  AdminPageHeader,
  AdminCard,
  AdminInput,
  AdminSelect,
  AdminButton,
  LoadingState,
  StatusBadge,
  ConfirmDialog,
} from '../components/ui';
import { ImageField } from '../components/ImageField';

const empty = {
  name: '',
  role: '',
  bio: '',
  imageUrl: '',
  linkedinUrl: '',
  isLeadership: false,
  sortOrder: 0,
  status: 'published',
};

export function TeamPage() {
  const [items, setItems] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<TeamMember | null>(null);
  const [form, setForm] = useState(empty);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await adminApi.getTeam('limit=50');
      setItems(data.items);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const body = { ...form, sortOrder: Number(form.sortOrder) };
      if (editing) await adminApi.updateTeam(editing._id, body);
      else await adminApi.createTeam(body);
      toast.success('Saved');
      setFormOpen(false);
      load();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Save failed');
    }
  };

  return (
    <div>
      <AdminPageHeader title="Team Members" action={<AdminButton onClick={() => { setEditing(null); setForm(empty); setFormOpen(true); }}><Plus className="h-4 w-4" /> Add Member</AdminButton>} />
      {loading ? <LoadingState /> : (
        <AdminCard className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b"><tr><th className="p-3 text-left">Name</th><th className="p-3 text-left">Role</th><th className="p-3 text-left">Leadership</th><th className="p-3 text-left">Status</th><th className="p-3 text-right">Actions</th></tr></thead>
            <tbody>
              {items.map((m) => (
                <tr key={m._id} className="border-b hover:bg-slate-50">
                  <td className="p-3 font-medium">{m.name}</td>
                  <td className="p-3">{m.role}</td>
                  <td className="p-3">{m.isLeadership ? 'Yes' : 'Team'}</td>
                  <td className="p-3"><StatusBadge status={m.status} /></td>
                  <td className="p-3 text-right space-x-2">
                    <AdminButton variant="secondary" onClick={() => { setEditing(m); setForm({ name: m.name, role: m.role, bio: m.bio ?? '', imageUrl: m.imageUrl ?? '', linkedinUrl: m.linkedinUrl ?? '', isLeadership: m.isLeadership, sortOrder: m.sortOrder, status: m.status }); setFormOpen(true); }}>Edit</AdminButton>
                    <AdminButton variant="danger" onClick={() => setDeleteId(m._id)}>Delete</AdminButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </AdminCard>
      )}
      {formOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <AdminCard className="max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto">
            <form onSubmit={handleSubmit} className="space-y-3">
              <AdminInput placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
              <AdminInput placeholder="Role" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} required />
              <textarea
                placeholder="Short bio (2–3 sentences shown on the team page)"
                value={form.bio}
                onChange={(e) => setForm({ ...form, bio: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
              <ImageField
                label="Profile photo"
                value={form.imageUrl}
                onChange={(imageUrl) => setForm({ ...form, imageUrl })}
                folder="team"
                hint="Upload a photo or paste an image URL — both work."
              />
              <AdminInput placeholder="LinkedIn URL" value={form.linkedinUrl} onChange={(e) => setForm({ ...form, linkedinUrl: e.target.value })} />
              <AdminInput
                type="number"
                placeholder="Sort order (lower = first)"
                value={form.sortOrder}
                onChange={(e) => setForm({ ...form, sortOrder: Number(e.target.value) })}
              />
              <label className="flex items-center gap-2 text-sm text-slate-700">
                <input
                  type="checkbox"
                  checked={form.isLeadership}
                  onChange={(e) => setForm({ ...form, isLeadership: e.target.checked })}
                  className="rounded border-slate-300"
                />
                Show in Leadership section (uncheck for general team grid)
              </label>
              <AdminSelect value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
                <option value="published">Published — visible on website</option>
                <option value="draft">Draft — hidden from website</option>
              </AdminSelect>
              <div className="flex gap-2"><AdminButton type="submit">Save</AdminButton><AdminButton type="button" variant="secondary" onClick={() => setFormOpen(false)}>Cancel</AdminButton></div>
            </form>
          </AdminCard>
        </div>
      )}
      <ConfirmDialog open={!!deleteId} title="Delete member" message="Remove this team member?" onConfirm={async () => { if (deleteId) { await adminApi.deleteTeam(deleteId); setDeleteId(null); load(); } }} onCancel={() => setDeleteId(null)} />
    </div>
  );
}
