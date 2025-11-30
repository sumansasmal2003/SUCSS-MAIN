import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  // 🚨 IMPORTANT: Replace this with your actual live domain
  // If you don't have one yet, you can use 'http://localhost:3000' for testing
  const baseUrl = 'https://sucssog.vercel.app';

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/events`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/gallery`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/join`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.9, // High priority because we want members
    },
    {
      url: `${baseUrl}/donate`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.8,
    },
    // Add other pages if you created them (e.g., /committee)
    /*
    {
      url: `${baseUrl}/committee`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.6,
    },
    */
  ];
}
