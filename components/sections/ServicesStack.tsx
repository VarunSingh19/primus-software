'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface Service {
  num: string
  title: string
  desc: string
  col1: { heading: string; items: string[] }
  col2: { heading: string; items: string[] }
  tags: string[]
  href: string
  bg: string
  fg: string
  accentOpacity: string
}

const SERVICES: Service[] = [
  {
    num: '/01',
    title: 'UI/UX Design',
    desc: 'Human-centered product design that converts. Research-driven interfaces, interaction patterns, and design systems built to scale with your product.',
    col1: { heading: 'Deliverables', items: ['User research & flows', 'Wireframes & prototypes', 'Design systems', 'Developer handoff'] },
    col2: { heading: 'Outcomes', items: ['Higher conversions', 'Faster time-to-ship', 'WCAG compliance', 'Less rework'] },
    tags: ['UI/UX', 'Prototyping', 'Research', 'Figma'],
    href: '/ui-ux',
    bg: '#0d1117',
    fg: '#f1f5f9',
    accentOpacity: 'rgba(99,102,241,0.06)',
  },
  {
    num: '/02',
    title: 'Websites & Web Apps',
    desc: 'Fast, SEO-ready marketing sites and custom web apps. Type-safe code, CI/CD pipelines, and performance budgets built in from day one.',
    col1: { heading: 'What we build', items: ['Marketing sites', 'Portals & dashboards', 'CMS integrations', 'PWAs'] },
    col2: { heading: 'Engineering', items: ['Type-safe code', 'Performance optimisation', 'Caching & CDN', 'Security hardening'] },
    tags: ['Next.js', 'React', 'TypeScript', 'Node.js'],
    href: '/website-webapps',
    bg: '#2b2bff',
    fg: '#ffffff',
    accentOpacity: 'rgba(255,255,255,0.06)',
  },
  {
    num: '/03',
    title: 'SaaS & Product Design',
    desc: 'End-to-end product design and engineering for SaaS. From concept to launched product — we own the full stack, design system, and all the handoffs.',
    col1: { heading: 'Product scope', items: ['MVP architecture', 'Auth & billing', 'Admin dashboards', 'API design'] },
    col2: { heading: 'At scale', items: ['Multi-tenancy', 'Analytics & telemetry', 'Growth tooling', 'Reliability SLOs'] },
    tags: ['SaaS', 'Product', 'Architecture', 'Scale'],
    href: '/saas-product-design',
    bg: '#0d1117',
    fg: '#f1f5f9',
    accentOpacity: 'rgba(6,182,212,0.06)',
  },
  {
    num: '/04',
    title: 'eCommerce',
    desc: 'Scalable ecommerce platforms engineered for revenue. Headless storefronts, custom checkout flows, and full payment & CRM integrations.',
    col1: { heading: 'Platforms', items: ['Shopify & headless', 'WooCommerce', 'Custom storefronts', 'B2B portals'] },
    col2: { heading: 'Integrations', items: ['Payment gateways', 'ERP/CRM sync', 'Inventory systems', 'Analytics'] },
    tags: ['Shopify', 'Stripe', 'Performance', 'Headless'],
    href: '/ecommerce',
    bg: '#0f172a',
    fg: '#f1f5f9',
    accentOpacity: 'rgba(99,102,241,0.06)',
  },
]

export function ServicesStack() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardRefs   = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[]

    const ctx = gsap.context(() => {
      cards.forEach((card, i) => {
        if (i === cards.length - 1) return   // last card never scales down

        ScrollTrigger.create({
          trigger: card,
          start: 'top top',
          end: () => `+=${window.innerHeight}`,
          scrub: true,
          onUpdate: (self) => {
            gsap.set(card, {
              scale: 1 - self.progress * 0.06,
              transformOrigin: 'top center',
            })
          },
        })
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="svc-section">
      <div className="svc-header">
        <p className="svc-eyebrow">What we do</p>
        <h2 className="svc-heading">Services</h2>
      </div>

      <div className="svc-stack">
        {SERVICES.map((svc, i) => (
          <div
            key={svc.num}
            className="svc-sticky"
            style={{ zIndex: i + 1 }}
          >
            <div
              ref={el => { cardRefs.current[i] = el }}
              className="svc-card"
              style={{ background: svc.bg, color: svc.fg }}
            >
              {/* Ghost number */}
              <span className="svc-ghost-num" aria-hidden="true">{svc.num}</span>

              <div className="svc-card__inner">
                <div className="svc-card__top">
                  <span className="svc-num">{svc.num}</span>
                  <h3 className="svc-title">{svc.title}</h3>
                  <p className="svc-desc">{svc.desc}</p>
                </div>

                <div className="svc-card__grid">
                  <div>
                    <p className="svc-col-heading">{svc.col1.heading}</p>
                    {svc.col1.items.map(it => <p key={it} className="svc-col-item">{it}</p>)}
                  </div>
                  <div>
                    <p className="svc-col-heading">{svc.col2.heading}</p>
                    {svc.col2.items.map(it => <p key={it} className="svc-col-item">{it}</p>)}
                  </div>
                </div>

                <div className="svc-card__footer">
                  <div className="svc-tags">
                    {svc.tags.map(t => <span key={t} className="svc-tag">{t}</span>)}
                  </div>
                  <Link href={svc.href} className="svc-link">
                    Learn more →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
