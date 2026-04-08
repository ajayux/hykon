import { MetadataRoute } from 'next'

export default function robots() {
  return {
    rules: {
      userAgent: '*',
      disallow: '/',
    },
    sitemap: 'https://hykon-beta-ux.netlify.app/sitemap.xml',
  }
}