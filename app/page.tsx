import type { Metadata } from 'next'
import { HomeTicker } from '@/components/sections/HomeTicker'
import { Manifesto } from '@/components/sections/Manifesto'
import { StatsSection } from '@/components/sections/StatsSection'
import { ProcessSection } from '@/components/sections/ProcessSection'
import { ServicesStack } from '@/components/sections/ServicesStack'
import { PromoBlocks } from '@/components/sections/PromoBlocks'
import { WorkShowcase } from '@/components/sections/WorkShowcase'
import { TestimonialsSection } from '@/components/sections/TestimonialsSection'
import { WhyUs } from '@/components/sections/WhyUs'
import { HomeCTA } from '@/components/sections/HomeCTA'
import { HomeHero3D } from '@/components/sections/HomeHero3D'
import { baseMetadata, pageMetadata } from '@/lib/metadata'

export const metadata: Metadata = {
  ...baseMetadata,
  // No title override here — the homepage inherits `baseMetadata.title.default`
  // (the full branded title). Overriding it with a plain string like 'Home'
  // would replace the layout's title template instead of filling it in,
  // since the root layout and root page share the same route segment.
  description: pageMetadata.home.description,
}

const SECONDARY_ITEMS = [
  'SaaS Platforms', 'MVP to Scale', 'APIs & Microservices',
  'Cloud Deployment', 'DevOps Automation', 'Data Engineering',
  'Security Hardening',
]

export default function Page() {
  return (
    <main>

      {/* ─── HERO ─── */}
      <section className="hero-section">
        <div className="hero-cols">
          <div className="hero-inner">
            <p className="hero-eyebrow">Mumbai — India · Est. 2022</p>

            <h1 className="hero-headline">
              <span className="hero-line">Design that moves.</span>
              <span className="hero-line">Code that scales.</span>
              <span className="hero-line">Products that win.</span>
            </h1>

            <p className="hero-sub">
              Premium UI/UX &amp; product engineering for industry leaders.
            </p>
          </div>

          <div className="hero-3d-col" aria-hidden="true">
            <HomeHero3D />
          </div>
        </div>
      </section>

      {/* ─── TICKER ─── */}
      <HomeTicker />

      {/* ─── MANIFESTO ─── */}
      <Manifesto />

      {/* ─── STATS ─── */}
      <StatsSection />

      {/* ─── HOW WE BUILD ─── */}
      <ProcessSection />

      {/* ─── SERVICES STACK ─── */}
      <ServicesStack />

      {/* ─── SECONDARY MARQUEE ─── */}
      <div className="secondary-marquee">
        <div className="secondary-marquee__track" aria-hidden="true">
          {[...SECONDARY_ITEMS, ...SECONDARY_ITEMS, ...SECONDARY_ITEMS].map((item, i) => (
            <span key={i} className="secondary-marquee__item">
              <span className="secondary-marquee__text">{item}</span>
              <span className="secondary-marquee__sep" />
            </span>
          ))}
        </div>
      </div>

      {/* ─── PROMO BLOCKS (4 alternating image+text) ─── */}
      <PromoBlocks />

      {/* ─── WORK SHOWCASE ─── */}
      <WorkShowcase />

      {/* ─── TESTIMONIALS ─── */}
      <TestimonialsSection />

      {/* ─── WHY US / FEATURES CARDS ─── */}
      <WhyUs />

      {/* ─── CTA ─── */}
      <HomeCTA />

    </main>
  )
}
