/**
 * Warn when starting frontend-only dev without the API on :5000.
 * Skipped for dev:all (concurrently) and production builds.
 */
const API = 'http://127.0.0.1:5000/api/health';

try {
  const res = await fetch(API, { signal: AbortSignal.timeout(1500) });
  if (res.ok) process.exit(0);
} catch {
  console.warn(
    '\n⚠  API not reachable at http://127.0.0.1:5000\n' +
      '   CMS content (team, blog, portfolio) will not load.\n' +
      '   Run: npm run dev:all   (starts frontend + backend)\n' +
      '   Or in another terminal: cd ../novora-solutions-website-backend && npm run dev\n'
  );
}
