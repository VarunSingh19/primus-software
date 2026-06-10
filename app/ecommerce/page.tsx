import type { Metadata } from 'next'
import { ServiceHero }        from '@/components/service/ServiceHero'
import { ServiceAbout }       from '@/components/service/ServiceAbout'
import { ServiceDeliverables } from '@/components/service/ServiceDeliverables'
import { ServiceProcess }     from '@/components/service/ServiceProcess'
import { ServiceCTA }         from '@/components/service/ServiceCTA'
import { EcommerceHero3D }     from '@/components/service/hero3d/EcommerceHero3D'
import type { ServicePageData } from '@/components/service/types'
import { baseMetadata }       from '@/lib/metadata'

export const metadata: Metadata = { ...baseMetadata, title: 'eCommerce Development', description: 'Scalable ecommerce platforms engineered for revenue.' }

const DATA: ServicePageData = {
  hero: {
    eyebrow: 'eCommerce - Mumbai, India',
    headlineLines: ['eCommerce built', 'for revenue'],
    tagline: 'engineered to convert',
    description: 'Scalable storefronts, custom checkout flows, and full payment & CRM integrations engineered for conversion.',
    col1: ['Shopify & headless builds', 'WooCommerce development', 'Custom storefronts', 'B2B portal & wholesale', 'Product catalogue systems', 'Inventory management'],
    col2: ['Payment gateway integration', 'ERP/CRM sync', 'Subscription billing', 'Analytics & tracking', 'Performance optimisation', 'Post-launch support'],
    marqueeItems: ['shopify', 'headless', 'stripe', 'woocommerce', 'checkout', 'performance', 'crm', 'erp'],
    hero3D: <EcommerceHero3D />,
    accent: '#f59e0b',
  },
  about: {
    heading: 'Our eCommerce approach',
    paragraph: 'We build storefronts that convert. Every element - from product page to checkout - is engineered for speed, trust, and revenue. Because speed sells.',
    col1: ['Conversion-first design', 'Mobile-optimised checkout', 'Sub-2s page load targets', 'Trust signal integration', 'A/B testing ready', 'WCAG accessibility'],
    col2: ['Shopify / headless builds', 'Custom checkout flows', 'Payment & tax integration', 'ERP/CRM sync', 'Inventory & fulfilment', 'Analytics & attribution'],
  },
  deliverables: [
    { title: 'Shopify & Headless Storefronts', desc: 'Fast, customisable storefronts with full Shopify power or headless flexibility for total control.', tags: ['Shopify','Headless','Hydrogen','Performance'], variant: 'dark', span: 7 },
    { title: 'Custom Checkout Flows', desc: 'Bespoke checkout experiences optimised for conversion and reduced cart abandonment at every step.', tags: ['Checkout','UX','Conversion','Payments'], variant: 'indigo', span: 5 },
    { title: 'Payment Integration', desc: 'Stripe, Razorpay, PayPal, and local gateways wired up cleanly and securely.', tags: ['Stripe','Razorpay','PayPal','Security'], variant: 'tint', span: 12 },
    { title: 'B2B Portals', desc: 'Wholesale portals with pricing tiers, bulk ordering, and account management for business customers.', tags: ['B2B','Wholesale','Pricing Tiers','Accounts'], variant: 'dark', span: 5 },
    { title: 'Performance & SEO', desc: 'Core Web Vitals tuning and structured data for product pages that load instantly and rank well.', tags: ['Core Web Vitals','Schema','CDN','Speed'], variant: 'indigo', span: 7 },
  ],
  process: {
    heading: `Our eCommerce
process`,
    steps: [
      { label: 'Audit & strategy', tags: ['Platform selection', 'Competitor analysis', 'Tech stack'], duration: 'Typical: 1 week' },
      { label: 'Design - UX & UI', tags: ['Wireframes', 'Product page design', 'Checkout UX'], duration: 'Typical: 2-3 weeks' },
      { label: 'Build - storefront & integrations', tags: ['Theme/custom build', 'Payment setup', 'ERP/CRM integration'], duration: 'Typical: 4-8 weeks' },
      { label: 'Launch & optimise', tags: ['Performance audit', 'SEO setup', 'Analytics tracking'], duration: 'Typical: 1 week' },
    ],
  },
}

export default function EcommercePage() {
  return (
    <main className="sp-page">
      <ServiceHero         data={DATA.hero}         />
      <ServiceAbout        data={DATA.about}        />
      <ServiceDeliverables cards={DATA.deliverables}/>
      <ServiceProcess      data={DATA.process}      />
      <ServiceCTA          service="eCommerce"        />
    </main>
  )
}
