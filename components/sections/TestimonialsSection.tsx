'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const TESTIMONIALS = [
  {
    id: 1,
    quote:
      'VA Softwares transformed our online presence end-to-end — clean UX, faster load times, and a smooth launch. The site now reflects our brand and wins trust on first visit.',
    author: 'Rakesh Agarwal',
    role: 'Managing Director',
    company: 'ICBI',
    initials: 'RA',
    grad: 'linear-gradient(135deg,#6366f1,#7c3aed)',
  },
  {
    id: 2,
    quote:
      'From complex product catalogs to analytics, the team handled everything with precision. The result is a high-performance site our sales team proudly shares.',
    author: 'Ashok Tanna',
    role: 'Managing Director',
    company: 'Ardent Group',
    initials: 'AT',
    grad: 'linear-gradient(135deg,#06b6d4,#0284c7)',
  },
  {
    id: 3,
    quote:
      'Clear process, thoughtful design, and measurable improvements in engagement. Exactly what we needed to scale confidently.',
    author: 'Sunil Andhale',
    role: 'Managing Director',
    company: 'Green Feildxp',
    initials: 'SA',
    grad: 'linear-gradient(135deg,#10b981,#059669)',
  },
  {
    id: 4,
    quote:
      'A seamless B2B experience — faster, cleaner, and easier for our partners. Delivered on time and with real attention to detail.',
    author: 'Sanjeev Batra',
    role: 'Managing Director',
    company: 'Asianplastowares',
    initials: 'SB',
    grad: 'linear-gradient(135deg,#f59e0b,#d97706)',
  },
]

export function TestimonialsSection() {
  const [active, setActive]           = useState(0)
  const [fading, setFading]           = useState(false)

  const go = (index: number) => {
    if (index === active || fading) return
    setFading(true)
    setTimeout(() => {
      setActive(index)
      setTimeout(() => setFading(false), 50)
    }, 280)
  }

  const prev = () => go(active === 0 ? TESTIMONIALS.length - 1 : active - 1)
  const next = () => go(active === TESTIMONIALS.length - 1 ? 0 : active + 1)

  const t = TESTIMONIALS[active]

  return (
    <section className="testi-section">
      <div className="testi-editorial">

        {/* ── Left: giant index number ── */}
        <span
          className="testi-index"
          style={{ fontFeatureSettings: '"tnum"' }}
          aria-hidden="true"
        >
          {String(active + 1).padStart(2, '0')}
        </span>

        {/* ── Right: content ── */}
        <div className="testi-body">

          {/* Quote */}
          <blockquote
            className="testi-quote-text"
            style={{
              opacity:    fading ? 0 : 1,
              transform:  fading ? 'translateX(12px)' : 'translateX(0)',
              transition: 'opacity 0.28s ease, transform 0.28s ease',
            }}
          >
            &ldquo;{t.quote}&rdquo;
          </blockquote>

          {/* Author */}
          <div
            className="testi-author-row"
            style={{
              opacity:    fading ? 0 : 1,
              transform:  fading ? 'translateX(8px)' : 'translateX(0)',
              transition: 'opacity 0.28s ease 0.06s, transform 0.28s ease 0.06s',
            }}
          >
            <div className="testi-avatar-wrap">
              {/* Avatar: gradient circle with initials */}
              <div
                className="testi-avatar-circle"
                style={{ background: t.grad }}
                aria-hidden="true"
              >
                {t.initials}
              </div>
              <div>
                <p className="testi-author-name">{t.author}</p>
                <p className="testi-author-meta">
                  {t.role}
                  <span className="testi-sep">/</span>
                  {t.company}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="testi-nav">
            {/* Line selectors */}
            <div className="testi-lines">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => go(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className="testi-line-btn"
                >
                  <span
                    className="testi-line-track"
                    style={{
                      width:      i === active ? '3rem' : '1.5rem',
                      background: i === active ? 'rgba(255,255,255,0.75)' : 'rgba(255,255,255,0.18)',
                    }}
                  />
                </button>
              ))}
            </div>

            {/* Counter */}
            <span className="testi-counter">
              {String(active + 1).padStart(2, '0')}&nbsp;/&nbsp;{String(TESTIMONIALS.length).padStart(2, '0')}
            </span>

            {/* Prev / Next arrows */}
            <div className="testi-arrows">
              <button onClick={prev} aria-label="Previous testimonial" className="testi-arrow">
                <ChevronLeft size={18} />
              </button>
              <button onClick={next} aria-label="Next testimonial" className="testi-arrow">
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
