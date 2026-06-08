import { getSupabaseAdmin } from '../supabase/client.js';
import { mapSupabaseError } from '../supabase/errors.js';
import { uploadResume, downloadResume as downloadResumeFile } from '../supabase/storage.js';
import {
  mapJobRow,
  mapTeamRow,
  mapPortfolioRow,
  mapBlogRow,
  mapSubmissionRow,
  mapApplicationRow,
  mapUserRow,
  mapSiteContentRow,
  mapMediaRow,
  mapAuditRow,
} from '../supabase/mappers.js';
import type { UserRole } from '../types/index.js';

function db() {
  return getSupabaseAdmin();
}

export async function pingSupabase(): Promise<void> {
  const { error } = await db().from('users').select('id').limit(1);
  if (error && error.code !== 'PGRST116') throw mapSupabaseError(error);
}

// --- Users ---
export async function findUserByEmail(email: string) {
  const { data, error } = await db()
    .from('users')
    .select('*')
    .eq('email', email.toLowerCase())
    .maybeSingle();
  if (error) throw mapSupabaseError(error);
  return data ? { ...mapUserRow(data), passwordHash: data.password_hash } : null;
}

export async function findUserById(id: string, includePassword = false) {
  const { data, error } = await db().from('users').select('*').eq('id', id).maybeSingle();
  if (error) throw mapSupabaseError(error);
  if (!data) return null;
  const user = mapUserRow(data);
  if (includePassword) return { ...user, passwordHash: data.password_hash };
  return user;
}

export async function updateUserLastLogin(id: string) {
  await db().from('users').update({ last_login_at: new Date().toISOString() }).eq('id', id);
}

export async function listUsers() {
  const { data, error } = await db().from('users').select('*').order('created_at', { ascending: false });
  if (error) throw mapSupabaseError(error);
  return (data ?? []).map(mapUserRow);
}

export async function createUser(input: {
  email: string;
  passwordHash: string;
  name: string;
  role: UserRole;
}) {
  const { data, error } = await db()
    .from('users')
    .insert({
      email: input.email.toLowerCase(),
      password_hash: input.passwordHash,
      name: input.name,
      role: input.role,
    })
    .select('*')
    .single();
  if (error) throw mapSupabaseError(error);
  return mapUserRow(data);
}

export async function updateUser(id: string, updates: Record<string, unknown>) {
  const row: Record<string, unknown> = {};
  if (updates.name !== undefined) row.name = updates.name;
  if (updates.role !== undefined) row.role = updates.role;
  if (updates.isActive !== undefined) row.is_active = updates.isActive;
  if (updates.passwordHash !== undefined) row.password_hash = updates.passwordHash;
  const { data, error } = await db().from('users').update(row).eq('id', id).select('*').single();
  if (error) throw mapSupabaseError(error);
  return mapUserRow(data);
}

export async function deleteUser(id: string) {
  const { error } = await db().from('users').delete().eq('id', id);
  if (error) throw mapSupabaseError(error);
}

// --- Submissions ---
export async function createSubmission(input: Record<string, unknown>) {
  const { data, error } = await db()
    .from('submissions')
    .insert({
      type: input.type,
      status: 'new',
      name: input.name,
      email: input.email,
      phone: input.phone,
      company: input.company,
      subject: input.subject,
      message: input.message,
      source: input.source,
      metadata: input.metadata ?? {},
    })
    .select('*')
    .single();
  if (error) throw mapSupabaseError(error);
  return mapSubmissionRow(data);
}

export async function countSubmissions(filter?: { status?: string }) {
  let q = db().from('submissions').select('*', { count: 'exact', head: true });
  if (filter?.status) q = q.eq('status', filter.status);
  const { count, error } = await q;
  if (error) throw mapSupabaseError(error);
  return count ?? 0;
}

export async function listSubmissions(params: {
  page: number;
  limit: number;
  skip: number;
  type?: string;
  status?: string;
  search?: string;
}) {
  let q = db().from('submissions').select('*', { count: 'exact' });
  if (params.type) q = q.eq('type', params.type);
  if (params.status) q = q.eq('status', params.status);
  if (params.search) {
    q = q.or(
      `name.ilike.%${params.search}%,email.ilike.%${params.search}%,message.ilike.%${params.search}%`
    );
  }
  const { data, count, error } = await q
    .order('created_at', { ascending: false })
    .range(params.skip, params.skip + params.limit - 1);
  if (error) throw mapSupabaseError(error);
  return { items: (data ?? []).map(mapSubmissionRow), total: count ?? 0 };
}

