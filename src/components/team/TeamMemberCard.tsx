import { useState } from 'react';
import { Linkedin, ArrowUpRight } from 'lucide-react';
import { ScrollReveal } from '../ui/ScrollReveal';
import type { CmsTeamMember } from '../../hooks/useCmsData';

type Variant = 'leadership' | 'member';

interface TeamMemberCardProps {
  member: CmsTeamMember;
  index: number;
  variant?: Variant;
}

function getInitials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');
}

function normalizeLinkedIn(url: string): string {
  if (!url || url === '#') return '';
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  return `https://${url.replace(/^\/+/, '')}`;
}

const sizeMap: Record<Variant, { ring: string; avatar: string; text: string }> = {
  leadership: {
    ring: 'p-[3px]',
    avatar: 'w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36',
    text: 'text-lg sm:text-xl',
  },
  member: {
    ring: 'p-[2.5px]',
    avatar: 'w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32',
    text: 'text-base sm:text-lg',
  },
};

export function TeamMemberCard({ member, index, variant = 'member' }: TeamMemberCardProps) {
  const [imageError, setImageError] = useState(false);
  const sizes = sizeMap[variant];
  const linkedin = normalizeLinkedIn(member.linkedin);
  const isPlaceholder = member.isPlaceholder;
  const showPhoto = Boolean(member.image) && !imageError && !member.image.includes('Novora-Logo');
  const bio =
    member.bio ||
    (isPlaceholder
      ? 'Profile coming soon — edit this teammate in the admin panel.'
      : undefined);

  return (
    <ScrollReveal delay={index * 70}>
      <article className="group relative flex flex-col items-center text-center h-full">
        <div className="relative mb-5 sm:mb-6">
          <div
            className="absolute -inset-2 rounded-full bg-gradient-to-br from-brand-400/40 to-indigo-500/40 opacity-0 group-hover:opacity-100 blur-md transition-all duration-500 scale-90 group-hover:scale-100"
            aria-hidden
          />

          <div
            className={`relative rounded-full bg-gradient-to-br from-brand-200 via-white to-indigo-100 ${sizes.ring} shadow-soft group-hover:from-brand-500 group-hover:via-brand-400 group-hover:to-indigo-500 transition-all duration-500`}
          >
            <div
              className={`relative rounded-full overflow-hidden bg-surface-muted ring-2 ring-white ${sizes.avatar}`}
            >
              {showPhoto ? (
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                  onError={() => setImageError(true)}
                />
              ) : null}
              <div
                className={`absolute inset-0 flex items-center justify-center bg-gradient-to-br from-brand-50 to-indigo-50 ${
                  showPhoto ? 'hidden' : ''
                }`}
              >
                <span className="text-2xl sm:text-3xl font-bold text-brand-600/80">
                  {getInitials(member.name)}
                </span>
              </div>
            </div>
          </div>

          {variant === 'leadership' && (
            <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-ink text-white shadow-sm">
              Leadership
            </span>
          )}

          {isPlaceholder && (
            <span className="absolute top-0 right-0 text-[10px] font-medium px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
              Placeholder
            </span>
          )}
        </div>

        <div className="flex flex-col flex-1 w-full max-w-[16rem] sm:max-w-[18rem] mx-auto px-1">
          <h3 className={`font-bold text-ink tracking-tight mb-1 ${sizes.text}`}>{member.name}</h3>
          <p className="text-sm font-medium text-brand-600 mb-3">{member.role}</p>

          {bio && (
            <p className="text-sm text-ink-muted leading-relaxed line-clamp-3 mb-4 flex-1">{bio}</p>
          )}

          {linkedin ? (
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 mx-auto mt-auto text-sm font-semibold text-ink-muted hover:text-brand-600 transition-colors group/link"
              aria-label={`${member.name} on LinkedIn`}
            >
              <span className="flex items-center justify-center w-9 h-9 rounded-full border border-surface-border bg-white group-hover/link:border-brand-200 group-hover/link:bg-brand-50 transition-colors">
                <Linkedin className="h-4 w-4" aria-hidden />
              </span>
              <span className="group-hover/link:underline underline-offset-2">Connect</span>
              <ArrowUpRight className="h-3.5 w-3.5 opacity-0 -translate-x-1 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all" />
            </a>
          ) : (
            <span className="text-xs text-ink-faint mt-auto">Profile link coming soon</span>
          )}
        </div>
      </article>
    </ScrollReveal>
  );
}
