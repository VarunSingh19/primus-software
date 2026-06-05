'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { ServiceHeroData } from './types'

gsap.registerPlugin(ScrollTrigger)

/* Pulsing star icon — inline in the sh04 headline */
const PulseIcon = () => (
  <span className="sh04-pulse-icon" aria-hidden="true">
    <svg viewBox="0 0 20 20" fill="currentColor">
      <path d="M19.6,9.6h-3.9c-.4,0-1.8-.2-1.8-.2-.6,0-1.1-.2-1.6-.6-.5-.3-.9-.8-1.2-1.2-.3-.4-.4-.9-.5-1.4,0,0,0-1.1-.2-1.5V.4c0-.2-.2-.4-.4-.4s-.4.2-.4.4v4.4c0,.4-.2,1.5-.2,1.5,0,.5-.2,1-.5,1.4-.3.5-.7.9-1.2,1.2s-1,.5-1.6.6c0,0-1.2,0-1.7.2H.4c-.2,0-.4.2-.4.4s.2.4.4.4h4.1c.4,0,1.7.2,1.7.2.6,0,1.1.2,1.6.6.4.3.8.7,1.1,1.1.3.5.5,1,.6,1.6,0,0,0,1.3.2,1.7v4.1c0,.2.2.4.4.4s.4-.2.4-.4v-4.1c0-.4.2-1.7.2-1.7,0-.6.2-1.1.6-1.6.3-.4.7-.8,1.1-1.1.5-.3,1-.5,1.6-.6,0,0,1.3,0,1.8-.2h3.9c.2,0,.4-.2.4-.4s-.2-.4-.4-.4h0Z"/>
    </svg>
  </span>
)

const StarIcon = () => (
  <svg viewBox="0 0 20 20" className="sh-star" fill="currentColor" aria-hidden="true">
    <path d="M19.6,9.6h-3.9c-.4,0-1.8-.2-1.8-.2-.6,0-1.1-.2-1.6-.6-.5-.3-.9-.8-1.2-1.2-.3-.4-.4-.9-.5-1.4,0,0,0-1.1-.2-1.5V.4c0-.2-.2-.4-.4-.4s-.4.2-.4.4v4.4c0,.4-.2,1.5-.2,1.5,0,.5-.2,1-.5,1.4-.3.5-.7.9-1.2,1.2s-1,.5-1.6.6c0,0-1.2,0-1.7.2H.4c-.2,0-.4.2-.4.4s.2.4.4.4h4.1c.4,0,1.7.2,1.7.2.6,0,1.1.2,1.6.6.4.3.8.7,1.1,1.1.3.5.5,1,.6,1.6,0,0,0,1.3.2,1.7v4.1c0,.2.2.4.4.4s.4-.2.4-.4v-4.1c0-.4.2-1.7.2-1.7,0-.6.2-1.1.6-1.6.3-.4.7-.8,1.1-1.1.5-.3,1-.5,1.6-.6,0,0,1.3,0,1.8-.2h3.9c.2,0,.4-.2.4-.4s-.2-.4-.4-.4h0Z"/>
  </svg>
)

