'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const WORDS = [
  "We're", "a", "design", "&", "engineering", "studio",
  "obsessed", "with", "craft.", "From", "pixel-perfect",
  "interfaces", "to", "production-grade", "infrastructure,",
  "we", "ship", "digital", "products", "that", "look",
  "remarkable", "and", "perform", "under", "pressure.",
  "Trusted", "by", "leaders", "across", "manufacturing,",
  "fintech,", "FMCG,", "and", "high-growth", "startups.",
]

export function Manifesto() {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.mf-word',
        { color: 'rgba(255,255,255,0.1)' },
        {
          color: 'rgba(255,255,255,0.92)',
          stagger: 0.07,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top 72%',
            end: 'bottom 20%',
            scrub: 1.4,
          },
        }
      )
    }, el)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} className="mf-section">
      <p className="mf-eyebrow">About us</p>
      <p className="mf-text">
        {WORDS.map((w, i) => (
          <span key={i} className="mf-word">{w}&nbsp;</span>
        ))}
      </p>
    </section>
  )
}