export async function findSubmissionById(id: string) {
  const { data, error } = await db().from('submissions').select('*').eq('id', id).maybeSingle();
  if (error) throw mapSupabaseError(error);
  return data ? mapSubmissionRow(data) : null;
}

export async function updateSubmissionStatus(id: string, status: string) {
  const { data, error } = await db()
    .from('submissions')
    .update({ status })
    .eq('id', id)
    .select('*')
    .single();
  if (error) throw mapSupabaseError(error);
  return mapSubmissionRow(data);
}

export async function deleteSubmission(id: string) {
  const { error } = await db().from('submissions').delete().eq('id', id);
  if (error) throw mapSupabaseError(error);
}

export async function recentSubmissions(limit: number) {
  const { data, error } = await db()
    .from('submissions')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit);
  if (error) throw mapSupabaseError(error);
  return (data ?? []).map(mapSubmissionRow);
}

// --- Jobs ---
export async function findOpenJobs() {
  const { data, error } = await db()
    .from('job_positions')
    .select('*')
    .eq('status', 'open')
    .order('sort_order')
    .order('created_at', { ascending: false });
  if (error) throw mapSupabaseError(error);
  return (data ?? []).map(mapJobRow);
}

export async function findJobByTitle(title: string) {
  const { data, error } = await db()
    .from('job_positions')
    .select('*')
    .eq('title', title)
    .eq('status', 'open')
    .maybeSingle();
  if (error) throw mapSupabaseError(error);
  return data ? mapJobRow(data) : null;
}

export async function countOpenJobs() {
  const { count, error } = await db()
    .from('job_positions')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'open');
  if (error) throw mapSupabaseError(error);
  return count ?? 0;
}

export async function listJobs(params: {
  page: number;
  limit: number;
  skip: number;
  status?: string;
}) {
  let q = db().from('job_positions').select('*', { count: 'exact' });
  if (params.status) q = q.eq('status', params.status);
  const { data, count, error } = await q
    .order('sort_order')
    .order('created_at', { ascending: false })
    .range(params.skip, params.skip + params.limit - 1);
  if (error) throw mapSupabaseError(error);
  return { items: (data ?? []).map(mapJobRow), total: count ?? 0 };
}

export async function createJob(input: Record<string, unknown>) {
  const { data, error } = await db()
    .from('job_positions')
    .insert({
      slug: input.slug,
      title: input.title,
      department: input.department,
      employment_type: input.employmentType,
      description: input.description,
      highlights: input.highlights ?? [],
      status: input.status ?? 'draft',
      sort_order: input.sortOrder ?? 0,
      published_at: input.publishedAt ?? null,
    })
    .select('*')
    .single();
  if (error) throw mapSupabaseError(error);
  return mapJobRow(data);
}

export async function updateJob(id: string, input: Record<string, unknown>) {
  const row: Record<string, unknown> = {};
  if (input.slug !== undefined) row.slug = input.slug;
  if (input.title !== undefined) row.title = input.title;
  if (input.department !== undefined) row.department = input.department;
  if (input.employmentType !== undefined) row.employment_type = input.employmentType;
  if (input.description !== undefined) row.description = input.description;
  if (input.highlights !== undefined) row.highlights = input.highlights;
  if (input.status !== undefined) row.status = input.status;
  if (input.sortOrder !== undefined) row.sort_order = input.sortOrder;
  if (input.publishedAt !== undefined) row.published_at = input.publishedAt;
  const { data, error } = await db().from('job_positions').update(row).eq('id', id).select('*').single();
  if (error) throw mapSupabaseError(error);
  return mapJobRow(data);
}

export async function findJobById(id: string) {
  const { data, error } = await db().from('job_positions').select('*').eq('id', id).maybeSingle();
  if (error) throw mapSupabaseError(error);
  return data ? mapJobRow(data) : null;
}

export async function deleteJob(id: string) {
  const { error } = await db().from('job_positions').delete().eq('id', id);
  if (error) throw mapSupabaseError(error);
}

