export default function robots() {
  const baseUrl = 'https://abhishekkumar74.github.io/lifetrackpro-web';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/api/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
