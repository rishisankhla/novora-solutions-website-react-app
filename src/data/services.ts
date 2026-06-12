import type { ServiceCardProps } from '../components/services/ServiceCard';

/** Icon nodes are assigned in ServiceCard.tsx to keep JSX there */

export interface ServiceDefinition extends Omit<ServiceCardProps, 'icon'> {
  id: string;
  iconKey:
    | 'megaphone'
    | 'server'
    | 'fileSearch'
    | 'code'
    | 'rocket'
    | 'wrench'
    | 'brain'
    | 'cloud';
}

export const NOVORA_SERVICES: ServiceDefinition[] = [
  {
    id: 'marketing',
    iconKey: 'megaphone',
    title: 'Digital Marketing',
    description:
      'Growth campaigns, content, SEO, and brand positioning that turn attention into qualified pipeline — aligned with your product and sales motion.',
    features: [
      'Go-to-market strategy & messaging for B2B SaaS and services',
      'SEO, content hubs, and conversion-focused landing pages',
      'Paid media planning with clear attribution and reporting',
      'Email nurture, social presence, and launch campaigns',
    ],
    techStack: ['HubSpot', 'Google Analytics', 'Meta Ads', 'LinkedIn', 'Content CMS'],
  },
  {
    id: 'it-solutions',
    iconKey: 'server',
    title: 'IT Solutions & Consulting',
    description:
      'Technology advisory, infrastructure, and managed IT so your teams stay secure, connected, and productive without drowning in tickets.',
    features: [
      'IT strategy, vendor selection, and architecture reviews',
      'Cloud migration, identity/access, and security hardening',
      'Helpdesk workflows, device management, and uptime monitoring',
      'Integration between finance, CRM, and operations tools',
    ],
    techStack: ['Microsoft 365', 'AWS', 'Azure', 'Okta', 'Intune'],
  },
  {
    id: 'quotations',
    iconKey: 'fileSearch',
    title: 'Quotation & Proposal Support',
    description:
      'Structured discovery, scoping, and proposal production so you respond to RFPs and client briefs with speed, clarity, and winning detail.',
    features: [
      'Requirements workshops and effort / cost estimation',
      'Technical solution outlines and milestone-based quotes',
      'RFP response support with architecture diagrams',
      'SOW templates, assumptions, and risk registers',
    ],
    techStack: ['Notion', 'Figma', 'Excel', 'Custom portals'],
  },
  {
    id: 'development',
    iconKey: 'code',
    title: 'Custom Software Development',
    description:
      'Web, mobile, and SaaS products engineered for reliability — from greenfield builds to modernizing legacy systems your business depends on.',
    features: [
      'Full-stack applications, APIs, and admin dashboards',
      'CPA, fintech, and operations platforms (see FlowBooksPro)',
      'QA, CI/CD, and production-grade release practices',
      'Integrations with QuickBooks, Xero, payment, and HR systems',
    ],
    techStack: ['React', 'Next.js', 'Node.js', 'TypeScript', 'PostgreSQL', 'MongoDB'],
  },
  {
    id: 'startup-growth',
    iconKey: 'rocket',
    title: 'Startup Growth Partnership',
    description:
      'Founder-friendly delivery: validate fast, ship an investor-ready MVP, and scale the product with a team that understands runway pressure.',
    features: [
      'MVP scoping and 6–12 week launch plans',
      'Pitch-deck technical narrative and demo environments',
      'Iterative releases with weekly stakeholder demos',
      'Post-launch analytics, onboarding, and growth experiments',
    ],
    techStack: ['MVP Stack', 'Stripe', 'Firebase', 'Vercel', 'Product analytics'],
  },
  {
    id: 'maintenance',
    iconKey: 'wrench',
    title: 'Maintenance & Ongoing Support',
    description:
      'Keep production stable after launch — proactive monitoring, security patches, and feature increments without rebuilding your team.',
    features: [
      'SLA-backed bug fixes and incident response',
      'Dependency upgrades and performance tuning',
      'Monthly health reports and roadmap check-ins',
      'Dedicated retainer or fractional engineering capacity',
    ],
    techStack: ['Sentry', 'Datadog', 'GitHub Actions', 'Docker', 'AWS'],
  },
  {
    id: 'ai',
    iconKey: 'brain',
    title: 'AI & Automation',
    description:
      'Practical AI — document extraction, agents, and workflow automation that save hours in finance, ops, and customer teams.',
    features: [
      'LLM-powered intake, categorization, and search',
      'RAG over your documents and knowledge bases',
      'Approval workflows with audit trails',
      'Human-in-the-loop review for regulated industries',
    ],
    techStack: ['OpenAI', 'LangChain', 'Pinecone', 'Python', 'FastAPI'],
  },
  {
    id: 'cloud',
    iconKey: 'cloud',
    title: 'Cloud & DevOps',
    description:
      'Infrastructure that scales with demand — secure deployments, observability, and cost control for growing SaaS and enterprise apps.',
    features: [
      'AWS / Azure / GCP architecture and IaC',
      'CI/CD pipelines and environment promotion',
      'Kubernetes, serverless, and hybrid setups',
      'Backup, disaster recovery, and compliance baselines',
    ],
    techStack: ['Terraform', 'Docker', 'Kubernetes', 'GitHub Actions', 'AWS'],
  },
];