// --- Applications ---
export async function createApplication(input: {
  jobPositionId?: string;
  positionTitle: string;
  applicant: Record<string, string | undefined>;
  yearsOfExperience: string;
  coverLetter: string;
  resumeFileName?: string;
  resumeMimeType?: string;
  resumeSize?: number;
  resumeData?: string;
}) {
  const { data, error } = await db()
    .from('career_applications')
    .insert({
      job_position_id: input.jobPositionId ?? null,
      position_title: input.positionTitle,
      applicant_full_name: input.applicant.fullName,
      applicant_email: input.applicant.email,
      applicant_phone: input.applicant.phone,
      applicant_location: input.applicant.location,
      applicant_linkedin_url: input.applicant.linkedinUrl || null,
      applicant_portfolio_url: input.applicant.portfolioUrl || null,
      years_of_experience: input.yearsOfExperience,
      cover_letter: input.coverLetter,
      resume_original_name: input.resumeFileName ?? null,
      resume_mime_type: input.resumeMimeType ?? null,
      resume_size: input.resumeSize ?? null,
      resume_storage_pending: !input.resumeData,
      status: 'new',
    })
    .select('*')
    .single();
  if (error) throw mapSupabaseError(error);

  if (input.resumeData && input.resumeFileName && input.resumeMimeType) {
    const { path } = await uploadResume(
      data.id,
      input.resumeFileName,
      input.resumeMimeType,
      input.resumeData
    );
    await db()
      .from('career_applications')
      .update({
        resume_storage_path: path,
        resume_storage_pending: false,
        resume_size: input.resumeSize,
      })
      .eq('id', data.id);
    data.resume_storage_path = path;
    data.resume_storage_pending = false;
  }

  return mapApplicationRow(data);
}

export async function countApplications(filter?: { status?: string }) {
  let q = db().from('career_applications').select('*', { count: 'exact', head: true });
  if (filter?.status) q = q.eq('status', filter.status);
  const { count, error } = await q;
  if (error) throw mapSupabaseError(error);
  return count ?? 0;
}

export async function listApplications(params: {
  page: number;
  limit: number;
  skip: number;
  status?: string;
  search?: string;
  sort?: string;
}) {
  let q = db().from('career_applications').select('*', { count: 'exact' });
  if (params.status) q = q.eq('status', params.status);
  if (params.search) {
    q = q.or(
      `position_title.ilike.%${params.search}%,applicant_full_name.ilike.%${params.search}%,applicant_email.ilike.%${params.search}%`
    );
  }
  const orderCol = params.sort === 'name' ? 'applicant_full_name' : 'created_at';
  const { data, count, error } = await q
    .order(orderCol, { ascending: params.sort === 'name' })
    .range(params.skip, params.skip + params.limit - 1);
  if (error) throw mapSupabaseError(error);
  return { items: (data ?? []).map(mapApplicationRow), total: count ?? 0 };
}

export async function findApplicationById(id: string) {
  const { data, error } = await db()
    .from('career_applications')
    .select('*')
    .eq('id', id)
    .maybeSingle();
  if (error) throw mapSupabaseError(error);
  return data ? mapApplicationRow(data) : null;
}

export async function getApplicationResumeDownload(id: string) {
  const { data, error } = await db()
    .from('career_applications')
    .select('resume_storage_path, resume_original_name, resume_mime_type')
    .eq('id', id)
    .maybeSingle();
  if (error) throw mapSupabaseError(error);
  if (!data?.resume_storage_path) return null;
  const file = await downloadResumeFile(data.resume_storage_path);
  return {
    buffer: file.buffer,
    filename: data.resume_original_name ?? 'resume.pdf',
    mimeType: data.resume_mime_type ?? file.mimeType,
  };
}

export async function updateApplication(id: string, updates: Record<string, unknown>) {
  const row: Record<string, unknown> = {};
  if (updates.status !== undefined) row.status = updates.status;
  if (updates.adminNotes !== undefined) row.admin_notes = updates.adminNotes;
  if (updates.reviewedBy !== undefined) row.reviewed_by = updates.reviewedBy;
  if (updates.reviewedAt !== undefined) row.reviewed_at = updates.reviewedAt;
  const { data, error } = await db()
    .from('career_applications')
    .update(row)
    .eq('id', id)
    .select('*')
    .single();
  if (error) throw mapSupabaseError(error);
  return mapApplicationRow(data);
}

