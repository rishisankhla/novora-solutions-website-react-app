import { ScrollReveal } from '../ui/ScrollReveal';
import { STATS } from '../../data/conversion';

export function StatsSection() {
  return (
    <section className="relative py-16 sm:py-20 overflow-hidden" aria-label="Company stats">
      <div className="absolute inset-0 bg-gradient-to-br from-brand-600 via-brand-700 to-indigo-800" />
      <div className="absolute inset-0 bg-mesh-dark opacity-40" aria-hidden />
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {STATS.map((stat, index) => (
            <ScrollReveal key={stat.label} delay={index * 80} className="text-center">
              <p className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-2">
                {stat.value}
              </p>
              <p className="text-blue-100/90 text-sm sm:text-base font-medium">{stat.label}</p>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
