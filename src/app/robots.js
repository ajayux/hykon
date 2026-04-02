import { MetadataRoute } from 'next'

export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://hykon-beta-ux.netlify.app/sitemap.xml',
  }
}