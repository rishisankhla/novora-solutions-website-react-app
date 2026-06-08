import bcrypt from 'bcryptjs';
import type { FilterQuery } from 'mongoose';
import { User } from '../models/User.js';
import { Submission, type ISubmission } from '../models/Submission.js';
import { CareerApplication, JobPosition, type ICareerApplication } from '../models/Career.js';
import {
  TeamMember,
  PortfolioProject,
  BlogPost,
  SiteContent,
  MediaAsset,
  AuditLog,
} from '../models/Content.js';
import type { UserRole } from '../types/index.js';

function lean<T>(doc: T | null): T | null {
  return doc;
}

export async function pingMongo(): Promise<void> {
  await User.findOne().select('_id').lean();
}

export async function findUserByEmail(email: string) {
  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user) return null;
  return { ...user.toObject(), _id: user._id.toString(), passwordHash: user.passwordHash };
}

export async function findUserById(id: string, includePassword = false) {
  const q = User.findById(id);
  if (!includePassword) q.select('-passwordHash');
  else q.select('+passwordHash');
  const user = await q.lean();
  return user ? { ...user, _id: String(user._id) } : null;
}

export async function updateUserLastLogin(id: string) {
  await User.findByIdAndUpdate(id, { lastLoginAt: new Date() });
}

export async function listUsers() {
  return User.find().select('-passwordHash').sort({ createdAt: -1 }).lean();
}

export async function createUser(input: {
  email: string;
  passwordHash: string;
  name: string;
  role: UserRole;
}) {
  const user = await User.create({
    email: input.email.toLowerCase(),
    passwordHash: input.passwordHash,
    name: input.name,
    role: input.role,
  });
  const obj = user.toObject();
  delete (obj as { passwordHash?: string }).passwordHash;
  return { ...obj, _id: user._id.toString() };
}

export async function updateUser(id: string, updates: Record<string, unknown>) {
  const user = await User.findByIdAndUpdate(id, updates, { new: true })
    .select('-passwordHash')
    .lean();
  return user ? { ...user, _id: String(user._id) } : null;
}

export async function deleteUser(id: string) {
  await User.findByIdAndDelete(id);
}

export async function createSubmission(input: Record<string, unknown>) {
  const submission = await Submission.create(input);
  return submission.toObject();
}

export async function countSubmissions(filter?: { status?: string }) {
  const q: FilterQuery<ISubmission> = {};
  if (filter?.status) q.status = filter.status;
  return Submission.countDocuments(q);
}

export async function listSubmissions(params: {
  page: number;
  limit: number;
  skip: number;
  type?: string;
  status?: string;
  search?: string;
}) {
  const filter: FilterQuery<ISubmission> = {};
  if (params.type) filter.type = params.type;
  if (params.status) filter.status = params.status;
  if (params.search) {
    filter.$or = [
      { name: { $regex: params.search, $options: 'i' } },
      { email: { $regex: params.search, $options: 'i' } },
      { message: { $regex: params.search, $options: 'i' } },
    ];
  }
  const [items, total] = await Promise.all([
    Submission.find(filter).sort({ createdAt: -1 }).skip(params.skip).limit(params.limit).lean(),
    Submission.countDocuments(filter),
  ]);
  return { items, total };
}

export async function findSubmissionById(id: string) {
  return lean(await Submission.findById(id).lean());
}

export async function updateSubmissionStatus(id: string, status: string) {
  return lean(await Submission.findByIdAndUpdate(id, { status }, { new: true }).lean());
}

export async function deleteSubmission(id: string) {
  await Submission.findByIdAndDelete(id);
}

export async function recentSubmissions(limit: number) {
  return Submission.find().sort({ createdAt: -1 }).limit(limit).lean();
}

export async function findOpenJobs() {
  return JobPosition.find({ status: 'open' }).sort({ sortOrder: 1, createdAt: -1 }).lean();
}

export async function findJobByTitle(title: string) {
  return lean(await JobPosition.findOne({ title, status: 'open' }).lean());
}

export async function countOpenJobs() {
  return JobPosition.countDocuments({ status: 'open' });
}

export async function listJobs(params: {
  page: number;
  limit: number;
  skip: number;
  status?: string;
}) {
  const filter: Record<string, unknown> = {};
  if (params.status) filter.status = params.status;
  const [items, total] = await Promise.all([
    JobPosition.find(filter)
      .sort({ sortOrder: 1, createdAt: -1 })
      .skip(params.skip)
      .limit(params.limit)
      .lean(),
    JobPosition.countDocuments(filter),
  ]);
  return { items, total };
}

export async function createJob(input: Record<string, unknown>) {
  const job = await JobPosition.create(input);
  return job.toObject();
}

export async function updateJob(id: string, input: Record<string, unknown>) {
  return lean(await JobPosition.findByIdAndUpdate(id, input, { new: true }).lean());
}

