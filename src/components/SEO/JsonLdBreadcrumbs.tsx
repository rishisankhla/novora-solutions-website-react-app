import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from "../hooks/useLocation";

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface JsonLdBreadcrumbsProps {
  items: BreadcrumbItem[];
  overrideItems?: boolean;
}

export function JsonLdBreadcrumbs({ items, overrideItems = false }: JsonLdBreadcrumbsProps) {
  const location = useLocation();
  
  // Generate dynamic breadcrumbs based on current location if not overridden
  const breadcrumbItems = overrideItems ? items : generateBreadcrumbs(location, items);
  
  const breadcrumbList = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbItems.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbList)}
      </script>
    </Helmet>
  );
}

// Helper function to generate breadcrumbs based on current location
function generateBreadcrumbs(location: { pathname: string; hash: string }, defaultItems: BreadcrumbItem[]): BreadcrumbItem[] {
  // If we're on the homepage with no hash, just return the home item
  if (location.pathname === '/' && !location.hash) {
    return [defaultItems[0]];
  }
  
  // If we have a hash, find the matching item
  if (location.hash) {
    const sectionId = location.hash.substring(1); // Remove the # character
    const matchingItem = defaultItems.find(item => item.url.includes(`#${sectionId}`));
    
    if (matchingItem) {
      return [defaultItems[0], matchingItem];
    }
  }
  
  // Default fallback
  return [defaultItems[0]];
}