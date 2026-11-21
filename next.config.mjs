const cspHeader = `
  default-src 'self';
  script-src 'self' 'unsafe-inline' https://pagead2.googlesyndication.com https://adservice.google.com https://www.googletagservices.com https://tpc.googlesyndication.com https://ep1.adtrafficquality.google https://ep2.adtrafficquality.google https://ep1.adtrafficquality.google.com https://ep2.adtrafficquality.google.com https://us.i.posthog.com https://app.posthog.com https://us-assets.i.posthog.com https://eu-assets.i.posthog.com https://accounts.google.com;
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: blob: https://pagead2.googlesyndication.com https://tpc.googlesyndication.com https://*.doubleclick.net https://ep1.adtrafficquality.google https://ep2.adtrafficquality.google https://play.google.com https://*.googleusercontent.com https://*.supabase.co;
  font-src 'self' data:;
  connect-src 'self' https://*.supabase.co wss://*.supabase.co https://us.i.posthog.com https://app.posthog.com https://eu.i.posthog.com https://*.posthog.com https://*.sentry.io https://*.ingest.sentry.io https://*.ingest.us.sentry.io https://*.ingest.de.sentry.io https://pagead2.googlesyndication.com https://*.doubleclick.net https://ep1.adtrafficquality.google https://ep2.adtrafficquality.google https://ep1.adtrafficquality.google.com https://ep2.adtrafficquality.google.com;
  frame-src 'self' https://googleads.g.doubleclick.net https://pagead2.googlesyndication.com https://tpc.googlesyndication.com https://www.google.com https://ep1.adtrafficquality.google https://ep2.adtrafficquality.google https://accounts.google.com;
  frame-ancestors 'self';
  object-src 'none';
  base-uri 'self';
  form-action 'self' https://accounts.google.com;
`.replace(/\s{2,}/g, ' ').trim();

/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  allowedDevOrigins: [
    '192.168.1.2:3000',
    '192.168.1.2',
    'localhost:3000',
    '127.0.0.1:3000',
  ],
  async redirects() {
    return [
      // www to non-www 301 redirect
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.lifetrackpro.in' }],
        destination: 'https://lifetrackpro.in/:path*',
        permanent: true,
      },
      // http to https 301 redirect
      {
        source: '/:path*',
        has: [{ type: 'header', key: 'x-forwarded-proto', value: 'http' }],
        destination: 'https://lifetrackpro.in/:path*',
        permanent: true,
      },
      // Convenience / Legacy keyword shortcuts to canonical pages
      {
        source: '/pomodoro',
        destination: '/features/pomodoro-timer',
        permanent: true,
      },
      {
        source: '/flashcards',
        destination: '/features/spaced-repetition',
        permanent: true,
      },
      {
        source: '/habits',
        destination: '/features/habit-tracker',
        permanent: true,
      },
      {
        source: '/study-rooms',
        destination: '/features/study-rooms',
        permanent: true,
      },
      {
        source: '/timetable',
        destination: '/tools/study-timetable-generator',
        permanent: true,
      },
      {
        source: '/routine',
        destination: '/tools/daily-routine-generator',
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'Content-Security-Policy',
            value: cspHeader,
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
      {
        source: '/basecamp/:path*',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noindex, nofollow, noarchive',
          },
        ],
      },
      {
        source: '/basecamp',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noindex, nofollow, noarchive',
          },
        ],
      },
      {
        source: '/c/:path*',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noindex, nofollow, noarchive',
          },
        ],
      },
      {
        source: '/partner/:path*',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noindex, nofollow, noarchive',
          },
        ],
      },
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noindex, nofollow, noarchive',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