export async function findJobById(id: string) {
  return lean(await JobPosition.findById(id).lean());
}

export async function deleteJob(id: string) {
  await JobPosition.findByIdAndDelete(id);
}

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
  const application = await CareerApplication.create({
    jobPositionId: input.jobPositionId,
    positionTitle: input.positionTitle,
    applicant: {
      fullName: input.applicant.fullName,
      email: input.applicant.email,
      phone: input.applicant.phone,
      location: input.applicant.location,
      linkedinUrl: input.applicant.linkedinUrl || undefined,
      portfolioUrl: input.applicant.portfolioUrl || undefined,
    },
    yearsOfExperience: input.yearsOfExperience,
    coverLetter: input.coverLetter,
    resume: input.resumeFileName
      ? {
          originalName: input.resumeFileName,
          mimeType: input.resumeMimeType,
          size: input.resumeSize,
          data: input.resumeData || undefined,
          storagePending: !input.resumeData,
        }
      : { storagePending: true },
  });
  const obj = application.toObject();
  delete (obj as { resume?: { data?: string } }).resume?.data;
  return obj;
}

export async function countApplications(filter?: { status?: string }) {
  const q: FilterQuery<ICareerApplication> = {};
  if (filter?.status) q.status = filter.status;
  return CareerApplication.countDocuments(q);
}

export async function listApplications(params: {
  page: number;
  limit: number;
  skip: number;
  status?: string;
  search?: string;
  sort?: string;
}) {
  const filter: FilterQuery<ICareerApplication> = {};
  if (params.status) filter.status = params.status;
  if (params.search) {
    const q = params.search;
    filter.$or = [
      { positionTitle: { $regex: q, $options: 'i' } },
      { 'applicant.fullName': { $regex: q, $options: 'i' } },
      { 'applicant.email': { $regex: q, $options: 'i' } },
    ];
  }
  const sortField =
    params.sort === 'name'
      ? ({ 'applicant.fullName': 1 } as Record<string, 1 | -1>)
      : ({ createdAt: -1 } as Record<string, 1 | -1>);
  const [items, total] = await Promise.all([
    CareerApplication.find(filter)
      .select('-resume.data')
      .sort(sortField)
      .skip(params.skip)
      .limit(params.limit)
      .lean(),
    CareerApplication.countDocuments(filter),
  ]);
  return { items, total };
}

export async function findApplicationById(id: string) {
  return lean(await CareerApplication.findById(id).select('-resume.data').lean());
}

export async function getApplicationResumeDownload(id: string) {
  const item = await CareerApplication.findById(id).select('+resume.data').lean();
  if (!item?.resume?.data) return null;
  return {
    buffer: Buffer.from(item.resume.data, 'base64'),
    filename: item.resume.originalName ?? 'resume.pdf',
    mimeType: item.resume.mimeType ?? 'application/octet-stream',
  };
}

export async function updateApplication(id: string, updates: Record<string, unknown>) {
  return lean(await CareerApplication.findByIdAndUpdate(id, updates, { new: true })
    .select('-resume.data')
    .lean());
}

export async function deleteApplication(id: string) {
  await CareerApplication.findByIdAndDelete(id);
}

export async function recentApplications(limit: number) {
  return CareerApplication.find().select('-resume.data').sort({ createdAt: -1 }).limit(limit).lean();
}

export async function findPublishedTeam() {
  return TeamMember.find({ status: 'published' }).sort({ sortOrder: 1 }).lean();
}

export async function countPublishedTeam() {
  return TeamMember.countDocuments({ status: 'published' });
}

export async function listTeam(params: {
  page: number;
  limit: number;
  skip: number;
  status?: string;
  search?: string;
}) {
  const filter: Record<string, unknown> = {};
  if (params.status) filter.status = params.status;
  if (params.search) filter.name = { $regex: params.search, $options: 'i' };
  const [items, total] = await Promise.all([
    TeamMember.find(filter)
      .sort({ sortOrder: 1, createdAt: -1 })
      .skip(params.skip)
      .limit(params.limit)
      .lean(),
    TeamMember.countDocuments(filter),
  ]);
  return { items, total };
}

export async function createTeamMember(input: Record<string, unknown>) {
  const item = await TeamMember.create(input);
  return item.toObject();
}

export async function updateTeamMember(id: string, input: Record<string, unknown>) {
  return lean(await TeamMember.findByIdAndUpdate(id, input, { new: true }).lean());
}

export async function findTeamMemberById(id: string) {
  return lean(await TeamMember.findById(id).lean());
}

export async function deleteTeamMember(id: string) {
  await TeamMember.findByIdAndDelete(id);
}

export async function findPublishedPortfolio() {
  return PortfolioProject.find({ status: 'published' }).sort({ sortOrder: 1 }).lean();
}

export async function countPublishedPortfolio() {
  return PortfolioProject.countDocuments({ status: 'published' });
}

