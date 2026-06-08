import bcrypt from 'bcryptjs';
import { connectDatabase } from '../db/connect.js';
import { env } from '../config/env.js';
import { repo } from '../data/index.js';
import { getSupabaseAdmin } from '../supabase/client.js';
import { User } from '../models/User.js';
import { JobPosition } from '../models/Career.js';
import { TeamMember, PortfolioProject, BlogPost, SiteContent } from '../models/Content.js';

const jobs = [
  {
    slug: 'frontend-developer',
    title: 'Frontend Developer',
    department: 'Engineering',
    employmentType: 'Full-time / Remote',
    description:
      'Build responsive, performant user interfaces with modern frameworks and deliver polished experiences across devices.',
    highlights: ['React / Next.js', 'TypeScript', 'Tailwind CSS', 'Accessibility'],
    status: 'open' as const,
    sortOrder: 1,
  },
  {
    slug: 'backend-developer',
    title: 'Backend Developer',
    department: 'Engineering',
    employmentType: 'Full-time / Remote',
    description:
      'Design and implement scalable APIs, services, and data layers that power our client products.',
    highlights: ['Node.js / Python', 'REST & GraphQL', 'PostgreSQL', 'Cloud APIs'],
    status: 'open' as const,
    sortOrder: 2,
  },
  {
    slug: 'full-stack-developer',
    title: 'Full Stack Developer',
    department: 'Engineering',
    employmentType: 'Full-time / Remote',
    description:
      'Own features end-to-end — from database design through API development to frontend delivery.',
    highlights: ['MERN / Next.js', 'System Design', 'DevOps basics', 'Agile delivery'],
    status: 'open' as const,
    sortOrder: 3,
  },
  {
    slug: 'ui-ux-designer',
    title: 'UI/UX Designer',
    department: 'Design',
    employmentType: 'Full-time / Remote',
    description:
      'Craft intuitive, conversion-focused interfaces and translate business goals into elegant user experiences.',
    highlights: ['Figma', 'Design Systems', 'Prototyping', 'User Research'],
    status: 'open' as const,
    sortOrder: 4,
  },
  {
    slug: 'ai-ml-engineer',
    title: 'AI/ML Engineer',
    department: 'AI & Innovation',
    employmentType: 'Full-time / Remote',
    description:
      'Build intelligent products using LLMs, RAG pipelines, and machine learning to solve real business problems.',
    highlights: ['LLMs & RAG', 'Python', 'LangChain', 'MLOps'],
    status: 'open' as const,
    sortOrder: 5,
  },
  {
    slug: 'intern',
    title: 'Intern',
    department: 'Early Career',
    employmentType: 'Internship / Remote',
    description:
      'Learn alongside experienced engineers and designers while contributing to live projects and internal initiatives.',
    highlights: ['Mentorship', 'Real projects', 'Flexible hours', 'Growth path'],
    status: 'open' as const,
    sortOrder: 6,
  },
  {
    slug: 'other',
    title: 'Other',
    department: 'General',
    employmentType: 'Open Application',
    description:
      "Don't see your role listed? Tell us how you'd like to contribute — we're always open to exceptional talent.",
    highlights: ['Flexible roles', 'Remote-first', 'Innovation-driven', 'Collaborative culture'],
    status: 'open' as const,
    sortOrder: 7,
  },
];

const team = [
  {
    slug: 'rishi-sankhla',
    name: 'Rishi Sankhla',
    role: 'Director & CTO',
    bio: 'Leads technical strategy and engineering standards across client engagements.',
    imageUrl: '/images/rishi.jpeg',
    linkedinUrl: 'https://www.linkedin.com/rishisankhla/',
    isLeadership: true,
    sortOrder: 1,
  },
  {
    slug: 'shakti-singh',
    name: 'Shakti Singh',
    role: 'Director & CEO',
    bio: 'Drives company vision, partnerships, and client relationships worldwide.',
    imageUrl: '/images/shakti_2.png',
    linkedinUrl: 'https://www.linkedin.com/in/shakti-singh-1175a210b/',
    isLeadership: true,
    sortOrder: 2,
  },
  {
    slug: 'rohan-sankhla',
    name: 'Rohan Sankhla',
    role: 'Director & COO',
    bio: 'Oversees operations, delivery excellence, and scalable team processes.',
    imageUrl: '/images/rohan.jpeg',
    linkedinUrl: 'https://www.linkedin.com/rohansankhla/',
    isLeadership: true,
    sortOrder: 3,
  },
  {
    slug: 'placeholder-engineering',
    name: 'Teammate — Engineering',
    role: 'Senior Engineer',
    bio: 'Placeholder profile — replace with a real teammate, photo, and bio in the admin panel.',
    imageUrl: '',
    linkedinUrl: '',
    isLeadership: false,
    sortOrder: 10,
  },
  {
    slug: 'placeholder-design',
    name: 'Teammate — Design',
    role: 'Product Designer',
    bio: 'Placeholder profile — replace with a real teammate, photo, and bio in the admin panel.',
    imageUrl: '',
    linkedinUrl: '',
    isLeadership: false,
    sortOrder: 11,
  },
  {
    slug: 'placeholder-delivery',
    name: 'Teammate — Delivery',
    role: 'Delivery Lead',
    bio: 'Placeholder profile — replace with a real teammate, photo, and bio in the admin panel.',
    imageUrl: '',
    linkedinUrl: '',
    isLeadership: false,
    sortOrder: 12,
  },
];

