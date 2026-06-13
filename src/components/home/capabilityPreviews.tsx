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
  fill = false,
}: {
  children: ReactNode;
  accent?: string;
  className?: string;
  fill?: boolean;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-xl border border-surface-border/80 bg-gradient-to-br ${accent} ${className}`}
    >
      <DotGrid />
      <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-white/20 pointer-events-none" />
      <div className={`relative p-3 sm:p-4 ${fill ? 'h-full' : ''}`}>{children}</div>
    </div>
  );
}

export function WebAppPreview({ large = false, fill = false }: { large?: boolean; fill?: boolean }) {
  if (large && !fill) {
    return (
      <PreviewShell
        accent="from-brand-400/20 via-violet-400/10 to-sky-400/5"
        className="min-h-[140px] sm:min-h-[160px]"
      >
        <div className="grid grid-cols-3 gap-2">
          <div className="rounded-lg border border-white/70 bg-white/95 p-2 shadow-sm">
            <div className="flex items-center gap-1 mb-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            </div>
            <div className="space-y-1">
              <div className="h-2 rounded bg-brand-500/30 w-full" />
              {[88, 72, 60].map((w, i) => (
                <div key={i} className="h-1.5 rounded-full bg-brand-100" style={{ width: `${w}%` }} />
              ))}
            </div>
          </div>
          <div className="rounded-lg border border-white/70 bg-white/95 p-2 shadow-sm">
            <div className="grid grid-cols-2 gap-1 mb-1.5">
              {[
                { label: 'Users', val: '12.4k' },
                { label: 'Uptime', val: '99.9%' },
              ].map((m) => (
                <div key={m.label} className="rounded bg-surface-soft border border-surface-border/50 p-1">
                  <div className="text-[7px] text-ink-faint">{m.label}</div>
                  <div className="text-[9px] font-bold text-ink">{m.val}</div>
                </div>
              ))}
            </div>
            <div className="space-y-0.5">
              {[1, 2].map((row) => (
                <div key={row} className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded bg-surface-muted shrink-0" />
                  <div className="h-1 flex-1 rounded bg-surface-muted/80" />
                  <div className="h-1 w-5 rounded bg-brand-200" />
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-lg border border-white/70 bg-white/95 p-2 shadow-sm">
            <div className="text-[8px] font-bold text-ink mb-1">Analytics</div>
            <div className="flex items-end gap-0.5 h-10">
              {[35, 55, 42, 78, 65, 90].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-sm bg-gradient-to-t from-brand-600 to-brand-400"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="absolute bottom-2 right-2 text-[8px] font-semibold text-ink-muted bg-white/90 border border-surface-border/60 rounded px-2 py-0.5">
          Figma → Production
        </div>
      </PreviewShell>
    );
  }

  return (
    <PreviewShell
      accent="from-brand-400/20 via-violet-400/10 to-sky-400/5"
      className={
        fill
          ? 'h-full min-h-[200px] lg:min-h-0'
          : 'min-h-[120px]'
      }
      fill={fill}
    >
      <div
        className={`rounded-lg border border-white/60 bg-white/90 shadow-soft backdrop-blur-sm overflow-hidden ${
          fill ? 'h-full flex flex-col' : ''
        }`}
      >
        <div className="flex items-center gap-1.5 px-2.5 py-2 border-b border-surface-border/60 bg-surface-soft/80">
          <span className="w-2 h-2 rounded-full bg-red-400/90" />
          <span className="w-2 h-2 rounded-full bg-amber-400/90" />
          <span className="w-2 h-2 rounded-full bg-emerald-400/90" />
          <div className="flex-1 mx-2 h-4 rounded-md bg-surface-muted/80 max-w-[48%]" />
          <div className="hidden sm:flex gap-1">
            <div className="w-5 h-4 rounded bg-brand-100" />
            <div className="w-5 h-4 rounded bg-surface-muted" />
          </div>
        </div>
        <div className={`grid gap-2 p-2.5 ${fill ? 'grid-cols-6 flex-1' : 'grid-cols-3'}`}>
          {fill && (
            <div className="col-span-1 space-y-1.5 hidden sm:block">
              <div className="h-3 rounded bg-brand-500/25 w-full" />
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className={`h-2 rounded-full ${i === 1 ? 'bg-brand-500/30 w-full' : 'bg-brand-100'}`}
                  style={{ width: i === 1 ? '100%' : `${90 - i * 8}%` }}
                />
              ))}
              <div className="mt-2 pt-2 border-t border-surface-border/40 space-y-1">
                <div className="h-1.5 rounded bg-surface-muted w-3/4" />
                <div className="h-1.5 rounded bg-surface-muted w-1/2" />
              </div>
            </div>
          )}
          <div className={`space-y-2 ${fill ? 'col-span-5 sm:col-span-5 flex flex-col' : 'col-span-3'}`}>
            <div className={`grid gap-1.5 ${fill ? 'grid-cols-4' : 'grid-cols-3'}`}>
              {[
                { label: 'Active users', val: '12.4k' },
                { label: 'Uptime', val: '99.9%' },
                { label: 'Revenue', val: '$84k' },
                ...(fill ? [{ label: 'NPS', val: '72' }] : []),
              ].map((m) => (
                <div key={m.label} className="rounded-md bg-surface-soft border border-surface-border/50 p-1.5">
                  <div className="text-[7px] text-ink-faint font-medium truncate">{m.label}</div>
                  <div className="text-[10px] font-bold text-ink">{m.val}</div>
                </div>
              ))}
            </div>
            <div className="rounded-md border border-surface-border/50 overflow-hidden">
              <div className="flex items-center gap-2 px-2 py-1 bg-surface-soft/90 border-b border-surface-border/40">
                <div className="h-1.5 w-12 rounded bg-ink/10" />
                <div className="h-1.5 w-8 rounded bg-ink/5" />
                <div className="ml-auto h-4 w-14 rounded-md bg-brand-600/90" />
              </div>
              <div className="p-1.5 space-y-1">
                {[1, 2, 3].map((row) => (
                  <div key={row} className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded bg-surface-muted shrink-0" />
                    <div className="h-1.5 flex-1 rounded bg-surface-muted/80" />
                    <div className="h-1.5 w-8 rounded bg-brand-200" />
                    <div className="h-1.5 w-6 rounded bg-emerald-200" />
                  </div>
                ))}
              </div>
            </div>
            <div className={`flex items-end gap-1 px-1 ${fill ? 'flex-1 min-h-[48px]' : 'h-10'}`}>
              {[35, 55, 42, 78, 48, 92, 65, 88].slice(0, fill ? 8 : 7).map((h, i) => (
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
      {fill && (
        <>
          <div className="absolute top-4 right-4 rounded-md border border-violet-200/60 bg-white/95 shadow-soft px-2 py-1 hidden sm:block">
            <div className="text-[8px] font-semibold text-violet-700">Components</div>
            <div className="flex gap-1 mt-0.5">
              {['Btn', 'Card', 'Nav'].map((c) => (
                <span key={c} className="text-[7px] px-1 py-0.5 rounded bg-violet-50 text-violet-600">
                  {c}
                </span>
              ))}
            </div>
          </div>
          <div className="absolute bottom-3 right-3 rounded-lg border border-brand-200/60 bg-white/95 shadow-elevated px-2.5 py-1.5 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-semibold text-ink">Figma → Production</span>
          </div>
        </>
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

export function GoogleAdsPreview() {
  return (
    <PreviewShell accent="from-amber-400/20 via-yellow-400/10 to-orange-400/5" className="min-h-[120px]">
      <div className="rounded-lg border border-white/70 bg-white/95 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-2 py-1.5 border-b border-surface-border/50 bg-surface-soft/80">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-gradient-to-br from-blue-500 via-green-500 to-yellow-500" />
            <span className="text-[8px] font-bold text-ink">Campaigns</span>
          </div>
          <span className="text-[7px] font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">+24%</span>
        </div>
        <div className="p-2 space-y-1.5">
          {[
            { name: 'Brand search', ctr: '4.2%', spend: '$1.2k' },
            { name: 'Retargeting', ctr: '2.8%', spend: '$840' },
          ].map((c) => (
            <div key={c.name} className="flex items-center gap-2 rounded-md bg-surface-soft/80 border border-surface-border/40 px-2 py-1">
              <div className="flex-1 min-w-0">
                <div className="text-[8px] font-semibold text-ink truncate">{c.name}</div>
                <div className="text-[7px] text-ink-faint">CTR {c.ctr}</div>
              </div>
              <div className="text-[8px] font-bold text-ink">{c.spend}</div>
            </div>
          ))}
          <div className="flex items-end gap-0.5 h-6 pt-1">
            {[30, 45, 38, 62, 55, 70].map((h, i) => (
              <div key={i} className="flex-1 rounded-sm bg-amber-400/80" style={{ height: `${h}%` }} />
            ))}
          </div>
        </div>
      </div>
    </PreviewShell>
  );
}

export function SocialMediaPreview() {
  return (
    <PreviewShell accent="from-pink-400/20 via-rose-400/10 to-violet-400/5" className="min-h-[120px]">
      <div className="grid grid-cols-2 gap-1.5">
        {[
          { platform: 'in', color: 'from-blue-600 to-blue-700', likes: '2.4k' },
          { platform: 'ig', color: 'from-pink-500 to-orange-400', likes: '8.1k' },
        ].map((post) => (
          <div key={post.platform} className="rounded-lg border border-white/70 bg-white/95 overflow-hidden shadow-sm">
            <div className={`h-10 bg-gradient-to-br ${post.color}`} />
            <div className="p-1.5 space-y-1">
              <div className="h-1 w-full rounded bg-surface-muted" />
              <div className="h-1 w-2/3 rounded bg-surface-muted/70" />
              <div className="flex items-center justify-between">
                <div className="flex gap-0.5">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="w-1.5 h-1.5 rounded-full bg-rose-300" />
                  ))}
                </div>
                <span className="text-[7px] font-semibold text-ink-faint">{post.likes}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-1.5 flex gap-1">
        {['LinkedIn', 'Meta', 'X'].map((ch) => (
          <span key={ch} className="text-[7px] font-medium px-1 py-0.5 rounded bg-white/80 border border-pink-200/50 text-pink-700">
            {ch}
          </span>
        ))}
      </div>
    </PreviewShell>
  );
}

export function MarketingHubPreview({ large = false }: { large?: boolean }) {
  return (
    <PreviewShell
      accent="from-rose-400/20 via-amber-400/10 to-brand-400/5"
      className={large ? 'min-h-[140px] sm:min-h-[160px]' : 'min-h-[120px]'}
    >
      <div className={`grid gap-2 ${large ? 'grid-cols-3' : 'grid-cols-2'}`}>
        <div className="rounded-lg border border-white/70 bg-white/95 p-2 shadow-sm">
          <div className="text-[8px] font-bold text-ink mb-1.5">All channels</div>
          <div className="space-y-1">
            {[
              { ch: 'Google Ads', pct: 78, color: 'bg-amber-400' },
              { ch: 'Social', pct: 65, color: 'bg-pink-400' },
              { ch: 'SEO', pct: 52, color: 'bg-emerald-400' },
            ].map((row) => (
              <div key={row.ch} className="flex items-center gap-1.5">
                <span className="text-[7px] text-ink-faint w-12 truncate">{row.ch}</span>
                <div className="flex-1 h-1.5 rounded-full bg-surface-muted overflow-hidden">
                  <div className={`h-full rounded-full ${row.color}`} style={{ width: `${row.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-lg border border-white/70 bg-white/95 p-2 shadow-sm">
          <div className="text-[8px] font-bold text-ink mb-1">Pipeline</div>
          <div className="text-lg font-bold text-brand-600 leading-none">847</div>
          <div className="text-[7px] text-emerald-600 font-semibold mt-0.5">+18% this month</div>
          <div className="flex items-end gap-0.5 h-8 mt-2">
            {[40, 55, 48, 72, 68, 85, 90].map((h, i) => (
              <div key={i} className="flex-1 rounded-sm bg-brand-500/70" style={{ height: `${h}%` }} />
            ))}
          </div>
        </div>
        {large && (
          <div className="rounded-lg border border-white/70 bg-white/95 p-2 shadow-sm hidden sm:block">
            <div className="text-[8px] font-bold text-ink mb-1.5">Content calendar</div>
            <div className="grid grid-cols-3 gap-1">
              {['Mon', 'Wed', 'Fri'].map((d, i) => (
                <div key={d} className={`rounded p-1 text-center ${i === 1 ? 'bg-brand-50 border border-brand-200' : 'bg-surface-soft'}`}>
                  <div className="text-[7px] font-semibold text-ink-faint">{d}</div>
                  <div className="h-4 mt-0.5 rounded bg-surface-muted/80" />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      {large && (
        <div className="absolute bottom-2 right-2 text-[8px] font-semibold text-ink-muted bg-white/90 border border-surface-border/60 rounded px-2 py-0.5">
          Marketing — all in one
        </div>
      )}
    </PreviewShell>
  );
}

export type CapabilityPreviewKey =
  | 'web'
  | 'ai'
  | 'mobile'
  | 'mvp'
  | 'fullstack'
  | 'cloud'
  | 'googleAds'
  | 'socialMedia'
  | 'marketing';

export function CapabilityPreview({
  type,
  large = false,
  fill = false,
}: {
  type: CapabilityPreviewKey;
  large?: boolean;
  fill?: boolean;
}) {
  switch (type) {
    case 'web':
      return <WebAppPreview large={large} fill={fill} />;
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
    case 'googleAds':
      return <GoogleAdsPreview />;
    case 'socialMedia':
      return <SocialMediaPreview />;
    case 'marketing':
      return <MarketingHubPreview large={large} />;
    default:
      return null;
  }
}
