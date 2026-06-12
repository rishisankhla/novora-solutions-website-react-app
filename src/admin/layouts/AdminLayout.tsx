import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Mail,
  Briefcase,
  Users,
  FolderKanban,
  Image,
  Activity,
  LogOut,
  Menu,
  X,
  UserCog,
} from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import type { UserRole } from '../../lib/api';
import { Logo } from '../../components/brand/Logo';

const navItems: { to: string; label: string; icon: typeof LayoutDashboard; end?: boolean; roles?: UserRole[] }[] = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin/submissions', label: 'Submissions', icon: Mail, roles: ['super_admin', 'admin'] },
  { to: '/admin/applications', label: 'Applications', icon: Briefcase, roles: ['super_admin', 'admin', 'hr'] },
  { to: '/admin/jobs', label: 'Job Positions', icon: Briefcase, roles: ['super_admin', 'admin', 'hr'] },
  { to: '/admin/team', label: 'Team', icon: Users, roles: ['super_admin', 'admin', 'editor'] },
  { to: '/admin/portfolio', label: 'Portfolio', icon: FolderKanban, roles: ['super_admin', 'admin', 'editor'] },
  { to: '/admin/media', label: 'Media', icon: Image, roles: ['super_admin', 'admin', 'editor'] },
  { to: '/admin/activity', label: 'Activity', icon: Activity },
  { to: '/admin/users', label: 'Users', icon: UserCog, roles: ['super_admin'] },
];

export function AdminLayout() {
  const { user, logout, hasRole } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const visibleNav = navItems.filter((item) => !item.roles || item.roles.some((r) => hasRole(r)));

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-slate-950 text-white flex flex-col transform transition-transform lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <div>
            <Logo linkToHome={false} size="sm" className="brightness-0 invert" />
            <p className="text-xs text-slate-400 mt-2">Admin Panel</p>
          </div>
          <button className="lg:hidden p-1" onClick={() => setSidebarOpen(false)}>
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {visibleNav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/admin'}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`
              }
            >
              <item.icon className="h-4 w-4 shrink-0" />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <p className="text-sm font-medium truncate">{user?.name}</p>
          <p className="text-xs text-slate-400 truncate capitalize">{user?.role?.replace('_', ' ')}</p>
          <button
            onClick={handleLogout}
            className="mt-3 flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white border-b border-slate-200 px-4 py-3 flex items-center gap-3 lg:hidden">
          <button onClick={() => setSidebarOpen(true)} className="p-2 rounded-lg hover:bg-slate-100">
            <Menu className="h-5 w-5" />
          </button>
          <span className="font-semibold text-slate-900">Novora Admin</span>
        </header>
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
