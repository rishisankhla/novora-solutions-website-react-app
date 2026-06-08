import type { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { repo } from '../data/index.js';
import { sendSuccess, sendError } from '../utils/response.js';
import { parsePagination, slugify, routeParam } from '../utils/helpers.js';
import { logActivity } from '../services/audit.js';
import { notifyApplicationStatusChange } from '../services/email/careerNotifications.js';
import { processImageUpload } from '../services/mediaUpload.js';

export async function getDashboardStats(_req: Request, res: Response) {
  const [
    totalSubmissions,
    newSubmissions,
    totalApplications,
    newApplications,
    openJobs,
    publishedPosts,
    teamCount,
    portfolioCount,
  ] = await Promise.all([
    repo.countSubmissions(),
    repo.countSubmissions({ status: 'new' }),
    repo.countApplications(),
    repo.countApplications({ status: 'new' }),
    repo.countOpenJobs(),
    repo.countPublishedBlog(),
    repo.countPublishedTeam(),
    repo.countPublishedPortfolio(),
  ]);

  const [recentActivity, recentSubmissions, recentApplications] = await Promise.all([
    repo.recentAuditLogs(10),
    repo.recentSubmissions(5),
    repo.recentApplications(5),
  ]);

  return sendSuccess(res, {
    stats: {
      totalSubmissions,
      newSubmissions,
      totalApplications,
      newApplications,
      openJobs,
      publishedPosts,
      teamCount,
      portfolioCount,
    },
    recentActivity,
    recentSubmissions,
    recentApplications,
  });
}

export async function listSubmissions(req: Request, res: Response) {
  const { page, limit, skip } = parsePagination(req.query as { page?: string; limit?: string });
  const { items, total } = await repo.listSubmissions({
    page,
    limit,
    skip,
    type: req.query.type as string | undefined,
    status: req.query.status as string | undefined,
    search: req.query.search as string | undefined,
  });
  return sendSuccess(res, { items, total, page, limit, totalPages: Math.ceil(total / limit) });
}

export async function getSubmission(req: Request, res: Response) {
  const item = await repo.findSubmissionById(routeParam(req.params.id));
  if (!item) return sendError(res, 404, 'NOT_FOUND', 'Submission not found');
  return sendSuccess(res, { item });
}

export async function updateSubmissionStatus(req: Request, res: Response) {
  const item = await repo.updateSubmissionStatus(routeParam(req.params.id), req.body.status);
  if (!item) return sendError(res, 404, 'NOT_FOUND', 'Submission not found');
  await logActivity({
    userId: req.user?.id,
    action: 'update',
    entity: 'submission',
    entityId: String(item._id),
    ip: req.ip,
  });
  return sendSuccess(res, { item });
}

export async function deleteSubmission(req: Request, res: Response) {
  const item = await repo.findSubmissionById(routeParam(req.params.id));
  if (!item) return sendError(res, 404, 'NOT_FOUND', 'Submission not found');
  await repo.deleteSubmission(routeParam(req.params.id));
  await logActivity({
    userId: req.user?.id,
    action: 'delete',
    entity: 'submission',
    entityId: String(routeParam(req.params.id)),
    ip: req.ip,
  });
  return sendSuccess(res, { message: 'Deleted' });
}

export async function listApplications(req: Request, res: Response) {
  const { page, limit, skip } = parsePagination(req.query as { page?: string; limit?: string });
  const { items, total } = await repo.listApplications({
    page,
    limit,
    skip,
    status: req.query.status as string | undefined,
    search: req.query.search as string | undefined,
    sort: req.query.sort as string | undefined,
  });
  return sendSuccess(res, { items, total, page, limit, totalPages: Math.ceil(total / limit) });
}

export async function getApplication(req: Request, res: Response) {
  const item = await repo.findApplicationById(routeParam(req.params.id));
  if (!item) return sendError(res, 404, 'NOT_FOUND', 'Application not found');
  return sendSuccess(res, { item });
}

export async function downloadApplicationResume(req: Request, res: Response) {
  const file = await repo.getApplicationResumeDownload(routeParam(req.params.id));
  if (!file) return sendError(res, 404, 'NOT_FOUND', 'Resume file not available');

  res.setHeader('Content-Type', file.mimeType);
  res.setHeader('Content-Disposition', `attachment; filename="${file.filename.replace(/"/g, '')}"`);
  res.setHeader('Content-Length', file.buffer.length);
  return res.send(file.buffer);
}

export async function updateApplication(req: Request, res: Response) {
  const id = routeParam(req.params.id);
  const existing = await repo.findApplicationById(id);
  if (!existing) return sendError(res, 404, 'NOT_FOUND', 'Application not found');

  const updates = { ...req.body, reviewedBy: req.user?.id, reviewedAt: new Date() };
  const item = await repo.updateApplication(id, updates);
  if (!item) return sendError(res, 404, 'NOT_FOUND', 'Application not found');

  const applicant = item.applicant as {
    fullName: string;
    email: string;
  };
  void notifyApplicationStatusChange({
    applicantName: applicant.fullName,
    applicantEmail: applicant.email,
    positionTitle: String(item.positionTitle),
    previousStatus: String(existing.status),
    newStatus: String(item.status),
    adminNotes: typeof item.adminNotes === 'string' ? item.adminNotes : undefined,
  }).catch((err) => console.error('[email] Status notification failed:', err));

  await logActivity({
    userId: req.user?.id,
    action: 'update',
    entity: 'application',
    entityId: String(item._id),
    ip: req.ip,
  });
  return sendSuccess(res, { item });
}

export async function deleteApplication(req: Request, res: Response) {
  const item = await repo.findApplicationById(routeParam(req.params.id));
  if (!item) return sendError(res, 404, 'NOT_FOUND', 'Application not found');
  await repo.deleteApplication(routeParam(req.params.id));
  await logActivity({
    userId: req.user?.id,
    action: 'delete',
    entity: 'application',
    entityId: String(routeParam(req.params.id)),
    ip: req.ip,
  });
  return sendSuccess(res, { message: 'Deleted' });
}

export async function listJobs(req: Request, res: Response) {
  const { page, limit, skip } = parsePagination(req.query as { page?: string; limit?: string });
  const { items, total } = await repo.listJobs({
    page,
    limit,
    skip,
    status: req.query.status as string | undefined,
  });
  return sendSuccess(res, { items, total, page, limit, totalPages: Math.ceil(total / limit) });
}

export async function createJob(req: Request, res: Response) {
  const slug = req.body.slug || slugify(req.body.title);
  const job = await repo.createJob({
    ...req.body,
    slug,
    publishedAt: req.body.status === 'open' ? new Date() : undefined,
  });
  await logActivity({
    userId: req.user?.id,
    action: 'create',
    entity: 'job',
    entityId: String(job._id),
    ip: req.ip,
  });
  return sendSuccess(res, { item: job }, 201);
}

export async function updateJob(req: Request, res: Response) {
  const updates = { ...req.body };
  if (updates.title && !updates.slug) updates.slug = slugify(updates.title);
  if (updates.status === 'open') updates.publishedAt = new Date();
  const item = await repo.updateJob(routeParam(req.params.id), updates);
  if (!item) return sendError(res, 404, 'NOT_FOUND', 'Job not found');
  await logActivity({
    userId: req.user?.id,
    action: 'update',
    entity: 'job',
    entityId: String(item._id),
    ip: req.ip,
  });
  return sendSuccess(res, { item });
}

export async function deleteJob(req: Request, res: Response) {
  const item = await repo.findJobById(routeParam(req.params.id));
  if (!item) return sendError(res, 404, 'NOT_FOUND', 'Job not found');
  await repo.deleteJob(routeParam(req.params.id));
  await logActivity({
    userId: req.user?.id,
    action: 'delete',
    entity: 'job',
    entityId: String(routeParam(req.params.id)),
    ip: req.ip,
  });
  return sendSuccess(res, { message: 'Deleted' });
}

export async function listTeam(req: Request, res: Response) {
  const { page, limit, skip } = parsePagination(req.query as { page?: string; limit?: string });
  const { items, total } = await repo.listTeam({
    page,
    limit,
    skip,
    status: req.query.status as string | undefined,
    search: req.query.search as string | undefined,
  });
  return sendSuccess(res, { items, total, page, limit, totalPages: Math.ceil(total / limit) });
}

export async function listPortfolio(req: Request, res: Response) {
  const { page, limit, skip } = parsePagination(req.query as { page?: string; limit?: string });
  const { items, total } = await repo.listPortfolio({
    page,
    limit,
    skip,
    status: req.query.status as string | undefined,
    search: req.query.search as string | undefined,
  });
  return sendSuccess(res, { items, total, page, limit, totalPages: Math.ceil(total / limit) });
}

export async function listBlog(req: Request, res: Response) {
  const { page, limit, skip } = parsePagination(req.query as { page?: string; limit?: string });
  const { items, total } = await repo.listBlog({
    page,
    limit,
    skip,
    status: req.query.status as string | undefined,
    search: req.query.search as string | undefined,
  });
  return sendSuccess(res, { items, total, page, limit, totalPages: Math.ceil(total / limit) });
}

export async function createTeam(req: Request, res: Response) {
  const slug = req.body.slug || slugify(req.body.name);
  const item = await repo.createTeamMember({ ...req.body, slug });
  await logActivity({
    userId: req.user?.id,
    action: 'create',
    entity: 'team',
    entityId: String(item._id),
    ip: req.ip,
  });
  return sendSuccess(res, { item }, 201);
}

export async function updateTeam(req: Request, res: Response) {
  const item = await repo.updateTeamMember(routeParam(req.params.id), req.body);
  if (!item) return sendError(res, 404, 'NOT_FOUND', 'Team member not found');
  await logActivity({
    userId: req.user?.id,
    action: 'update',
    entity: 'team',
    entityId: String(item._id),
    ip: req.ip,
  });
  return sendSuccess(res, { item });
}

export async function deleteTeam(req: Request, res: Response) {
  const item = await repo.findTeamMemberById(routeParam(req.params.id));
  if (!item) return sendError(res, 404, 'NOT_FOUND', 'Team member not found');
  await repo.deleteTeamMember(routeParam(req.params.id));
  return sendSuccess(res, { message: 'Deleted' });
}

export async function createPortfolio(req: Request, res: Response) {
  const slug = req.body.slug || slugify(req.body.title);
  const item = await repo.createPortfolioProject({ ...req.body, slug });
  await logActivity({
    userId: req.user?.id,
    action: 'create',
    entity: 'portfolio',
    entityId: String(item._id),
    ip: req.ip,
  });
  return sendSuccess(res, { item }, 201);
}

export async function updatePortfolio(req: Request, res: Response) {
  const item = await repo.updatePortfolioProject(routeParam(req.params.id), req.body);
  if (!item) return sendError(res, 404, 'NOT_FOUND', 'Project not found');
  return sendSuccess(res, { item });
}

export async function deletePortfolio(req: Request, res: Response) {
  const item = await repo.findPortfolioProjectById(routeParam(req.params.id));
  if (!item) return sendError(res, 404, 'NOT_FOUND', 'Project not found');
  await repo.deletePortfolioProject(routeParam(req.params.id));
  return sendSuccess(res, { message: 'Deleted' });
}

export async function createBlog(req: Request, res: Response) {
  const slug = req.body.slug || slugify(req.body.title);
  const item = await repo.createBlogPost({
    ...req.body,
    slug,
    publishedAt: req.body.status === 'published' ? new Date() : undefined,
  });
  await logActivity({
    userId: req.user?.id,
    action: 'create',
    entity: 'blog',
    entityId: String(item._id),
    ip: req.ip,
  });
  return sendSuccess(res, { item }, 201);
}

export async function updateBlog(req: Request, res: Response) {
  const updates = { ...req.body };
  if (updates.status === 'published' && !updates.publishedAt) updates.publishedAt = new Date();
  const item = await repo.updateBlogPost(routeParam(req.params.id), updates);
  if (!item) return sendError(res, 404, 'NOT_FOUND', 'Post not found');
  return sendSuccess(res, { item });
}

export async function deleteBlog(req: Request, res: Response) {
  const item = await repo.findBlogPostById(routeParam(req.params.id));
  if (!item) return sendError(res, 404, 'NOT_FOUND', 'Post not found');
  await repo.deleteBlogPost(routeParam(req.params.id));
  return sendSuccess(res, { message: 'Deleted' });
}

export async function listSiteContent(_req: Request, res: Response) {
  const items = await repo.getAllSiteContent();
  return sendSuccess(res, { items });
}

export async function upsertSiteContent(req: Request, res: Response) {
  const key = routeParam(req.params.key);
  const item = await repo.upsertSiteContent(key, req.body.content, req.user?.id);
  await logActivity({
    userId: req.user?.id,
    action: 'upsert',
    entity: 'site_content',
    entityId: key,
    ip: req.ip,
  });
  return sendSuccess(res, { item });
}

export async function listMedia(req: Request, res: Response) {
  const { page, limit, skip } = parsePagination(req.query as { page?: string; limit?: string });
  const { items, total } = await repo.listMedia({
    page,
    limit,
    skip,
    folder: req.query.folder as string | undefined,
  });
  return sendSuccess(res, { items, total, page, limit, totalPages: Math.ceil(total / limit) });
}

export async function uploadMedia(req: Request, res: Response) {
  const item = await processImageUpload({
    fileName: req.body.fileName,
    mimeType: req.body.mimeType,
    folder: req.body.folder ?? 'general',
    imageData: req.body.imageData,
    altText: req.body.altText,
    uploadedBy: req.user?.id,
  });
  await logActivity({
    userId: req.user?.id,
    action: 'upload',
    entity: 'media',
    entityId: String(item._id),
    ip: req.ip,
  });
  return sendSuccess(res, { item }, 201);
}

export async function createMedia(req: Request, res: Response) {
  const item = await repo.createMediaAsset({ ...req.body, uploadedBy: req.user?.id });
  await logActivity({
    userId: req.user?.id,
    action: 'create',
    entity: 'media',
    entityId: String(item._id),
    ip: req.ip,
  });
  return sendSuccess(res, { item }, 201);
}

export async function deleteMedia(req: Request, res: Response) {
  const item = await repo.findMediaAssetById(routeParam(req.params.id));
  if (!item) return sendError(res, 404, 'NOT_FOUND', 'Media not found');
  await repo.deleteMediaAsset(routeParam(req.params.id));
  return sendSuccess(res, { message: 'Deleted' });
}

export async function listUsers(_req: Request, res: Response) {
  const users = await repo.listUsers();
  return sendSuccess(res, { items: users });
}

export async function createUser(req: Request, res: Response) {
  const existing = await repo.findUserByEmail(req.body.email);
  if (existing) return sendError(res, 409, 'DUPLICATE', 'Email already exists');
  const passwordHash = await bcrypt.hash(req.body.password, 12);
  const user = await repo.createUser({
    email: req.body.email,
    passwordHash,
    name: req.body.name,
    role: req.body.role,
  });
  await logActivity({
    userId: req.user?.id,
    action: 'create',
    entity: 'user',
    entityId: String(user._id),
    ip: req.ip,
  });
  return sendSuccess(
    res,
    { user: { id: user._id, email: user.email, name: user.name, role: user.role } },
    201
  );
}

export async function updateUser(req: Request, res: Response) {
  const updates: Record<string, unknown> = { ...req.body };
  delete updates.password;
  if (req.body.password) {
    updates.passwordHash = await bcrypt.hash(req.body.password, 12);
  }
  const user = await repo.updateUser(routeParam(req.params.id), updates);
  if (!user) return sendError(res, 404, 'NOT_FOUND', 'User not found');
  return sendSuccess(res, { user });
}

export async function deleteUser(req: Request, res: Response) {
  if (routeParam(req.params.id) === req.user?.id) {
    return sendError(res, 400, 'INVALID', 'Cannot delete your own account');
  }
  const user = await repo.findUserById(routeParam(req.params.id));
  if (!user) return sendError(res, 404, 'NOT_FOUND', 'User not found');
  await repo.deleteUser(routeParam(req.params.id));
  return sendSuccess(res, { message: 'Deleted' });
}

export async function listActivity(req: Request, res: Response) {
  const { page, limit, skip } = parsePagination(req.query as { page?: string; limit?: string });
  const { items, total } = await repo.listAuditLogs({ page, limit, skip });
  return sendSuccess(res, { items, total, page, limit, totalPages: Math.ceil(total / limit) });
}
