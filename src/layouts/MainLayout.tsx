import { Outlet, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { ScrollToTop } from '../components/ScrollToTop';
import { PageTransition } from '../components/PageTransition';
import { SkipLink } from '../components/ui/SkipLink';

export function MainLayout() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const location = useLocation();

  useEffect(() => {
    const handleOnlineStatus = () => setIsOnline(navigator.onLine);
    window.addEventListener('online', handleOnlineStatus);
    window.addEventListener('offline', handleOnlineStatus);
    return () => {
      window.removeEventListener('online', handleOnlineStatus);
      window.removeEventListener('offline', handleOnlineStatus);
    };
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col">
      <SkipLink />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: { borderRadius: '0.75rem' },
        }}
      />
      <Helmet>
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
        <link rel="prefetch" href="/offline.html" />
        <meta name="theme-color" content="#3b82f6" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Novora Solutions" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </Helmet>

      {!isOnline && (
        <div
          className="fixed top-0 left-0 right-0 bg-red-600 text-white text-center py-2 z-[60] text-sm"
          role="alert"
        >
          You are currently offline. Some features may be limited.
        </div>
      )}

      <Navigation />

      <main id="main-content" className="flex-1">
        <PageTransition key={location.pathname}>
          <Outlet />
        </PageTransition>
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
}
