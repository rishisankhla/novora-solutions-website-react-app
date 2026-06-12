import { useEffect, useState } from 'react';
import { publicApi } from '../lib/api';
import type { BlogPost, JobPosition, PortfolioProject } from '../lib/types/cms';

function captureError(err: unknown, setError: (msg: string) => void) {
  setError(err instanceof Error ? err.message : 'Failed to load content from API');
}

export function useCmsJobs() {
  const [jobs, setJobs] = useState<JobPosition[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
        setJobs(mapped);
      })
      .catch((err) => captureError(err, setError))
      .finally(() => setLoading(false));
  }, []);

  return { jobs, loading, error, positionOptions: jobs.map((j) => j.title) };
}

export function useCmsBlog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
        setPosts(mapped);
      })
      .catch((err) => captureError(err, setError))
      .finally(() => setLoading(false));
  }, []);

  return { posts, loading, error };
}

export function useCmsPortfolio() {
  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
        setProjects(mapped);
      })
      .catch((err) => captureError(err, setError))
      .finally(() => setLoading(false));
  }, []);

  return { projects, loading, error };
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
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    publicApi
      .getTeam()
      .then((data) => {
        setMembers(mapTeamMembers(data.members as Array<Record<string, unknown>>));
      })
      .catch((err) => captureError(err, setError))
      .finally(() => setLoading(false));
  }, []);

  const leadership = members.filter((m) => m.isLeadership);
  const extended = members.filter((m) => !m.isLeadership);

  return { members, leadership, extended, loading, error };
}
