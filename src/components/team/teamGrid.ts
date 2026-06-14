/**
 * Responsive grid classes that adapt to any team size (3–20+ members).
 */
export function getTeamGridClass(count: number, variant: 'leadership' | 'member'): string {
  const base = 'grid gap-x-6 gap-y-12 sm:gap-x-8 sm:gap-y-14 w-full';

  if (variant === 'leadership') {
    if (count === 1) return `${base} grid-cols-1 max-w-xs mx-auto`;
    if (count === 2) return `${base} grid-cols-1 sm:grid-cols-2 max-w-2xl mx-auto`;
    if (count === 5) return `${base} grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto`;
    return `${base} grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto`;
  }

  if (count === 1) return `${base} grid-cols-1 max-w-xs mx-auto`;
  if (count === 2) return `${base} grid-cols-1 xs:grid-cols-2 max-w-xl mx-auto`;
  if (count === 3) return `${base} grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-4xl mx-auto`;
  if (count === 4) return `${base} grid-cols-2 lg:grid-cols-4 max-w-5xl mx-auto`;
  if (count <= 6) return `${base} grid-cols-2 md:grid-cols-3 max-w-5xl mx-auto`;
  if (count <= 9) return `${base} grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 max-w-6xl mx-auto`;
  return `${base} grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 max-w-7xl mx-auto`;
}

export function getSkeletonCount(variant: 'leadership' | 'member'): number {
  return variant === 'leadership' ? 3 : 3;
}