export async function deleteApplication(id: string) {
  const { error } = await db().from('career_applications').delete().eq('id', id);
  if (error) throw mapSupabaseError(error);
}

export async function recentApplications(limit: number) {
  const { data, error } = await db()
    .from('career_applications')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit);
  if (error) throw mapSupabaseError(error);
  return (data ?? []).map(mapApplicationRow);
}

// --- Team ---
export async function findPublishedTeam() {
  const { data, error } = await db()
    .from('team_members')
    .select('*')
    .eq('status', 'published')
    .order('sort_order');
  if (error) throw mapSupabaseError(error);
  return (data ?? []).map(mapTeamRow);
}

export async function countPublishedTeam() {
  const { count, error } = await db()
    .from('team_members')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'published');
  if (error) throw mapSupabaseError(error);
  return count ?? 0;
}

export async function listTeam(params: {
  page: number;
  limit: number;
  skip: number;
  status?: string;
  search?: string;
}) {
  let q = db().from('team_members').select('*', { count: 'exact' });
  if (params.status) q = q.eq('status', params.status);
  if (params.search) q = q.ilike('name', `%${params.search}%`);
  const { data, count, error } = await q
    .order('sort_order')
    .order('created_at', { ascending: false })
    .range(params.skip, params.skip + params.limit - 1);
  if (error) throw mapSupabaseError(error);
  return { items: (data ?? []).map(mapTeamRow), total: count ?? 0 };
}

export async function createTeamMember(input: Record<string, unknown>) {
  const { data, error } = await db()
    .from('team_members')
    .insert({
      slug: input.slug,
      name: input.name,
      role: input.role,
      bio: input.bio,
      image_url: input.imageUrl,
      linkedin_url: input.linkedinUrl,
      is_leadership: input.isLeadership ?? false,
      sort_order: input.sortOrder ?? 0,
      status: input.status ?? 'published',
    })
    .select('*')
    .single();
  if (error) throw mapSupabaseError(error);
  return mapTeamRow(data);
}

export async function updateTeamMember(id: string, input: Record<string, unknown>) {
  const row: Record<string, unknown> = {};
  for (const [k, col] of [
    ['slug', 'slug'],
    ['name', 'name'],
    ['role', 'role'],
    ['bio', 'bio'],
    ['imageUrl', 'image_url'],
    ['linkedinUrl', 'linkedin_url'],
    ['isLeadership', 'is_leadership'],
    ['sortOrder', 'sort_order'],
    ['status', 'status'],
  ] as const) {
    if (input[k] !== undefined) row[col] = input[k];
  }
  const { data, error } = await db().from('team_members').update(row).eq('id', id).select('*').single();
  if (error) throw mapSupabaseError(error);
  return mapTeamRow(data);
}

export async function findTeamMemberById(id: string) {
  const { data, error } = await db().from('team_members').select('*').eq('id', id).maybeSingle();
  if (error) throw mapSupabaseError(error);
  return data ? mapTeamRow(data) : null;
}

export async function deleteTeamMember(id: string) {
  const { error } = await db().from('team_members').delete().eq('id', id);
  if (error) throw mapSupabaseError(error);
}

// --- Portfolio ---
export async function findPublishedPortfolio() {
  const { data, error } = await db()
    .from('portfolio_projects')
    .select('*')
    .eq('status', 'published')
    .order('sort_order');
  if (error) throw mapSupabaseError(error);
  return (data ?? []).map(mapPortfolioRow);
}

export async function countPublishedPortfolio() {
  const { count, error } = await db()
    .from('portfolio_projects')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'published');
  if (error) throw mapSupabaseError(error);
  return count ?? 0;
}

export async function listPortfolio(params: {
  page: number;
  limit: number;
  skip: number;
  status?: string;
  search?: string;
}) {
  let q = db().from('portfolio_projects').select('*', { count: 'exact' });
  if (params.status) q = q.eq('status', params.status);
  if (params.search) q = q.ilike('title', `%${params.search}%`);
  const { data, count, error } = await q
    .order('sort_order')
    .order('created_at', { ascending: false })
    .range(params.skip, params.skip + params.limit - 1);
  if (error) throw mapSupabaseError(error);
  return { items: (data ?? []).map(mapPortfolioRow), total: count ?? 0 };
}

