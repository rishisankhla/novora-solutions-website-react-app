export function PageLoader() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4" aria-live="polite" aria-busy="true">
      <div className="w-full max-w-2xl space-y-6 animate-pulse">
        <div className="h-3 w-24 rounded-full bg-surface-muted" />
        <div className="h-10 w-3/4 rounded-xl bg-surface-muted" />
        <div className="h-4 w-full rounded-lg bg-surface-muted/80" />
        <div className="h-4 w-5/6 rounded-lg bg-surface-muted/60" />
        <div className="grid grid-cols-3 gap-4 pt-8">
          <div className="h-32 rounded-2xl bg-surface-muted" />
          <div className="h-32 rounded-2xl bg-surface-muted" />
          <div className="h-32 rounded-2xl bg-surface-muted hidden sm:block" />
        </div>
        <p className="text-center text-sm text-ink-faint pt-4">Loading page…</p>
      </div>
    </div>
  );
}
