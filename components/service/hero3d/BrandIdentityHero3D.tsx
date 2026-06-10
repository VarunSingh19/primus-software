'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

const ORBS = [
  { label: 'Logo System',  pos: 'tl', z: 90 },
  { label: 'Type Pairing', pos: 'tr', z: 70 },
  { label: 'Colour Tokens',pos: 'bl', z: 80 },
  { label: 'Style Guide',  pos: 'br', z: 60 },
]

const PALETTE = [
  { hex: '#8b5cf6', name: 'Violet'  },
  { hex: '#ec4899', name: 'Pink'    },
  { hex: '#06b6d4', name: 'Cyan'    },
  { hex: '#f59e0b', name: 'Amber'   },
  { hex: '#10b981', name: 'Emerald' },
]

const TOUCHPOINTS = [
  { key: 'favicon', label: 'Favicon'  },
  { key: 'app',     label: 'App icon' },
  { key: 'avatar',  label: 'Avatar'   },
  { key: 'card',    label: 'Card'     },
] as const

const MARK_NAMES = ['Orbit', 'Prism', 'Glyph']

/* ── Logo mark concepts — three abstract marks built from primitive shapes ── */
function OrbitMark({ color, size = 72 }: { color: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
      <circle cx="26" cy="32" r="18" fill={color} opacity="0.85"/>
      <circle cx="42" cy="32" r="18" fill="none" stroke={color} strokeWidth="3"/>
    </svg>
  )
}

function PrismMark({ color, size = 72 }: { color: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
      <path d="M32 5 L59 54 H5 Z" fill={color} opacity="0.85"/>
      <circle cx="32" cy="40" r="10" fill="none" stroke={color} strokeWidth="3"/>
    </svg>
  )
}

function GlyphMark({ color, size = 72 }: { color: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
      <rect x="13" y="8" width="10" height="48" rx="3" fill={color}/>
      <path d="M23 8h13a14 14 0 0 1 0 28H23z" fill={color} opacity="0.85"/>
    </svg>
  )
}

function Mark({ index, color, size }: { index: number; color: string; size?: number }) {
  switch (index % 3) {
    case 0:  return <OrbitMark color={color} size={size} />
    case 1:  return <PrismMark color={color} size={size} />
    default: return <GlyphMark color={color} size={size} />
  }
}

function SunIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.6}>
      <circle cx="10" cy="10" r="4"/>
      <path d="M10 1.5v2M10 16.5v2M18.5 10h-2M3.5 10h-2M15.6 4.4l-1.4 1.4M5.8 14.2l-1.4 1.4M15.6 15.6l-1.4-1.4M5.8 5.8 4.4 4.4" strokeLinecap="round"/>
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path d="M17 11.5A7 7 0 0 1 8.5 3a7 7 0 1 0 8.5 8.5z"/>
    </svg>
  )
}

function GridIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.6}>
      <rect x="2.5" y="2.5" width="15" height="15" rx="1.5"/>
      <path d="M2.5 10h15M10 2.5v15" />
    </svg>
  )
}

