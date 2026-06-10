'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

const ORBS = [
  { label: 'Next.js',       pos: 'tl', z: 90 },
  { label: 'Lighthouse 98', pos: 'tr', z: 70 },
  { label: 'TypeScript',    pos: 'bl', z: 80 },
  { label: 'CI/CD',         pos: 'br', z: 60 },
]

const NAV_LINKS = ['Home', 'Work', 'Pricing', 'Contact']

const METRICS = [
  { label: 'Perf', value: 98,  color: '#10b981' },
  { label: 'A11y', value: 100, color: '#06b6d4' },
  { label: 'BP',   value: 96,  color: '#818cf8' },
  { label: 'SEO',  value: 100, color: '#f59e0b' },
]

const VIEWPORTS = [
  { key: 'desktop', label: 'Desktop', width: 1440 },
  { key: 'tablet',  label: 'Tablet',  width: 768  },
  { key: 'mobile',  label: 'Mobile',  width: 390  },
] as const

type ViewportKey = typeof VIEWPORTS[number]['key']

function DesktopIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <rect x="2" y="3" width="16" height="11" rx="1"/>
      <path d="M7 17h6M10 14v3" strokeLinecap="round"/>
    </svg>
  )
}

function TabletIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <rect x="4" y="2" width="12" height="16" rx="1.5"/>
      <path d="M9 16h2" strokeLinecap="round"/>
    </svg>
  )
}

function MobileIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <rect x="6" y="1.5" width="8" height="17" rx="1.5"/>
      <path d="M9.5 15.5h1" strokeLinecap="round"/>
    </svg>
  )
}

const VIEWPORT_ICONS: Record<ViewportKey, React.ReactNode> = {
  desktop: <DesktopIcon />,
  tablet: <TabletIcon />,
  mobile: <MobileIcon />,
}

function Gauge({ label, value, color, animate }: { label: string; value: number; color: string; animate: boolean }) {
  const r = 15
  const c = 2 * Math.PI * r
  const offset = c - (animate ? value / 100 : 0) * c

  return (
    <div className="wad-gauge">
      <svg width="42" height="42" viewBox="0 0 40 40">
        <circle cx="20" cy="20" r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="4"/>
        <circle
          cx="20" cy="20" r={r} fill="none" stroke={color} strokeWidth="4"
          strokeDasharray={c} strokeDashoffset={offset} strokeLinecap="round"
          transform="rotate(-90 20 20)" className="wad-gauge-ring"
        />
        <text x="20" y="23.5" textAnchor="middle" className="wad-gauge-num" fill="#fff">{value}</text>
      </svg>
      <span className="wad-gauge-label">{label}</span>
    </div>
  )
}

export function WebAppsHero3D() {
  const wrapRef  = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<HTMLDivElement>(null)
  const [hovered, setHovered]       = useState(false)
  const [viewport, setViewport]     = useState<ViewportKey>('desktop')
  const [coords, setCoords]         = useState<{ x: number; y: number } | null>(null)
  const [ctaPressed, setCtaPressed] = useState(false)
  const [gaugesOn, setGaugesOn]     = useState(false)

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

    const t = setTimeout(() => setGaugesOn(true), 400)

    return () => {
      wrap.removeEventListener('mousemove', onMove)
      wrap.removeEventListener('mouseleave', onLeave)
      clearTimeout(t)
    }
  }, [])

  const onCardMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    setCoords({ x: Math.round(e.clientX - r.left), y: Math.round(e.clientY - r.top) })
  }

  return (
    <div
      ref={wrapRef}
      className="wad-wrap"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setCoords(null) }}
    >
      <div ref={sceneRef} className={`wad-scene${hovered ? ' hov' : ''}`}>

        {/* ── Orbital tech badges at corners ── */}
        {ORBS.map(({ label, pos, z }) => (
          <div
            key={label}
            className={`wad-orb wad-orb--${pos}${hovered ? ' hov' : ''}`}
            style={{ '--bz': `${z}px` } as React.CSSProperties}
          >
            {label}
          </div>
        ))}

        {/* ── Glow halo behind card ── */}
        <div className="wad-halo" />

        {/* ── Main browser-preview card ── */}
        <div className="wad-card" onMouseMove={onCardMove}>

          {/* Browser chrome */}
          <div className="wad-chrome">
            <div className="u3d-dots">
              <span className="dot-r"/><span className="dot-y"/><span className="dot-g"/>
            </div>
            <div className="wad-address">
              <svg width="9" height="9" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.8}>
                <rect x="4" y="9" width="12" height="8" rx="1.5"/><path d="M7 9V6a3 3 0 0 1 6 0v3" strokeLinecap="round"/>
              </svg>
              yourbrand.com
            </div>
          </div>

          {/* Mini site nav */}
          <div className="wad-site-nav">
            <span className="wad-logo-dot" />
            <div className="wad-nav-links">
              {NAV_LINKS.map(l => <span key={l} className="wad-nav-link">{l}</span>)}
            </div>
            <button
              className={`wad-cta${ctaPressed ? ' pressed' : ''}`}
              onMouseDown={() => setCtaPressed(true)}
              onMouseUp={() => setCtaPressed(false)}
              onMouseLeave={() => setCtaPressed(false)}
            >
              Get started
            </button>
          </div>

          {/* Hero block — skeleton headline + actions */}
          <div className="wad-hero-block">
            <div className="wad-skel wad-skel--xl" />
            <div className="wad-skel wad-skel--xl wad-skel--80" />
            <div className="wad-skel wad-skel--sm wad-skel--60" />
            <div className="wad-hero-actions">
              <button className="wad-btn wad-btn--fill">Launch project →</button>
              <button className="wad-btn wad-btn--ghost">View demo</button>
            </div>
          </div>

          {/* Lighthouse-style metrics */}
          <div className="wad-metrics">
            {METRICS.map(m => <Gauge key={m.label} {...m} animate={gaugesOn} />)}
          </div>

          {/* Footer — viewport switcher + deploy status */}
          <div className="wad-footer-row">
            <div className="wad-viewport-toggle">
              {VIEWPORTS.map(v => (
                <button
                  key={v.key}
                  className={`wad-viewport-btn${viewport === v.key ? ' active' : ''}`}
                  onClick={() => setViewport(v.key)}
                  title={v.label}
                  aria-label={v.label}
                >
                  {VIEWPORT_ICONS[v.key]}
                </button>
              ))}
              <span className="wad-viewport-size">{VIEWPORTS.find(v => v.key === viewport)?.width}px</span>
            </div>
            <div className="wad-deploy">
              <span className="wad-deploy-dot" />
              Deployed
            </div>
          </div>

          {/* Pixel-precision crosshair + coordinate readout */}
          {coords && (
            <>
              <div className="wad-guide wad-guide--h" style={{ top: coords.y }} />
              <div className="wad-guide wad-guide--v" style={{ left: coords.x }} />
              <div className="wad-pixel-readout" style={{ left: coords.x, top: coords.y }}>
                {coords.x} × {coords.y}
              </div>
            </>
          )}
        </div>{/* end .wad-card */}

        {/* ── Floating cursor decoration ── */}
        <div className={`wad-cursor${hovered ? ' hov' : ''}`}>
          <svg width="18" height="18" viewBox="0 0 20 20" fill="white">
            <path d="M5 2l13 8-7 2-3 7z"/>
          </svg>
          <span>Inspect</span>
        </div>

      </div>
    </div>
  )
}
