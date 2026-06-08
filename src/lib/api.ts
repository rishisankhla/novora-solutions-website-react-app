const API_BASE = import.meta.env.VITE_API_URL ?? '/api/v1';

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: { code: string; message: string; fields?: Record<string, string> };
}

async function request<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  let res: Response;
  try {
    res = await fetch(`${API_BASE}${path}`, {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers ?? {}),
      },
      ...options,
    });
  } catch {
    throw new Error('Cannot reach API server. Start it with npm run dev:api');
  }

  let json: ApiResponse<T>;
  try {
    json = await res.json();
  } catch {
    throw new Error(res.ok ? 'Invalid server response' : `Request failed (${res.status})`);
  }

  if (!json.success) {
    throw new Error(json.error?.message ?? `Request failed (${res.status})`);
  }
  return json.data as T;
}

export const publicApi = {
  getJobs: () => request<{ jobs: unknown[] }>('/public/jobs'),
  getTeam: () => request<{ members: unknown[] }>('/public/team'),
  getPortfolio: () => request<{ projects: unknown[] }>('/public/portfolio'),
  getBlog: () => request<{ posts: unknown[] }>('/public/blog'),
  getBlogBySlug: (slug: string) => request<{ post: unknown }>(`/public/blog/${slug}`),
  getSiteContent: () => request<{ content: Record<string, unknown> }>('/public/content'),
  submitContact: (body: Record<string, unknown>) =>
    request('/public/contact', { method: 'POST', body: JSON.stringify(body) }),
  submitNewsletter: (body: Record<string, unknown>) =>
    request('/public/newsletter', { method: 'POST', body: JSON.stringify(body) }),
  submitApplication: (body: Record<string, unknown>) =>
    request('/public/applications', { method: 'POST', body: JSON.stringify(body) }),
};

