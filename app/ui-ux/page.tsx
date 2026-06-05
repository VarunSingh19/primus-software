import type { Metadata } from 'next'
import { ServiceHero }        from '@/components/service/ServiceHero'
import { ServiceAbout }       from '@/components/service/ServiceAbout'
import { ServiceDeliverables } from '@/components/service/ServiceDeliverables'
import { ServiceProcess }     from '@/components/service/ServiceProcess'
import { ServiceCTA }         from '@/components/service/ServiceCTA'
import { UiUxHero3D }         from '@/components/service/hero3d/UiUxHero3D'
import type { ServicePageData } from '@/components/service/types'
import { baseMetadata }       from '@/lib/metadata'

export const metadata: Metadata = { ...baseMetadata, title: 'UI/UX Design Services | Primus Software', description: 'Research-driven UX and modern UI that converts. Wireframes, prototypes, design systems, and WCAG-compliant delivery.' }

const DATA: ServicePageData = {
  hero: {
    eyebrow: 'UI/UX Design - Mumbai, India',
    headlineLines: ['UI/UX design for', 'web, mobile & SaaS'],
    tagline: 'that feels effortless',
    description: 'We craft conversion-focused experiences for websites, web apps, ERP/CRM portals, and eCommerce - fast, accessible, and built to scale.',
    col1: ['UX research & audits', 'User flows & wireframes', 'Interactive prototyping', 'Design systems', 'Usability testing', 'Accessibility (WCAG)'],
    col2: ['Web & app UI design', 'Motion & micro-interactions', 'Design-to-code handoff', 'Performance-friendly builds', 'B2B portals, ERP/CRM', 'eCommerce experiences'],
    marqueeItems: ['ui/ux', 'prototyping', 'design systems', 'accessibility', 'websites', 'apps', 'branding', 'motion ui'],
    hero3D: <UiUxHero3D />,
    accent: '#6366f1',
  },
  about: {
    heading: 'Our UI/UX approach & philosophy',
    paragraph: 'We design interfaces that users understand at a glance — research-driven, performance-friendly, and WCAG-aware. Every decision reduces friction and increases conversions.',
    col1: [],
    col2: [],
    principles: [
      { icon: 'magnifying-glass', title: 'Research first',       desc: 'Evidence-backed decisions, never assumptions'     },
      { icon: 'eye',              title: 'Accessible by default', desc: 'WCAG 2.2 AA, keyboard nav & screen readers'        },
      { icon: 'rocket-launch',    title: 'Performance-friendly',  desc: 'Sub-2s LCP, SEO-optimised from the first commit'   },
      { icon: 'squares-four',     title: 'Design systems',        desc: 'Scalable, reusable tokens & components'            },
      { icon: 'text-aa',          title: 'Clear microcopy',       desc: 'Labels, errors, and CTAs that guide, not confuse'  },
      { icon: 'code',             title: 'Dev handoff quality',   desc: 'Pixel-perfect specs, tokens, and QA support'       },
    ],
  },
  deliverables: [
    { title: 'UI/UX Design', desc: 'Clean, modern interfaces backed by research. We reduce friction, improve task completion, and help your product convert better.', tags: ['UX Research','Wireframes','Prototyping','Design Systems','Usability','WCAG'], variant: 'dark', span: 7 },
    { title: 'Front-end Development', desc: 'We ship fast, standards-compliant interfaces with smooth micro-interactions and lighthouse-friendly scores.', tags: ['Frontend','Interactions','Performance','Accessibility'], variant: 'indigo', span: 5 },
    { title: 'Experience Optimisation', desc: 'Improve conversions with clearer journeys, faster pages, and evidence-based changes using heatmaps and A/B tests.', tags: ['CRO','UX Writing','SEO','Analytics','Experimentation'], variant: 'tint', span: 12 },
    { title: 'Brand Identity', desc: 'Distinctive, consistent visual language that supports your product and builds trust across every touchpoint.', tags: ['Brand Strategy','Logo','Guidelines','Rebranding'], variant: 'dark', span: 5 },
    { title: 'Ongoing Support', desc: 'Retainer-style design and front-end help, regular UX improvements, and quick-release sprints as you scale.', tags: ['Maintenance','eCommerce','Feature Sprints'], variant: 'indigo', span: 7 },
  ],
  process: {
    heading: `Our UX
process`,
    steps: [
      { label: 'Discover - research & alignment', tags: ['Stakeholder interviews', 'Analytics review', 'Heuristic audit'], duration: 'Typical: 1-2 weeks' },
      { label: 'Define - personas, IA & flows', tags: ['Personas', 'User journeys', 'Information architecture'], duration: 'Typical: 1-2 weeks' },
      { label: 'Design - wireframes to high-fidelity', tags: ['Wireframes', 'Interactive prototypes', 'Design system'], duration: 'Typical: 2-4 weeks' },
      { label: 'Validate - testing & iteration', tags: ['Usability testing', 'Accessibility (WCAG)', 'A/B experiments'], duration: 'Typical: 1-2 weeks' },
    ],
  },
}

export default function UIUXPage() {
  return (
    <main className="sp-page">
      <ServiceHero         data={DATA.hero}         />
      <ServiceAbout        data={DATA.about}        />
      <ServiceDeliverables cards={DATA.deliverables}/>
      <ServiceProcess      data={DATA.process}      />
      <ServiceCTA          service="UI/UX design"        />
    </main>
  )
}