const portfolio = [
  {
    slug: 'saas-platform',
    title: 'Enterprise SaaS Platform',
    category: 'Web Application',
    description:
      'A scalable multi-tenant SaaS platform with real-time analytics, role-based access, and automated billing integration.',
    imageUrl:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
    tags: ['React', 'Node.js', 'PostgreSQL', 'AWS'],
    sortOrder: 1,
  },
  {
    slug: 'ai-assistant',
    title: 'AI-Powered Customer Assistant',
    category: 'AI & ML',
    description:
      'An intelligent support assistant leveraging LLMs and RAG to deliver context-aware responses and reduce support tickets by 40%.',
    imageUrl:
      'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800',
    tags: ['OpenAI', 'LangChain', 'Python', 'FastAPI'],
    sortOrder: 2,
  },
  {
    slug: 'mobile-fintech',
    title: 'Mobile Fintech App',
    category: 'Mobile Development',
    description:
      'Cross-platform mobile application for personal finance management with secure payments and real-time transaction tracking.',
    imageUrl:
      'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800',
    tags: ['React Native', 'Firebase', 'Stripe'],
    sortOrder: 3,
  },
  {
    slug: 'healthcare-portal',
    title: 'Healthcare Patient Portal',
    category: 'Web Application',
    description:
      'HIPAA-compliant patient portal enabling appointment scheduling, telehealth integration, and secure medical record access.',
    imageUrl:
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800',
    tags: ['Next.js', 'MongoDB', 'Azure'],
    sortOrder: 4,
  },
  {
    slug: 'startup-mvp',
    title: 'Startup MVP Launch',
    category: 'MVP Development',
    description:
      'Rapid MVP development for a B2B marketplace, from concept to investor-ready product in 8 weeks.',
    imageUrl:
      'https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&q=80&w=800',
    tags: ['MERN Stack', 'WebSockets', 'AWS'],
    sortOrder: 5,
  },
  {
    slug: 'cloud-migration',
    title: 'Cloud Infrastructure Migration',
    category: 'Cloud & DevOps',
    description:
      'Complete cloud migration and CI/CD pipeline setup, reducing deployment time by 70% and improving system reliability.',
    imageUrl:
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800',
    tags: ['Docker', 'Kubernetes', 'Terraform', 'GCP'],
    sortOrder: 6,
  },
];

const blogPosts = [
  {
    slug: 'ai-agents-transform-business',
    title: 'How AI Agents Are Transforming Business Operations',
    excerpt:
      'Discover how autonomous AI agents are revolutionizing workflows, automating complex tasks, and enabling smarter decision-making across industries.',
    content: '',
    category: 'AI & Technology',
    author: 'Novora Solutions Team',
    imageUrl:
      'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800',
    readTimeMinutes: 6,
    status: 'published' as const,
    publishedAt: new Date('2025-11-15'),
  },
  {
    slug: 'mvp-development-guide',
    title: 'The Complete Guide to MVP Development for Startups',
    excerpt:
      'Learn the essential steps to building a successful MVP that validates your idea, attracts investors, and sets the foundation for scalable growth.',
    content: '',
    category: 'Startups',
    author: 'Novora Solutions Team',
    imageUrl:
      'https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&q=80&w=800',
    readTimeMinutes: 8,
    status: 'published' as const,
    publishedAt: new Date('2025-10-28'),
  },
  {
    slug: 'cloud-native-architecture',
    title: 'Building Cloud-Native Applications: Best Practices',
    excerpt:
      'Explore modern cloud-native architecture patterns, containerization strategies, and DevOps practices for building resilient, scalable applications.',
    content: '',
    category: 'Cloud & DevOps',
    author: 'Novora Solutions Team',
    imageUrl:
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800',
    readTimeMinutes: 7,
    status: 'published' as const,
    publishedAt: new Date('2025-10-10'),
  },
  {
    slug: 'react-native-vs-flutter',
    title: 'React Native vs Flutter: Choosing the Right Framework',
    excerpt:
      'A comprehensive comparison of React Native and Flutter to help you make the best choice for your next mobile application project.',
    content: '',
    category: 'Mobile Development',
    author: 'Novora Solutions Team',
    imageUrl:
      'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=800',
    readTimeMinutes: 5,
    status: 'published' as const,
    publishedAt: new Date('2025-09-22'),
  },
  {
    slug: 'security-best-practices',
    title: 'Security Best Practices for Modern Web Applications',
    excerpt:
      "Essential security measures every development team should implement to protect user data and maintain compliance in today's threat landscape.",
    content: '',
    category: 'Security',
    author: 'Novora Solutions Team',
    imageUrl:
      'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800',
    readTimeMinutes: 6,
    status: 'published' as const,
    publishedAt: new Date('2025-09-05'),
  },
  {
    slug: 'scaling-startup-tech',
    title: "Scaling Your Startup's Technology Stack",
    excerpt:
      'Practical strategies for evolving your tech stack as your startup grows, from MVP to enterprise-grade infrastructure.',
    content: '',
    category: 'Startups',
    author: 'Novora Solutions Team',
    imageUrl:
      'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800',
    readTimeMinutes: 7,
    status: 'published' as const,
    publishedAt: new Date('2025-08-18'),
  },
];