export async function createPortfolioProject(input: Record<string, unknown>) {
  const { data, error } = await db()
    .from('portfolio_projects')
    .insert({
      slug: input.slug,
      title: input.title,
      category: input.category,
      description: input.description,
      image_url: input.imageUrl,
      tags: input.tags ?? [],
      sort_order: input.sortOrder ?? 0,
      status: input.status ?? 'published',
    })
    .select('*')
    .single();
  if (error) throw mapSupabaseError(error);
  return mapPortfolioRow(data);
}

export async function updatePortfolioProject(id: string, input: Record<string, unknown>) {
  const row: Record<string, unknown> = {};
  for (const [k, col] of [
    ['slug', 'slug'],
    ['title', 'title'],
    ['category', 'category'],
    ['description', 'description'],
    ['imageUrl', 'image_url'],
    ['tags', 'tags'],
    ['sortOrder', 'sort_order'],
    ['status', 'status'],
  ] as const) {
    if (input[k] !== undefined) row[col] = input[k];
  }
  const { data, error } = await db()
    .from('portfolio_projects')
    .update(row)
    .eq('id', id)
    .select('*')
    .single();
  if (error) throw mapSupabaseError(error);
  return mapPortfolioRow(data);
}

export async function findPortfolioProjectById(id: string) {
  const { data, error } = await db()
    .from('portfolio_projects')
    .select('*')
    .eq('id', id)
    .maybeSingle();
  if (error) throw mapSupabaseError(error);
  return data ? mapPortfolioRow(data) : null;
}

export async function deletePortfolioProject(id: string) {
  const { error } = await db().from('portfolio_projects').delete().eq('id', id);
  if (error) throw mapSupabaseError(error);
}

// --- Blog ---
export async function findPublishedBlog() {
  const { data, error } = await db()
    .from('blog_posts')
    .select('*')
    .eq('status', 'published')
    .order('published_at', { ascending: false })
    .order('created_at', { ascending: false });
  if (error) throw mapSupabaseError(error);
  return (data ?? []).map(mapBlogRow);
}

export async function findBlogBySlug(slug: string) {
  const { data, error } = await db()
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .maybeSingle();
  if (error) throw mapSupabaseError(error);
  return data ? mapBlogRow(data) : null;
}

export async function countPublishedBlog() {
  const { count, error } = await db()
    .from('blog_posts')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'published');
  if (error) throw mapSupabaseError(error);
  return count ?? 0;
}

export async function listBlog(params: {
  page: number;
  limit: number;
  skip: number;
  status?: string;
  search?: string;
}) {
  let q = db().from('blog_posts').select('*', { count: 'exact' });
  if (params.status) q = q.eq('status', params.status);
  if (params.search) q = q.ilike('title', `%${params.search}%`);
  const { data, count, error } = await q
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false })
    .range(params.skip, params.skip + params.limit - 1);
  if (error) throw mapSupabaseError(error);
  return { items: (data ?? []).map(mapBlogRow), total: count ?? 0 };
}

export async function createBlogPost(input: Record<string, unknown>) {
  const { data, error } = await db()
    .from('blog_posts')
    .insert({
      slug: input.slug,
      title: input.title,
      excerpt: input.excerpt,
      content: input.content ?? '',
      category: input.category,
      author: input.author,
      image_url: input.imageUrl,
      read_time_minutes: input.readTimeMinutes ?? 5,
      status: input.status ?? 'draft',
      published_at: input.publishedAt ?? null,
      seo_title: input.seoTitle,
      seo_description: input.seoDescription,
    })
    .select('*')
    .single();
  if (error) throw mapSupabaseError(error);
  return mapBlogRow(data);
}

export async function updateBlogPost(id: string, input: Record<string, unknown>) {
  const row: Record<string, unknown> = {};
  for (const [k, col] of [
    ['slug', 'slug'],
    ['title', 'title'],
    ['excerpt', 'excerpt'],
    ['content', 'content'],
    ['category', 'category'],
    ['author', 'author'],
    ['imageUrl', 'image_url'],
    ['readTimeMinutes', 'read_time_minutes'],
    ['status', 'status'],
    ['publishedAt', 'published_at'],
    ['seoTitle', 'seo_title'],
    ['seoDescription', 'seo_description'],
  ] as const) {
    if (input[k] !== undefined) row[col] = input[k];
  }
  const { data, error } = await db().from('blog_posts').update(row).eq('id', id).select('*').single();
  if (error) throw mapSupabaseError(error);
  return mapBlogRow(data);
}

