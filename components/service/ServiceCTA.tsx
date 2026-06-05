'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'

export function ServiceCTA({ service }: { service: string }) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const init = async () => {
      const { gsap }          = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      gsap.from('.scta-btn', {
        y: 28, opacity: 0, duration: 0.75, ease: 'power3.out',
        scrollTrigger: { trigger: '.scta-btn', start: 'top 90%' },
      })
    }
    init()
  }, [])

  return (
    <section ref={ref} className="scta-section">
      <div className="scta-inner">
        <p className="scta-eyebrow">Ready to start?</p>
        <h2 className="scta-heading">
          Let&apos;s build your<br />
          <span className="scta-accent">{service}</span> project.
        </h2>
        <p className="scta-sub">
          Tell us about your goals and we&apos;ll come back with a plan, timeline, and fixed price.
        </p>
        <div className="scta-btn">
          <Link href="/contact" className="scta-link">
            Start a project →
          </Link>
        </div>
      </div>
    </section>
  )
}
