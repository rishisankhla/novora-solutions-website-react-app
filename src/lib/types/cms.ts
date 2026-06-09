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

export interface JobPosition {
  id: string;
  title: string;
  department: string;
  type: string;
  description: string;
  highlights: string[];
}

export interface PortfolioProject {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  tags: string[];
}
