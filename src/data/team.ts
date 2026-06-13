export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio?: string;
  image: string;
  linkedin: string;
  isLeadership: boolean;
  sortOrder: number;
}

/** Static team data — no API/DB required for the public team page */
export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'rishi-sankhla',
    name: 'Rishi Sankhla',
    role: 'Director & CTO',
    bio: 'Leads technical strategy and engineering standards across client engagements.',
    image: '/images/rishi.jpeg',
    linkedin: 'https://www.linkedin.com/in/rishisankhla/',
    isLeadership: true,
    sortOrder: 1,
  },
  {
    id: 'shakti-singh',
    name: 'Shakti Singh',
    role: 'Director & CEO',
    bio: 'Drives company vision, partnerships, and client relationships worldwide.',
    image: '/images/shakti_2.png',
    linkedin: 'https://www.linkedin.com/in/shakti-singh-1175a210b/',
    isLeadership: true,
    sortOrder: 2,
  },
  {
    id: 'rohan-sankhla',
    name: 'Rohan Sankhla',
    role: 'Director & COO',
    bio: 'Oversees operations, delivery excellence, and scalable team processes.',
    image: '/images/rohan.jpeg',
    linkedin: 'https://www.linkedin.com/in/rohansankhla/',
    isLeadership: true,
    sortOrder: 3,
  },
];

export const TEAM_LEADERSHIP = TEAM_MEMBERS.filter((m) => m.isLeadership).sort(
  (a, b) => a.sortOrder - b.sortOrder
);
