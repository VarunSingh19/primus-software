'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { ServiceAboutData } from './types'

gsap.registerPlugin(ScrollTrigger)

export function ServiceAbout({ data }: { data: ServiceAboutData }) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const ctx = gsap.context(() => {
      /* char-by-char heading reveal */
      const chars = el.querySelectorAll<HTMLElement>('.sa-char')
      if (chars.length) {
        ScrollTrigger.create({
          trigger: el,
          start: 'top 88%',
          end:   'top 42%',
          scrub: 1,
          onUpdate: (self) => {
            const n = chars.length
            chars.forEach((c, i) => {
              const t = Math.max(0, Math.min(1, (self.progress - (i / n) * 0.7) / 0.3))
              c.style.color = `rgba(241,245,249,${0.12 + t * 0.88})`
            })
          },
        })
      }

      /* paragraph fade-in */
      gsap.fromTo('.sa-para',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 82%', toggleActions: 'play none none none' } }
      )

      if (data.principles?.length) {
        /* principle cards stagger in */
        gsap.fromTo('.sa-card',
          { opacity: 0, y: 28, scale: 0.96 },
          { opacity: 1, y: 0, scale: 1, duration: 0.65, ease: 'power3.out', stagger: 0.08,
            scrollTrigger: { trigger: '.sa-cards', start: 'top 85%', toggleActions: 'play none none none' } }
        )
      } else {
        /* plain list items slide in */
        gsap.utils.toArray<HTMLElement>('.sa-li').forEach(item => {
          gsap.fromTo(item,
            { opacity: 0, x: -14 },
            { opacity: 1, x: 0, duration: 0.5, ease: 'power3.out',
              scrollTrigger: { trigger: item, start: 'top 88%', toggleActions: 'play none none none' } }
          )
        })
      }

      gsap.fromTo('.sa-cta',
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.65, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 75%', toggleActions: 'play none none none' } }
      )
    }, el)

    return () => ctx.revert()
  }, [data.principles])

  return (
    <section ref={ref} className="sa-section">
      <div className="sa-inner">

        {/* Left: char-reveal heading */}
        <h2 className="sa-heading">
          {data.heading.split('').map((char, i) => (
            <span
              key={i}
              className="sa-char"
              style={{ color: 'rgba(241,245,249,0.12)', display: char === '\n' ? 'block' : 'inline' }}
            >
              {char === '\n' ? '' : char === ' ' ? ' ' : char}
            </span>
          ))}
        </h2>

        {/* Right: body content */}
        <div className="sa-body">
          <p className="sa-para">{data.paragraph}</p>

          {data.principles?.length ? (
            /* ── Principle card grid ── */
            <div className="sa-cards">
              {data.principles.map((p, i) => (
                <div key={i} className="sa-card">
                  <div className="sa-card__icon">
                    <i className={`ph-bold ph-${p.icon}`} aria-hidden="true" />
                  </div>
                  <div className="sa-card__text">
                    <p className="sa-card__title">{p.title}</p>
                    <p className="sa-card__desc">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* ── Fallback: plain bullet list ── */
            <div className="sa-cols">
              {[data.col1, data.col2].map((col, ci) => (
                <ul key={ci} className="sa-col">
                  {col.map(item => (
                    <li key={item} className="sa-li">— {item}</li>
                  ))}
                </ul>
              ))}
            </div>
          )}

          <Link href="/contact" className="sa-cta">
            Start a project →
          </Link>
        </div>

      </div>
    </section>
  )
}
