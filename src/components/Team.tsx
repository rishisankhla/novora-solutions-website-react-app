import { Users } from 'lucide-react';
import { ScrollReveal } from './ui/ScrollReveal';
import { Section } from './ui/Section';
import { TeamMemberCard } from './team/TeamMemberCard';
import { getTeamGridClass, getSkeletonCount } from './team/teamGrid';
import { useCmsTeam } from '../hooks/useCmsData';

function TeamSkeleton({ variant }: { variant: 'leadership' | 'member' }) {
  const count = getSkeletonCount(variant);
  const size = variant === 'leadership' ? 'w-32 h-32' : 'w-28 h-28';

  return (
    <div className={getTeamGridClass(count, variant)}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex flex-col items-center animate-pulse">
          <div className={`rounded-full bg-surface-muted ${size} mb-4`} />
          <div className="h-5 w-32 rounded-lg bg-surface-muted mb-2" />
          <div className="h-4 w-24 rounded bg-surface-muted/80 mb-3" />
          <div className="h-12 w-full max-w-[14rem] rounded bg-surface-muted/60" />
        </div>
      ))}
    </div>
  );
}

function TeamBlock({
  eyebrow,
  title,
  description,
  members,
  variant,
  loading,
}: {
  eyebrow: string;
  title: string;
  description: string;
  members: ReturnType<typeof useCmsTeam>['members'];
  variant: 'leadership' | 'member';
  loading: boolean;
}) {
  if (!loading && members.length === 0) return null;

  return (
    <div className={variant === 'member' ? 'mt-20 sm:mt-28 pt-20 sm:pt-24 border-t border-surface-border/80' : ''}>
      <header className="text-center mb-12 sm:mb-16 max-w-2xl mx-auto">
        <p className="eyebrow mb-3">{eyebrow}</p>
        <h2 className="text-3xl sm:text-4xl font-bold text-ink tracking-tight mb-4 text-balance">{title}</h2>
        <p className="text-lg text-ink-muted leading-relaxed">{description}</p>
      </header>

      {loading ? (
        <TeamSkeleton variant={variant} />
      ) : (
        <div className={getTeamGridClass(members.length, variant)}>
          {members.map((member, index) => (
            <TeamMemberCard key={member.id} member={member} index={index} variant={variant} />
          ))}
        </div>
      )}
    </div>
  );
}

export function Team() {
  const { leadership, extended, members, loading } = useCmsTeam();
  const leadershipMembers = leadership.length > 0 ? leadership : members.filter((m) => m.isLeadership);
  const teamMembers = extended.length > 0 ? extended : members.filter((m) => !m.isLeadership);
  const totalCount = leadershipMembers.length + teamMembers.length;

  return (
    <Section className="bg-surface-soft relative overflow-hidden">
      <div className="absolute inset-0 bg-mesh-hero opacity-40 pointer-events-none" aria-hidden />
      <div
        className="absolute top-20 right-0 w-72 h-72 rounded-full bg-brand-400/5 blur-3xl pointer-events-none"
        aria-hidden
      />
      <div
        className="absolute bottom-10 left-0 w-64 h-64 rounded-full bg-indigo-400/5 blur-3xl pointer-events-none"
        aria-hidden
      />

      <div className="relative">
        {!loading && totalCount > 0 && (
          <ScrollReveal className="flex justify-center mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 border border-surface-border text-sm text-ink-muted shadow-sm">
              <Users className="h-4 w-4 text-brand-600" aria-hidden />
              <span>
                <strong className="text-ink font-semibold">{totalCount}</strong> people building with
                you
              </span>
            </div>
          </ScrollReveal>
        )}

        <TeamBlock
          eyebrow="Leadership"
          title="Direction & standards"
          description="The leaders who set strategy, quality, and how we show up for every client."
          members={leadershipMembers}
          variant="leadership"
          loading={loading}
        />

        <TeamBlock
          eyebrow="The team"
          title="Builders, designers & operators"
          description="Specialists across engineering, design, and delivery — scalable as we grow."
          members={teamMembers}
          variant="member"
          loading={loading}
        />

        {!loading && leadershipMembers.length === 0 && teamMembers.length === 0 && (
          <p className="text-center text-ink-subtle py-16">
            Team profiles will appear here once published in the admin panel.
          </p>
        )}

        <ScrollReveal className="text-center mt-16 sm:mt-20 max-w-2xl mx-auto">
          <p className="text-lg font-semibold text-brand-600 leading-relaxed">
            Exceptional people, clear communication, and craft you can see in every deliverable.
          </p>
        </ScrollReveal>
      </div>
    </Section>
  );
}