export const adminApi = {
  login: (email: string, password: string) =>
    request<{ user: AdminUser }>('/admin/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),
  logout: () => request('/admin/auth/logout', { method: 'POST' }),
  me: () => request<{ user: AdminUser }>('/admin/auth/me'),
  getDashboard: () => request<DashboardData>('/admin/dashboard'),
  getActivity: (params?: string) => request<Paginated<ActivityItem>>(`/admin/activity${params ? `?${params}` : ''}`),

  getSubmissions: (params?: string) => request<Paginated<Submission>>(`/admin/submissions${params ? `?${params}` : ''}`),
  updateSubmission: (id: string, body: unknown) =>
    request(`/admin/submissions/${id}`, { method: 'PATCH', body: JSON.stringify(body) }),
  deleteSubmission: (id: string) => request(`/admin/submissions/${id}`, { method: 'DELETE' }),

  getApplications: (params?: string) => request<Paginated<Application>>(`/admin/applications${params ? `?${params}` : ''}`),
  downloadApplicationResume: async (id: string) => {
    const res = await fetch(`${API_BASE}/admin/applications/${id}/resume`, {
      credentials: 'include',
    });
    if (!res.ok) throw new Error('Failed to download resume');
    return res.blob();
  },
  updateApplication: (id: string, body: unknown) =>
    request(`/admin/applications/${id}`, { method: 'PATCH', body: JSON.stringify(body) }),
  deleteApplication: (id: string) => request(`/admin/applications/${id}`, { method: 'DELETE' }),

  getJobs: (params?: string) => request<Paginated<Job>>(`/admin/jobs${params ? `?${params}` : ''}`),
  createJob: (body: unknown) => request('/admin/jobs', { method: 'POST', body: JSON.stringify(body) }),
  updateJob: (id: string, body: unknown) =>
    request(`/admin/jobs/${id}`, { method: 'PATCH', body: JSON.stringify(body) }),
  deleteJob: (id: string) => request(`/admin/jobs/${id}`, { method: 'DELETE' }),

  getTeam: (params?: string) => request<Paginated<TeamMember>>(`/admin/team${params ? `?${params}` : ''}`),
  createTeam: (body: unknown) => request('/admin/team', { method: 'POST', body: JSON.stringify(body) }),
  updateTeam: (id: string, body: unknown) =>
    request(`/admin/team/${id}`, { method: 'PATCH', body: JSON.stringify(body) }),
  deleteTeam: (id: string) => request(`/admin/team/${id}`, { method: 'DELETE' }),

  getPortfolio: (params?: string) => request<Paginated<Portfolio>>(`/admin/portfolio${params ? `?${params}` : ''}`),
  createPortfolio: (body: unknown) => request('/admin/portfolio', { method: 'POST', body: JSON.stringify(body) }),
  updatePortfolio: (id: string, body: unknown) =>
    request(`/admin/portfolio/${id}`, { method: 'PATCH', body: JSON.stringify(body) }),
  deletePortfolio: (id: string) => request(`/admin/portfolio/${id}`, { method: 'DELETE' }),

  getBlog: (params?: string) => request<Paginated<BlogPost>>(`/admin/blog${params ? `?${params}` : ''}`),
  createBlog: (body: unknown) => request('/admin/blog', { method: 'POST', body: JSON.stringify(body) }),
  updateBlog: (id: string, body: unknown) =>
    request(`/admin/blog/${id}`, { method: 'PATCH', body: JSON.stringify(body) }),
  deleteBlog: (id: string) => request(`/admin/blog/${id}`, { method: 'DELETE' }),

  getSiteContent: () => request<{ items: SiteContentItem[] }>('/admin/site-content'),
  upsertSiteContent: (key: string, content: unknown) =>
    request(`/admin/site-content/${key}`, { method: 'PUT', body: JSON.stringify({ content }) }),

  getMedia: (params?: string) => request<Paginated<MediaItem>>(`/admin/media${params ? `?${params}` : ''}`),
  uploadMedia: (body: {
    fileName: string;
    mimeType: string;
    folder: string;
    imageData: string;
    altText?: string;
  }) =>
    request<{ item: MediaItem }>('/admin/media/upload', {
      method: 'POST',
      body: JSON.stringify(body),
    }),
  createMedia: (body: unknown) => request('/admin/media', { method: 'POST', body: JSON.stringify(body) }),
  deleteMedia: (id: string) => request(`/admin/media/${id}`, { method: 'DELETE' }),

  getUsers: () => request<{ items: AdminUser[] }>('/admin/users'),
  createUser: (body: unknown) => request('/admin/users', { method: 'POST', body: JSON.stringify(body) }),
  updateUser: (id: string, body: unknown) =>
    request(`/admin/users/${id}`, { method: 'PATCH', body: JSON.stringify(body) }),
  deleteUser: (id: string) => request(`/admin/users/${id}`, { method: 'DELETE' }),
};

export type UserRole = 'super_admin' | 'admin' | 'editor' | 'hr' | 'viewer';

export interface AdminUser {
  _id?: string;
  id?: string;
  email: string;
  name: string;
  role: UserRole;
  isActive?: boolean;
}

export interface Paginated<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface DashboardData {
  stats: {
    totalSubmissions: number;
    newSubmissions: number;
    totalApplications: number;
    newApplications: number;
    openJobs: number;
    publishedPosts: number;
    teamCount: number;
    portfolioCount: number;
  };
  recentActivity: ActivityItem[];
  recentSubmissions: Submission[];
  recentApplications: Application[];
}

export interface ActivityItem {
  _id: string;
  action: string;
  entity: string;
  entityId?: string;
  createdAt: string;
  userId?: { name: string; email: string };
}

export interface Submission {
  _id: string;
  type: string;
  status: string;
  name?: string;
  email: string;
  phone?: string;
  company?: string;
  subject?: string;
  message?: string;
  source?: string;
  createdAt: string;
}

export interface Application {
  _id: string;
  positionTitle: string;
  applicant: { fullName: string; email: string; phone: string; location: string };
  status: string;
  createdAt: string;
  coverLetter?: string;
  adminNotes?: string;
  resume?: { originalName?: string; storagePending?: boolean; mimeType?: string };
}

export interface Job {
  _id: string;
  slug: string;
  title: string;
  department: string;
  employmentType: string;
  description: string;
  highlights: string[];
  status: string;
  sortOrder: number;
}

export interface TeamMember {
  _id: string;
  slug: string;
  name: string;
  role: string;
  bio?: string;
  imageUrl?: string;
  linkedinUrl?: string;
  isLeadership: boolean;
  sortOrder: number;
  status: string;
}

export interface Portfolio {
  _id: string;
  slug: string;
  title: string;
  category: string;
  description: string;
  imageUrl: string;
  tags: string[];
  sortOrder: number;
  status: string;
}

export interface BlogPost {
  _id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  imageUrl: string;
  readTimeMinutes: number;
  status: string;
}

export interface SiteContentItem {
  _id: string;
  key: string;
  content: Record<string, unknown>;
}

export interface MediaItem {
  _id: string;
  filename: string;
  originalName: string;
  url: string;
  mimeType: string;
  folder: string;
  createdAt: string;
}
