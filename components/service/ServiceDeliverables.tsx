'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { DeliverableCard } from './types'

gsap.registerPlugin(ScrollTrigger)

const BG: Record<string, string> = {
  dark:   '#0d1117',
  indigo: '#6366f1',
  tint:   '#0f172a',
  accent: 'linear-gradient(135deg,#06b6d4,#0891b2)',
}

const FG: Record<string, string> = {
  dark:   '#f1f5f9',
  indigo: '#ffffff',
  tint:   '#f1f5f9',
  accent: '#ffffff',
}

export function ServiceDeliverables({ cards }: { cards: DeliverableCard[] }) {
  const sectionRef = useRef<HTMLElement>(null)
  const cardRefs   = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      const els = cardRefs.current.filter(Boolean) as HTMLDivElement[]

      els.forEach((card, i) => {
        if (i === els.length - 1) return   // last card never scales down

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
    <section ref={sectionRef} className="sdv-section">
      <div className="sdv-header">
        <p className="svc-eyebrow">What we deliver</p>
      </div>

      {/* Same stacking container as home page ServicesStack */}
      <div className="svc-stack">
        {cards.map((card, i) => {
          const num = `/${String(i + 1).padStart(2, '0')}`
          const bg  = BG[card.variant] ?? BG.dark
          const fg  = FG[card.variant] ?? FG.dark

          return (
            <div key={i} className="svc-sticky" style={{ zIndex: i + 1 }}>
              <div
                ref={el => { cardRefs.current[i] = el }}
                className="svc-card"
                style={{ background: bg, color: fg }}
              >
                <span className="svc-ghost-num" aria-hidden="true">{num}</span>

                <div className="svc-card__inner">
                  <div className="svc-card__top">
                    <span className="svc-num">{num}</span>
                    <h3 className="svc-title">{card.title}</h3>
                    <p className="svc-desc">{card.desc}</p>
                  </div>

                  {(card.col1 || card.col2) && (
                    <div className="svc-card__grid">
                      {card.col1 && (
                        <div>
                          <p className="svc-col-heading">{card.col1.heading}</p>
                          {card.col1.items.map(it => <p key={it} className="svc-col-item">{it}</p>)}
                        </div>
                      )}
                      {card.col2 && (
                        <div>
                          <p className="svc-col-heading">{card.col2.heading}</p>
                          {card.col2.items.map(it => <p key={it} className="svc-col-item">{it}</p>)}
                        </div>
                      )}
                    </div>
                  )}

                  <div className="svc-card__footer">
                    <div className="svc-tags">
                      {card.tags.map(t => <span key={t} className="svc-tag">{t}</span>)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
