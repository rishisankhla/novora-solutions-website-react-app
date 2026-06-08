import mongoose, { Schema, Document, Model } from 'mongoose';
import type { SubmissionType, SubmissionStatus } from '../types/index.js';

export interface ISubmission extends Document {
  type: SubmissionType;
  status: SubmissionStatus;
  name?: string;
  email: string;
  phone?: string;
  company?: string;
  subject?: string;
  message?: string;
  source?: string;
  metadata?: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
}

const submissionSchema = new Schema<ISubmission>(
  {
    type: {
      type: String,
      enum: ['contact', 'lead', 'inquiry', 'newsletter'],
      required: true,
    },
    status: { type: String, enum: ['new', 'read', 'archived'], default: 'new' },
    name: { type: String, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String, trim: true },
    company: { type: String, trim: true },
    subject: { type: String, trim: true },
    message: { type: String, trim: true },
    source: { type: String, trim: true },
    metadata: { type: Schema.Types.Mixed },
  },
  { timestamps: true }
);

submissionSchema.index({ type: 1, status: 1, createdAt: -1 });
submissionSchema.index({ email: 1 });

export const Submission: Model<ISubmission> =
  mongoose.models.Submission || mongoose.model<ISubmission>('Submission', submissionSchema);
