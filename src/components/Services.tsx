import { Link } from 'react-router-dom';
import { Rocket, Workflow, Layers, ArrowUpRight } from 'lucide-react';
import { ServiceCard, mainServices } from './services/ServiceCard';
import { ScrollReveal } from './ui/ScrollReveal';
import { ROUTES } from '../routes/paths';

export function Services() {
  return (
    <section className="pt-6 sm:pt-8 pb-16 sm:pb-24 relative bg-surface-soft">
      <div className="absolute inset-0 bg-mesh-hero opacity-40 pointer-events-none" aria-hidden />

      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <ScrollReveal className="text-center mb-12 sm:mb-16 max-w-3xl mx-auto">
          <p className="eyebrow mb-3">Services</p>
          <h2 className="heading-display text-3xl sm:text-4xl mb-4">What We Offer</h2>
          <p className="text-base sm:text-lg text-ink-muted max-w-3xl mx-auto leading-relaxed">
            Marketing, IT consulting, custom development, AI, cloud, startup growth, and long-term
            maintenance — one partner from strategy through launch and beyond.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
          {mainServices.map((service, index) => (
            <ScrollReveal key={service.title} delay={index * 80}>
              <ServiceCard {...service} />
            </ScrollReveal>
          ))}
        </div>

        <div className="mt-16 sm:mt-20 max-w-7xl mx-auto">
          <ScrollReveal className="text-center">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 sm:mb-8">
              Why Choose Novora Solutions?
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8">
              {[
                { Icon: Rocket, title: 'Startup-Friendly Approach', desc: 'We help founders turn ideas into reality' },
                { Icon: Workflow, title: 'End-to-End Development', desc: 'From concept to launch, we handle everything' },
                { Icon: Layers, title: 'Future-Proof Tech', desc: 'We use the latest frameworks and cloud technologies' },
              ].map(({ Icon, title, desc }) => (
                <div
                  key={title}
                  className="bg-white/80 backdrop-blur-sm p-4 sm:p-6 rounded-xl shadow-sm hover:shadow-lg border border-gray-100 hover:border-blue-100 transition-all duration-300"
                >
                  <Icon className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600 mx-auto mb-3 sm:mb-4" />
                  <h4 className="text-base sm:text-lg font-semibold mb-2">{title}</h4>
                  <p className="text-sm sm:text-base text-gray-600">{desc}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal className="mt-12 sm:mt-16 text-center">
            <Link
              to={ROUTES.contact}
              className="inline-flex items-center gap-2 px-7 py-3.5 text-base font-semibold rounded-xl text-white bg-ink hover:bg-brand-700 shadow-soft hover:shadow-elevated transition-all duration-300"
            >
              Start a project
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
