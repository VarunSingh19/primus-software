import type { Metadata } from 'next'
import { ServiceHero }        from '@/components/service/ServiceHero'
import { ServiceAbout }       from '@/components/service/ServiceAbout'
import { ServiceDeliverables } from '@/components/service/ServiceDeliverables'
import { ServiceProcess }     from '@/components/service/ServiceProcess'
import { ServiceCTA }         from '@/components/service/ServiceCTA'
import type { ServicePageData } from '@/components/service/types'
import { baseMetadata }       from '@/lib/metadata'

export const metadata: Metadata = { ...baseMetadata, title: 'Website & Web App Development | Primus Software', description: 'End-to-end website and web app development - scalable, secure, and optimised.' }

const DATA: ServicePageData = {
  hero: {
    eyebrow: 'Websites & Web Apps - Mumbai, India',
    headlineLines: ['Websites & web apps', 'built to perform'],
    tagline: 'that load fast & convert',
    description: 'Fast, SEO-ready marketing sites and custom web apps. Type-safe code, CI/CD pipelines, and performance budgets built in from day one.',
    col1: ['Marketing & corporate sites', 'Web portals & dashboards', 'CMS integrations', 'Progressive Web Apps', 'API integrations', 'Headless architecture'],
    col2: ['Type-safe Next.js / React', 'Performance optimisation', 'SEO-ready architecture', 'Caching & CDN setup', 'Security hardening', 'CI/CD pipelines'],
    marqueeItems: ['next.js', 'react', 'typescript', 'tailwind', 'cms', 'seo', 'performance', 'pwa'],
    accent: '#06b6d4',
  },
  about: {
    heading: 'Our web development approach',
    paragraph: 'We ship production-grade web products that load fast, rank well, and handle real traffic. No shortcuts, no tech debt - just clean, maintainable code and measurable results.',
    col1: ['Performance budgets from day one', 'SEO-first architecture', 'Accessible by default (WCAG)', 'Type-safe codebase', 'Security-first deployment', 'Automated testing & QA'],
    col2: ['Marketing sites & landing pages', 'Portals, dashboards, web apps', 'CMS & headless integration', 'API & third-party connections', 'Analytics & tracking setup', 'Ongoing maintenance & growth'],
  },
  deliverables: [
    { title: 'Marketing & Corporate Sites', desc: 'High-performance, SEO-ready sites that convert visitors into leads and drive business growth.', tags: ['Next.js','SEO','Performance','CMS'], variant: 'dark', span: 7 },
    { title: 'Web Portals & Dashboards', desc: 'Custom portals with real-time data, role-based access, and intuitive UX for your team or customers.', tags: ['Portals','Dashboards','Auth','Real-time'], variant: 'indigo', span: 5 },
    { title: 'CMS Integration', desc: 'Headless or traditional CMS - Sanity, Contentful, or WordPress - for content teams that move fast.', tags: ['Sanity','Contentful','WordPress','Headless'], variant: 'tint', span: 12 },
    { title: 'Progressive Web Apps', desc: 'Offline-capable, installable PWAs that bridge the gap between web and native app experiences.', tags: ['PWA','Offline','Service Worker','Install'], variant: 'dark', span: 5 },
    { title: 'API & System Integrations', desc: 'Clean REST/GraphQL integrations with ERP, CRM, payment, and analytics systems built to last.', tags: ['REST','GraphQL','Payments','ERP/CRM'], variant: 'indigo', span: 7 },
  ],
  process: {
    heading: `Our web
dev process`,
    steps: [
      { label: 'Discovery - goals & architecture', tags: ['Requirements', 'Tech stack selection', 'IA & sitemap'], duration: 'Typical: 1 week' },
      { label: 'Design - UI & prototyping', tags: ['Wireframes', 'UI design', 'Interactive prototype'], duration: 'Typical: 2-3 weeks' },
      { label: 'Build - development & integration', tags: ['Component build', 'CMS setup', 'API integrations'], duration: 'Typical: 3-6 weeks' },
      { label: 'Launch - QA & deployment', tags: ['Performance audit', 'SEO checklist', 'CI/CD deploy'], duration: 'Typical: 1 week' },
    ],
  },
}

export default function WebAppsPage() {
  return (
    <main className="sp-page">
      <ServiceHero         data={DATA.hero}         />
      <ServiceAbout        data={DATA.about}        />
      <ServiceDeliverables cards={DATA.deliverables}/>
      <ServiceProcess      data={DATA.process}      />
      <ServiceCTA          service="web development"        />
    </main>
  )
}
