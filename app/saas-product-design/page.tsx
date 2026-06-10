import type { Metadata } from 'next'
import { ServiceHero }        from '@/components/service/ServiceHero'
import { ServiceAbout }       from '@/components/service/ServiceAbout'
import { ServiceDeliverables } from '@/components/service/ServiceDeliverables'
import { ServiceProcess }     from '@/components/service/ServiceProcess'
import { ServiceCTA }         from '@/components/service/ServiceCTA'
import { SaasProductHero3D }  from '@/components/service/hero3d/SaasProductHero3D'
import type { ServicePageData } from '@/components/service/types'
import { baseMetadata }       from '@/lib/metadata'

export const metadata: Metadata = { ...baseMetadata, title: 'SaaS & Product Design', description: 'End-to-end product design and engineering for SaaS - from concept to launched product.' }

const DATA: ServicePageData = {
  hero: {
    eyebrow: 'SaaS & Product Design - Mumbai, India',
    headlineLines: ['SaaS products built', 'to scale'],
    tagline: 'from idea to revenue',
    description: 'End-to-end product design and engineering. From first wireframe to launched SaaS - we own the full stack and all the handoffs.',
    col1: ['SaaS architecture & planning', 'Multi-tenant data models', 'Auth & permissions systems', 'Billing & subscription logic', 'Admin & user dashboards', 'API design & documentation'],
    col2: ['Product UI/UX design', 'Component library & design system', 'Onboarding flows', 'Analytics & telemetry', 'Growth tooling', 'Reliability & SLOs'],
    marqueeItems: ['saas', 'product', 'architecture', 'multi-tenant', 'billing', 'dashboards', 'api', 'scale'],
    hero3D: <SaasProductHero3D />,
    accent: '#6366f1',
  },
  about: {
    heading: 'Our SaaS product approach',
    paragraph: 'We treat your SaaS like our own product - shipping fast, building sustainably, and always thinking about the next 10x. One team, total accountability.',
    col1: ['Outcome-focused product decisions', 'Multi-tenant from the start', 'Billing & metering built in', 'Role-based access & security', 'Telemetry & error tracking', 'Feature flagging & gradual rollout'],
    col2: ['Product strategy & roadmap', 'UI/UX & design system', 'Backend architecture', 'Auth, billing & permissions', 'API design & docs', 'Analytics & growth tools'],
  },
  deliverables: [
    { title: 'Product Architecture', desc: 'Scalable, multi-tenant architecture designed for growth from the very foundation up.', tags: ['Multi-tenant','Architecture','Scalability','Security'], variant: 'dark', span: 7 },
    { title: 'SaaS UI/UX Design', desc: 'Intuitive product interfaces with onboarding flows that activate users fast and reduce churn.', tags: ['Product UX','Onboarding','Dashboard','Design System'], variant: 'indigo', span: 5 },
    { title: 'Auth, Billing & Permissions', desc: 'Rock-solid auth, subscription billing, and role-based access control that just works.', tags: ['Auth','Stripe','Billing','RBAC'], variant: 'tint', span: 12 },
    { title: 'Admin & User Dashboards', desc: 'Data-rich dashboards with real-time updates and role-based views for every user type.', tags: ['Dashboards','Analytics','Real-time','Charts'], variant: 'dark', span: 5 },
    { title: 'Analytics & Growth Tooling', desc: 'Telemetry, funnel tracking, and experimentation infrastructure baked into the product from day one.', tags: ['Telemetry','Funnels','A/B Tests','Growth'], variant: 'indigo', span: 7 },
  ],
  process: {
    heading: `Our SaaS
product process`,
    steps: [
      { label: 'Discovery - product strategy', tags: ['User research', 'Feature prioritisation', 'Architecture decisions'], duration: 'Typical: 1-2 weeks' },
      { label: 'Design - UI/UX & system', tags: ['User flows', 'UI design', 'Design system tokens'], duration: 'Typical: 2-4 weeks' },
      { label: 'Build - product engineering', tags: ['Sprint-based build', 'API & integrations', 'Auth & billing'], duration: 'Typical: 8-16 weeks' },
      { label: 'Launch & iterate', tags: ['Beta programme', 'Analytics setup', 'Feedback loops'], duration: 'Ongoing' },
    ],
  },
}

export default function SaasProductDesignPage() {
  return (
    <main className="sp-page">
      <ServiceHero         data={DATA.hero}         />
      <ServiceAbout        data={DATA.about}        />
      <ServiceDeliverables cards={DATA.deliverables}/>
      <ServiceProcess      data={DATA.process}      />
      <ServiceCTA          service="SaaS product"        />
    </main>
  )
}
