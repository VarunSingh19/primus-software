import type { MetadataRoute } from 'next'

const BASE_URL = 'https://primusoftware.com'

const ROUTES = [
  { path: '',                               priority: 1.0, changeFrequency: 'weekly' as const },
  { path: '/about',                         priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/contact',                       priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/faq',                           priority: 0.6, changeFrequency: 'monthly' as const },
  { path: '/ui-ux',                         priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/website-webapps',               priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/ecommerce',                     priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/brand-identity',                priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/mobile-apps',                   priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/saas-product-design',           priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/performance-seo',               priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/cloud-devops-hosting',          priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/erp-crm-portals-dashboards',    priority: 0.7, changeFrequency: 'monthly' as const },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  return ROUTES.map(({ path, priority, changeFrequency }) => ({
    url: `${BASE_URL}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }))
}
