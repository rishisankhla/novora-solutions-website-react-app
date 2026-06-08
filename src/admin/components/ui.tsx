import type { ReactNode } from 'react';

export function AdminPageHeader({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
        {description && <p className="text-slate-500 text-sm mt-1">{description}</p>}
      </div>
      {action}
    </div>
  );
}

export function StatCard({
  label,
  value,
  accent = 'blue',
}: {
  label: string;
  value: number | string;
  accent?: 'blue' | 'green' | 'amber' | 'purple';
}) {
  const colors = {
    blue: 'bg-blue-50 text-blue-700 border-blue-100',
    green: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    amber: 'bg-amber-50 text-amber-700 border-amber-100',
    purple: 'bg-purple-50 text-purple-700 border-purple-100',
  };
  return (
    <div className={`rounded-xl border p-5 ${colors[accent]}`}>
      <p className="text-sm font-medium opacity-80">{label}</p>
      <p className="text-3xl font-bold mt-1">{value}</p>
    </div>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    new: 'bg-blue-100 text-blue-700',
    read: 'bg-slate-100 text-slate-700',
    archived: 'bg-slate-100 text-slate-500',
    open: 'bg-emerald-100 text-emerald-700',
    closed: 'bg-red-100 text-red-700',
    draft: 'bg-amber-100 text-amber-700',
    published: 'bg-emerald-100 text-emerald-700',
    reviewing: 'bg-amber-100 text-amber-700',
    shortlisted: 'bg-purple-100 text-purple-700',
    rejected: 'bg-red-100 text-red-700',
    hired: 'bg-emerald-100 text-emerald-700',
    contact: 'bg-blue-100 text-blue-700',
    lead: 'bg-purple-100 text-purple-700',
    inquiry: 'bg-indigo-100 text-indigo-700',
    newsletter: 'bg-teal-100 text-teal-700',
  };
  return (
    <span
      className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize ${
        styles[status] ?? 'bg-slate-100 text-slate-700'
      }`}
    >
      {status.replace('_', ' ')}
    </span>
  );
}

export function LoadingState() {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="h-8 w-8 rounded-full border-2 border-blue-600 border-t-transparent animate-spin" />
    </div>
  );
}

export function EmptyState({ message }: { message: string }) {
  return (
    <div className="text-center py-16 text-slate-500">
      <p>{message}</p>
    </div>
  );
}

export function AdminButton({
  children,
  variant = 'primary',
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'danger' }) {
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50',
    danger: 'bg-red-600 text-white hover:bg-red-700',
  };
  return (
    <button
      {...props}
      className={`inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${props.className ?? ''}`}
    >
      {children}
    </button>
  );
}

export function AdminInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent ${props.className ?? ''}`}
    />
  );
}

export function AdminTextarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={`w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent ${props.className ?? ''}`}
    />
  );
}

export function AdminSelect(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={`w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white ${props.className ?? ''}`}
    />
  );
}

export function AdminCard({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`bg-white rounded-xl border border-slate-200 shadow-sm ${className}`}>{children}</div>
  );
}

export function ConfirmDialog({
  open,
  title,
  message,
  onConfirm,
  onCancel,
  loading,
}: {
  open: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  loading?: boolean;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-xl p-6 max-w-md w-full shadow-xl">
        <h3 className="text-lg font-bold text-slate-900">{title}</h3>
        <p className="text-slate-600 text-sm mt-2">{message}</p>
        <div className="flex gap-3 mt-6 justify-end">
          <AdminButton variant="secondary" onClick={onCancel} disabled={loading}>
            Cancel
          </AdminButton>
          <AdminButton variant="danger" onClick={onConfirm} disabled={loading}>
            {loading ? 'Deleting...' : 'Confirm'}
          </AdminButton>
        </div>
      </div>
    </div>
  );
}
