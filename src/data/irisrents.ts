export const IRIS_RENTS = {
  name: 'IRIS',
  tagline: 'Find apartments in the SF Bay Area.',
  headline: 'Discover what you want, how you want.',
  url: 'https://www.irisrents.com/',
  summary:
    'IRIS is a consumer rental platform for the San Francisco Bay Area — verified listings, neighborhood discovery, transit and walkability signals, and rich listing detail pages. Built end-to-end for renters, landlords, and content through Iris Studio.',
  heroImage: '/images/iris/hero.png',
  neighborhoodsImage: '/images/iris/neighborhoods.png',
  screenshots: {
    hero: { width: 1024, height: 462 },
    neighborhoods: { width: 1024, height: 464 },
  },
  regions: ['San Francisco', 'East Bay', 'North Bay'],
  neighborhoods: [
    'Downtown/Civic Center',
    'South of Market',
    'Nob Hill',
    'Presidio Heights',
    'Russian Hill',
    'Marina',
  ],
  features: [
    {
      title: 'Location-first search',
      description: 'Optional neighborhood, price range, and instant listing discovery from the hero.',
    },
    {
      title: 'Explore neighborhoods',
      description: 'Tabbed area browsing with listing cards, photos, specs, and tour requests.',
    },
    {
      title: 'Rich listing pages',
      description: 'Per-unit detail with amenities, neighborhood insights, transit scores, and breadcrumbs.',
    },
    {
      title: 'Fair housing & trust',
      description: 'Transparent renter rights messaging and verified listing sources.',
    },
  ],
  metrics: [
    { label: 'Regions', value: '3' },
    { label: 'Neighborhoods', value: '50+' },
    { label: 'Listing detail', value: 'Full' },
  ],
  capabilities: [
    'Listings search',
    'Neighborhood explorer',
    'Transit & walkability',
    'Listing detail pages',
    'Landlord portal',
    'Iris Studio',
    'Blog',
  ],
  techStack: ['React', 'Next.js', 'Search', 'Maps', 'CMS'],
  featuredListing: {
    title: 'Studio in Downtown/Civic Center',
    url: 'https://www.irisrents.com/apartment/2517/',
    address: '241 Leavenworth Street #15907',
    city: 'San Francisco, CA 94102',
    neighborhood: 'Downtown/Civic Center',
    price: '$1,620',
    period: '/mo',
    beds: 'Studio',
    baths: '1 bath',
    sqft: '—',
    amenities: ['Dishwasher', 'Elevator'],
    listedBy: 'J. Wavro Associates',
    description:
      'Studio apartment with photos, neighborhood insights, transit scores, and clear next steps — Ask a Question or Request a Tour.',
  },
} as const;
