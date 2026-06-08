import nodemailer, { type Transporter } from 'nodemailer';
import { env, isEmailConfigured } from '../../config/env.js';

let transporter: Transporter | null = null;

function getTransporter(): Transporter {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: env.smtpHost,
      port: env.smtpPort,
      secure: env.smtpSecure,
      auth: {
        user: env.smtpUser,
        pass: env.smtpPass,
      },
    });
  }
  return transporter;
}

export async function sendEmail(params: {
  to: string;
  subject: string;
  html: string;
  text: string;
}): Promise<void> {
  if (!isEmailConfigured()) {
    console.info('[email] Skipped (not configured):', params.subject, '→', params.to);
    return;
  }

  await getTransporter().sendMail({
    from: env.smtpFrom,
    replyTo: env.careersReplyTo,
    to: params.to,
    subject: params.subject,
    html: params.html,
    text: params.text,
  });

  console.info('[email] Sent:', params.subject, '→', params.to);
}
