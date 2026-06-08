export interface JobPosition {
  id: string;
  title: string;
  department: string;
  type: string;
  description: string;
  highlights: string[];
}

export const JOB_POSITIONS: JobPosition[] = [
  {
    id: 'frontend-developer',
    title: 'Frontend Developer',
    department: 'Engineering',
    type: 'Full-time / Remote',
    description:
      'Build responsive, performant user interfaces with modern frameworks and deliver polished experiences across devices.',
    highlights: ['React / Next.js', 'TypeScript', 'Tailwind CSS', 'Accessibility'],
  },
  {
    id: 'backend-developer',
    title: 'Backend Developer',
    department: 'Engineering',
    type: 'Full-time / Remote',
    description:
      'Design and implement scalable APIs, services, and data layers that power our client products.',
    highlights: ['Node.js / Python', 'REST & GraphQL', 'PostgreSQL', 'Cloud APIs'],
  },
  {
    id: 'full-stack-developer',
    title: 'Full Stack Developer',
    department: 'Engineering',
    type: 'Full-time / Remote',
    description:
      'Own features end-to-end — from database design through API development to frontend delivery.',
    highlights: ['MERN / Next.js', 'System Design', 'DevOps basics', 'Agile delivery'],
  },
  {
    id: 'ui-ux-designer',
    title: 'UI/UX Designer',
    department: 'Design',
    type: 'Full-time / Remote',
    description:
      'Craft intuitive, conversion-focused interfaces and translate business goals into elegant user experiences.',
    highlights: ['Figma', 'Design Systems', 'Prototyping', 'User Research'],
  },
  {
    id: 'ai-ml-engineer',
    title: 'AI/ML Engineer',
    department: 'AI & Innovation',
    type: 'Full-time / Remote',
    description:
      'Build intelligent products using LLMs, RAG pipelines, and machine learning to solve real business problems.',
    highlights: ['LLMs & RAG', 'Python', 'LangChain', 'MLOps'],
  },
  {
    id: 'intern',
    title: 'Intern',
    department: 'Early Career',
    type: 'Internship / Remote',
    description:
      'Learn alongside experienced engineers and designers while contributing to live projects and internal initiatives.',
    highlights: ['Mentorship', 'Real projects', 'Flexible hours', 'Growth path'],
  },
  {
    id: 'other',
    title: 'Other',
    department: 'General',
    type: 'Open Application',
    description:
      "Don't see your role listed? Tell us how you'd like to contribute — we're always open to exceptional talent.",
    highlights: ['Flexible roles', 'Remote-first', 'Innovation-driven', 'Collaborative culture'],
  },
];

export const POSITION_OPTIONS = JOB_POSITIONS.map((p) => p.title);

export const CAREERS_EMAIL = 'sangawatjayram@gmail.com';
