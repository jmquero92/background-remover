import { MetadataRoute } from 'next';
import { niches } from '@/lib/niches';

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = "https://background-remover-app.es";

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    }
  ];

  const nicheRoutes: MetadataRoute.Sitemap = Object.keys(niches).map((niche) => ({
    url: `${siteUrl}/quitar-fondo-${niche}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [...staticRoutes, ...nicheRoutes];
}
