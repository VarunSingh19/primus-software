'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function Tag({ children }: { children: string }) {
  return (
    <span className="wu-tag">{children}</span>
  )
}

function MiniChart() {
  return (
    <div className="wu-chart" aria-hidden="true">
      <div className="wu-chart__bars">
        <div style={{ height: '55%',  background: '#2b2bff' }} />
        <div style={{ height: '75%',  background: '#6b6bff' }} />
        <div style={{ height: '45%',  background: '#2b2bff' }} />
        <div style={{ height: '90%',  background: '#a5b4fc' }} />
        <div style={{ height: '65%',  background: '#2b2bff' }} />
        <div style={{ height: '100%', background: '#6b6bff' }} />
      </div>
      <div className="wu-chart__lines">
        <div /><div /><div />
      </div>
    </div>
  )
}

export function WhyUs() {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!ref.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo('.wu-card',
        { opacity: 0, y: 36, scale: 0.97 },
        {
          opacity: 1, y: 0, scale: 1,
          stagger: 0.1,
          duration: 0.75,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 82%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} className="wu-section">
      <p className="wu-eyebrow">Why teams choose us</p>

      <div className="wu-grid">
        {/* Card 1 — Craft */}
        <div className="wu-card wu-card--dark">
          <div className="wu-card__tags">
            <Tag>Research</Tag><Tag>Accessible</Tag><Tag>Polished</Tag>
          </div>
          <h3 className="wu-card__title">Pixel-perfect craft</h3>
          <p className="wu-card__body">
            Design around real users — flows, content, and micro-interactions that boost conversion and delight.
          </p>
          <MiniChart />
        </div>

        {/* Card 2 — Performance */}
        <div className="wu-card wu-card--indigo">
          <div className="wu-card__tags">
            <Tag>Core Web Vitals</Tag><Tag>SEO</Tag><Tag>Speed</Tag>
          </div>
          <h3 className="wu-card__title">Performance-first engineering</h3>
          <p className="wu-card__body">
            Ship lightning-fast experiences tuned for LCP, CLS, and INP. Because speed sells.
          </p>
        </div>

        {/* Card 3 — Zero rework */}
        <div className="wu-card wu-card--outline">
          <div className="wu-card__tags">
            <Tag>Clickable</Tag><Tag>User-tested</Tag><Tag>Iteration</Tag>
          </div>
          <h3 className="wu-card__title">Zero-rework delivery</h3>
          <p className="wu-card__body">
            Validate ideas before a single line of production code is written. Faster cycles, less waste.
          </p>
        </div>

        {/* Card 4 — Ownership (wide) */}
        <div className="wu-card wu-card--cyan wu-card--wide">
          <h3 className="wu-card__title">End-to-end ownership</h3>
          <p className="wu-card__body wu-card__body--wide">
            From first wireframe to production deploy — we own the full stack, design system, and all the handoffs. One team. Total accountability.
          </p>
          <div className="wu-card__icons">
            {['Design', 'Frontend', 'Backend', 'DevOps'].map(label => (
              <div key={label} className="wu-icon-chip">
                <div className="wu-icon-chip__dot" />
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Card 5 — Integrations (full width) */}
        <div className="wu-card wu-card--dark wu-card--full">
          <div className="wu-card__split">
            <div className="wu-card__split-text">
              <h3 className="wu-card__title">Integrated systems</h3>
              <p className="wu-card__body">
                ERP/CRM, payments, messaging, analytics — clean APIs and event-driven workflows that automate busywork and surface the signal.
              </p>
            </div>
            <div className="wu-card__split-visual" aria-hidden="true">
              <div className="wu-stack-badges">
                {['Next.js', 'Stripe', 'Supabase', 'Vercel', 'Figma', 'Shopify', 'AWS', 'Twilio'].map(name => (
                  <span key={name} className="wu-badge">{name}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
