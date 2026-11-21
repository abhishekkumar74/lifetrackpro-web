/**
 * Dynamic Sitemap Generator (Next.js App Router)
 * Generates canonical /sitemap.xml for all 22 public pages.
 *
 * Maintenance note:
 * - Google ignores <priority> and <changefreq>, so only <loc> and <lastmod> are included.
 * - 'lastModified' uses fixed constant dates rather than dynamic new Date().
 * - Since all routes underwent the major Nov 2026 overhaul, all are initialized to '2026-11-21'.
 * - NOTE: Update an individual page's lastModified date ONLY when its actual content changes.
 * - Do NOT include /basecamp (internal admin portal), /api, /c (attribution redirects), or /partner (private portal).
 */
export default function sitemap() {
  const baseUrl = 'https://lifetrackpro.in';
  const OVERHAUL_DATE = '2026-11-21';

  return [
    {
      url: baseUrl,
      lastModified: OVERHAUL_DATE,
    },
    {
      url: `${baseUrl}/features`,
      lastModified: OVERHAUL_DATE,
    },
    {
      url: `${baseUrl}/features/pomodoro-timer`,
      lastModified: OVERHAUL_DATE,
    },
    {
      url: `${baseUrl}/features/spaced-repetition`,
      lastModified: OVERHAUL_DATE,
    },
    {
      url: `${baseUrl}/features/habit-tracker`,
      lastModified: OVERHAUL_DATE,
    },
    {
      url: `${baseUrl}/features/study-rooms`,
      lastModified: OVERHAUL_DATE,
    },
    {
      url: `${baseUrl}/exams`,
      lastModified: OVERHAUL_DATE,
    },
    {
      url: `${baseUrl}/exams/jee`,
      lastModified: OVERHAUL_DATE,
    },
    {
      url: `${baseUrl}/exams/neet`,
      lastModified: OVERHAUL_DATE,
    },
    {
      url: `${baseUrl}/exams/upsc`,
      lastModified: OVERHAUL_DATE,
    },
    {
      url: `${baseUrl}/calculator`,
      lastModified: OVERHAUL_DATE,
    },
    {
      url: `${baseUrl}/tools`,
      lastModified: OVERHAUL_DATE,
    },
    {
      url: `${baseUrl}/tools/daily-routine-generator`,
      lastModified: OVERHAUL_DATE,
    },
    {
      url: `${baseUrl}/tools/focus-time-calculator`,
      lastModified: OVERHAUL_DATE,
    },
    {
      url: `${baseUrl}/tools/study-hours-calculator`,
      lastModified: OVERHAUL_DATE,
    },
    {
      url: `${baseUrl}/tools/study-timetable-generator`,
      lastModified: OVERHAUL_DATE,
    },
    {
      url: `${baseUrl}/tools/weekly-study-planner`,
      lastModified: OVERHAUL_DATE,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: OVERHAUL_DATE,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: OVERHAUL_DATE,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: OVERHAUL_DATE,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: OVERHAUL_DATE,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: OVERHAUL_DATE,
    },
  ];
}
