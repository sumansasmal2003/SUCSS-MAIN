import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  // 🚨 Replace with your actual live domain
  const baseUrl = 'https://sucssog.vercel.app';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Disallow private routes if you have any (e.g., admin panels)
      disallow: ['/api/', '/admin/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
