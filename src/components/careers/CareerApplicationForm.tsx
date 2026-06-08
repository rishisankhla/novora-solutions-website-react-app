import { FormEvent, useEffect, useRef, useState } from 'react';
import { Upload, Loader2, CheckCircle2, AlertCircle, FileText, X } from 'lucide-react';
import toast from 'react-hot-toast';
import { FormField, FormInput, FormSelect, FormTextarea } from '../ui/FormField';
import { publicApi } from '../../lib/api';
import { fileToBase64 } from '../../lib/fileUtils';
import {
  type CareerFormValues,
  type CareerFormErrors,
  validateCareerForm,
  validateResumeFile,
  hasFormErrors,
  ALLOWED_RESUME_EXTENSIONS,
  MAX_RESUME_SIZE_BYTES,
} from '../../lib/validation/careerForm';

const INITIAL_VALUES: CareerFormValues = {
  fullName: '',
  email: '',
  phone: '',
  location: '',
  linkedinUrl: '',
  portfolioUrl: '',
  position: '',
  yearsOfExperience: '',
  coverLetter: '',
};

async function submitCareerApplication(values: CareerFormValues, resume: File) {
  const resumeData = await fileToBase64(resume);
  await publicApi.submitApplication({
    fullName: values.fullName,
    email: values.email.trim(),
    phone: values.phone.trim(),
    location: values.location.trim(),
    linkedinUrl: values.linkedinUrl.trim(),
    portfolioUrl: values.portfolioUrl.trim(),
    position: values.position,
    yearsOfExperience: values.yearsOfExperience,
    coverLetter: values.coverLetter.trim(),
    resumeFileName: resume.name,
    resumeMimeType: resume.type,
    resumeSize: resume.size,
    resumeData,
    honeypot: '',
  });
}

interface CareerApplicationFormProps {
  selectedPosition: string;
  positionOptions: string[];
}

