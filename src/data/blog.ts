export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  publishDate: string;
  readTime: string;
  image: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'ai-agents-transform-business',
    title: 'How AI Agents Are Transforming Business Operations',
    excerpt:
      'Discover how autonomous AI agents are revolutionizing workflows, automating complex tasks, and enabling smarter decision-making across industries.',
    category: 'AI & Technology',
    author: 'Novora Solutions Team',
    publishDate: '2025-11-15',
    readTime: '6 min read',
    image:
      'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: '2',
    slug: 'mvp-development-guide',
    title: 'The Complete Guide to MVP Development for Startups',
    excerpt:
      'Learn the essential steps to building a successful MVP that validates your idea, attracts investors, and sets the foundation for scalable growth.',
    category: 'Startups',
    author: 'Novora Solutions Team',
    publishDate: '2025-10-28',
    readTime: '8 min read',
    image:
      'https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: '3',
    slug: 'cloud-native-architecture',
    title: 'Building Cloud-Native Applications: Best Practices',
    excerpt:
      'Explore modern cloud-native architecture patterns, containerization strategies, and DevOps practices for building resilient, scalable applications.',
    category: 'Cloud & DevOps',
    author: 'Novora Solutions Team',
    publishDate: '2025-10-10',
    readTime: '7 min read',
    image:
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: '4',
    slug: 'react-native-vs-flutter',
    title: 'React Native vs Flutter: Choosing the Right Framework',
    excerpt:
      'A comprehensive comparison of React Native and Flutter to help you make the best choice for your next mobile application project.',
    category: 'Mobile Development',
    author: 'Novora Solutions Team',
    publishDate: '2025-09-22',
    readTime: '5 min read',
    image:
      'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: '5',
    slug: 'security-best-practices',
    title: 'Security Best Practices for Modern Web Applications',
    excerpt:
      'Essential security measures every development team should implement to protect user data and maintain compliance in today\'s threat landscape.',
    category: 'Security',
    author: 'Novora Solutions Team',
    publishDate: '2025-09-05',
    readTime: '6 min read',
    image:
      'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: '6',
    slug: 'scaling-startup-tech',
    title: 'Scaling Your Startup\'s Technology Stack',
    excerpt:
      'Practical strategies for evolving your tech stack as your startup grows, from MVP to enterprise-grade infrastructure.',
    category: 'Startups',
    author: 'Novora Solutions Team',
    publishDate: '2025-08-18',
    readTime: '7 min read',
    image:
      'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800',
  },
];
