import { sendEmail } from './mailer.js';
import {
  applicationReceivedHtml,
  applicationReceivedSubject,
  applicationReceivedText,
} from './templates/careerApplicationReceived.js';
import {
  isNotifiableStatus,
  statusUpdateHtml,
  statusUpdateSubject,
  statusUpdateText,
} from './templates/careerStatusUpdate.js';

export async function notifyApplicationReceived(params: {
  applicantName: string;
  applicantEmail: string;
  positionTitle: string;
  applicationId: string;
}): Promise<void> {
  const submittedAt = new Date().toLocaleString('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });

  await sendEmail({
    to: params.applicantEmail,
    subject: applicationReceivedSubject(params.positionTitle),
    html: applicationReceivedHtml({
      applicantName: params.applicantName,
      positionTitle: params.positionTitle,
      applicationId: params.applicationId,
      submittedAt,
    }),
    text: applicationReceivedText({
      applicantName: params.applicantName,
      positionTitle: params.positionTitle,
      applicationId: params.applicationId,
      submittedAt,
    }),
  });
}

export async function notifyApplicationStatusChange(params: {
  applicantName: string;
  applicantEmail: string;
  positionTitle: string;
  previousStatus: string;
  newStatus: string;
  adminNotes?: string;
}): Promise<void> {
  if (params.previousStatus === params.newStatus) return;
  if (!isNotifiableStatus(params.newStatus)) return;

  await sendEmail({
    to: params.applicantEmail,
    subject: statusUpdateSubject(params.newStatus, params.positionTitle),
    html: statusUpdateHtml({
      applicantName: params.applicantName,
      positionTitle: params.positionTitle,
      status: params.newStatus,
      adminNotes: params.adminNotes,
    }),
    text: statusUpdateText({
      applicantName: params.applicantName,
      positionTitle: params.positionTitle,
      status: params.newStatus,
      adminNotes: params.adminNotes,
    }),
  });
}