export function ServiceHero({ data }: { data: ServiceHeroData }) {
  const sh08Ref   = useRef<HTMLElement>(null)
  const sh04Ref   = useRef<HTMLElement>(null)
  const marqueeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    /* Duplicate marquee for seamless loop */
    if (marqueeRef.current) {
      marqueeRef.current.innerHTML += marqueeRef.current.innerHTML
    }

    /* ── sh08 ── */
    const ctx08 = gsap.context(() => {
      // Blob rotation — independent, never touches opacity
      gsap.to('.sh08-blob', {
        rotation: 360,
        duration: 18,
        ease: 'none',
        repeat: -1,
      })

      // Scroll-out: title is ALREADY visible (CSS default).
      // fromTo with explicit start=visible so GSAP never sets it invisible
      // on mount. immediateRender:false prevents the FROM state from
      // being applied until the scroll trigger actually starts.
      gsap.fromTo('.sh08-title',
        { y: 0, opacity: 1 },
        {
          y: -110,
          opacity: 0,
          ease: 'none',
          immediateRender: false,
          scrollTrigger: {
            trigger: sh08Ref.current,
            start: 'top top',
            end: 'bottom 35%',
            scrub: 1.2,
          },
        }
      )
    }, sh08Ref)

    /* ── sh04: scroll-triggered entrance ── */
    const ctx04 = gsap.context(() => {
      // Use ScrollTrigger so animations only fire when sh04 enters view.
      // This avoids the "element stuck invisible" problem on route change.
      gsap.fromTo(['.sh04-eyebrow', '.sh04-desc'],
        { opacity: 0, y: 18 },
        {
          opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: sh04Ref.current, start: 'top 85%', toggleActions: 'play none none none' },
        }
      )
      gsap.fromTo('.sh04-line',
        { opacity: 0, y: 40, skewX: 2 },
        {
          opacity: 1, y: 0, skewX: 0, duration: 0.85, stagger: 0.1, ease: 'power4.out',
          scrollTrigger: { trigger: sh04Ref.current, start: 'top 80%', toggleActions: 'play none none none' },
        }
      )
      gsap.fromTo('.sh04-li',
        { opacity: 0, y: 12 },
        {
          opacity: 1, y: 0, duration: 0.5, stagger: 0.04, ease: 'power2.out',
          scrollTrigger: { trigger: sh04Ref.current, start: 'top 75%', toggleActions: 'play none none none' },
        }
      )
    }, sh04Ref)

    return () => {
      ctx08.revert()
      ctx04.revert()
    }
  }, [])

  const accent = data.accent ?? '#6366f1'
  const headline = data.headlineLines.join(' ')

  return (
    <>
      {/* ─── Section 1: Cinematic full-screen title ─── */}
      <section ref={sh08Ref} className="sh08">
        {/* Ambient gradient background */}
        <div className="sh08-bg" style={{ '--accent': accent } as React.CSSProperties} />

        <div className="sh08-center">
          {/* Custom 3D element OR default animated blob */}
          {data.hero3D ? (
            <div className="sh08-custom-3d">{data.hero3D}</div>
          ) : (
            <div className="sh08-blob-wrap" aria-hidden="true">
              <div className="sh08-blob" style={{ background: `radial-gradient(circle at 40% 40%, ${accent}88 0%, ${accent}22 55%, transparent 75%)` }} />
            </div>
          )}

          {/* Giant title */}
          <div className="sh08-title">
            <h1 className="sh08-h1">
              {data.headlineLines.map((line, i) => (
                <span key={i} className="sh08-line">{line}</span>
              ))}
            </h1>
          </div>
        </div>
      </section>

      {/* ─── Section 2: Two-column detailed hero ─── */}
      <section ref={sh04Ref} className="sh04">
        <div className="sh04-wrap">
          {/* LEFT column — description */}
          <div className="sh04-left">
            <p className="sh04-eyebrow">{data.eyebrow}</p>
            <p className="sh04-desc">{data.description}</p>
          </div>

          {/* RIGHT column — stylised headline + feature list */}
          <div className="sh04-right">
            <h2 className="sh04-headline">
              {data.headlineLines.map((line, i) => (
                <span key={i} className="sh04-line">
                  {i === data.headlineLines.length - 1
                    ? <><PulseIcon />{' '}{line}</>
                    : line}
                </span>
              ))}
              {data.tagline && (
                <span className="sh04-line sh04-tagline">{data.tagline}</span>
              )}
            </h2>

            {/* Feature chips — two labelled groups */}
            <div className="sh04-groups">
              {[
                { label: 'Deliverables', items: data.col1, accent: 'indigo' },
                { label: 'Outcomes',     items: data.col2, accent: 'cyan'   },
              ].map(({ label, items, accent }) => (
                <div key={label} className="sh04-group">
                  <p className={`sh04-group-label sh04-group-label--${accent}`}>{label}</p>
                  <div className="sh04-chips">
                    {items.map(item => (
                      <span key={item} className={`sh04-chip sh04-chip--${accent}`}>{item}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* BOTTOM — marquee strip */}
          <div className="sh04-marquee-wrap">
            <div ref={marqueeRef} className="sh04-marquee-track">
              {data.marqueeItems.map((item, i) => (
                <span key={i} className="sh04-marquee-item">
                  <StarIcon />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
