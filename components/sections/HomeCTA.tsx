'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function HomeCTA() {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!ref.current) return
    const ctx = gsap.context(() => {
      gsap.from(['.hcta-heading', '.hcta-btn'], {
        y: 28,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 82%',
          toggleActions: 'play none none none',
        },
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} className="hcta-section">
      <div className="hcta-inner">
        <h2 className="hcta-heading">
          <span className="hcta-accent">Build remarkable.</span>{' '}
          Launch a product that looks stunning, performs under pressure, and scales with your ambition.
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
