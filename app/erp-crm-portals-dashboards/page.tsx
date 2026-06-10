import type { Metadata } from 'next'
import { ServiceHero } from '@/components/service/ServiceHero'
import { ServiceAbout } from '@/components/service/ServiceAbout'
import { ServiceDeliverables } from '@/components/service/ServiceDeliverables'
import { ServiceProcess } from '@/components/service/ServiceProcess'
import { ServiceCTA } from '@/components/service/ServiceCTA'
import { ErpCrmHero3D } from '@/components/service/hero3d/ErpCrmHero3D'
import type { ServicePageData } from '@/components/service/types'
import { baseMetadata } from '@/lib/metadata'

export const metadata: Metadata = { ...baseMetadata, title: 'ERP, CRM & Portals', description: 'Custom ERP/CRM integrations, business portals, and data dashboards that connect your systems.' }

const DATA: ServicePageData = {
  hero: {
    eyebrow: 'ERP / CRM & Portals - Mumbai, India',
    headlineLines: ['ERP, CRM & portals', 'that connect your business'],
    tagline: 'and surface what matters',
    description: 'Custom integrations, business portals, and data dashboards that connect your systems and surface the right data to the right people.',
    col1: ['ERP system integration', 'CRM customisation & setup', 'Custom business portals', 'Role-based dashboards', 'Data visualisation', 'Workflow automation'],
    col2: ['API integration & middleware', 'Real-time data sync', 'Third-party connectors', 'Reporting & analytics', 'User access management', 'Training & documentation'],
    marqueeItems: ['erp', 'crm', 'portals', 'dashboards', 'integration', 'automation', 'data', 'reporting'],
    hero3D: <ErpCrmHero3D />,
    accent: '#6366f1',
  },
  about: {
    heading: 'Our ERP/CRM approach',
    paragraph: 'We connect disparate systems into a unified, intelligible picture. No more spreadsheet chaos - just the data you need, when you need it, for the people who need it.',
    col1: ['Business process mapping first', 'API-first integration strategy', 'Real-time data synchronisation', 'Role-based access & security', 'Scalable data architecture', 'Change management support'],
    col2: ['ERP integration (SAP, Oracle, Tally)', 'CRM setup (Salesforce, HubSpot)', 'Custom portal development', 'Dashboard & reporting tools', 'Workflow automation', 'Ongoing maintenance'],
  },
  deliverables: [
    { title: 'ERP Integration', desc: 'Connect your ERP - SAP, Oracle, Tally, or custom - to your web products cleanly and reliably.', tags: ['SAP', 'Oracle', 'Tally', 'Real-time', 'APIs'], variant: 'dark', span: 7 },
    { title: 'CRM Customisation', desc: 'Salesforce, HubSpot, or custom CRM workflows tailored precisely to your sales process.', tags: ['Salesforce', 'HubSpot', 'Workflows', 'Automation'], variant: 'indigo', span: 5 },
    { title: 'Business Portals', desc: 'Role-based portals for vendors, distributors, or customers with real-time data and clean UX.', tags: ['Portals', 'RBAC', 'Real-time', 'Vendor', 'Customer'], variant: 'tint', span: 12 },
    { title: 'Data Dashboards', desc: 'Live dashboards with KPIs, charts, and drill-down reporting for every team in the business.', tags: ['KPIs', 'Charts', 'Drill-down', 'Reports', 'BI'], variant: 'dark', span: 5 },
    { title: 'API Middleware', desc: 'Clean middleware layer connecting legacy systems to modern web apps via well-documented APIs.', tags: ['REST', 'GraphQL', 'Middleware', 'Legacy', 'APIs'], variant: 'indigo', span: 7 },
  ],
  process: {
    heading: `Our ERP/CRM
process`,
    steps: [
      { label: 'Discovery - process mapping', tags: ['System audit', 'User interviews', 'Integration scope'], duration: 'Typical: 1-2 weeks' },
      { label: 'Architecture - integration design', tags: ['API design', 'Data model', 'Security model'], duration: 'Typical: 1-2 weeks' },
      { label: 'Build - integration & portal', tags: ['API integration', 'Portal build', 'Dashboard development'], duration: 'Typical: 4-10 weeks' },
      { label: 'Deploy & train', tags: ['UAT', 'Training sessions', 'Go-live support'], duration: 'Typical: 1-2 weeks' },
    ],
  },
}


export default function ErpCrmPage() {
  return (
    <main className="sp-page">
      <ServiceHero data={DATA.hero} />
      <ServiceAbout data={DATA.about} />
      <ServiceDeliverables cards={DATA.deliverables} />
      <ServiceProcess data={DATA.process} />
      <ServiceCTA service="ERP/CRM integration" />
    </main>
  )
}
