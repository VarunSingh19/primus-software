'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

const SWATCHES = [
  { bg: '#6366f1', label: 'Primary'   },
  { bg: '#818cf8', label: '400'       },
  { bg: '#06b6d4', label: 'Accent'    },
  { bg: '#10b981', label: 'Success'   },
  { bg: '#f59e0b', label: 'Warning'   },
  { bg: '#ef4444', label: 'Error'     },
]

const BADGES = [
  { label: 'UX Research',   pos: 'tl', z: 90  },
  { label: 'Figma',         pos: 'tr', z: 70  },
  { label: 'Prototyping',   pos: 'bl', z: 80  },
  { label: 'WCAG 2.2',      pos: 'br', z: 60  },
]

export function UiUxHero3D() {
  const wrapRef  = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<HTMLDivElement>(null)
  const [activeBtn, setActiveBtn] = useState<string | null>(null)
  const [hovered, setHovered]     = useState(false)

  useEffect(() => {
    const wrap  = wrapRef.current
    const scene = sceneRef.current
    if (!wrap || !scene) return

    /* gentle float */
    gsap.to(scene, {
      y: -16, duration: 3.5, ease: 'sine.inOut', repeat: -1, yoyo: true,
    })

    /* mouse tilt */
    const onMove = (e: MouseEvent) => {
      const r  = wrap.getBoundingClientRect()
      const dx = (e.clientX - r.left - r.width  / 2) / (r.width  / 2)
      const dy = (e.clientY - r.top  - r.height / 2) / (r.height / 2)
      gsap.to(scene, {
        rotateY: dx * 20,
        rotateX: -dy * 14,
        duration: 0.4,
        ease: 'power2.out',
      })
    }
    const onLeave = () =>
      gsap.to(scene, { rotateY: 0, rotateX: 0, duration: 1.1, ease: 'elastic.out(1,0.45)' })

    wrap.addEventListener('mousemove', onMove)
    wrap.addEventListener('mouseleave', onLeave)
    return () => {
      wrap.removeEventListener('mousemove', onMove)
      wrap.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <div
      ref={wrapRef}
      className="u3d-wrap"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div ref={sceneRef} className={`u3d-scene${hovered ? ' hov' : ''}`}>

        {/* ── Orbital badges at corners ── */}
        {BADGES.map(({ label, pos, z }) => (
          <div
            key={label}
            className={`u3d-orb u3d-orb--${pos}${hovered ? ' hov' : ''}`}
            style={{ '--bz': `${z}px` } as React.CSSProperties}
          >
            {label}
          </div>
        ))}

        {/* ── Glow halo behind card ── */}
        <div className="u3d-halo" />

        {/* ── Main design-system card ── */}
        <div className="u3d-card">

          {/* Chrome */}
          <div className="u3d-chrome">
            <div className="u3d-dots">
              <span className="dot-r"/><span className="dot-y"/><span className="dot-g"/>
            </div>
            <div className="u3d-tab">
              <svg width="10" height="10" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.5}>
                <rect x="3" y="3" width="6" height="6" rx="1"/><rect x="11" y="3" width="6" height="6" rx="1"/>
                <rect x="3" y="11" width="6" height="6" rx="1"/><rect x="11" y="11" width="6" height="6" rx="1"/>
              </svg>
              Components
            </div>
            <div className="u3d-addr">design.system / ui</div>
          </div>

          {/* Search bar */}
          <div className="u3d-search">
            <svg width="13" height="13" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.5}>
              <circle cx="9" cy="9" r="6"/><path d="M15 15l3 3" strokeLinecap="round"/>
            </svg>
            Search components…
          </div>

          {/* Section: Buttons */}
          <div className="u3d-section">
            <p className="u3d-sect-label">Buttons</p>
            <div className="u3d-btn-row">
              {[
                { label: 'Primary',   cls: 'fill',  key: 'p' },
                { label: 'Secondary', cls: 'ghost', key: 's' },
                { label: 'Danger',    cls: 'red',   key: 'd' },
              ].map(({ label, cls, key }) => (
                <button
                  key={key}
                  className={`u3d-btn u3d-btn--${cls}${activeBtn === key ? ' pressed' : ''}`}
                  onMouseDown={() => setActiveBtn(key)}
                  onMouseUp={() => setActiveBtn(null)}
                  onMouseLeave={() => setActiveBtn(null)}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Section: Colors */}
          <div className="u3d-section">
            <p className="u3d-sect-label">Color tokens</p>
            <div className="u3d-swatches">
              {SWATCHES.map(({ bg, label }) => (
                <div
                  key={label}
                  className="u3d-swatch"
                  style={{ background: bg }}
                  title={label}
                />
              ))}
            </div>
          </div>

          {/* Section: Form controls */}
          <div className="u3d-section u3d-section--row">
            <div className="u3d-input">user@primus.dev</div>
            <div className="u3d-toggles">
              <span className="u3d-tog on" />
              <span className="u3d-tog" />
            </div>
          </div>

          {/* Section: Type scale */}
          <div className="u3d-section">
            <p className="u3d-sect-label">Typography</p>
            <div className="u3d-type-row">
              <span style={{ fontSize:'1.6rem', fontWeight:800, letterSpacing:'-0.04em', lineHeight:1 }}>Aa</span>
              <div className="u3d-type-meta">
                <span>Inter Display</span>
                <span style={{ opacity:0.4 }}>800 / -0.04em</span>
              </div>
              <div className="u3d-type-steps">
                {[800,600,400,300].map(w => (
                  <span key={w} style={{ fontWeight: w, opacity: 0.3 + w/2000 }}>A</span>
                ))}
              </div>
            </div>
          </div>

        </div>{/* end .u3d-card */}

        {/* ── Floating cursor decoration ── */}
        <div className={`u3d-cursor${hovered ? ' hov' : ''}`}>
          <svg width="18" height="18" viewBox="0 0 20 20" fill="white">
            <path d="M5 2l13 8-7 2-3 7z"/>
          </svg>
          <span>Pointer</span>
        </div>

      </div>
    </div>
  )
}
