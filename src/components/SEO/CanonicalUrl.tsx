import React from 'react';
import { Helmet } from 'react-helmet-async';

interface CanonicalUrlProps {
  url?: string;
}

export function CanonicalUrl({ url = 'https://novorasolutions.com/' }: CanonicalUrlProps) {
  return (
    <Helmet>
      <link rel="canonical" href={url} />
    </Helmet>
  );
}