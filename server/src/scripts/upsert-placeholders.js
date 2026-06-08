// Run: mongosh mongodb://127.0.0.1:27017/novora_cms server/src/scripts/upsert-placeholders.js

const placeholders = [
  {
    slug: 'placeholder-design',
    name: 'Teammate — Design',
    role: 'Product Designer',
    bio: 'Placeholder profile — replace with a real teammate, photo, and bio in the admin panel.',
    imageUrl: '',
    linkedinUrl: '',
    isLeadership: false,
    sortOrder: 11,
    status: 'published',
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
    status: 'published',
  },
];

placeholders.forEach((p) => {
  const r = db.teammembers.updateOne({ slug: p.slug }, { $set: p }, { upsert: true });
  print(`${p.slug}: ${r.upsertedCount ? 'inserted' : 'updated'}`);
});

db.teammembers.updateOne(
  { slug: 'rishi-sankhla' },
  { $set: { bio: 'Leads technical strategy and engineering standards across client engagements.' } }
);
db.teammembers.updateOne(
  { slug: 'shakti-singh' },
  { $set: { bio: 'Drives company vision, partnerships, and client relationships worldwide.' } }
);
db.teammembers.updateOne(
  { slug: 'rohan-sankhla' },
  { $set: { bio: 'Oversees operations, delivery excellence, and scalable team processes.' } }
);
db.teammembers.updateOne(
  { slug: 'jayram-sangawat' },
  {
    $set: {
      sortOrder: 5,
      bio: 'Full-stack development and automation — building reliable products end to end.',
    },
  }
);

print('Total published:', db.teammembers.countDocuments({ status: 'published' }));