export async function findBlogPostById(id: string) {
  const { data, error } = await db().from('blog_posts').select('*').eq('id', id).maybeSingle();
  if (error) throw mapSupabaseError(error);
  return data ? mapBlogRow(data) : null;
}

export async function deleteBlogPost(id: string) {
  const { error } = await db().from('blog_posts').delete().eq('id', id);
  if (error) throw mapSupabaseError(error);
}

// --- Site content ---
export async function getSiteContentByKey(key: string) {
  const { data, error } = await db()
    .from('site_content')
    .select('*')
    .eq('key', key)
    .eq('locale', 'en')
    .maybeSingle();
  if (error) throw mapSupabaseError(error);
  return data ? mapSiteContentRow(data) : null;
}

export async function getAllSiteContent() {
  const { data, error } = await db().from('site_content').select('*').eq('locale', 'en');
  if (error) throw mapSupabaseError(error);
  return (data ?? []).map(mapSiteContentRow);
}

export async function upsertSiteContent(key: string, content: unknown, updatedBy?: string) {
  const { data, error } = await db()
    .from('site_content')
    .upsert(
      { key, locale: 'en', content, updated_by: updatedBy ?? null },
      { onConflict: 'key,locale' }
    )
    .select('*')
    .single();
  if (error) throw mapSupabaseError(error);
  return mapSiteContentRow(data);
}

// --- Media ---
export async function listMedia(params: {
  page: number;
  limit: number;
  skip: number;
  folder?: string;
}) {
  let q = db().from('media_assets').select('*', { count: 'exact' });
  if (params.folder) q = q.eq('folder', params.folder);
  const { data, count, error } = await q
    .order('created_at', { ascending: false })
    .range(params.skip, params.skip + params.limit - 1);
  if (error) throw mapSupabaseError(error);
  return { items: (data ?? []).map(mapMediaRow), total: count ?? 0 };
}

export async function createMediaAsset(input: Record<string, unknown>) {
  const { data, error } = await db()
    .from('media_assets')
    .insert({
      filename: input.filename,
      original_name: input.originalName,
      mime_type: input.mimeType,
      size: input.size ?? 0,
      url: input.url,
      storage_path: input.storagePath,
      folder: input.folder ?? 'general',
      alt_text: input.altText,
      uploaded_by: input.uploadedBy ?? null,
    })
    .select('*')
    .single();
  if (error) throw mapSupabaseError(error);
  return mapMediaRow(data);
}

export async function findMediaAssetById(id: string) {
  const { data, error } = await db().from('media_assets').select('*').eq('id', id).maybeSingle();
  if (error) throw mapSupabaseError(error);
  return data ? mapMediaRow(data) : null;
}

export async function deleteMediaAsset(id: string) {
  const { error } = await db().from('media_assets').delete().eq('id', id);
  if (error) throw mapSupabaseError(error);
}

// --- Audit ---
export async function createAuditLog(input: {
  userId?: string;
  action: string;
  entity: string;
  entityId?: string;
  changes?: Record<string, unknown>;
  ip?: string;
}) {
  await db().from('audit_logs').insert({
    user_id: input.userId ?? null,
    action: input.action,
    entity: input.entity,
    entity_id: input.entityId,
    changes: input.changes ?? null,
    ip: input.ip,
  });
}

export async function listAuditLogs(params: { page: number; limit: number; skip: number }) {
  const { data, count, error } = await db()
    .from('audit_logs')
    .select('*, users(name, email, id)')
    .order('created_at', { ascending: false })
    .range(params.skip, params.skip + params.limit - 1);
  if (error) throw mapSupabaseError(error);
  return { items: (data ?? []).map(mapAuditRow), total: count ?? 0 };
}

export async function recentAuditLogs(limit: number) {
  const { data, error } = await db()
    .from('audit_logs')
    .select('*, users(name, email, id)')
    .order('created_at', { ascending: false })
    .limit(limit);
  if (error) throw mapSupabaseError(error);
  return (data ?? []).map(mapAuditRow);
}
