import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = "https://background-remover-app.es";

  // Aquí irían las rutas estáticas principales y futuras sub-rutas long-tail
  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    // Ejemplos de futuras landing pages por caso de uso:
    /*
    {
      url: `${siteUrl}/ecommerce`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/firmas`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    }
    */
  ];
}
