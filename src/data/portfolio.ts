export interface PortfolioProject {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  tags: string[];
}

export const portfolioProjects: PortfolioProject[] = [
  {
    id: 'saas-platform',
    title: 'Enterprise SaaS Platform',
    category: 'Web Application',
    description:
      'A scalable multi-tenant SaaS platform with real-time analytics, role-based access, and automated billing integration.',
    image:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
    tags: ['React', 'Node.js', 'PostgreSQL', 'AWS'],
  },
  {
    id: 'ai-assistant',
    title: 'AI-Powered Customer Assistant',
    category: 'AI & ML',
    description:
      'An intelligent support assistant leveraging LLMs and RAG to deliver context-aware responses and reduce support tickets by 40%.',
    image:
      'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800',
    tags: ['OpenAI', 'LangChain', 'Python', 'FastAPI'],
  },
  {
    id: 'mobile-fintech',
    title: 'Mobile Fintech App',
    category: 'Mobile Development',
    description:
      'Cross-platform mobile application for personal finance management with secure payments and real-time transaction tracking.',
    image:
      'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800',
    tags: ['React Native', 'Firebase', 'Stripe'],
  },
  {
    id: 'healthcare-portal',
    title: 'Healthcare Patient Portal',
    category: 'Web Application',
    description:
      'HIPAA-compliant patient portal enabling appointment scheduling, telehealth integration, and secure medical record access.',
    image:
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800',
    tags: ['Next.js', 'MongoDB', 'Azure'],
  },
  {
    id: 'startup-mvp',
    title: 'Startup MVP Launch',
    category: 'MVP Development',
    description:
      'Rapid MVP development for a B2B marketplace, from concept to investor-ready product in 8 weeks.',
    image:
      'https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&q=80&w=800',
    tags: ['MERN Stack', 'WebSockets', 'AWS'],
  },
  {
    id: 'cloud-migration',
    title: 'Cloud Infrastructure Migration',
    category: 'Cloud & DevOps',
    description:
      'Complete cloud migration and CI/CD pipeline setup, reducing deployment time by 70% and improving system reliability.',
    image:
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800',
    tags: ['Docker', 'Kubernetes', 'Terraform', 'GCP'],
  },
];
