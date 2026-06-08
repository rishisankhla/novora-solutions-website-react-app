import mongoose, { Schema, Document, Model, Types } from 'mongoose';
import type { PublishStatus } from '../types/index.js';

export interface ITeamMember extends Document {
  slug: string;
  name: string;
  role: string;
  bio?: string;
  imageUrl?: string;
  linkedinUrl?: string;
  isLeadership: boolean;
  sortOrder: number;
  status: PublishStatus;
  createdAt: Date;
  updatedAt: Date;
}

const teamMemberSchema = new Schema<ITeamMember>(
  {
    slug: { type: String, required: true, unique: true, trim: true },
    name: { type: String, required: true, trim: true },
    role: { type: String, required: true, trim: true },
    bio: { type: String },
    imageUrl: { type: String },
    linkedinUrl: { type: String },
    isLeadership: { type: Boolean, default: false },
    sortOrder: { type: Number, default: 0 },
    status: { type: String, enum: ['draft', 'published'], default: 'published' },
  },
  { timestamps: true }
);

teamMemberSchema.index({ status: 1, sortOrder: 1 });

export const TeamMember: Model<ITeamMember> =
  mongoose.models.TeamMember || mongoose.model<ITeamMember>('TeamMember', teamMemberSchema);

export interface IPortfolioProject extends Document {
  slug: string;
  title: string;
  category: string;
  description: string;
  imageUrl: string;
  tags: string[];
  sortOrder: number;
  status: PublishStatus;
  createdAt: Date;
  updatedAt: Date;
}

const portfolioSchema = new Schema<IPortfolioProject>(
  {
    slug: { type: String, required: true, unique: true, trim: true },
    title: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    tags: [{ type: String }],
    sortOrder: { type: Number, default: 0 },
    status: { type: String, enum: ['draft', 'published'], default: 'published' },
  },
  { timestamps: true }
);

portfolioSchema.index({ status: 1, sortOrder: 1 });

export const PortfolioProject: Model<IPortfolioProject> =
  mongoose.models.PortfolioProject ||
  mongoose.model<IPortfolioProject>('PortfolioProject', portfolioSchema);

export interface IBlogPost extends Document {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  imageUrl: string;
  readTimeMinutes: number;
  status: 'draft' | 'published';
  publishedAt?: Date;
  seoTitle?: string;
  seoDescription?: string;
  createdAt: Date;
  updatedAt: Date;
}

const blogPostSchema = new Schema<IBlogPost>(
  {
    slug: { type: String, required: true, unique: true, trim: true },
    title: { type: String, required: true, trim: true },
    excerpt: { type: String, required: true },
    content: { type: String, default: '' },
    category: { type: String, required: true, trim: true },
    author: { type: String, required: true, trim: true },
    imageUrl: { type: String, required: true },
    readTimeMinutes: { type: Number, default: 5 },
    status: { type: String, enum: ['draft', 'published'], default: 'draft' },
    publishedAt: { type: Date },
    seoTitle: { type: String },
    seoDescription: { type: String },
  },
  { timestamps: true }
);

blogPostSchema.index({ status: 1, publishedAt: -1 });

export const BlogPost: Model<IBlogPost> =
  mongoose.models.BlogPost || mongoose.model<IBlogPost>('BlogPost', blogPostSchema);

export interface ISiteContent extends Document {
  key: string;
  locale: string;
  content: Record<string, unknown>;
  updatedBy?: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const siteContentSchema = new Schema<ISiteContent>(
  {
    key: { type: String, required: true, trim: true },
    locale: { type: String, default: 'en', trim: true },
    content: { type: Schema.Types.Mixed, required: true },
    updatedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

siteContentSchema.index({ key: 1, locale: 1 }, { unique: true });

export const SiteContent: Model<ISiteContent> =
  mongoose.models.SiteContent || mongoose.model<ISiteContent>('SiteContent', siteContentSchema);

export interface IMediaAsset extends Document {
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  url: string;
  storagePath?: string;
  folder: string;
  altText?: string;
  uploadedBy?: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const mediaAssetSchema = new Schema<IMediaAsset>(
  {
    filename: { type: String, required: true },
    originalName: { type: String, required: true },
    mimeType: { type: String, required: true },
    size: { type: Number, default: 0 },
    url: { type: String, required: true },
    storagePath: { type: String },
    folder: { type: String, default: 'general' },
    altText: { type: String },
    uploadedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

mediaAssetSchema.index({ folder: 1, createdAt: -1 });

export const MediaAsset: Model<IMediaAsset> =
  mongoose.models.MediaAsset || mongoose.model<IMediaAsset>('MediaAsset', mediaAssetSchema);

export interface IAuditLog extends Document {
  userId?: Types.ObjectId;
  action: string;
  entity: string;
  entityId?: string;
  changes?: Record<string, unknown>;
  ip?: string;
  createdAt: Date;
}

const auditLogSchema = new Schema<IAuditLog>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    action: { type: String, required: true },
    entity: { type: String, required: true },
    entityId: { type: String },
    changes: { type: Schema.Types.Mixed },
    ip: { type: String },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

auditLogSchema.index({ createdAt: -1 });
auditLogSchema.index({ entity: 1, entityId: 1 });

export const AuditLog: Model<IAuditLog> =
  mongoose.models.AuditLog || mongoose.model<IAuditLog>('AuditLog', auditLogSchema);
