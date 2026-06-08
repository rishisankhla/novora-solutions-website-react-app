import type { Request, Response } from 'express';
import { repo } from '../data/index.js';
import { sendSuccess } from '../utils/response.js';
import { routeParam } from '../utils/helpers.js';
import { notifyApplicationReceived } from '../services/email/careerNotifications.js';

function checkHoneypot(honeypot?: string) {
  return honeypot && honeypot.length > 0;
}

export async function submitContact(req: Request, res: Response) {
  if (checkHoneypot(req.body.honeypot)) {
    return sendSuccess(res, { message: 'Thank you for your message' });
  }
  const { name, email, message, phone, company, subject } = req.body;
  const submission = await repo.createSubmission({
    type: 'contact',
    name,
    email,
    message,
    phone,
    company,
    subject,
    source: 'website',
  });
  return sendSuccess(res, { id: submission._id, message: 'Message received successfully' }, 201);
}

export async function submitInquiry(req: Request, res: Response) {
  if (checkHoneypot(req.body.honeypot)) {
    return sendSuccess(res, { message: 'Thank you' });
  }
  const { name, email, message, phone, company, subject } = req.body;
  const submission = await repo.createSubmission({
    type: 'inquiry',
    name,
    email,
    message,
    phone,
    company,
    subject: subject ?? 'General Inquiry',
    source: 'website',
  });
  return sendSuccess(res, { id: submission._id, message: 'Inquiry received successfully' }, 201);
}

export async function submitLead(req: Request, res: Response) {
  const { name, email, phone, company, message, source } = req.body;
  const submission = await repo.createSubmission({
    type: 'lead',
    name,
    email,
    phone,
    company,
    message,
    source: source ?? 'website',
  });
  return sendSuccess(res, { id: submission._id, message: 'Lead captured successfully' }, 201);
}

export async function submitNewsletter(req: Request, res: Response) {
  if (checkHoneypot(req.body.honeypot)) {
    return sendSuccess(res, { message: 'Subscribed successfully' });
  }
  const { email } = req.body;
  const submission = await repo.createSubmission({
    type: 'newsletter',
    email,
    source: 'newsletter',
  });
  return sendSuccess(res, { id: submission._id, message: 'Subscribed successfully' }, 201);
}

export async function submitApplication(req: Request, res: Response) {
  if (checkHoneypot(req.body.honeypot)) {
    return sendSuccess(res, { message: 'Application submitted' });
  }
  const data = req.body;
  const job = await repo.findJobByTitle(data.position);
  const application = await repo.createApplication({
    jobPositionId: job?._id ? String(job._id) : undefined,
    positionTitle: data.position,
    applicant: {
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      location: data.location,
      linkedinUrl: data.linkedinUrl,
      portfolioUrl: data.portfolioUrl,
    },
    yearsOfExperience: data.yearsOfExperience,
    coverLetter: data.coverLetter,
    resumeFileName: data.resumeFileName,
    resumeMimeType: data.resumeMimeType,
    resumeSize: data.resumeSize,
    resumeData: data.resumeData,
  });

  void notifyApplicationReceived({
    applicantName: data.fullName,
    applicantEmail: data.email,
    positionTitle: data.position,
    applicationId: String(application._id),
  }).catch((err) => console.error('[email] Application confirmation failed:', err));

  return sendSuccess(
    res,
    {
      id: application._id,
      message: 'Application submitted successfully. A confirmation email has been sent to you.',
    },
    201
  );
}

export async function getPublicJobs(_req: Request, res: Response) {
  const jobs = await repo.findOpenJobs();
  return sendSuccess(res, { jobs });
}

export async function getPublicTeam(_req: Request, res: Response) {
  const members = await repo.findPublishedTeam();
  return sendSuccess(res, { members });
}

export async function getPublicPortfolio(_req: Request, res: Response) {
  const projects = await repo.findPublishedPortfolio();
  return sendSuccess(res, { projects });
}

export async function getPublicBlog(_req: Request, res: Response) {
  const posts = await repo.findPublishedBlog();
  return sendSuccess(res, { posts });
}

export async function getPublicBlogBySlug(req: Request, res: Response) {
  const post = await repo.findBlogBySlug(routeParam(req.params.slug));
  if (!post) {
    return res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Post not found' } });
  }
  return sendSuccess(res, { post });
}

export async function getPublicSiteContent(req: Request, res: Response) {
  const doc = await repo.getSiteContentByKey(routeParam(req.params.key));
  return sendSuccess(res, { content: doc?.content ?? null });
}

export async function getAllPublicSiteContent(_req: Request, res: Response) {
  const docs = await repo.getAllSiteContent();
  const content: Record<string, unknown> = {};
  docs.forEach((d) => {
    content[d.key as string] = d.content;
  });
  return sendSuccess(res, { content });
}
