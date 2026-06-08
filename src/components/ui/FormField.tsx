import { InputHTMLAttributes, ReactNode, TextareaHTMLAttributes } from 'react';

const inputClassName =
  'w-full px-4 py-3 border border-surface-border rounded-xl bg-white text-ink transition-all focus:ring-2 focus:ring-brand-500/30 focus:border-brand-400 hover:border-ink-faint/50 placeholder:text-ink-faint';

interface FormFieldProps {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: ReactNode;
}

export function FormField({ id, label, required, error, hint, children }: FormFieldProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-ink mb-1.5">
        {label}
        {required && (
          <span className="text-red-500 ml-0.5" aria-hidden>
            *
          </span>
        )}
      </label>
      {children}
      {hint && !error && (
        <p id={`${id}-hint`} className="mt-1.5 text-xs text-ink-subtle">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export function FormInput({ error, className = '', ...props }: FormInputProps) {
  return (
    <input
      className={`${inputClassName} ${error ? 'border-red-400' : ''} ${className}`}
      aria-invalid={error ? true : undefined}
      {...props}
    />
  );
}

interface FormTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

export function FormTextarea({ error, className = '', ...props }: FormTextareaProps) {
  return (
    <textarea
      className={`${inputClassName} resize-none ${error ? 'border-red-400' : ''} ${className}`}
      aria-invalid={error ? true : undefined}
      {...props}
    />
  );
}

interface FormSelectProps extends InputHTMLAttributes<HTMLSelectElement> {
  error?: boolean;
  children: ReactNode;
}

export function FormSelect({ error, className = '', children, ...props }: FormSelectProps) {
  return (
    <select
      className={`${inputClassName} bg-white ${error ? 'border-red-400' : ''} ${className}`}
      aria-invalid={error ? true : undefined}
      {...props}
    >
      {children}
    </select>
  );
}
