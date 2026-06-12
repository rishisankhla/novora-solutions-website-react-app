export interface SocialLink {
  name: string;
  href: string;
  label: string;
}

export const SOCIAL_LINKS: SocialLink[] = [
  {
    name: 'linkedin',
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/novora-solutions',
  },
  {
    name: 'x',
    label: 'X',
    href: 'https://x.com/novorasolutions',
  },
  {
    name: 'instagram',
    label: 'Instagram',
    href: 'https://www.instagram.com/novorasolutions',
  },
  {
    name: 'dribbble',
    label: 'Dribbble',
    href: 'https://dribbble.com/novorasolutions',
  },
  {
    name: 'reddit',
    label: 'Reddit',
    href: 'https://www.reddit.com/user/novorasolutions',
  },
];
