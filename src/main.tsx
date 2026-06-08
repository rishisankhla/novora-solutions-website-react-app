import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import App from './App.tsx';
import './index.css';

// Mark JS as active for progressive reveal styles
document.documentElement.classList.add('js');

// Register service worker for PWA functionality (production only — avoids stale cache in dev)
if (import.meta.env.PROD && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                // New content is available, show notification to user
                if (confirm('New version available! Reload to update?')) {
                  window.location.reload();
                }
              }
            });
          }
        });
      })
      .catch(() => {
        // Service worker registration failed — app still works without offline support
      });
  });
  
  // Handle service worker updates
  let refreshing = false;
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (!refreshing) {
      refreshing = true;
      window.location.reload();
    }
  });
}

// Preload the offline page for faster access when needed
if ('requestIdleCallback' in window) {
  // Use requestIdleCallback to load non-critical resources when the browser is idle
  window.requestIdleCallback(() => {
    const offlinePagePreload = document.createElement('link');
    offlinePagePreload.rel = 'prefetch';
    offlinePagePreload.href = '/offline.html';
    document.head.appendChild(offlinePagePreload);
  });
} else {
  // Fallback for browsers that don't support requestIdleCallback
  setTimeout(() => {
    const offlinePagePreload = document.createElement('link');
    offlinePagePreload.rel = 'prefetch';
    offlinePagePreload.href = '/offline.html';
    document.head.appendChild(offlinePagePreload);
  }, 3000);
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </StrictMode>
);