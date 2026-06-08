import { ROUTES } from '../routes/paths';

export interface NavItem {
  to: string;
  label: string;
}

export const NAV_ITEMS: NavItem[] = [
  { to: ROUTES.home, label: 'Home' },
  { to: ROUTES.team, label: 'Team' },
  { to: ROUTES.services, label: 'Services' },
  { to: ROUTES.portfolio, label: 'Portfolio' },
  { to: ROUTES.blog, label: 'Blog' },
  { to: ROUTES.contact, label: 'Contact' },
];

/** Footer includes Careers; navbar does not */
export const FOOTER_NAV_ITEMS: NavItem[] = [
  ...NAV_ITEMS,
  { to: ROUTES.careers, label: 'Careers' },
];