export function CareerApplicationForm({ selectedPosition, positionOptions }: CareerApplicationFormProps) {
  const [values, setValues] = useState<CareerFormValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<CareerFormErrors>({});
  const [resume, setResume] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');
  const formOpenedAt = useRef(Date.now());
  const fileInputRef = useRef<HTMLInputElement>(null);
  const honeypotRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (selectedPosition) {
      setValues((prev) => ({ ...prev, position: selectedPosition }));
      setErrors((prev) => ({ ...prev, position: undefined }));
    }
  }, [selectedPosition]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
    setSubmitStatus('idle');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setResume(file);
    setErrors((prev) => ({ ...prev, resume: file ? validateResumeFile(file) : undefined }));
    setSubmitStatus('idle');
  };

  const clearResume = () => {
    setResume(null);
    setErrors((prev) => ({ ...prev, resume: undefined }));
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (honeypotRef.current?.value) return;

    const elapsed = Date.now() - formOpenedAt.current;
    if (elapsed < 3000) {
      toast.error('Please take a moment to complete the form.');
      return;
    }

    const validationErrors = validateCareerForm(values, resume);
    setErrors(validationErrors);

    if (hasFormErrors(validationErrors)) {
      toast.error('Please fix the errors below before submitting.');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      await submitCareerApplication(values, resume!);

      toast.success('Application submitted successfully!', { id: 'career-submit' });
      setSubmitStatus('success');
      setStatusMessage(
        'Your application has been submitted successfully. A confirmation email has been sent to your inbox. Our team will review it and notify you of any updates.'
      );
      setValues(INITIAL_VALUES);
      setResume(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
      formOpenedAt.current = Date.now();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Something went wrong. Please try again.';
      setSubmitStatus('error');
      setStatusMessage(message);
      toast.error(message, { id: 'career-submit' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <section
      id="apply"
      className="py-16 sm:py-20 bg-surface-soft scroll-mt-24"
      aria-labelledby="application-form-heading"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <p className="eyebrow mb-3">Apply</p>
          <h2 id="application-form-heading" className="text-3xl sm:text-4xl font-bold text-ink mb-4 tracking-tight">
            Submit your application
          </h2>
          <p className="text-lg text-ink-muted">
            Complete the form below and attach your resume. We review every application carefully.
          </p>
        </div>

        {submitStatus === 'success' && (
          <div
            className="mb-8 p-4 rounded-xl bg-green-50 border border-green-200 flex items-start gap-3"
            role="status"
            aria-live="polite"
          >
            <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
            <p className="text-green-800 text-sm">{statusMessage}</p>
          </div>
        )}

        {submitStatus === 'error' && (
          <div
            className="mb-8 p-4 rounded-xl bg-red-50 border border-red-200 flex items-start gap-3"
            role="alert"
            aria-live="assertive"
          >
            <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
            <p className="text-red-800 text-sm">{statusMessage}</p>
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          noValidate
          className="space-y-6 card-premium p-6 sm:p-8"
          aria-busy={isSubmitting}
        >
          {/* Honeypot — hidden from users and screen readers */}
          <div aria-hidden="true" className="absolute opacity-0 h-0 w-0 overflow-hidden pointer-events-none">
            <label htmlFor="botcheck">Leave blank</label>
            <input ref={honeypotRef} type="text" id="botcheck" name="botcheck" tabIndex={-1} autoComplete="off" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <FormField id="fullName" label="Full Name" required error={errors.fullName}>
              <FormInput
                id="fullName"
                name="fullName"
                type="text"
                value={values.fullName}
                onChange={handleChange}
                error={!!errors.fullName}
                aria-describedby={errors.fullName ? 'fullName-error' : undefined}
                autoComplete="name"
                required
                placeholder="John Doe"
              />
            </FormField>

            <FormField id="email" label="Email" required error={errors.email}>
              <FormInput
                id="email"
                name="email"
                type="email"
                value={values.email}
                onChange={handleChange}
                error={!!errors.email}
                autoComplete="email"
                required
                placeholder="john@example.com"
              />
            </FormField>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <FormField id="phone" label="Phone Number" required error={errors.phone}>
              <FormInput
                id="phone"
                name="phone"
                type="tel"
                value={values.phone}
                onChange={handleChange}
                error={!!errors.phone}
                autoComplete="tel"
                required
                placeholder="+1 (555) 000-0000"
              />
            </FormField>

            <FormField id="location" label="Location" required error={errors.location}>
              <FormInput
                id="location"
                name="location"
                type="text"
                value={values.location}
                onChange={handleChange}
                error={!!errors.location}
                autoComplete="address-level2"
                required
                placeholder="City, Country"
              />
            </FormField>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <FormField id="linkedinUrl" label="LinkedIn URL" error={errors.linkedinUrl}>
              <FormInput
                id="linkedinUrl"
                name="linkedinUrl"
                type="url"
                value={values.linkedinUrl}
                onChange={handleChange}
                error={!!errors.linkedinUrl}
                placeholder="https://linkedin.com/in/yourprofile"
              />
            </FormField>

            <FormField
              id="portfolioUrl"
              label="Portfolio / GitHub URL"
              error={errors.portfolioUrl}
            >
              <FormInput
                id="portfolioUrl"
                name="portfolioUrl"
                type="url"
                value={values.portfolioUrl}
                onChange={handleChange}
                error={!!errors.portfolioUrl}
                placeholder="https://github.com/yourusername"
              />
            </FormField>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <FormField id="position" label="Position Applying For" required error={errors.position}>
              <FormSelect
                id="position"
                name="position"
                value={values.position}
                onChange={handleChange}
                error={!!errors.position}
                required
              >
                <option value="">Select a position</option>
                {positionOptions.map((title) => (
                  <option key={title} value={title}>
                    {title}
                  </option>
                ))}
              </FormSelect>
            </FormField>

            <FormField
              id="yearsOfExperience"
              label="Years of Experience"
              required
              error={errors.yearsOfExperience}
            >
              <FormInput
                id="yearsOfExperience"
                name="yearsOfExperience"
                type="number"
                min={0}
                max={50}
                step={1}
                value={values.yearsOfExperience}
                onChange={handleChange}
                error={!!errors.yearsOfExperience}
                required
                placeholder="e.g. 3"
              />
            </FormField>
          </div>

          <div className="border-t border-gray-100 pt-6 space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Cover Letter</h3>
              <p className="text-sm text-gray-500 mt-1">
                Text only — write your cover letter in the field below (no file upload).
              </p>
            </div>
            <FormField
              id="coverLetter"
              label="Your cover letter"
              required
              error={errors.coverLetter}
              hint="Minimum 50 characters. Share your experience, motivation, and why you're a fit for this role."
            >
              <FormTextarea
                id="coverLetter"
                name="coverLetter"
                value={values.coverLetter}
                onChange={handleChange}
                error={!!errors.coverLetter}
                rows={8}
                required
                placeholder={'Dear Novora Solutions team,\n\nI am excited to apply for this role because...'}
              />
            </FormField>
          </div>

          <FormField
            id="resume"
            label="Resume Upload"
            required
            error={errors.resume}
            hint={`PDF, DOC, or DOCX up to ${MAX_RESUME_SIZE_BYTES / (1024 * 1024)} MB.`}
          >
            <div
              className={`relative border-2 border-dashed rounded-xl p-6 transition-colors ${
                errors.resume
                  ? 'border-red-300 bg-red-50/30'
                  : resume
                    ? 'border-blue-300 bg-blue-50/30'
                    : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50/50'
              }`}
            >
              <input
                ref={fileInputRef}
                id="resume"
                name="resume"
                type="file"
                accept={ALLOWED_RESUME_EXTENSIONS.join(',')}
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                aria-describedby="resume-hint"
                required={!resume}
              />

              {resume ? (
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="p-2 bg-blue-100 rounded-lg flex-shrink-0">
                      <FileText className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{resume.name}</p>
                      <p className="text-xs text-gray-500">{formatFileSize(resume.size)}</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={(ev) => {
                      ev.stopPropagation();
                      clearResume();
                    }}
                    className="p-1.5 rounded-lg hover:bg-gray-200 transition-colors flex-shrink-0"
                    aria-label="Remove resume"
                  >
                    <X className="h-4 w-4 text-gray-600" />
                  </button>
                </div>
              ) : (
                <div className="text-center pointer-events-none">
                  <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-700">
                    Drag & drop your resume, or click to browse
                  </p>
                  <p id="resume-hint" className="text-xs text-gray-500 mt-1">
                    PDF, DOC, DOCX up to 5 MB
                  </p>
                </div>
              )}
            </div>
          </FormField>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-2 bg-ink text-white px-6 py-3.5 rounded-xl font-semibold hover:bg-brand-700 shadow-soft hover:shadow-elevated transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" aria-hidden />
                Submitting Application...
              </>
            ) : (
              'Submit Application'
            )}
          </button>
        </form>
      </div>
    </section>
  );
}