export async function listPortfolio(params: {
  page: number;
  limit: number;
  skip: number;
  status?: string;
  search?: string;
}) {
  const filter: Record<string, unknown> = {};
  if (params.status) filter.status = params.status;
  if (params.search) filter.title = { $regex: params.search, $options: 'i' };
  const [items, total] = await Promise.all([
    PortfolioProject.find(filter)
      .sort({ sortOrder: 1, createdAt: -1 })
      .skip(params.skip)
      .limit(params.limit)
      .lean(),
    PortfolioProject.countDocuments(filter),
  ]);
  return { items, total };
}

export async function createPortfolioProject(input: Record<string, unknown>) {
  const item = await PortfolioProject.create(input);
  return item.toObject();
}

export async function updatePortfolioProject(id: string, input: Record<string, unknown>) {
  return lean(await PortfolioProject.findByIdAndUpdate(id, input, { new: true }).lean());
}

export async function findPortfolioProjectById(id: string) {
  return lean(await PortfolioProject.findById(id).lean());
}

export async function deletePortfolioProject(id: string) {
  await PortfolioProject.findByIdAndDelete(id);
}

export async function findPublishedBlog() {
  return BlogPost.find({ status: 'published' }).sort({ publishedAt: -1, createdAt: -1 }).lean();
}

export async function findBlogBySlug(slug: string) {
  return lean(await BlogPost.findOne({ slug, status: 'published' }).lean());
}

export async function countPublishedBlog() {
  return BlogPost.countDocuments({ status: 'published' });
}

export async function listBlog(params: {
  page: number;
  limit: number;
  skip: number;
  status?: string;
  search?: string;
}) {
  const filter: Record<string, unknown> = {};
  if (params.status) filter.status = params.status;
  if (params.search) filter.title = { $regex: params.search, $options: 'i' };
  const [items, total] = await Promise.all([
    BlogPost.find(filter)
      .sort({ sortOrder: 1, createdAt: -1 })
      .skip(params.skip)
      .limit(params.limit)
      .lean(),
    BlogPost.countDocuments(filter),
  ]);
  return { items, total };
}

export async function createBlogPost(input: Record<string, unknown>) {
  const item = await BlogPost.create(input);
  return item.toObject();
}

export async function updateBlogPost(id: string, input: Record<string, unknown>) {
  return lean(await BlogPost.findByIdAndUpdate(id, input, { new: true }).lean());
}

export async function findBlogPostById(id: string) {
  return lean(await BlogPost.findById(id).lean());
}

export async function deleteBlogPost(id: string) {
  await BlogPost.findByIdAndDelete(id);
}

export async function getSiteContentByKey(key: string) {
  return lean(await SiteContent.findOne({ key, locale: 'en' }).lean());
}

export async function getAllSiteContent() {
  return SiteContent.find({ locale: 'en' }).lean();
}

export async function upsertSiteContent(key: string, content: unknown, updatedBy?: string) {
  return lean(
    await SiteContent.findOneAndUpdate(
      { key, locale: 'en' },
      { content, updatedBy },
      { upsert: true, new: true }
    ).lean()
  );
}

export async function listMedia(params: {
  page: number;
  limit: number;
  skip: number;
  folder?: string;
}) {
  const filter: Record<string, unknown> = {};
  if (params.folder) filter.folder = params.folder;
  const [items, total] = await Promise.all([
    MediaAsset.find(filter)
      .sort({ createdAt: -1 })
      .skip(params.skip)
      .limit(params.limit)
      .lean(),
    MediaAsset.countDocuments(filter),
  ]);
  return { items, total };
}

export async function createMediaAsset(input: Record<string, unknown>) {
  const item = await MediaAsset.create(input);
  return item.toObject();
}

export async function findMediaAssetById(id: string) {
  return lean(await MediaAsset.findById(id).lean());
}

export async function deleteMediaAsset(id: string) {
  await MediaAsset.findByIdAndDelete(id);
}

export async function createAuditLog(input: {
  userId?: string;
  action: string;
  entity: string;
  entityId?: string;
  changes?: Record<string, unknown>;
  ip?: string;
}) {
  await AuditLog.create({
    userId: input.userId,
    action: input.action,
    entity: input.entity,
    entityId: input.entityId,
    changes: input.changes,
    ip: input.ip,
  });
}

export async function listAuditLogs(params: { page: number; limit: number; skip: number }) {
  const [items, total] = await Promise.all([
    AuditLog.find()
      .sort({ createdAt: -1 })
      .skip(params.skip)
      .limit(params.limit)
      .populate('userId', 'name email')
      .lean(),
    AuditLog.countDocuments(),
  ]);
  return { items, total };
}

export async function recentAuditLogs(limit: number) {
  return AuditLog.find()
    .sort({ createdAt: -1 })
    .limit(limit)
    .populate('userId', 'name email')
    .lean();
}

/** Helper for seed script */
export { bcrypt };
