import type { Metadata } from 'next'
import { HomeTicker }   from '@/components/sections/HomeTicker'
import { Manifesto }    from '@/components/sections/Manifesto'
import { ServicesStack } from '@/components/sections/ServicesStack'
import { WhyUs }        from '@/components/sections/WhyUs'
import { HomeCTA }      from '@/components/sections/HomeCTA'
import { baseMetadata, pageMetadata } from '@/lib/metadata'

export const metadata: Metadata = {
  ...baseMetadata,
  title: pageMetadata.home.title,
  description: pageMetadata.home.description,
}

export default function Page() {
  return (
    <main>

        {/* ─── HERO ─── */}
        <section className="hero-section">
          {/* Floating blobs */}
          <div className="hero-blob hero-blob--purple" aria-hidden="true" />
          <div className="hero-blob hero-blob--cyan"   aria-hidden="true" />
          <div className="hero-blob hero-blob--blue"   aria-hidden="true" />

          <div className="hero-inner">
            <p className="hero-eyebrow">Mumbai — India · Est. 2017</p>

            <h1 className="hero-headline">
              <span className="hero-line">Design that moves.</span>
              <span className="hero-line">Code that scales.</span>
              <span className="hero-line">Products that win.</span>
            </h1>

            <p className="hero-sub">
              Premium UI/UX &amp; product engineering for industry leaders.
            </p>
          </div>
        </section>

        {/* ─── TICKER ─── */}
        <HomeTicker />

        {/* ─── MANIFESTO ─── */}
        <Manifesto />

        {/* ─── SERVICES STACK ─── */}
        <ServicesStack />

        {/* ─── WHY US ─── */}
        <WhyUs />

        {/* ─── STATS ─── */}
        <section className="mxd-section va-stats-section">
          <div className="va-line-draw" />
          <div className="va-stats-grid">
            {[
              { num: '50', suffix: '+', label: 'Projects delivered' },
              { num: '98', suffix: '%', label: 'Client retention'   },
              { num: '4',  suffix: '×', label: 'Faster delivery'    },
              { num: '12', suffix: '+', label: 'Industries served'  },
            ].map(s => (
              <div key={s.label} className="va-stat-card tilt-card">
                <div className="va-stat-number">
                  {s.num}<span className="va-stat-suffix">{s.suffix}</span>
                </div>
                <div className="va-stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── CTA ─── */}
        <HomeCTA />

      </main>
  )
}
