import type { Metadata } from 'next'
import { ServiceHero }        from '@/components/service/ServiceHero'
import { ServiceAbout }       from '@/components/service/ServiceAbout'
import { ServiceDeliverables } from '@/components/service/ServiceDeliverables'
import { ServiceProcess }     from '@/components/service/ServiceProcess'
import { ServiceCTA }         from '@/components/service/ServiceCTA'
import type { ServicePageData } from '@/components/service/types'
import { baseMetadata }       from '@/lib/metadata'

export const metadata: Metadata = { ...baseMetadata, title: 'Brand Identity Design', description: 'Distinctive brand systems that build recognition, trust, and loyalty.' }

const DATA: ServicePageData = {
  hero: {
    eyebrow: 'Brand Identity - Mumbai, India',
    headlineLines: ['Brand identity that', 'builds recognition'],
    tagline: 'and earns trust',
    description: 'Distinctive visual systems that build recognition, trust, and loyalty across every touchpoint - from logo to full brand guidelines.',
    col1: ['Logo design & variations', 'Typography systems', 'Colour palettes', 'Brand guidelines', 'Icon & illustration', 'Brand voice & tone'],
    col2: ['Web brand application', 'Social media kits', 'Print & collateral', 'Packaging design', 'Pitch deck design', 'Brand refresh & evolution'],
    marqueeItems: ['logo', 'typography', 'colour', 'guidelines', 'identity', 'branding', 'visual', 'system'],
    accent: '#8b5cf6',
  },
  about: {
    heading: 'Our brand design approach',
    paragraph: 'We design brand systems that work across every medium. Strategy-led, execution-perfect, and built to last. Because a great brand is the best long-term investment.',
    col1: ['Strategy before aesthetics', 'Scalable visual systems', 'Consistent across touchpoints', 'Digital & print ready', 'Competitive differentiation', 'Future-proof guidelines'],
    col2: ['Logo & mark design', 'Typography & colour systems', 'Brand guidelines documentation', 'Social & marketing assets', 'Web & app application', 'Team handoff & training'],
  },
  deliverables: [
    { title: 'Logo & Brand Mark', desc: 'Primary logo, variations, and usage rules that work beautifully in every size and context.', tags: ['Logo','Mark','Variations','Usage Rules'], variant: 'dark', span: 7 },
    { title: 'Visual Identity System', desc: 'Typography, colour palettes, spacing, and motion - a complete visual language for your brand.', tags: ['Typography','Colour','Spacing','Motion'], variant: 'indigo', span: 5 },
    { title: 'Brand Guidelines', desc: 'Comprehensive documentation so every touchpoint - internal or external - stays consistent.', tags: ['Guidelines','Documentation','Standards','Voice'], variant: 'tint', span: 12 },
    { title: 'Marketing Assets', desc: 'Social media kits, presentation templates, and collateral ready to use from day one.', tags: ['Social Kits','Templates','Collateral','Print'], variant: 'dark', span: 5 },
    { title: 'Brand Refresh', desc: 'Modernise and evolve an existing brand while preserving its equity and recognition in the market.', tags: ['Refresh','Evolution','Rebrand','Audit'], variant: 'indigo', span: 7 },
  ],
  process: {
    heading: `Our brand
process`,
    steps: [
      { label: 'Discovery - brand strategy', tags: ['Brand audit', 'Competitor analysis', 'Positioning'], duration: 'Typical: 1 week' },
      { label: 'Concepts - logo & identity', tags: ['Moodboards', 'Logo concepts', 'Colour exploration'], duration: 'Typical: 2 weeks' },
      { label: 'Refine - system development', tags: ['Typography', 'Colour system', 'Icon set'], duration: 'Typical: 2-3 weeks' },
      { label: 'Deliver - guidelines & assets', tags: ['Brand guidelines', 'Asset library', 'Team handoff'], duration: 'Typical: 1 week' },
    ],
  },
}

export default function BrandIdentityPage() {
  return (
    <main className="sp-page">
      <ServiceHero         data={DATA.hero}         />
      <ServiceAbout        data={DATA.about}        />
      <ServiceDeliverables cards={DATA.deliverables}/>
      <ServiceProcess      data={DATA.process}      />
      <ServiceCTA          service="brand identity"        />
    </main>
  )
}
