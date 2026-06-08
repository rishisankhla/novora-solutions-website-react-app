import { useEffect, useState } from 'react';
import { publicApi } from '../lib/api';
import { JOB_POSITIONS, type JobPosition } from '../data/careers';
import { blogPosts, type BlogPost } from '../data/blog';
import { portfolioProjects, type PortfolioProject } from '../data/portfolio';

export function useCmsJobs() {
  const [jobs, setJobs] = useState<JobPosition[]>(JOB_POSITIONS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    publicApi
      .getJobs()
      .then((data) => {
        const mapped = (data.jobs as Array<Record<string, unknown>>).map((j) => ({
          id: String(j.slug ?? j._id),
          title: String(j.title),
          department: String(j.department),
          type: String(j.employmentType),
          description: String(j.description),
          highlights: (j.highlights as string[]) ?? [],
        }));
        if (mapped.length) setJobs(mapped);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return { jobs, loading, positionOptions: jobs.map((j) => j.title) };
}

export function useCmsBlog() {
  const [posts, setPosts] = useState<BlogPost[]>(blogPosts);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    publicApi
      .getBlog()
      .then((data) => {
        const mapped = (data.posts as Array<Record<string, unknown>>).map((p) => ({
          id: String(p._id),
          slug: String(p.slug),
          title: String(p.title),
          excerpt: String(p.excerpt),
          category: String(p.category),
          author: String(p.author),
          publishDate: p.publishedAt ? String(p.publishedAt).slice(0, 10) : '',
          readTime: `${p.readTimeMinutes ?? 5} min read`,
          image: String(p.imageUrl),
        }));
        if (mapped.length) setPosts(mapped);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return { posts, loading };
}

export function useCmsPortfolio() {
  const [projects, setProjects] = useState<PortfolioProject[]>(portfolioProjects);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    publicApi
      .getPortfolio()
      .then((data) => {
        const mapped = (data.projects as Array<Record<string, unknown>>).map((p) => ({
          id: String(p.slug ?? p._id),
          title: String(p.title),
          category: String(p.category),
          description: String(p.description),
          image: String(p.imageUrl),
          tags: (p.tags as string[]) ?? [],
        }));
        if (mapped.length) setProjects(mapped);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return { projects, loading };
}

export interface CmsTeamMember {
  id: string;
  name: string;
  role: string;
  bio?: string;
  image: string;
  linkedin: string;
  isLeadership: boolean;
  isPlaceholder?: boolean;
  sortOrder: number;
}

const fallbackTeam: CmsTeamMember[] = [
  {
    id: 'rishi',
    name: 'Rishi Sankhla',
    role: 'Director & CTO',
    bio: 'Leads technical strategy and engineering standards across client engagements.',
    image: '/images/rishi.jpeg',
    linkedin: 'https://www.linkedin.com/rishisankhla/',
    isLeadership: true,
    sortOrder: 1,
  },
  {
    id: 'shakti',
    name: 'Shakti Singh',
    role: 'Director & CEO',
    bio: 'Drives company vision, partnerships, and client relationships worldwide.',
    image: '/images/shakti_2.png',
    linkedin: 'https://www.linkedin.com/in/shakti-singh-1175a210b/',
    isLeadership: true,
    sortOrder: 2,
  },
  {
    id: 'rohan',
    name: 'Rohan Sankhla',
    role: 'Director & COO',
    bio: 'Oversees operations, delivery excellence, and scalable team processes.',
    image: '/images/rohan.jpeg',
    linkedin: 'https://www.linkedin.com/rohansankhla/',
    isLeadership: true,
    sortOrder: 3,
  },
];

function mapTeamMembers(rows: Array<Record<string, unknown>>): CmsTeamMember[] {
  return rows
    .map((m) => {
      const slug = String(m.slug ?? '');
      const name = String(m.name);
      return {
        id: String(m._id ?? slug ?? name),
        name,
        role: String(m.role),
        bio: m.bio ? String(m.bio) : undefined,
        image: String(m.imageUrl ?? ''),
        linkedin: String(m.linkedinUrl ?? ''),
        isLeadership: Boolean(m.isLeadership),
        isPlaceholder: slug.startsWith('placeholder-') || name.toLowerCase().startsWith('teammate'),
        sortOrder: Number(m.sortOrder ?? 0),
      };
    })
    .sort((a, b) => a.sortOrder - b.sortOrder || a.name.localeCompare(b.name));
}

export function useCmsTeam() {
  const [members, setMembers] = useState<CmsTeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    publicApi
      .getTeam()
      .then((data) => {
        setMembers(mapTeamMembers(data.members as Array<Record<string, unknown>>));
      })
      .catch(() => {
        setMembers(fallbackTeam);
      })
      .finally(() => setLoading(false));
  }, []);

  const leadership = members.filter((m) => m.isLeadership);
  const extended = members.filter((m) => !m.isLeadership);

  return { members, leadership, extended, loading };
}
