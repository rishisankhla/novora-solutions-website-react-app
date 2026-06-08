import { lazy, Suspense } from 'react';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import { MainLayout } from '../layouts/MainLayout';
import { PageLoader } from '../components/ui/PageLoader';
import { ROUTES } from './paths';

const HomePage = lazy(() => import('../pages/HomePage').then((m) => ({ default: m.HomePage })));
const TeamPage = lazy(() => import('../pages/TeamPage').then((m) => ({ default: m.TeamPage })));
const ServicesPage = lazy(() =>
  import('../pages/ServicesPage').then((m) => ({ default: m.ServicesPage }))
);
const PortfolioPage = lazy(() =>
  import('../pages/PortfolioPage').then((m) => ({ default: m.PortfolioPage }))
);
const BlogPage = lazy(() => import('../pages/BlogPage').then((m) => ({ default: m.BlogPage })));
const BlogPostPage = lazy(() =>
  import('../pages/BlogPostPage').then((m) => ({ default: m.BlogPostPage }))
);
const CareersPage = lazy(() =>
  import('../pages/CareersPage').then((m) => ({ default: m.CareersPage }))
);
const ContactPage = lazy(() =>
  import('../pages/ContactPage').then((m) => ({ default: m.ContactPage }))
);
const LegalPage = lazy(() => import('../pages/LegalPage').then((m) => ({ default: m.LegalPage })));
const NotFoundPage = lazy(() =>
  import('../pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage }))
);
const AdminApp = lazy(() => import('../admin/AdminApp').then((m) => ({ default: m.AdminApp })));

function SuspenseWrapper({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<PageLoader />}>{children}</Suspense>;
}

const router = createBrowserRouter([
  {
    path: '/admin/*',
    element: (
      <SuspenseWrapper>
        <AdminApp />
      </SuspenseWrapper>
    ),
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: (
          <SuspenseWrapper>
            <HomePage />
          </SuspenseWrapper>
        ),
      },
      {
        path: ROUTES.team.slice(1),
        element: (
          <SuspenseWrapper>
            <TeamPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: ROUTES.services.slice(1),
        element: (
          <SuspenseWrapper>
            <ServicesPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: ROUTES.products.slice(1),
        element: <Navigate to={ROUTES.services} replace />,
      },
      {
        path: ROUTES.portfolio.slice(1),
        element: (
          <SuspenseWrapper>
            <PortfolioPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: 'blog/:slug',
        element: (
          <SuspenseWrapper>
            <BlogPostPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: ROUTES.blog.slice(1),
        element: (
          <SuspenseWrapper>
            <BlogPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: ROUTES.careers.slice(1),
        element: (
          <SuspenseWrapper>
            <CareersPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: ROUTES.contact.slice(1),
        element: (
          <SuspenseWrapper>
            <ContactPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: ROUTES.privacy.slice(1),
        element: (
          <SuspenseWrapper>
            <LegalPage type="privacy" />
          </SuspenseWrapper>
        ),
      },
      {
        path: ROUTES.terms.slice(1),
        element: (
          <SuspenseWrapper>
            <LegalPage type="terms" />
          </SuspenseWrapper>
        ),
      },
      {
        path: ROUTES.cookies.slice(1),
        element: (
          <SuspenseWrapper>
            <LegalPage type="cookies" />
          </SuspenseWrapper>
        ),
      },
      {
        path: '*',
        element: (
          <SuspenseWrapper>
            <NotFoundPage />
          </SuspenseWrapper>
        ),
      },
    ],
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