const siteContent = [
  {
    key: 'hero',
    content: {
      headline: 'Turning Innovative Ideas Into',
      highlight: 'Digital Reality',
      subheadline:
        'We build custom software, AI solutions, and cloud-native platforms that help businesses scale with confidence.',
      ctaPrimary: 'Start a Project',
      ctaSecondary: 'View Our Work',
    },
  },
  {
    key: 'footer',
    content: {
      tagline:
        'Empowering businesses through innovative technology solutions. We transform ideas into digital reality with cutting-edge development and AI-powered solutions.',
      email: 'inquiry@novorasolutions.com',
      supportText: '24/7 Support Available',
      responseText: '2-4 Hour Response Time',
    },
  },
  {
    key: 'contact',
    content: {
      availability: 'Our team is available round the clock to assist you',
      response: 'We typically respond within 2-4 business hours',
      email: 'inquiry@novorasolutions.com',
      global: 'Supporting clients worldwide with remote collaboration',
    },
  },
];

async function clearSupabaseSeedTables() {
  const client = getSupabaseAdmin();
  const tables = [
    'blog_posts',
    'portfolio_projects',
    'team_members',
    'job_positions',
    'career_applications',
    'submissions',
    'site_content',
    'media_assets',
    'audit_logs',
  ] as const;
  for (const table of tables) {
    const { error } = await client.from(table).delete().neq('id', '00000000-0000-0000-0000-000000000000');
    if (error) console.warn(`Clear ${table}:`, error.message);
  }
}

async function seedSupabase() {
  await clearSupabaseSeedTables();

  const passwordHash = await bcrypt.hash(env.adminPassword, 12);
  const existing = await repo.findUserByEmail(env.adminEmail);
  if (existing) {
    await repo.updateUser(String(existing._id), {
      passwordHash,
      name: 'Super Admin',
      role: 'super_admin',
      isActive: true,
    });
  } else {
    await repo.createUser({
      email: env.adminEmail,
      passwordHash,
      name: 'Super Admin',
      role: 'super_admin',
    });
  }
  console.log(`Admin user: ${env.adminEmail}`);

  for (const job of jobs) {
    await repo.createJob({ ...job, publishedAt: new Date() });
  }
  console.log(`Seeded ${jobs.length} job positions`);

  for (const member of team) {
    await repo.createTeamMember({ ...member, status: 'published' });
  }
  console.log(`Seeded ${team.length} team members`);

  for (const project of portfolio) {
    await repo.createPortfolioProject({ ...project, status: 'published' });
  }
  console.log(`Seeded ${portfolio.length} portfolio projects`);

  for (const post of blogPosts) {
    await repo.createBlogPost(post);
  }
  console.log(`Seeded ${blogPosts.length} blog posts`);

  for (const section of siteContent) {
    await repo.upsertSiteContent(section.key, section.content);
  }
  console.log(`Seeded ${siteContent.length} site content sections`);
}

async function seedMongo() {
  const passwordHash = await bcrypt.hash(env.adminPassword, 12);
  await User.findOneAndUpdate(
    { email: env.adminEmail.toLowerCase() },
    {
      email: env.adminEmail.toLowerCase(),
      passwordHash,
      name: 'Super Admin',
      role: 'super_admin',
      isActive: true,
    },
    { upsert: true }
  );
  console.log(`Admin user: ${env.adminEmail}`);

  await JobPosition.deleteMany({});
  await JobPosition.insertMany(jobs.map((j) => ({ ...j, publishedAt: new Date() })));
  console.log(`Seeded ${jobs.length} job positions`);

  await TeamMember.deleteMany({});
  await TeamMember.insertMany(team.map((t) => ({ ...t, status: 'published' })));
  console.log(`Seeded ${team.length} team members`);

  await PortfolioProject.deleteMany({});
  await PortfolioProject.insertMany(portfolio.map((p) => ({ ...p, status: 'published' })));
  console.log(`Seeded ${portfolio.length} portfolio projects`);

  await BlogPost.deleteMany({});
  await BlogPost.insertMany(blogPosts);
  console.log(`Seeded ${blogPosts.length} blog posts`);

  for (const section of siteContent) {
    await SiteContent.findOneAndUpdate(
      { key: section.key, locale: 'en' },
      { content: section.content },
      { upsert: true }
    );
  }
  console.log(`Seeded ${siteContent.length} site content sections`);
}

async function seed() {
  await connectDatabase();
  console.log(`Seeding database (${env.dataSource})...`);

  if (env.dataSource === 'supabase') {
    await seedSupabase();
  } else {
    await seedMongo();
  }

  console.log('Seed completed successfully');
  process.exit(0);
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
