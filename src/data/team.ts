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
  {
    id: 'akash-ramanni',
    name: 'Akash Ramanni',
    role: 'Blockchain Engineer',
    bio: 'Designs and ships secure smart contracts, Web3 integrations, and decentralized application architecture.',
    image: '/images/team/akash-ramanni.jpeg',
    linkedin: 'https://www.linkedin.com/in/akash-ramanni/',
    isLeadership: false,
    sortOrder: 10,
  },
  {
    id: 'jayram-s',
    name: 'Jayram S',
    role: 'Full Stack Developer',
    bio: 'Builds end-to-end product features across modern React frontends and scalable Node.js APIs.',
    image: '/images/team/jayram.jpeg',
    linkedin: 'https://www.linkedin.com/in/jayram-s-6b1865293/',
    isLeadership: false,
    sortOrder: 11,
  },
];

export const TEAM_LEADERSHIP = TEAM_MEMBERS.filter((m) => m.isLeadership).sort(
  (a, b) => a.sortOrder - b.sortOrder
);

export const TEAM_EXTENDED = TEAM_MEMBERS.filter((m) => !m.isLeadership).sort(
  (a, b) => a.sortOrder - b.sortOrder
);
