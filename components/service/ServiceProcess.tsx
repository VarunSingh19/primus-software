'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { ServiceProcessData } from './types'

gsap.registerPlugin(ScrollTrigger)

export function ServiceProcess({ data }: { data: ServiceProcessData }) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Char-by-char heading reveal */
      const chars = ref.current?.querySelectorAll<HTMLElement>('.spr-char')
      if (chars?.length) {
        ScrollTrigger.create({
          trigger: ref.current,
          start: 'top 82%',
          end:   'top 46%',
          scrub: 1,
          onUpdate: (self) => {
            const n = chars.length
            chars.forEach((c, i) => {
              const t = Math.max(0, Math.min(1, (self.progress - (i / n) * 0.7) / 0.3))
              c.style.opacity = String(0.15 + t * 0.85)
            })
          },
        })
      }

      /* Each row slides up */
      gsap.utils.toArray<HTMLElement>('.spr-row').forEach((row, i) => {
        gsap.fromTo(row,
          { opacity: 0, y: 28 },
          {
            opacity: 1, y: 0, duration: 0.65, ease: 'power3.out',
            scrollTrigger: { trigger: ref.current, start: 'top 74%', toggleActions: 'play none none none' },
            delay: i * 0.08,
          }
        )
      })

      /* Hover micro-interaction: arrow icon translates right */
      gsap.utils.toArray<HTMLElement>('.spr-row').forEach(row => {
        const icon = row.querySelector<HTMLElement>('.spr-row__icon')
        if (!icon) return
        row.addEventListener('mouseenter', () => {
          gsap.to(icon, { x: 5, duration: 0.25, ease: 'power2.out' })
        })
        row.addEventListener('mouseleave', () => {
          gsap.to(icon, { x: 0, duration: 0.35, ease: 'elastic.out(1, 0.5)' })
        })
      })
    }, ref)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} className="spr-section">
      <div className="spr-inner">

        <h2 className="spr-heading">
          {data.heading.split('').map((char, i) => (
            <span
              key={i}
              className="spr-char"
              style={{
                opacity: 0.15,
                display: char === '\n' ? 'block' : 'inline',
              }}
            >
              {char === '\n' ? '' : char === ' ' ? ' ' : char}
            </span>
          ))}
        </h2>

        <div className="spr-list">
          {data.steps.map((step, i) => (
            <div key={step.label} className="spr-row">
              <div className="spr-row__top-border" />
              <div className="spr-row__inner">
                {/* Step label */}
                <div className="spr-row__label">
                  <span className="spr-row__icon" aria-hidden="true">
                    <i className="ph ph-arrow-right" />
                  </span>
                  <p className="spr-row__title">{step.label}</p>
                </div>

                {/* Tags */}
                <ul className="spr-row__tags">
                  {step.tags.map(tag => <li key={tag}>{tag}</li>)}
                </ul>

                {/* Duration */}
                <p className="spr-row__dur">{step.duration}</p>
              </div>
              {i === data.steps.length - 1 && <div className="spr-row__top-border" />}
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
