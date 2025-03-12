import { useState, useEffect } from 'react';

interface Location {
  pathname: string;
  hash: string;
  search: string;
}

export function useLocation(): Location {
  const [location, setLocation] = useState<Location>({
    pathname: window.location.pathname,
    hash: window.location.hash,
    search: window.location.search
  });

  useEffect(() => {
    // Update location state when the URL changes
    const handleLocationChange = () => {
      setLocation({
        pathname: window.location.pathname,
        hash: window.location.hash,
        search: window.location.search
      });
    };

    // Listen for popstate events (browser back/forward buttons)
    window.addEventListener('popstate', handleLocationChange);
    
    // Listen for hashchange events
    window.addEventListener('hashchange', handleLocationChange);
    
    // Custom event for programmatic navigation
    window.addEventListener('locationchange', handleLocationChange);

    // Cleanup event listeners
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
      window.removeEventListener('locationchange', handleLocationChange);
    };
  }, []);

  return location;
}