/** Shared Supabase table row shapes (public schema). */

export type UserRole = 'super_admin' | 'admin' | 'editor' | 'hr' | 'viewer';

export type SubmissionType = 'contact' | 'lead' | 'inquiry' | 'newsletter';
export type SubmissionStatus = 'new' | 'read' | 'archived';

export type JobStatus = 'open' | 'closed' | 'draft';
export type ApplicationStatus = 'new' | 'reviewing' | 'shortlisted' | 'rejected' | 'hired';
export type ContentStatus = 'published' | 'draft' | 'archived';

export interface DbUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  is_active: boolean;
  last_login_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface DbSubmission {
  id: string;
  type: SubmissionType;
  status: SubmissionStatus;
  name: string | null;
  email: string;
  phone: string | null;
  company: string | null;
  subject: string | null;
  message: string | null;
  source: string | null;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface DbJobPosition {
  id: string;
  slug: string;
  title: string;
  department: string;
  employment_type: string;
  description: string;
  highlights: string[];
  status: JobStatus;
  sort_order: number;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface DbCareerApplication {
  id: string;
  job_position_id: string | null;
  position_title: string;
  applicant_full_name: string;
  applicant_email: string;
  applicant_phone: string;
  applicant_location: string;
  years_of_experience: string;
  cover_letter: string;
  resume_original_name: string | null;
  resume_mime_type: string | null;
  resume_size: number | null;
  resume_storage_path: string | null;
  resume_storage_pending: boolean;
  status: ApplicationStatus;
  created_at: string;
  updated_at: string;
}

export interface DbTeamMember {
  id: string;
  slug: string;
  name: string;
  role: string;
  bio: string;
  image_url: string | null;
  linkedin_url: string | null;
  is_leadership: boolean;
  sort_order: number;
  status: ContentStatus;
  created_at: string;
  updated_at: string;
}

export interface DbBlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  image_url: string | null;
  read_time_minutes: number;
  status: ContentStatus;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface DbPortfolioProject {
  id: string;
  slug: string;
  title: string;
  category: string;
  description: string;
  image_url: string | null;
  tags: string[];
  sort_order: number;
  status: ContentStatus;
  created_at: string;
  updated_at: string;
}

export type Database = {
  public: {
    Tables: {
      users: { Row: DbUser };
      submissions: { Row: DbSubmission };
      job_positions: { Row: DbJobPosition };
      career_applications: { Row: DbCareerApplication };
      team_members: { Row: DbTeamMember };
      blog_posts: { Row: DbBlogPost };
      portfolio_projects: { Row: DbPortfolioProject };
    };
  };
};
