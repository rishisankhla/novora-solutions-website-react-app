import { emailLayout, detailRow } from '../layout.js';

export type CareerNotifyStatus = 'reviewing' | 'shortlisted' | 'rejected' | 'hired';

const STATUS_COPY: Record<
  CareerNotifyStatus,
  { headline: string; message: string; accent: string; preheader: string }
> = {
  reviewing: {
    headline: 'Your application is under review',
    message:
      'Our hiring team is currently reviewing your application. We appreciate your patience and will keep you updated on the next steps.',
    accent: '#2563eb',
    preheader: 'Your application is being reviewed by our team.',
  },
  shortlisted: {
    headline: "You've been shortlisted",
    message:
      "Great news — you've been shortlisted for the next stage of our hiring process. A member of our team may reach out shortly with interview details or follow-up questions.",
    accent: '#059669',
    preheader: "Congratulations — you've been shortlisted.",
  },
  rejected: {
    headline: 'Update on your application',
    message:
      "Thank you for your interest in Novora Solutions and for the time you invested in your application. After careful consideration, we've decided to move forward with other candidates for this role. We encourage you to apply for future openings that match your skills.",
    accent: '#64748b',
    preheader: 'An update on your job application.',
  },
  hired: {
    headline: 'Welcome to Novora Solutions',
    message:
      "We're delighted to let you know that your application has been approved. Our team will contact you shortly with offer details and onboarding information. Congratulations!",
    accent: '#7c3aed',
    preheader: 'Congratulations — your application has been approved.',
  },
};

export interface StatusUpdateTemplateData {
  applicantName: string;
  positionTitle: string;
  status: CareerNotifyStatus;
  adminNotes?: string;
}

export function statusUpdateSubject(status: CareerNotifyStatus, positionTitle: string): string {
  const labels: Record<CareerNotifyStatus, string> = {
    reviewing: 'Under review',
    shortlisted: 'Shortlisted',
    rejected: 'Application update',
    hired: 'Application approved',
  };
  return `${labels[status]} — ${positionTitle} | Novora Solutions`;
}

export function statusUpdateHtml(data: StatusUpdateTemplateData): string {
  const copy = STATUS_COPY[data.status];
  const notesBlock = data.adminNotes?.trim()
    ? `<div style="margin-top:20px;padding:16px;background:#fffbeb;border-left:4px solid #f59e0b;border-radius:8px;">
        <p style="margin:0 0 6px;font-size:12px;font-weight:600;color:#92400e;text-transform:uppercase;letter-spacing:0.05em;">Note from our team</p>
        <p style="margin:0;font-size:14px;line-height:1.6;color:#78350f;">${escapeHtml(data.adminNotes.trim())}</p>
      </div>`
    : '';

  const content = `
    <div style="display:inline-block;padding:6px 12px;border-radius:999px;background:${copy.accent}15;color:${copy.accent};font-size:12px;font-weight:600;margin-bottom:16px;text-transform:uppercase;letter-spacing:0.04em;">
      ${escapeHtml(data.status)}
    </div>
    <h1 style="margin:0 0 12px;font-size:22px;font-weight:700;color:#0f172a;">${copy.headline}</h1>
    <p style="margin:0 0 24px;font-size:15px;line-height:1.6;color:#475569;">
      Hi ${escapeHtml(data.applicantName)}, ${copy.message}
    </p>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f8fafc;border-radius:12px;padding:16px 20px;">
      ${detailRow('Position', escapeHtml(data.positionTitle))}
      ${detailRow('Status', escapeHtml(formatStatusLabel(data.status)))}
    </table>
    ${notesBlock}
    <p style="margin:24px 0 0;font-size:14px;line-height:1.6;color:#475569;">
      Questions? Reach us at <a href="mailto:careers@novorasolutions.com" style="color:#2563eb;">careers@novorasolutions.com</a>.
    </p>`;

  return emailLayout(content, copy.preheader);
}

export function statusUpdateText(data: StatusUpdateTemplateData): string {
  const copy = STATUS_COPY[data.status];
  let text = `Hi ${data.applicantName},

${copy.headline}

Position: ${data.positionTitle}
Status: ${formatStatusLabel(data.status)}

${copy.message}`;

  if (data.adminNotes?.trim()) {
    text += `\n\nNote from our team:\n${data.adminNotes.trim()}`;
  }

  text += '\n\nNovora Solutions Careers';
  return text;
}

export function isNotifiableStatus(status: string): status is CareerNotifyStatus {
  return ['reviewing', 'shortlisted', 'rejected', 'hired'].includes(status);
}

function formatStatusLabel(status: CareerNotifyStatus): string {
  const labels: Record<CareerNotifyStatus, string> = {
    reviewing: 'Under Review',
    shortlisted: 'Shortlisted',
    rejected: 'Not Selected',
    hired: 'Approved / Offer',
  };
  return labels[status];
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
