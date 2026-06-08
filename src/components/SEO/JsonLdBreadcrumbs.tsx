import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { SITE_URL } from '../../routes/paths';

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface JsonLdBreadcrumbsProps {
  items: BreadcrumbItem[];
  overrideItems?: boolean;
}

const routeLabels: Record<string, string> = {
  '/': 'Home',
  '/team': 'Team',
  '/products': 'Products',
  '/portfolio': 'Portfolio',
  '/blog': 'Blog',
  '/careers': 'Careers',
  '/contact': 'Contact',
};

export function JsonLdBreadcrumbs({ items, overrideItems = false }: JsonLdBreadcrumbsProps) {
  const location = useLocation();

  const breadcrumbItems = overrideItems
    ? items
    : generateBreadcrumbs(location.pathname, items);

  const breadcrumbList = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbItems.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(breadcrumbList)}</script>
    </Helmet>
  );
}

function generateBreadcrumbs(pathname: string, defaultItems: BreadcrumbItem[]): BreadcrumbItem[] {
  if (pathname === '/') {
    return [defaultItems[0] ?? { name: 'Home', url: `${SITE_URL}/` }];
  }

  const label = routeLabels[pathname];
  if (label) {
    return [
      { name: 'Home', url: `${SITE_URL}/` },
      { name: label, url: `${SITE_URL}${pathname}` },
    ];
  }

  return [defaultItems[0] ?? { name: 'Home', url: `${SITE_URL}/` }];
}
