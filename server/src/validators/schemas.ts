import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Valid email required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const contactSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  phone: z.string().optional(),
  company: z.string().optional(),
  subject: z.string().optional(),
  honeypot: z.string().optional(),
});

export const newsletterSchema = z.object({
  email: z.string().email('Valid email required'),
  honeypot: z.string().optional(),
});

export const leadSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  company: z.string().optional(),
  message: z.string().optional(),
  source: z.string().optional(),
});

export const applicationSchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(6),
  location: z.string().min(2),
  linkedinUrl: z.string().url().optional().or(z.literal('')),
  portfolioUrl: z.string().url().optional().or(z.literal('')),
  position: z.string().min(1),
  yearsOfExperience: z.string().min(1),
  coverLetter: z.string().min(20),
  resumeFileName: z.string().optional(),
  resumeMimeType: z.string().optional(),
  resumeSize: z.number().max(5 * 1024 * 1024).optional(),
  resumeData: z.string().max(7_000_000).optional(),
  honeypot: z.string().optional(),
});

export const paginationSchema = z.object({
  page: z.string().optional(),
  limit: z.string().optional(),
  search: z.string().optional(),
  status: z.string().optional(),
  type: z.string().optional(),
  sort: z.string().optional(),
});

export const userCreateSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(2),
  role: z.enum(['super_admin', 'admin', 'editor', 'hr', 'viewer']),
});

export const userUpdateSchema = z.object({
  name: z.string().min(2).optional(),
  role: z.enum(['super_admin', 'admin', 'editor', 'hr', 'viewer']).optional(),
  isActive: z.boolean().optional(),
  password: z.string().min(8).optional(),
});

export const jobSchema = z.object({
  title: z.string().min(2),
  slug: z.string().optional(),
  department: z.string().min(1),
  employmentType: z.string().min(1),
  description: z.string().min(10),
  highlights: z.array(z.string()).default([]),
  status: z.enum(['open', 'closed', 'draft']).default('draft'),
  sortOrder: z.number().default(0),
});

export const teamSchema = z.object({
  name: z.string().min(2),
  slug: z.string().optional(),
  role: z.string().min(1),
  bio: z.string().optional(),
  imageUrl: z.string().optional(),
  linkedinUrl: z.string().optional(),
  isLeadership: z.boolean().default(false),
  sortOrder: z.number().default(0),
  status: z.enum(['draft', 'published']).default('published'),
});

const imageUrlField = z
  .string()
  .min(1, 'Image is required — upload a file or paste a URL')
  .refine(
    (v) => v.startsWith('http://') || v.startsWith('https://') || v.startsWith('/uploads/'),
    'Image must be an uploaded file or a valid URL'
  );

export const portfolioSchema = z.object({
  title: z.string().min(2),
  slug: z.string().optional(),
  category: z.string().min(1),
  description: z.string().min(10),
  imageUrl: imageUrlField,
  tags: z.array(z.string()).default([]),
  sortOrder: z.number().default(0),
  status: z.enum(['draft', 'published']).default('published'),
});

export const blogSchema = z.object({
  title: z.string().min(2),
  slug: z.string().optional(),
  excerpt: z.string().min(10),
  content: z.string().default(''),
  category: z.string().min(1),
  author: z.string().min(1),
  imageUrl: imageUrlField,
  readTimeMinutes: z.number().default(5),
  status: z.enum(['draft', 'published']).default('draft'),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
});

export const siteContentSchema = z.object({
  content: z.record(z.unknown()),
});

export const mediaSchema = z.object({
  filename: z.string().min(1),
  originalName: z.string().min(1),
  mimeType: z.string().min(1),
  size: z.number().default(0),
  url: z.string().min(1),
  folder: z.string().default('general'),
  altText: z.string().optional(),
});

export const mediaUploadSchema = z.object({
  fileName: z.string().min(1),
  mimeType: z.enum(['image/jpeg', 'image/png', 'image/webp', 'image/jpg']),
  folder: z.string().default('general'),
  altText: z.string().optional(),
  imageData: z.string().min(1),
});

export const applicationStatusSchema = z.object({
  status: z.enum(['new', 'reviewing', 'shortlisted', 'rejected', 'hired']),
  adminNotes: z.string().optional(),
});

export const submissionStatusSchema = z.object({
  status: z.enum(['new', 'read', 'archived']),
});
