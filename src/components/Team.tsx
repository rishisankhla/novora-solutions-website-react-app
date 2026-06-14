import { Users } from 'lucide-react';
import { ScrollReveal } from './ui/ScrollReveal';
import { Section } from './ui/Section';
import { TeamMemberCard } from './team/TeamMemberCard';
import { getTeamGridClass } from './team/teamGrid';
import { TEAM_EXTENDED, TEAM_LEADERSHIP } from '../data/team';

export function Team() {
  const leadershipMembers = TEAM_LEADERSHIP;
  const extendedMembers = TEAM_EXTENDED;
  const totalCount = leadershipMembers.length + extendedMembers.length;

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
        <ScrollReveal className="flex justify-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 border border-surface-border text-sm text-ink-muted shadow-sm">
            <Users className="h-4 w-4 text-brand-600" aria-hidden />
            <span>
              <strong className="text-ink font-semibold">{totalCount}</strong> people building with
              you
            </span>
          </div>
        </ScrollReveal>

        <header className="text-center mb-12 sm:mb-16 max-w-2xl mx-auto">
          <p className="eyebrow mb-3">Leadership</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-ink tracking-tight mb-4 text-balance">
            Direction & standards
          </h2>
          <p className="text-lg text-ink-muted leading-relaxed">
            Directors and technical leads who set strategy, quality, and how we show up for every
            client.
          </p>
        </header>

        <div className={getTeamGridClass(leadershipMembers.length, 'leadership')}>
          {leadershipMembers.map((member, index) => (
            <TeamMemberCard key={member.id} member={member} index={index} variant="leadership" />
          ))}
        </div>

        {extendedMembers.length > 0 && (
          <>
            <header className="text-center mb-12 sm:mb-16 max-w-2xl mx-auto mt-20 sm:mt-28">
              <p className="eyebrow mb-3">Engineering</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-ink tracking-tight mb-4 text-balance">
                Builders on the ground
              </h2>
              <p className="text-lg text-ink-muted leading-relaxed">
                Specialists who turn architecture into shipped software — from chain to cloud.
              </p>
            </header>

            <div className={getTeamGridClass(extendedMembers.length, 'member')}>
              {extendedMembers.map((member, index) => (
                <TeamMemberCard key={member.id} member={member} index={index} variant="member" />
              ))}
            </div>
          </>
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
