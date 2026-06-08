/** Map Supabase snake_case rows to Mongo-style API responses (_id, nested objects). */

export function withId<T extends { id: string }>(row: T): T & { _id: string } {
  return { ...row, _id: row.id };
}

export function withIdList<T extends { id: string }>(rows: T[]): (T & { _id: string })[] {
  return rows.map(withId);
}

export function mapJobRow(row: Record<string, unknown>) {
  return withId({
    id: row.id as string,
    slug: row.slug,
    title: row.title,
    department: row.department,
    employmentType: row.employment_type,
    description: row.description,
    highlights: row.highlights ?? [],
    status: row.status,
    sortOrder: row.sort_order,
    publishedAt: row.published_at,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  } as Record<string, unknown> & { id: string });
}

export function mapTeamRow(row: Record<string, unknown>) {
  return withId({
    id: row.id as string,
    slug: row.slug,
    name: row.name,
    role: row.role,
    bio: row.bio,
    imageUrl: row.image_url,
    linkedinUrl: row.linkedin_url,
    isLeadership: row.is_leadership,
    sortOrder: row.sort_order,
    status: row.status,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  } as Record<string, unknown> & { id: string });
}

export function mapPortfolioRow(row: Record<string, unknown>) {
  return withId({
    id: row.id as string,
    slug: row.slug,
    title: row.title,
    category: row.category,
    description: row.description,
    imageUrl: row.image_url,
    tags: row.tags ?? [],
    sortOrder: row.sort_order,
    status: row.status,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  } as Record<string, unknown> & { id: string });
}

export function mapBlogRow(row: Record<string, unknown>) {
  return withId({
    id: row.id as string,
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    content: row.content,
    category: row.category,
    author: row.author,
    imageUrl: row.image_url,
    readTimeMinutes: row.read_time_minutes,
    status: row.status,
    publishedAt: row.published_at,
    seoTitle: row.seo_title,
    seoDescription: row.seo_description,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  } as Record<string, unknown> & { id: string });
}

export function mapSubmissionRow(row: Record<string, unknown>) {
  return withId({
    id: row.id as string,
    type: row.type,
    status: row.status,
    name: row.name,
    email: row.email,
    phone: row.phone,
    company: row.company,
    subject: row.subject,
    message: row.message,
    source: row.source,
    metadata: row.metadata,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  } as Record<string, unknown> & { id: string });
}

export function mapApplicationRow(row: Record<string, unknown>) {
  return withId({
    id: row.id as string,
    jobPositionId: row.job_position_id,
    positionTitle: row.position_title,
    applicant: {
      fullName: row.applicant_full_name,
      email: row.applicant_email,
      phone: row.applicant_phone,
      location: row.applicant_location,
      linkedinUrl: row.applicant_linkedin_url,
      portfolioUrl: row.applicant_portfolio_url,
    },
    yearsOfExperience: row.years_of_experience,
    coverLetter: row.cover_letter,
    resume: {
      originalName: row.resume_original_name,
      mimeType: row.resume_mime_type,
      size: row.resume_size,
      storagePending: row.resume_storage_pending,
      storagePath: row.resume_storage_path,
    },
    status: row.status,
    adminNotes: row.admin_notes,
    reviewedBy: row.reviewed_by,
    reviewedAt: row.reviewed_at,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  } as Record<string, unknown> & { id: string });
}

export function mapUserRow(row: Record<string, unknown>) {
  return withId({
    id: row.id as string,
    email: row.email,
    name: row.name,
    role: row.role,
    isActive: row.is_active,
    lastLoginAt: row.last_login_at,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  } as Record<string, unknown> & { id: string });
}

export function mapSiteContentRow(row: Record<string, unknown>) {
  return withId({
    id: row.id as string,
    key: row.key,
    locale: row.locale,
    content: row.content,
    updatedBy: row.updated_by,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  } as Record<string, unknown> & { id: string });
}

export function mapMediaRow(row: Record<string, unknown>) {
  return withId({
    id: row.id as string,
    filename: row.filename,
    originalName: row.original_name,
    mimeType: row.mime_type,
    size: row.size,
    url: row.url,
    storagePath: row.storage_path,
    folder: row.folder,
    altText: row.alt_text,
    uploadedBy: row.uploaded_by,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  } as Record<string, unknown> & { id: string });
}

export function mapAuditRow(row: Record<string, unknown>) {
  const user = row.users as Record<string, unknown> | null;
  return withId({
    id: row.id as string,
    action: row.action,
    entity: row.entity,
    entityId: row.entity_id,
    changes: row.changes,
    ip: row.ip,
    createdAt: row.created_at,
    userId: user
      ? { name: user.name, email: user.email, _id: user.id }
      : row.user_id
        ? { _id: row.user_id }
        : undefined,
  } as Record<string, unknown> & { id: string });
}
