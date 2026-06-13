import React from 'react';
import {
  Megaphone,
  Server,
  Code2,
  Rocket,
  Wrench,
  Brain,
  Cloud,
} from 'lucide-react';
import { NOVORA_SERVICES } from '../../data/services';

export interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  techStack?: string[];
  features?: string[];
}

const ICONS = {
  megaphone: Megaphone,
  server: Server,
  code: Code2,
  rocket: Rocket,
  wrench: Wrench,
  brain: Brain,
  cloud: Cloud,
} as const;

export const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  icon,
  techStack,
  features,
}) => (
  <div className="card-premium p-6 sm:p-8 h-full flex flex-col group">
    <div className="text-brand-600 mb-4 sm:mb-6 p-2.5 rounded-xl bg-brand-50 w-fit group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300">
      {icon}
    </div>
    <h3 className="text-xl sm:text-2xl font-bold text-ink mb-3 sm:mb-4">{title}</h3>
    <p className="text-ink-muted mb-4 sm:mb-6 text-sm sm:text-base leading-relaxed">{description}</p>
    {features && (
      <ul className="space-y-2 sm:space-y-3 mb-4 sm:mb-6 flex-grow">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start text-sm sm:text-base">
            <div className="flex-shrink-0 h-5 w-5 text-brand-600 mr-2">•</div>
            <span className="text-ink-muted">{feature}</span>
          </li>
        ))}
      </ul>
    )}
    {techStack && (
      <div className="mt-auto pt-4 border-t border-surface-border">
        <h4 className="text-xs sm:text-sm font-semibold text-ink-muted mb-2">Focus areas</h4>
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {techStack.map((tech, index) => (
            <span
              key={index}
              className="px-2 sm:px-3 py-1 bg-brand-50 text-brand-700 rounded-full text-xs sm:text-sm font-medium"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    )}
  </div>
);

export const mainServices = NOVORA_SERVICES.map((service) => {
  const Icon = ICONS[service.iconKey];
  return {
    title: service.title,
    description: service.description,
    features: service.features,
    techStack: service.techStack,
    icon: <Icon className="h-8 w-8 sm:h-10 sm:w-10" />,
  };
});
