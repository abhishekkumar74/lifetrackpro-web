export default function robots() {
  const baseUrl = 'https://lifetrackpro.in';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/basecamp', '/admin', '/secret-admin-portal', '/api/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
