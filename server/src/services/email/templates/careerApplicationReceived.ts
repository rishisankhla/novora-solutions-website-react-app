import { emailLayout, detailRow } from '../layout.js';

export interface ApplicationReceivedTemplateData {
  applicantName: string;
  positionTitle: string;
  applicationId: string;
  submittedAt: string;
}

export function applicationReceivedSubject(positionTitle: string): string {
  return `Application received — ${positionTitle} | Novora Solutions`;
}

export function applicationReceivedHtml(data: ApplicationReceivedTemplateData): string {
  const content = `
    <h1 style="margin:0 0 12px;font-size:22px;font-weight:700;color:#0f172a;">We received your application</h1>
    <p style="margin:0 0 24px;font-size:15px;line-height:1.6;color:#475569;">
      Hi ${escapeHtml(data.applicantName)}, thank you for applying to Novora Solutions.
      Your application has been submitted successfully and our hiring team will review it shortly.
    </p>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f8fafc;border-radius:12px;padding:16px 20px;margin-bottom:24px;">
      ${detailRow('Position', escapeHtml(data.positionTitle))}
      ${detailRow('Reference', escapeHtml(data.applicationId.slice(0, 8).toUpperCase()))}
      ${detailRow('Submitted', escapeHtml(data.submittedAt))}
    </table>
    <p style="margin:0 0 16px;font-size:14px;line-height:1.6;color:#475569;">
      <strong>What happens next?</strong><br />
      Our team typically reviews applications within 5–7 business days.
      If your profile is a match, we'll email you with updates — including if you're shortlisted,
      invited to interview, or if we've moved forward with other candidates.
    </p>
    <p style="margin:0;font-size:14px;line-height:1.6;color:#475569;">
      We appreciate your interest in joining Novora Solutions.
    </p>`;

  return emailLayout(
    content,
    `Your application for ${data.positionTitle} was received successfully.`
  );
}

export function applicationReceivedText(data: ApplicationReceivedTemplateData): string {
  return `Hi ${data.applicantName},

We received your application for ${data.positionTitle}.

Reference: ${data.applicationId.slice(0, 8).toUpperCase()}
Submitted: ${data.submittedAt}

Our hiring team will review your application and contact you if there's a match.

Thank you,
Novora Solutions Careers`;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
