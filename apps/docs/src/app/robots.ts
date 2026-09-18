import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    host: 'https://b-bak.de',
    sitemap: 'https://b-bak.de/sitemap.xml',
  };
}
