export interface CareerFormValues {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedinUrl: string;
  portfolioUrl: string;
  position: string;
  yearsOfExperience: string;
  coverLetter: string;
}

export interface CareerFormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  location?: string;
  linkedinUrl?: string;
  portfolioUrl?: string;
  position?: string;
  yearsOfExperience?: string;
  coverLetter?: string;
  resume?: string;
}

export const ALLOWED_RESUME_MIME_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
] as const;

export const ALLOWED_RESUME_EXTENSIONS = ['.pdf', '.doc', '.docx'] as const;

export const MAX_RESUME_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB (Web3Forms limit)

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[+]?[\d\s().-]{7,20}$/;

function isValidUrl(value: string): boolean {
  try {
    const url = new URL(value.startsWith('http') ? value : `https://${value}`);
    return Boolean(url.hostname);
  } catch {
    return false;
  }
}

export function validateResumeFile(file: File | null): string | undefined {
  if (!file) return 'Resume is required.';
  if (file.size > MAX_RESUME_SIZE_BYTES) {
    return 'Resume must be 5 MB or smaller.';
  }

  const extension = file.name.slice(file.name.lastIndexOf('.')).toLowerCase();
  const mimeValid = ALLOWED_RESUME_MIME_TYPES.includes(
    file.type as (typeof ALLOWED_RESUME_MIME_TYPES)[number]
  );
  const extValid = ALLOWED_RESUME_EXTENSIONS.includes(
    extension as (typeof ALLOWED_RESUME_EXTENSIONS)[number]
  );

  if (!mimeValid && !extValid) {
    return 'Resume must be a PDF, DOC, or DOCX file.';
  }

  return undefined;
}

export function validateCareerForm(
  values: CareerFormValues,
  resume: File | null
): CareerFormErrors {
  const errors: CareerFormErrors = {};

  if (!values.fullName.trim()) {
    errors.fullName = 'Full name is required.';
  } else if (values.fullName.trim().length < 2) {
    errors.fullName = 'Please enter your full name.';
  }

  if (!values.email.trim()) {
    errors.email = 'Email is required.';
  } else if (!EMAIL_REGEX.test(values.email.trim())) {
    errors.email = 'Please enter a valid email address.';
  }

  if (!values.phone.trim()) {
    errors.phone = 'Phone number is required.';
  } else if (!PHONE_REGEX.test(values.phone.trim())) {
    errors.phone = 'Please enter a valid phone number.';
  }

  if (!values.location.trim()) {
    errors.location = 'Location is required.';
  }

  if (values.linkedinUrl.trim() && !isValidUrl(values.linkedinUrl.trim())) {
    errors.linkedinUrl = 'Please enter a valid LinkedIn URL.';
  }

  if (values.portfolioUrl.trim() && !isValidUrl(values.portfolioUrl.trim())) {
    errors.portfolioUrl = 'Please enter a valid portfolio or GitHub URL.';
  }

  if (!values.position) {
    errors.position = 'Please select a position.';
  }

  if (!values.yearsOfExperience.trim()) {
    errors.yearsOfExperience = 'Years of experience is required.';
  } else {
    const years = Number(values.yearsOfExperience);
    if (Number.isNaN(years) || years < 0 || years > 50) {
      errors.yearsOfExperience = 'Enter a value between 0 and 50.';
    }
  }

  if (!values.coverLetter.trim()) {
    errors.coverLetter = 'Cover letter is required.';
  } else if (values.coverLetter.trim().length < 50) {
    errors.coverLetter = 'Cover letter must be at least 50 characters.';
  }

  const resumeError = validateResumeFile(resume);
  if (resumeError) errors.resume = resumeError;

  return errors;
}

export function hasFormErrors(errors: CareerFormErrors): boolean {
  return Object.keys(errors).length > 0;
}
