import { useEffect, useState } from 'react';
import { adminApi, type DashboardData } from '../../lib/api';
import { AdminPageHeader, StatCard, AdminCard, LoadingState, StatusBadge } from '../components/ui';

export function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminApi
      .getDashboard()
      .then(setData)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingState />;
  if (!data) return null;

  const { stats, recentSubmissions, recentApplications, recentActivity } = data;

  return (
    <div>
      <AdminPageHeader title="Dashboard" description="Overview of your website activity" />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        <StatCard label="New Submissions" value={stats.newSubmissions} accent="blue" />
        <StatCard label="New Applications" value={stats.newApplications} accent="green" />
        <StatCard label="Open Positions" value={stats.openJobs} accent="amber" />
        <StatCard label="Published Posts" value={stats.publishedPosts} accent="purple" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AdminCard className="p-5">
          <h2 className="font-semibold text-slate-900 mb-4">Recent Submissions</h2>
          <div className="space-y-3">
            {recentSubmissions.length === 0 ? (
              <p className="text-sm text-slate-500">No submissions yet</p>
            ) : (
              recentSubmissions.map((s) => (
                <div key={s._id} className="flex items-center justify-between text-sm border-b border-slate-100 pb-3 last:border-0">
                  <div>
                    <p className="font-medium text-slate-900">{s.name ?? s.email}</p>
                    <p className="text-slate-500 truncate max-w-[200px]">{s.email}</p>
                  </div>
                  <StatusBadge status={s.type} />
                </div>
              ))
            )}
          </div>
        </AdminCard>

        <AdminCard className="p-5">
          <h2 className="font-semibold text-slate-900 mb-4">Recent Applications</h2>
          <div className="space-y-3">
            {recentApplications.length === 0 ? (
              <p className="text-sm text-slate-500">No applications yet</p>
            ) : (
              recentApplications.map((a) => (
                <div key={a._id} className="flex items-center justify-between text-sm border-b border-slate-100 pb-3 last:border-0">
                  <div>
                    <p className="font-medium text-slate-900">{a.applicant.fullName}</p>
                    <p className="text-slate-500">{a.positionTitle}</p>
                  </div>
                  <StatusBadge status={a.status} />
                </div>
              ))
            )}
          </div>
        </AdminCard>

        <AdminCard className="p-5 lg:col-span-2">
          <h2 className="font-semibold text-slate-900 mb-4">Recent Activity</h2>
          <div className="space-y-2">
            {recentActivity.length === 0 ? (
              <p className="text-sm text-slate-500">No activity yet</p>
            ) : (
              recentActivity.map((a) => (
                <div key={a._id} className="flex items-center justify-between text-sm py-2 border-b border-slate-50 last:border-0">
                  <span className="text-slate-700">
                    <span className="font-medium capitalize">{a.action}</span> {a.entity}
                    {a.userId?.name && <span className="text-slate-400"> by {a.userId.name}</span>}
                  </span>
                  <span className="text-slate-400 text-xs">
                    {new Date(a.createdAt).toLocaleString()}
                  </span>
                </div>
              ))
            )}
          </div>
        </AdminCard>
      </div>
    </div>
  );
}
