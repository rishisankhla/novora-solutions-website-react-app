import type { ReactNode } from 'react';

/** Figma-canvas dot grid */
function DotGrid({ className = '' }: { className?: string }) {
  return (
    <div
      className={`absolute inset-0 opacity-[0.35] ${className}`}
      style={{
        backgroundImage: 'radial-gradient(circle, #94a3b8 1px, transparent 1px)',
        backgroundSize: '14px 14px',
      }}
      aria-hidden
    />
  );
}

function PreviewShell({
  children,
  accent = 'from-brand-500/15 via-indigo-500/10 to-transparent',
  className = '',
}: {
  children: ReactNode;
  accent?: string;
  className?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-xl border border-surface-border/80 bg-gradient-to-br ${accent} ${className}`}
    >
      <DotGrid />
      <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-white/20 pointer-events-none" />
      <div className="relative p-3 sm:p-4">{children}</div>
    </div>
  );
}

export function WebAppPreview({ large = false }: { large?: boolean }) {
  return (
    <PreviewShell
      accent="from-brand-400/20 via-violet-400/10 to-sky-400/5"
      className={large ? 'min-h-[200px] sm:min-h-[240px]' : 'min-h-[120px]'}
    >
      <div className="rounded-lg border border-white/60 bg-white/90 shadow-soft backdrop-blur-sm overflow-hidden">
        <div className="flex items-center gap-1.5 px-2.5 py-2 border-b border-surface-border/60 bg-surface-soft/80">
          <span className="w-2 h-2 rounded-full bg-red-400/90" />
          <span className="w-2 h-2 rounded-full bg-amber-400/90" />
          <span className="w-2 h-2 rounded-full bg-emerald-400/90" />
          <div className="flex-1 mx-2 h-4 rounded-md bg-surface-muted/80 max-w-[55%]" />
        </div>
        <div className={`grid gap-2 p-2.5 ${large ? 'grid-cols-5' : 'grid-cols-3'}`}>
          <div className={`space-y-1.5 ${large ? 'col-span-2' : 'col-span-1'}`}>
            {[72, 56, 48, 40].map((w, i) => (
              <div
                key={i}
                className={`h-2 rounded-full bg-brand-100 ${i === 0 ? 'bg-brand-500/30 w-full' : ''}`}
                style={{ width: i === 0 ? '100%' : `${w}%` }}
              />
            ))}
          </div>
          <div className={`${large ? 'col-span-3' : 'col-span-2'} space-y-2`}>
            <div className="grid grid-cols-3 gap-1.5">
              {['98%', '2.4k', '12ms'].map((val, i) => (
                <div key={i} className="rounded-md bg-surface-soft border border-surface-border/50 p-1.5">
                  <div className="text-[8px] text-ink-faint font-medium">Metric</div>
                  <div className="text-[10px] font-bold text-ink">{val}</div>
                </div>
              ))}
            </div>
            <div className="flex items-end gap-1 h-10 px-1">
              {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-sm bg-gradient-to-t from-brand-600 to-brand-400 opacity-90"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      {large && (
        <div className="absolute bottom-3 right-3 rounded-lg border border-brand-200/60 bg-white/95 shadow-elevated px-2.5 py-1.5 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] font-semibold text-ink">Live dashboard</span>
        </div>
      )}
    </PreviewShell>
  );
}

export function AiPreview() {
  return (
    <PreviewShell accent="from-violet-400/25 via-fuchsia-400/10 to-brand-400/5" className="min-h-[120px]">
      <div className="flex gap-2">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 shadow-glow shrink-0 flex items-center justify-center">
          <div className="w-3 h-3 rounded-full bg-white/90" />
        </div>
        <div className="flex-1 space-y-1.5">
          <div className="rounded-2xl rounded-tl-sm bg-white/95 border border-surface-border/60 px-2.5 py-1.5 shadow-sm max-w-[90%]">
            <div className="h-1.5 w-full rounded bg-surface-muted mb-1" />
            <div className="h-1.5 w-3/4 rounded bg-surface-muted/70" />
          </div>
          <div className="rounded-2xl rounded-tr-sm bg-brand-600/90 px-2.5 py-1.5 ml-auto max-w-[75%] shadow-sm">
            <div className="h-1.5 w-full rounded bg-white/40" />
          </div>
        </div>
      </div>
      <div className="mt-2 flex flex-wrap gap-1">
        {['RAG', 'Agents'].map((t) => (
          <span key={t} className="text-[9px] font-medium px-1.5 py-0.5 rounded-md bg-white/80 border border-violet-200/60 text-violet-700">
            {t}
          </span>
        ))}
      </div>
    </PreviewShell>
  );
}

export function MobilePreview() {
  return (
    <PreviewShell accent="from-sky-400/20 via-brand-400/10 to-transparent" className="min-h-[120px]">
      <div className="flex justify-center">
        <div className="w-[72px] rounded-[14px] border-2 border-ink/10 bg-ink p-[3px] shadow-elevated">
          <div className="rounded-[10px] bg-white overflow-hidden">
            <div className="h-2 bg-surface-soft flex justify-center items-end pb-0.5">
              <div className="w-8 h-1 rounded-full bg-ink/10" />
            </div>
            <div className="p-1.5 space-y-1">
              <div className="h-6 rounded-md bg-gradient-to-r from-brand-500 to-indigo-500" />
              <div className="grid grid-cols-2 gap-1">
                <div className="h-8 rounded-md bg-surface-muted" />
                <div className="h-8 rounded-md bg-surface-muted" />
              </div>
              <div className="flex gap-1">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex-1 h-1.5 rounded-full bg-brand-200" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PreviewShell>
  );
}

export function MvpPreview() {
  return (
    <PreviewShell accent="from-amber-400/15 via-orange-400/10 to-brand-400/5" className="min-h-[100px]">
      <div className="flex items-center gap-2 mb-2">
        {['Discover', 'Build', 'Launch'].map((step, i) => (
          <div key={step} className="flex items-center gap-2 flex-1 min-w-0">
            <div
              className={`w-5 h-5 rounded-full flex items-center justify-center text-[8px] font-bold shrink-0 ${
                i < 2 ? 'bg-brand-600 text-white' : 'bg-white border border-brand-300 text-brand-600'
              }`}
            >
              {i + 1}
            </div>
            <span className="text-[9px] font-semibold text-ink truncate hidden sm:inline">{step}</span>
            {i < 2 && <div className="flex-1 h-px bg-brand-300/60" />}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-1.5">
        {['Backlog', 'In dev', 'Shipped'].map((col, ci) => (
          <div key={col} className="rounded-md bg-white/80 border border-surface-border/50 p-1.5">
            <div className="text-[8px] font-semibold text-ink-faint mb-1">{col}</div>
            <div className={`h-4 rounded ${ci === 2 ? 'bg-emerald-400/30 border border-emerald-300/50' : 'bg-surface-muted'}`} />
          </div>
        ))}
      </div>
    </PreviewShell>
  );
}

export function FullStackPreview() {
  return (
    <PreviewShell accent="from-emerald-400/15 via-brand-400/10 to-indigo-400/5" className="min-h-[120px]">
      <div className="space-y-1.5">
        {[
          { label: 'UI Layer', color: 'from-brand-500/80 to-indigo-500/80', w: '100%' },
          { label: 'API', color: 'from-violet-500/70 to-purple-500/70', w: '88%' },
          { label: 'Data', color: 'from-emerald-500/70 to-teal-500/70', w: '76%' },
        ].map((layer, i) => (
          <div key={layer.label} className="flex items-center gap-2" style={{ paddingLeft: i * 6 }}>
            <div
              className={`h-7 rounded-lg bg-gradient-to-r ${layer.color} shadow-sm flex items-center px-2`}
              style={{ width: layer.w }}
            >
              <span className="text-[8px] font-bold text-white/95">{layer.label}</span>
            </div>
          </div>
        ))}
      </div>
    </PreviewShell>
  );
}

export function CloudPreview() {
  return (
    <PreviewShell accent="from-cyan-400/20 via-brand-400/10 to-indigo-400/5" className="min-h-[120px]">
      <div className="flex items-center justify-between gap-1">
        {['Build', 'Test', 'Deploy'].map((node, i) => (
          <div key={node} className="flex flex-col items-center flex-1">
            <div
              className={`w-8 h-8 rounded-lg border flex items-center justify-center text-[7px] font-bold ${
                i === 2
                  ? 'bg-brand-600 text-white border-brand-700 shadow-glow'
                  : 'bg-white/90 text-ink-muted border-surface-border'
              }`}
            >
              {node}
            </div>
            {i < 2 && (
              <div className="absolute" style={{ display: 'none' }} />
            )}
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center gap-0 mt-1 mb-2">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-brand-300 to-brand-400" />
        <div className="w-1.5 h-1.5 rounded-full bg-brand-500" />
        <div className="h-px flex-1 bg-gradient-to-r from-brand-400 via-brand-300 to-transparent" />
      </div>
      <div className="grid grid-cols-4 gap-1">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="h-5 rounded bg-white/70 border border-surface-border/40 flex items-center justify-center"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/80" />
          </div>
        ))}
      </div>
    </PreviewShell>
  );
}

export type CapabilityPreviewKey =
  | 'web'
  | 'ai'
  | 'mobile'
  | 'mvp'
  | 'fullstack'
  | 'cloud';

export function CapabilityPreview({
  type,
  large = false,
}: {
  type: CapabilityPreviewKey;
  large?: boolean;
}) {
  switch (type) {
    case 'web':
      return <WebAppPreview large={large} />;
    case 'ai':
      return <AiPreview />;
    case 'mobile':
      return <MobilePreview />;
    case 'mvp':
      return <MvpPreview />;
    case 'fullstack':
      return <FullStackPreview />;
    case 'cloud':
      return <CloudPreview />;
    default:
      return null;
  }
}
