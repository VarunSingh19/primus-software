'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const FEATURES = [
  {
    id: 'craft',
    num: '01',
    icon: 'ph ph-pencil-ruler',
    title: 'Pixel-perfect craft',
    body: 'Designed around real users — flows, hierarchy, and micro-interactions tuned to drive conversion and reduce cognitive load.',
    tags: ['Research-driven', 'Accessible', 'WCAG 2.2'],
    accentRgb: '99,102,241',
    col: 7,
    visual: 'mockup' as const,
  },
  {
    id: 'perf',
    num: '02',
    icon: 'ph ph-gauge',
    title: 'Performance-first',
    body: 'LCP under 1.5 s, CLS near zero, INP instant. Core Web Vitals budgeted and enforced from day one.',
    tags: ['Core Web Vitals', 'SEO', 'Edge CDN'],
    accentRgb: '6,182,212',
    col: 5,
    visual: 'score' as const,
  },
  {
    id: 'zero',
    num: '03',
    icon: 'ph ph-arrows-clockwise',
    title: 'Zero rework',
    body: 'Clickable prototypes and usability sessions before a single line ships. Fewer surprises, tighter cycles.',
    tags: ['Figma', 'User tests', 'Rapid iteration'],
    accentRgb: '16,185,129',
    col: 4,
    visual: null,
  },
  {
    id: 'own',
    num: '04',
    icon: 'ph ph-stack',
    title: 'End-to-end ownership',
    body: 'Design system, frontend, backend, infra — one team, total accountability, zero handoff chaos.',
    tags: ['Full-stack', 'CI/CD', 'QA'],
    accentRgb: '245,158,11',
    col: 4,
    visual: null,
  },
  {
    id: 'int',
    num: '05',
    icon: 'ph ph-plugs-connected',
    title: 'Integrated by default',
    body: 'ERP, CRM, payments, analytics — stitched with clean APIs and event-driven workflows that surface signal over noise.',
    tags: ['Next.js', 'Stripe', 'AWS', 'Figma'],
    accentRgb: '139,92,246',
    col: 4,
    visual: 'stack' as const,
  },
]

const STACK_ITEMS = ['Next.js', 'Stripe', 'Supabase', 'AWS', 'Vercel', 'Figma', 'Shopify']

function UIMockup() {
  return (
    <div className="why-mockup" aria-hidden="true">
      <div className="why-mockup__chrome">
        <span className="why-mockup__dot" />
        <span className="why-mockup__dot" />
        <span className="why-mockup__dot" />
        <div className="why-mockup__url-bar" />
      </div>
      <div className="why-mockup__canvas">
        <div className="why-mockup__nav-row">
          <span className="why-mockup__skel why-mockup__skel--logo" />
          <span className="why-mockup__skel why-mockup__skel--navlinks" />
          <span className="why-mockup__skel why-mockup__skel--cta" />
        </div>
        <div className="why-mockup__hero-row">
          <span className="why-mockup__skel why-mockup__skel--h1" />
          <span className="why-mockup__skel why-mockup__skel--h1 why-mockup__skel--short" />
          <span className="why-mockup__skel why-mockup__skel--sub" />
          <span className="why-mockup__skel why-mockup__skel--btn" />
        </div>
        <div className="why-mockup__card-row">
          <div className="why-mockup__card-sk" />
          <div className="why-mockup__card-sk" />
          <div className="why-mockup__card-sk" />
        </div>
      </div>
    </div>
  )
}

function PerfRing() {
  const r = 40
  const circ = 2 * Math.PI * r
  return (
    <div className="why-ring" aria-hidden="true">
      <svg className="why-ring__svg" viewBox="0 0 96 96" fill="none">
        <circle cx="48" cy="48" r={r} stroke="rgba(255,255,255,0.07)" strokeWidth="6" />
        <circle
          className="why-ring__arc"
          cx="48" cy="48" r={r}
          stroke="#06b6d4"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={String(circ)}
          strokeDashoffset={String(circ)}
          style={{ transform: 'rotate(-90deg)', transformOrigin: '48px 48px' }}
        />
      </svg>
      <div className="why-ring__label">
        <span className="why-ring__num why-ring-num" data-target="97">0</span>
        <span className="why-ring__sub">score</span>
      </div>
    </div>
  )
}

