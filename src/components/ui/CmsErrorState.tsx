import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from './Button';

interface CmsErrorStateProps {
  title?: string;
  message?: string;
  className?: string;
}

export function CmsErrorState({
  title = 'Content unavailable',
  message = 'Cannot reach the API server. Start the backend with npm run dev:all (or npm run dev in novora-solutions-website-backend), then refresh.',
  className = '',
}: CmsErrorStateProps) {
  return (
    <div
      className={`rounded-2xl border border-amber-200 bg-amber-50/80 px-6 py-8 text-center max-w-lg mx-auto ${className}`}
      role="alert"
    >
      <AlertCircle className="h-8 w-8 text-amber-600 mx-auto mb-3" aria-hidden />
      <p className="text-base font-semibold text-ink mb-2">{title}</p>
      <p className="text-sm text-ink-muted leading-relaxed mb-5">{message}</p>
      <Button
        type="button"
        variant="secondary"
        size="sm"
        onClick={() => window.location.reload()}
      >
        <RefreshCw className="h-4 w-4" aria-hidden />
        Retry
      </Button>
    </div>
  );
}
