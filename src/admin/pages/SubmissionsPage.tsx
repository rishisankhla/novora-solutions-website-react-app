import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { adminApi, type Submission } from '../../lib/api';
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

function formatDate(value?: string): string {
  if (!value) return '—';
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? '—' : d.toLocaleString();
}

export function SubmissionsPage() {
  const [items, setItems] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [type, setType] = useState('');
  const [status, setStatus] = useState('');
  const [selected, setSelected] = useState<Submission | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 350);
    return () => clearTimeout(t);
  }, [search]);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({ limit: '50' });
      if (debouncedSearch) params.set('search', debouncedSearch);
      if (type) params.set('type', type);
      if (status) params.set('status', status);
      const data = await adminApi.getSubmissions(params.toString());
      setItems(data.items ?? []);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to load submissions';
      setError(message);
      toast.error(message);
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, [debouncedSearch, type, status]);

  useEffect(() => {
    load();
  }, [load]);

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      await adminApi.updateSubmission(id, { status: newStatus });
      toast.success('Status updated');
      setSelected((prev) => (prev?._id === id ? { ...prev, status: newStatus } : prev));
      load();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Update failed');
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    try {
      await adminApi.deleteSubmission(deleteId);
      toast.success('Deleted');
      setDeleteId(null);
      if (selected?._id === deleteId) setSelected(null);
      load();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Delete failed');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div>
      <AdminPageHeader
        title="Submissions"
        description="Contact forms, leads, inquiries, and newsletter signups"
      />

      <AdminCard className="p-4 mb-4 flex flex-wrap gap-3">
        <AdminInput
          placeholder="Search name, email, message…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-xs"
        />
        <AdminSelect value={type} onChange={(e) => setType(e.target.value)} className="max-w-[160px]">
          <option value="">All types</option>
          <option value="contact">Contact</option>
          <option value="lead">Lead</option>
          <option value="inquiry">Inquiry</option>
          <option value="newsletter">Newsletter</option>
        </AdminSelect>
        <AdminSelect value={status} onChange={(e) => setStatus(e.target.value)} className="max-w-[160px]">
          <option value="">All status</option>
          <option value="new">New</option>
          <option value="read">Read</option>
          <option value="archived">Archived</option>
        </AdminSelect>
        <AdminButton variant="secondary" onClick={load}>
          Refresh
        </AdminButton>
      </AdminCard>

      {error && (
        <AdminCard className="p-4 mb-4 border-red-200 bg-red-50 text-red-800 text-sm">
          {error}
        </AdminCard>
      )}

      {loading ? (
        <LoadingState />
      ) : items.length === 0 ? (
        <AdminCard className="p-12 text-center text-slate-500">
          <p className="font-medium text-slate-700 mb-1">No submissions found</p>
          <p className="text-sm">
            {debouncedSearch || type || status
              ? 'Try clearing filters or submit a test form from the website.'
              : 'Submissions from the contact form and newsletter will appear here.'}
          </p>
        </AdminCard>
      ) : (
        <AdminCard className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="text-left p-3 font-semibold text-slate-600">Type</th>
                <th className="text-left p-3 font-semibold text-slate-600">Contact</th>
                <th className="text-left p-3 font-semibold text-slate-600">Preview</th>
                <th className="text-left p-3 font-semibold text-slate-600">Date</th>
                <th className="text-left p-3 font-semibold text-slate-600">Status</th>
                <th className="text-right p-3 font-semibold text-slate-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item._id} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="p-3">
                    <StatusBadge status={item.type} />
                  </td>
                  <td className="p-3">
                    <p className="font-medium">{item.name || item.email}</p>
                    <p className="text-slate-500">{item.name ? item.email : 'Newsletter signup'}</p>
                  </td>
                  <td className="p-3 max-w-xs truncate text-slate-600">
                    {item.message || item.subject || item.company || '—'}
                  </td>
                  <td className="p-3 text-slate-500 whitespace-nowrap">
                    {formatDate(item.createdAt)}
                  </td>
                  <td className="p-3">
                    <StatusBadge status={item.status} />
                  </td>
                  <td className="p-3 text-right space-x-2">
                    <AdminButton variant="secondary" onClick={() => setSelected(item)}>
                      View
                    </AdminButton>
                    {item.status === 'new' && (
                      <AdminButton variant="secondary" onClick={() => updateStatus(item._id, 'read')}>
                        Mark read
                      </AdminButton>
                    )}
                    {item.status !== 'archived' && (
                      <AdminButton variant="secondary" onClick={() => updateStatus(item._id, 'archived')}>
                        Archive
                      </AdminButton>
                    )}
                    <AdminButton variant="danger" onClick={() => setDeleteId(item._id)}>
                      Delete
                    </AdminButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </AdminCard>
      )}

      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <AdminCard className="max-w-lg w-full max-h-[90vh] overflow-y-auto p-6">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  {selected.name || 'Newsletter subscriber'}
                </h3>
                <p className="text-sm text-slate-500">{selected.email}</p>
              </div>
              <StatusBadge status={selected.type} />
            </div>

            <dl className="grid grid-cols-2 gap-3 text-sm mb-4">
              <div>
                <dt className="text-slate-500">Status</dt>
                <dd className="mt-0.5">
                  <StatusBadge status={selected.status} />
                </dd>
              </div>
              <div>
                <dt className="text-slate-500">Submitted</dt>
                <dd className="mt-0.5 font-medium">{formatDate(selected.createdAt)}</dd>
              </div>
              {selected.phone && (
                <div>
                  <dt className="text-slate-500">Phone</dt>
                  <dd className="mt-0.5 font-medium">{selected.phone}</dd>
                </div>
              )}
              {selected.company && (
                <div>
                  <dt className="text-slate-500">Company</dt>
                  <dd className="mt-0.5 font-medium">{selected.company}</dd>
                </div>
              )}
              {selected.subject && (
                <div className="col-span-2">
                  <dt className="text-slate-500">Subject</dt>
                  <dd className="mt-0.5 font-medium">{selected.subject}</dd>
                </div>
              )}
            </dl>

            {selected.message && (
              <div className="mb-4">
                <p className="text-sm font-medium text-slate-700 mb-1">Message</p>
                <p className="text-sm text-slate-600 whitespace-pre-wrap bg-slate-50 rounded-lg p-3 border border-slate-100">
                  {selected.message}
                </p>
              </div>
            )}

            <div className="flex flex-wrap gap-2">
              {selected.status === 'new' && (
                <AdminButton onClick={() => updateStatus(selected._id, 'read')}>Mark read</AdminButton>
              )}
              {selected.status !== 'archived' && (
                <AdminButton variant="secondary" onClick={() => updateStatus(selected._id, 'archived')}>
                  Archive
                </AdminButton>
              )}
              <AdminButton variant="secondary" onClick={() => setSelected(null)}>
                Close
              </AdminButton>
            </div>
          </AdminCard>
        </div>
      )}

      <ConfirmDialog
        open={!!deleteId}
        title="Delete submission"
        message="This action cannot be undone."
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
        loading={deleting}
      />
    </div>
  );
}
