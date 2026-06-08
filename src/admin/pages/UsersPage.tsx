import { FormEvent, useCallback, useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import toast from 'react-hot-toast';
import { adminApi, type AdminUser } from '../../lib/api';
import { AdminPageHeader, AdminCard, AdminInput, AdminSelect, AdminButton, LoadingState, ConfirmDialog } from '../components/ui';

const empty = { name: '', email: '', password: '', role: 'admin' as const };

export function UsersPage() {
  const [items, setItems] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [form, setForm] = useState(empty);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const data = await adminApi.getUsers();
    setItems(data.items);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await adminApi.createUser(form);
      toast.success('User created');
      setFormOpen(false);
      load();
    } catch { toast.error('Create failed'); }
  };

  return (
    <div>
      <AdminPageHeader title="Admin Users" action={<AdminButton onClick={() => { setForm(empty); setFormOpen(true); }}><Plus className="h-4 w-4" /> Add User</AdminButton>} />
      {loading ? <LoadingState /> : (
        <AdminCard className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b"><tr><th className="p-3 text-left">Name</th><th className="p-3 text-left">Email</th><th className="p-3 text-left">Role</th><th className="p-3 text-right">Actions</th></tr></thead>
            <tbody>
              {items.map((u) => (
                <tr key={u._id} className="border-b hover:bg-slate-50">
                  <td className="p-3 font-medium">{u.name}</td>
                  <td className="p-3">{u.email}</td>
                  <td className="p-3 capitalize">{u.role.replace('_', ' ')}</td>
                  <td className="p-3 text-right"><AdminButton variant="danger" onClick={() => setDeleteId(u._id!)}>Delete</AdminButton></td>
                </tr>
              ))}
            </tbody>
          </table>
        </AdminCard>
      )}
      {formOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <AdminCard className="max-w-md w-full p-6">
            <form onSubmit={handleSubmit} className="space-y-3">
              <AdminInput placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
              <AdminInput type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
              <AdminInput type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
              <AdminSelect value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value as typeof form.role })}>
                <option value="admin">Admin</option>
                <option value="editor">Editor</option>
                <option value="hr">HR</option>
                <option value="viewer">Viewer</option>
                <option value="super_admin">Super Admin</option>
              </AdminSelect>
              <div className="flex gap-2"><AdminButton type="submit">Create</AdminButton><AdminButton type="button" variant="secondary" onClick={() => setFormOpen(false)}>Cancel</AdminButton></div>
            </form>
          </AdminCard>
        </div>
      )}
      <ConfirmDialog open={!!deleteId} title="Delete user" message="Remove this admin user?" onConfirm={async () => { if (deleteId) { await adminApi.deleteUser(deleteId); setDeleteId(null); load(); } }} onCancel={() => setDeleteId(null)} />
    </div>
  );
}
