export type UserRole = 'super_admin' | 'admin' | 'editor' | 'hr' | 'viewer';

export interface UserAuthRecord {
  _id: string;
  email: string;
  name: string;
  role: UserRole;
  isActive: boolean;
  passwordHash?: string;
}

export type SubmissionType = 'contact' | 'lead' | 'inquiry' | 'newsletter';
export type SubmissionStatus = 'new' | 'read' | 'archived';

export type JobStatus = 'open' | 'closed' | 'draft';
export type ApplicationStatus = 'new' | 'reviewing' | 'shortlisted' | 'rejected' | 'hired';
export type BlogStatus = 'draft' | 'published';
export type PublishStatus = 'draft' | 'published';

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: { code: string; message: string; fields?: Record<string, string> };
}

export interface PaginatedResult<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