function ChevronIcon({ dir }: { dir: 'l' | 'r' }) {
  return (
    <svg width="12" height="12" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d={dir === 'l' ? 'M12 4l-6 6 6 6' : 'M8 4l6 6-6 6'} strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function DownloadIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.8}>
      <path d="M10 2.5v10M6 9l4 4 4-4M3 16.5h14" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

export function BrandIdentityHero3D() {
  const wrapRef  = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<HTMLDivElement>(null)
  const toastTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  const [hovered, setHovered]       = useState(false)
  const [markIndex, setMarkIndex]   = useState(0)
  const [activeColor, setActiveColor] = useState(0)
  const [darkCanvas, setDarkCanvas] = useState(true)
  const [showGrid, setShowGrid]     = useState(false)
  const [copiedHex, setCopiedHex]   = useState<string | null>(null)

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

  useEffect(() => () => clearTimeout(toastTimer.current), [])

  const cycleMark = (dir: 1 | -1) => {
    setMarkIndex(i => (i + dir + 3) % 3)
  }

  const pickColor = (i: number) => {
    setActiveColor(i)
    setCopiedHex(PALETTE[i].hex)
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(PALETTE[i].hex).catch(() => {})
    }
    clearTimeout(toastTimer.current)
    toastTimer.current = setTimeout(() => setCopiedHex(null), 1500)
  }

  const color = PALETTE[activeColor].hex

  return (
    <div
      ref={wrapRef}
      className="bid-wrap"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div ref={sceneRef} className={`bid-scene${hovered ? ' hov' : ''}`}>

        {/* ── Orbital badges at corners ── */}
        {ORBS.map(({ label, pos, z }) => (
          <div
            key={label}
            className={`bid-orb bid-orb--${pos}${hovered ? ' hov' : ''}`}
            style={{ '--bz': `${z}px` } as React.CSSProperties}
          >
            {label}
          </div>
        ))}

        {/* ── Glow halo ── */}
        <div className="bid-halo" style={{ '--glow': color } as React.CSSProperties} />

        {/* ── Main brand-system card ── */}
        <div className="bid-card">

          {/* Chrome */}
          <div className="bid-chrome">
            <div className="u3d-dots">
              <span className="dot-r"/><span className="dot-y"/><span className="dot-g"/>
            </div>
            <div className="bid-tab">Brand Guidelines</div>
            <div className="bid-version">v2.4</div>
          </div>

          {/* Logo canvas */}
          <div className={`bid-canvas${darkCanvas ? '' : ' light'}`}>

            {/* Mode + grid toggles */}
            <div className="bid-canvas-controls">
              <button
                className={`bid-icon-btn${showGrid ? ' active' : ''}`}
                onClick={() => setShowGrid(g => !g)}
                title="Toggle clear-space guide"
                aria-label="Toggle clear-space guide"
              >
                <GridIcon />
              </button>
              <button
                className="bid-icon-btn"
                onClick={() => setDarkCanvas(d => !d)}
                title="Toggle background"
                aria-label="Toggle background"
              >
                {darkCanvas ? <SunIcon /> : <MoonIcon />}
              </button>
            </div>

            {/* Clear-space guide */}
            {showGrid && (
              <div className="bid-guide">
                <span className="bid-guide-label">Min. clear space</span>
              </div>
            )}

            {/* Mark cycler */}
            <button className="bid-arrow bid-arrow--l" onClick={() => cycleMark(-1)} aria-label="Previous mark">
              <ChevronIcon dir="l" />
            </button>
            <div key={markIndex} className="bid-mark">
              <Mark index={markIndex} color={color} />
            </div>
            <button className="bid-arrow bid-arrow--r" onClick={() => cycleMark(1)} aria-label="Next mark">
              <ChevronIcon dir="r" />
            </button>

            <span className="bid-mark-label">{MARK_NAMES[markIndex]} · {markIndex + 1}/3</span>
          </div>

          {/* Colour palette */}
          <div className="bid-palette">
            {PALETTE.map((p, i) => (
              <button
                key={p.hex}
                className={`bid-swatch${activeColor === i ? ' active' : ''}`}
                style={{ background: p.hex }}
                onClick={() => pickColor(i)}
                title={`${p.name} ${p.hex}`}
                aria-label={`Use ${p.name}`}
              />
            ))}
            <span className={`bid-copied${copiedHex ? ' show' : ''}`}>Copied {copiedHex}</span>
          </div>

          {/* Typography pairing */}
          <div className="bid-type-row">
            <span className="bid-type-sample bid-type-sample--display">Aa</span>
            <div className="bid-type-meta">
              <span>Display — Syne 800</span>
              <span>Body — Inter 400</span>
            </div>
            <span className="bid-type-sample bid-type-sample--body">Aa</span>
          </div>

          {/* Touchpoints */}
          <div className="bid-touchpoints">
            {TOUCHPOINTS.map(t => (
              <div key={t.key} className={`bid-touchpoint bid-touchpoint--${t.key}`}>
                <div className="bid-touchpoint-mark">
                  <Mark index={markIndex} color={color} size={18} />
                </div>
                <span className="bid-touchpoint-label">{t.label}</span>
              </div>
            ))}
          </div>
        </div>{/* end .bid-card */}

        {/* ── Floating export chip ── */}
        <div className={`bid-export${hovered ? ' hov' : ''}`}>
          <DownloadIcon />
          <span>Brand_Guidelines.pdf</span>
        </div>

      </div>
    </div>
  )
}
