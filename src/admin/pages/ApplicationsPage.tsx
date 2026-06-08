import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { adminApi, type Application } from '../../lib/api';
import {
  AdminPageHeader,
  AdminCard,
  AdminInput,
  AdminSelect,
  AdminTextarea,
  AdminButton,
  LoadingState,
  StatusBadge,
  ConfirmDialog,
} from '../components/ui';

export function ApplicationsPage() {
  const [items, setItems] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [selected, setSelected] = useState<Application | null>(null);
  const [notes, setNotes] = useState('');
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.set('search', search);
      if (status) params.set('status', status);
      const data = await adminApi.getApplications(params.toString());
      setItems(data.items);
    } catch {
      toast.error('Failed to load applications');
    } finally {
      setLoading(false);
    }
  }, [search, status]);

  useEffect(() => {
    load();
  }, [load]);

  const openDetail = (app: Application) => {
    setSelected(app);
    setNotes(app.adminNotes ?? '');
  };

  const saveStatus = async (newStatus: string) => {
    if (!selected) return;
    try {
      await adminApi.updateApplication(selected._id, { status: newStatus, adminNotes: notes });
      toast.success('Application updated — applicant will be notified by email');
      setSelected(null);
      load();
    } catch {
      toast.error('Update failed');
    }
  };

  const downloadResume = async (app: Application) => {
    try {
      const blob = await adminApi.downloadApplicationResume(app._id);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = app.resume?.originalName ?? 'resume.pdf';
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      toast.error('Resume not available for download');
    }
  };

  return (
    <div>
      <AdminPageHeader title="Career Applications" description="Review and manage job applicants" />

      <AdminCard className="p-4 mb-4 flex flex-wrap gap-3">
        <AdminInput placeholder="Search applicants..." value={search} onChange={(e) => setSearch(e.target.value)} className="max-w-xs" />
        <AdminSelect value={status} onChange={(e) => setStatus(e.target.value)} className="max-w-[180px]">
          <option value="">All status</option>
          <option value="new">New</option>
          <option value="reviewing">Reviewing</option>
          <option value="shortlisted">Shortlisted</option>
          <option value="rejected">Rejected</option>
          <option value="hired">Hired</option>
        </AdminSelect>
        <AdminButton variant="secondary" onClick={load}>Refresh</AdminButton>
      </AdminCard>

      {loading ? (
        <LoadingState />
      ) : (
        <AdminCard className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b">
              <tr>
                <th className="text-left p-3 font-semibold text-slate-600">Applicant</th>
                <th className="text-left p-3 font-semibold text-slate-600">Position</th>
                <th className="text-left p-3 font-semibold text-slate-600">Resume</th>
                <th className="text-left p-3 font-semibold text-slate-600">Date</th>
                <th className="text-left p-3 font-semibold text-slate-600">Status</th>
                <th className="text-right p-3 font-semibold text-slate-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item._id} className="border-b hover:bg-slate-50">
                  <td className="p-3">
                    <p className="font-medium">{item.applicant.fullName}</p>
                    <p className="text-slate-500">{item.applicant.email}</p>
                  </td>
                  <td className="p-3">{item.positionTitle}</td>
                  <td className="p-3 text-slate-500">
                    {item.resume?.originalName ?? '—'}
                    {item.resume?.originalName && !item.resume.storagePending && (
                      <button
                        type="button"
                        onClick={() => downloadResume(item)}
                        className="ml-2 text-blue-600 hover:underline text-xs"
                      >
                        Download
                      </button>
                    )}
                  </td>
                  <td className="p-3 text-slate-500">{new Date(item.createdAt).toLocaleDateString()}</td>
                  <td className="p-3"><StatusBadge status={item.status} /></td>
                  <td className="p-3 text-right">
                    <AdminButton variant="secondary" onClick={() => openDetail(item)}>Review</AdminButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </AdminCard>
      )}

      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <AdminCard className="max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
            <h3 className="text-lg font-bold mb-4">{selected.applicant.fullName}</h3>
            <div className="grid grid-cols-2 gap-3 text-sm mb-4">
              <p><span className="text-slate-500">Email:</span> {selected.applicant.email}</p>
              <p><span className="text-slate-500">Phone:</span> {selected.applicant.phone}</p>
              <p><span className="text-slate-500">Location:</span> {selected.applicant.location}</p>
              <p><span className="text-slate-500">Position:</span> {selected.positionTitle}</p>
            </div>
            <p className="text-sm font-medium mb-1">Cover Letter</p>
            <p className="text-sm text-slate-600 mb-4 whitespace-pre-wrap bg-slate-50 p-3 rounded-lg">{selected.coverLetter}</p>
            {selected.resume?.originalName && (
              <div className="mb-4">
                <p className="text-sm font-medium mb-1">Resume</p>
                <button
                  type="button"
                  onClick={() => downloadResume(selected)}
                  className="text-sm text-blue-600 hover:underline"
                >
                  Download {selected.resume.originalName}
                </button>
              </div>
            )}
            <label className="block text-sm font-medium mb-1">Admin Notes</label>
            <AdminTextarea rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} className="mb-4" />
            <div className="flex flex-wrap gap-2">
              {(['reviewing', 'shortlisted', 'rejected', 'hired'] as const).map((s) => (
                <AdminButton key={s} variant={s === 'rejected' ? 'danger' : 'primary'} onClick={() => saveStatus(s)}>
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </AdminButton>
              ))}
              <AdminButton variant="secondary" onClick={() => setSelected(null)}>Close</AdminButton>
            </div>
          </AdminCard>
        </div>
      )}

      <ConfirmDialog
        open={!!deleteId}
        title="Delete application"
        message="This action cannot be undone."
        onConfirm={async () => {
          if (deleteId) {
            await adminApi.deleteApplication(deleteId);
            setDeleteId(null);
            load();
          }
        }}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}