export function WhyUs() {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = ref.current
    if (!section) return

    const cards  = Array.from(section.querySelectorAll<HTMLElement>('.why-card'))
    const arc    = section.querySelector<SVGCircleElement>('.why-ring__arc')
    const ringNum = section.querySelector<HTMLElement>('.why-ring-num')
    const r = 40
    const circ = 2 * Math.PI * r

    /* Ring: CSS transition (set in JS so no SSR flash) */
    if (arc) {
      arc.style.transition = 'stroke-dashoffset 1.4s cubic-bezier(0.16,1,0.3,1) 0.35s'
    }

    /* Scroll entry + ring/count-up trigger */
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cards,
        { opacity: 0, y: 40, filter: 'blur(6px)' },
        {
          opacity: 1, y: 0, filter: 'blur(0px)',
          stagger: 0.085,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            onEnter: () => {
              if (arc) arc.style.strokeDashoffset = String(circ * 0.03)
              if (ringNum) {
                const target = parseInt(ringNum.dataset.target ?? '97', 10)
                const dur = 1500
                const t0 = performance.now()
                const tick = (now: number) => {
                  const p = Math.min((now - t0) / dur, 1)
                  const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p)
                  ringNum.textContent = String(Math.floor(eased * target))
                  if (p < 1) requestAnimationFrame(tick)
                  else ringNum.textContent = String(target)
                }
                setTimeout(() => requestAnimationFrame(tick), 350)
              }
            },
            toggleActions: 'play none none none',
          },
        }
      )
    }, section)

    /* Per-card: spotlight + tilt + icon float */
    const cleanups: (() => void)[] = []

    cards.forEach(card => {
      const icon = card.querySelector<HTMLElement>('.why-card__icon')

      const onMove = (e: MouseEvent) => {
        const rect = card.getBoundingClientRect()
        card.style.setProperty('--mx', `${((e.clientX - rect.left) / rect.width) * 100}%`)
        card.style.setProperty('--my', `${((e.clientY - rect.top) / rect.height) * 100}%`)
        const rx = ((e.clientY - rect.top  - rect.height / 2) / (rect.height / 2)) * -3.5
        const ry = ((e.clientX - rect.left - rect.width  / 2) / (rect.width  / 2)) *  3.5
        card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-5px) scale(1.015)`
      }

      const onEnter = () => {
        if (icon) icon.style.transform = 'translateY(-4px) scale(1.15)'
      }

      const onLeave = () => {
        card.style.removeProperty('--mx')
        card.style.removeProperty('--my')
        card.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0px) scale(1)'
        if (icon) icon.style.transform = ''
        /* snap back after transition completes */
        setTimeout(() => { if (card) card.style.transform = '' }, 520)
      }

      card.addEventListener('mousemove',  onMove)
      card.addEventListener('mouseenter', onEnter)
      card.addEventListener('mouseleave', onLeave)

      cleanups.push(() => {
        card.removeEventListener('mousemove',  onMove)
        card.removeEventListener('mouseenter', onEnter)
        card.removeEventListener('mouseleave', onLeave)
      })
    })

    return () => {
      ctx.revert()
      cleanups.forEach(fn => fn())
    }
  }, [])

  return (
    <section ref={ref} className="why-section">
      <div className="why-inner">
        <p className="why-eyebrow">Why teams choose us</p>

        <div className="why-bento">
          {FEATURES.map(f => (
            <div
              key={f.id}
              className="why-card"
              style={{ '--accent': f.accentRgb, gridColumn: `span ${f.col}` } as React.CSSProperties}
            >
              {/* ghost decoration number */}
              <span className="why-card__ghost" aria-hidden="true">{f.num}</span>

              {/* icon */}
              <i className={`why-card__icon ${f.icon}`} aria-hidden="true" />

              {/* text */}
              <h3 className="why-card__title">{f.title}</h3>
              <p className="why-card__body">{f.body}</p>

              {/* tags — slide up on hover */}
              <div className="why-card__tags">
                {f.tags.map(t => <span key={t} className="why-tag">{t}</span>)}
              </div>

              {/* card-specific visual */}
              {f.visual === 'mockup' && <UIMockup />}
              {f.visual === 'score'  && <PerfRing />}
              {f.visual === 'stack'  && (
                <div className="why-stack" aria-hidden="true">
                  {STACK_ITEMS.map(s => <span key={s} className="why-stack__badge">{s}</span>)}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
