import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/feedback/',  // Behavioral page - no ads
          '/api/',       // API routes - no content
          '/_next/',     // Next.js internal files
          '/admin/',     // Admin pages if any
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/feedback/',
          '/api/',
          '/_next/',
        ],
      },
    ],
    sitemap: 'https://cliniq-org.web.app/sitemap.xml',
  }
}
