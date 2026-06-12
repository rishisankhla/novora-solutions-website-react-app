export const ROUTES = {
  home: '/',
  team: '/team',
  services: '/services',
  products: '/products',
  flowbooksPro: '/products/flowbookspro',
  portfolio: '/portfolio',
  blog: '/blog',
  careers: '/careers',
  contact: '/contact',
  privacy: '/privacy',
  terms: '/terms',
  cookies: '/cookies',
} as const;

export type RouteKey = keyof typeof ROUTES;

export const SITE_URL = 'https://novorasolutions.com';

export function getCanonicalUrl(path: string): string {
  const normalized = path === '/' ? '' : path;
  return `${SITE_URL}${normalized}`;
}

export function getBlogPostPath(slug: string): string {
  return `/blog/${slug}`;
}
