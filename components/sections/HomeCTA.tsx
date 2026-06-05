'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const ACCENT = ['Build', 'remarkable.']
const BODY   = ['Launch', 'a', 'product', 'that', 'looks', 'stunning,', 'performs', 'under', 'pressure,', 'and', 'scales', 'with', 'your', 'ambition.']

export function HomeCTA() {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!ref.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo('.hcta-char',
        { opacity: 0.08 },
        {
          opacity: 1,
          stagger: 0.014,
          ease: 'none',
          scrollTrigger: {
            trigger: '.hcta-heading',
            start: 'top 80%',
            end: 'bottom 38%',
            scrub: 1,
          },
        }
      )
      gsap.from('.hcta-btn', {
        y: 32, opacity: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: '.hcta-btn', start: 'top 90%' },
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} className="hcta-section">
      <div className="hcta-inner">
        <h2 className="hcta-heading">
          {ACCENT.map((word, wi) => (
            <span key={`a${wi}`} className="hcta-word hcta-word--accent">
              {word.split('').map((char, ci) => (
                <span key={ci} className="hcta-char" style={{ opacity: 0.08 }}>{char}</span>
              ))}
              {' '}
            </span>
          ))}
          {BODY.map((word, wi) => (
            <span key={`b${wi}`} className="hcta-word">
              {word.split('').map((char, ci) => (
                <span key={ci} className="hcta-char" style={{ opacity: 0.08 }}>{char}</span>
              ))}
              {' '}
            </span>
          ))}
        </h2>

        <div className="hcta-btn">
          <Link href="/contact" className="hcta-link">
            Start a project
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
