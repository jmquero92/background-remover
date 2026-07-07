import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const siteUrl = "https://background-remover-app.es"; // Reemplazar con el dominio de producción

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/api/', // No permitir a los bots indexar endpoints de API directamente
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
