import type { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
  className?: string;
  as?: 'div' | 'section' | 'article';
}

export function Container({ children, className = '', as: Tag = 'div' }: ContainerProps) {
  return (
    <Tag className={`max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>{children}</Tag>
  );
}
