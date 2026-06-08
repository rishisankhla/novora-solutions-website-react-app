import { useEffect, useState } from 'react';
import { adminApi, type ActivityItem } from '../../lib/api';
import { AdminPageHeader, AdminCard, LoadingState } from '../components/ui';

export function ActivityPage() {
  const [items, setItems] = useState<ActivityItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminApi.getActivity('limit=50').then((d) => setItems(d.items)).finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <AdminPageHeader title="Activity Log" description="Audit trail of admin actions" />
      {loading ? <LoadingState /> : (
        <AdminCard className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b">
              <tr>
                <th className="p-3 text-left font-semibold">Action</th>
                <th className="p-3 text-left font-semibold">Entity</th>
                <th className="p-3 text-left font-semibold">User</th>
                <th className="p-3 text-left font-semibold">Date</th>
              </tr>
            </thead>
            <tbody>
              {items.map((a) => (
                <tr key={a._id} className="border-b hover:bg-slate-50">
                  <td className="p-3 capitalize font-medium">{a.action}</td>
                  <td className="p-3">{a.entity}{a.entityId ? ` #${a.entityId.slice(-6)}` : ''}</td>
                  <td className="p-3">{a.userId?.name ?? 'System'}</td>
                  <td className="p-3 text-slate-500">{new Date(a.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </AdminCard>
      )}
    </div>
  );
}
