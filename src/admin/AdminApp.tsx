import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute, RoleGuard } from './components/ProtectedRoute';
import { AdminLayout } from './layouts/AdminLayout';
import { LoginPage } from './pages/LoginPage';

const DashboardPage = lazy(() => import('./pages/DashboardPage').then((m) => ({ default: m.DashboardPage })));
const SubmissionsPage = lazy(() => import('./pages/SubmissionsPage').then((m) => ({ default: m.SubmissionsPage })));
const ApplicationsPage = lazy(() => import('./pages/ApplicationsPage').then((m) => ({ default: m.ApplicationsPage })));
const JobsPage = lazy(() => import('./pages/JobsPage').then((m) => ({ default: m.JobsPage })));
const TeamPage = lazy(() => import('./pages/TeamPage').then((m) => ({ default: m.TeamPage })));
const PortfolioPage = lazy(() => import('./pages/PortfolioPage').then((m) => ({ default: m.PortfolioPage })));
const MediaPage = lazy(() => import('./pages/MediaPage').then((m) => ({ default: m.MediaPage })));
const UsersPage = lazy(() => import('./pages/UsersPage').then((m) => ({ default: m.UsersPage })));
const ActivityPage = lazy(() => import('./pages/ActivityPage').then((m) => ({ default: m.ActivityPage })));

function AdminLoader() {
  return (
    <div className="min-h-[40vh] flex items-center justify-center">
      <div className="h-8 w-8 rounded-full border-2 border-blue-600 border-t-transparent animate-spin" />
    </div>
  );
}

export function AdminApp() {
  return (
    <AuthProvider>
      <Toaster position="top-right" />
      <Suspense fallback={<AdminLoader />}>
        <Routes basename="/admin">
          <Route path="login" element={<LoginPage />} />
          <Route element={<ProtectedRoute />}>
            <Route element={<AdminLayout />}>
              <Route index element={<DashboardPage />} />
              <Route path="submissions" element={<RoleGuard roles={['super_admin', 'admin']}><SubmissionsPage /></RoleGuard>} />
              <Route path="applications" element={<RoleGuard roles={['super_admin', 'admin', 'hr']}><ApplicationsPage /></RoleGuard>} />
              <Route path="jobs" element={<RoleGuard roles={['super_admin', 'admin', 'hr']}><JobsPage /></RoleGuard>} />
              <Route path="team" element={<RoleGuard roles={['super_admin', 'admin', 'editor']}><TeamPage /></RoleGuard>} />
              <Route path="portfolio" element={<RoleGuard roles={['super_admin', 'admin', 'editor']}><PortfolioPage /></RoleGuard>} />
              <Route path="media" element={<RoleGuard roles={['super_admin', 'admin', 'editor']}><MediaPage /></RoleGuard>} />
              <Route path="activity" element={<ActivityPage />} />
              <Route path="users" element={<RoleGuard roles={['super_admin']}><UsersPage /></RoleGuard>} />
            </Route>
          </Route>
          <Route path="*" element={<Navigate to="/admin" replace />} />
        </Routes>
      </Suspense>
    </AuthProvider>
  );
}
