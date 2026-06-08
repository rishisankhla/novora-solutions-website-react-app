import mongoose, { Schema, Document, Model, Types } from 'mongoose';
import type { JobStatus } from '../types/index.js';

export interface IJobPosition extends Document {
  slug: string;
  title: string;
  department: string;
  employmentType: string;
  description: string;
  highlights: string[];
  status: JobStatus;
  sortOrder: number;
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const jobPositionSchema = new Schema<IJobPosition>(
  {
    slug: { type: String, required: true, unique: true, trim: true },
    title: { type: String, required: true, trim: true },
    department: { type: String, required: true, trim: true },
    employmentType: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    highlights: [{ type: String }],
    status: { type: String, enum: ['open', 'closed', 'draft'], default: 'draft' },
    sortOrder: { type: Number, default: 0 },
    publishedAt: { type: Date },
  },
  { timestamps: true }
);

jobPositionSchema.index({ status: 1, sortOrder: 1 });

export const JobPosition: Model<IJobPosition> =
  mongoose.models.JobPosition || mongoose.model<IJobPosition>('JobPosition', jobPositionSchema);

export interface ICareerApplication extends Document {
  jobPositionId?: Types.ObjectId;
  positionTitle: string;
  applicant: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    linkedinUrl?: string;
    portfolioUrl?: string;
  };
  yearsOfExperience: string;
  coverLetter: string;
  resume?: {
    originalName?: string;
    mimeType?: string;
    size?: number;
    data?: string;
    storagePending?: boolean;
  };
  status: 'new' | 'reviewing' | 'shortlisted' | 'rejected' | 'hired';
  adminNotes?: string;
  reviewedBy?: Types.ObjectId;
  reviewedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const careerApplicationSchema = new Schema<ICareerApplication>(
  {
    jobPositionId: { type: Schema.Types.ObjectId, ref: 'JobPosition' },
    positionTitle: { type: String, required: true, trim: true },
    applicant: {
      fullName: { type: String, required: true, trim: true },
      email: { type: String, required: true, lowercase: true, trim: true },
      phone: { type: String, required: true, trim: true },
      location: { type: String, required: true, trim: true },
      linkedinUrl: { type: String, trim: true },
      portfolioUrl: { type: String, trim: true },
    },
    yearsOfExperience: { type: String, required: true },
    coverLetter: { type: String, required: true },
    resume: {
      originalName: String,
      mimeType: String,
      size: Number,
      data: { type: String, select: false },
      storagePending: { type: Boolean, default: true },
    },
    status: {
      type: String,
      enum: ['new', 'reviewing', 'shortlisted', 'rejected', 'hired'],
      default: 'new',
    },
    adminNotes: { type: String },
    reviewedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    reviewedAt: { type: Date },
  },
  { timestamps: true }
);

careerApplicationSchema.index({ status: 1, createdAt: -1 });
careerApplicationSchema.index({ 'applicant.email': 1 });
careerApplicationSchema.index({ positionTitle: 'text', 'applicant.fullName': 'text', 'applicant.email': 'text' });

export const CareerApplication: Model<ICareerApplication> =
  mongoose.models.CareerApplication ||
  mongoose.model<ICareerApplication>('CareerApplication', careerApplicationSchema);
