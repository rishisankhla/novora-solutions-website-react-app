import { FormEvent, useCallback, useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import toast from 'react-hot-toast';
import { adminApi, type Job } from '../../lib/api';
import {
  AdminPageHeader,
  AdminCard,
  AdminInput,
  AdminTextarea,
  AdminSelect,
  AdminButton,
  LoadingState,
  StatusBadge,
  ConfirmDialog,
} from '../components/ui';

const emptyJob = {
  title: '',
  department: '',
  employmentType: 'Full-time / Remote',
  description: '',
  highlights: '',
  status: 'draft',
  sortOrder: 0,
};

export function JobsPage() {
  const [items, setItems] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Job | null>(null);
  const [form, setForm] = useState(emptyJob);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await adminApi.getJobs('limit=50');
      setItems(data.items);
    } catch {
      toast.error('Failed to load jobs');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const openCreate = () => {
    setEditing(null);
    setForm(emptyJob);
    setFormOpen(true);
  };

  const openEdit = (job: Job) => {
    setEditing(job);
    setForm({
      title: job.title,
      department: job.department,
      employmentType: job.employmentType,
      description: job.description,
      highlights: job.highlights.join(', '),
      status: job.status,
      sortOrder: job.sortOrder,
    });
    setFormOpen(true);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const body = {
      ...form,
      highlights: form.highlights.split(',').map((h) => h.trim()).filter(Boolean),
      sortOrder: Number(form.sortOrder),
    };
    try {
      if (editing) {
        await adminApi.updateJob(editing._id, body);
        toast.success('Job updated');
      } else {
        await adminApi.createJob(body);
        toast.success('Job created');
      }
      setFormOpen(false);
      load();
    } catch {
      toast.error('Save failed');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <AdminPageHeader
        title="Job Positions"
        description="Manage open roles and career listings"
        action={
          <AdminButton onClick={openCreate}>
            <Plus className="h-4 w-4" /> Add Position
          </AdminButton>
        }
      />

      {loading ? (
        <LoadingState />
      ) : (
        <AdminCard className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b">
              <tr>
                <th className="text-left p-3 font-semibold">Title</th>
                <th className="text-left p-3 font-semibold">Department</th>
                <th className="text-left p-3 font-semibold">Type</th>
                <th className="text-left p-3 font-semibold">Status</th>
                <th className="text-right p-3 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((job) => (
                <tr key={job._id} className="border-b hover:bg-slate-50">
                  <td className="p-3 font-medium">{job.title}</td>
                  <td className="p-3">{job.department}</td>
                  <td className="p-3">{job.employmentType}</td>
                  <td className="p-3"><StatusBadge status={job.status} /></td>
                  <td className="p-3 text-right space-x-2">
                    <AdminButton variant="secondary" onClick={() => openEdit(job)}>Edit</AdminButton>
                    <AdminButton variant="danger" onClick={() => setDeleteId(job._id)}>Delete</AdminButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </AdminCard>
      )}

      {formOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <AdminCard className="max-w-lg w-full max-h-[90vh] overflow-y-auto p-6">
            <h3 className="text-lg font-bold mb-4">{editing ? 'Edit Job' : 'New Job'}</h3>
            <form onSubmit={handleSubmit} className="space-y-3">
              <AdminInput placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
              <AdminInput placeholder="Department" value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })} required />
              <AdminInput placeholder="Employment Type" value={form.employmentType} onChange={(e) => setForm({ ...form, employmentType: e.target.value })} required />
              <AdminTextarea placeholder="Description" rows={4} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required />
              <AdminInput placeholder="Highlights (comma separated)" value={form.highlights} onChange={(e) => setForm({ ...form, highlights: e.target.value })} />
              <AdminSelect value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
                <option value="draft">Draft</option>
                <option value="open">Open</option>
                <option value="closed">Closed</option>
              </AdminSelect>
              <div className="flex gap-2 pt-2">
                <AdminButton type="submit" disabled={saving}>{saving ? 'Saving...' : 'Save'}</AdminButton>
                <AdminButton type="button" variant="secondary" onClick={() => setFormOpen(false)}>Cancel</AdminButton>
              </div>
            </form>
          </AdminCard>
        </div>
      )}

      <ConfirmDialog
        open={!!deleteId}
        title="Delete job"
        message="This will permanently remove this position."
        onConfirm={async () => {
          if (deleteId) {
            await adminApi.deleteJob(deleteId);
            toast.success('Deleted');
            setDeleteId(null);
            load();
          }
        }}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}
