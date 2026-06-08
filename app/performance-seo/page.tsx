import type { Metadata } from 'next'
import { ServiceHero }        from '@/components/service/ServiceHero'
import { ServiceAbout }       from '@/components/service/ServiceAbout'
import { ServiceDeliverables } from '@/components/service/ServiceDeliverables'
import { ServiceProcess }     from '@/components/service/ServiceProcess'
import { ServiceCTA }         from '@/components/service/ServiceCTA'
import type { ServicePageData } from '@/components/service/types'
import { baseMetadata }       from '@/lib/metadata'

export const metadata: Metadata = { ...baseMetadata, title: 'Performance & SEO', description: 'Technical SEO and Core Web Vitals optimisation that drives organic traffic and rankings.' }

const DATA: ServicePageData = {
  hero: {
    eyebrow: 'Performance & SEO - Mumbai, India',
    headlineLines: ['Performance & SEO', 'that drives growth'],
    tagline: 'and keeps you ranking',
    description: 'Technical SEO audits, Core Web Vitals tuning, and structured data that move you up the rankings and keep you there.',
    col1: ['Technical SEO audits', 'Core Web Vitals (LCP/CLS/INP)', 'On-page optimisation', 'Schema & structured data', 'Crawl & indexation fixes', 'Site architecture optimisation'],
    col2: ['Page speed optimisation', 'Image optimisation & CDN', 'Server-side rendering', 'Caching strategies', 'Internal linking', 'SEO monitoring & reporting'],
    marqueeItems: ['seo', 'performance', 'core web vitals', 'schema', 'speed', 'rankings', 'technical', 'crawl'],
    accent: '#22d3ee',
  },
  about: {
    heading: 'Our SEO & performance approach',
    paragraph: 'We combine technical excellence with strategic SEO to improve your organic visibility and user experience simultaneously. Data-driven, measurable, and built for the long term.',
    col1: ['Audit-first, fix-second approach', 'Data-driven prioritisation', 'Core Web Vitals as baseline', 'Continuous monitoring', 'Dev & SEO team collaboration', 'Measurable ranking outcomes'],
    col2: ['Technical SEO audits & fixes', 'Core Web Vitals optimisation', 'Structured data implementation', 'Page speed & CDN tuning', 'Crawl budget optimisation', 'Monthly performance reports'],
  },
  deliverables: [
    { title: 'Technical SEO Audit', desc: 'Full crawl and analysis - identifying every ranking blocker and untapped opportunity on your site.', tags: ['Crawl Analysis','Indexation','Architecture','Errors'], variant: 'dark', span: 7 },
    { title: 'Core Web Vitals', desc: 'LCP, CLS, and INP optimisation to hit and maintain Google performance thresholds across all pages.', tags: ['LCP','CLS','INP','Lighthouse'], variant: 'indigo', span: 5 },
    { title: 'Structured Data', desc: 'Schema markup that powers rich results, improves CTR, and surfaces your content in AI overviews.', tags: ['Schema','JSON-LD','Rich Results','CTR'], variant: 'tint', span: 12 },
    { title: 'Page Speed Optimisation', desc: 'Image compression, lazy loading, caching, and CDN configuration for sub-2s loads everywhere.', tags: ['Images','Caching','CDN','TTFB'], variant: 'dark', span: 5 },
    { title: 'SEO Monitoring', desc: 'Ongoing rank tracking, traffic reporting, and monthly recommendations that keep you ahead.', tags: ['Rank Tracking','Traffic','Reporting','Alerts'], variant: 'indigo', span: 7 },
  ],
  process: {
    heading: `Our SEO
process`,
    steps: [
      { label: 'Audit - crawl & analysis', tags: ['Technical audit', 'Competitor analysis', 'Keyword mapping'], duration: 'Typical: 1-2 weeks' },
      { label: 'Fix - technical remediation', tags: ['Crawl fixes', 'Speed optimisation', 'Schema implementation'], duration: 'Typical: 2-4 weeks' },
      { label: 'Optimise - on-page & content', tags: ['Title & meta', 'Content gaps', 'Internal linking'], duration: 'Ongoing' },
      { label: 'Monitor - track & report', tags: ['Rank tracking', 'Traffic reporting', 'Monthly review'], duration: 'Ongoing' },
    ],
  },
}

export default function PerformanceSeoPage() {
  return (
    <main className="sp-page">
      <ServiceHero         data={DATA.hero}         />
      <ServiceAbout        data={DATA.about}        />
      <ServiceDeliverables cards={DATA.deliverables}/>
      <ServiceProcess      data={DATA.process}      />
      <ServiceCTA          service="SEO & performance"        />
    </main>
  )
}
