'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/* ─── Static data ─── */
const GRID_COLS = 9
const GRID_ROWS = 7

const TECH = ['Next.js', 'TypeScript', 'Figma', 'Supabase', 'Vercel', 'Stripe']

const KPIS = [
  { value: '50+', label: 'Projects', raw: 50 },
  { value: '98%', label: 'Retained', raw: 98 },
  { value: '4×',  label: 'Faster',   raw: 4  },
]

const CHIPS = [
  {
    icon: '●', label: 'Deployed',
    color: '#10b981',
    style: { top: '14px', right: '46px' } as React.CSSProperties,
  },
  {
    icon: '↑', label: '+12% CVR',
    color: '#6366f1',
    style: { bottom: '44px', left: '24px' } as React.CSSProperties,
  },
  {
    icon: '⚡', label: '1.2s LCP',
    color: '#f59e0b',
    style: { top: '148px', right: '-2px' } as React.CSSProperties,
  },
]

/* Approximate path length for Phase 3 stroke-dashoffset animation */
const SPARK_D   = 'M0,36 L18,28 L36,31 L54,18 L72,22 L90,12 L108,16 L126,9 L144,12 L164,6'
const SPARK_LEN = 340 /* px, used as dasharray value */

/* ─── Mini perf ring (inner sub-component) ─── */
function PerfMini() {
  const r = 28
  const c = 2 * Math.PI * r
  return (
    <div className="h3d-perf-ring">
      <svg viewBox="0 0 64 64" fill="none" width="64" height="64" aria-hidden="true">
        <circle cx="32" cy="32" r={r} stroke="rgba(255,255,255,0.08)" strokeWidth="5" />
        <circle
          cx="32" cy="32" r={r}
          stroke="#06b6d4"
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray={String(c)}
          strokeDashoffset={String(c * 0.03)}
          style={{ transform: 'rotate(-90deg)', transformOrigin: '32px 32px' }}
        />
      </svg>
      <div className="h3d-perf-ring__inner">
        <span className="h3d-perf-ring__num">97</span>
      </div>
    </div>
  )
}

/* ─── Main export ─── */
export function HomeHero3D() {
  const wrapRef  = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<HTMLDivElement>(null)
  /* chip refs exposed for Phase 2 magnetic spring */
  const chipRefs = useRef<(HTMLDivElement | null)[]>([null, null, null])

  useEffect(() => {
    const wrap  = wrapRef.current
    const scene = sceneRef.current
    if (!wrap || !scene) return

    /* Target only direct children (.h3d-layer) — 7 layers in DOM order */
    const layers = Array.from(
      scene.querySelectorAll<HTMLElement>(':scope > .h3d-layer'),
    )

    /* Hide immediately (prevents SSR flash) */
    gsap.set(layers, { autoAlpha: 0, y: 28 })

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrap,
          /* 'top bottom' fires as soon as any part of the 3D enters the
             viewport — reliable on mobile where the hero stacks vertically */
          start: 'top bottom',
          once: true,
        },
      })

      tl.to(layers, {
        autoAlpha: 1,
        y: 0,
        stagger: 0.11,
        duration: 0.8,
        ease: 'power3.out',
        onComplete() {
          /* ── Phase 3 callbacks go here ──
           *   • count-up for .h3d-kpi-num elements
           *   • stroke-dashoffset draw on .h3d-spark-line
           *   • width transition on .h3d-prog-fill
           *   • cursor actor GSAP loop
           */
        },
      })
    }, wrap)

    /* Refresh ScrollTrigger after the next frame so positions are calculated
       against the final stacked layout on mobile, not the initial paint. */
    const raf = requestAnimationFrame(() => ScrollTrigger.refresh())

    return () => {
      cancelAnimationFrame(raf)
      ctx.revert()
    }
  }, [])

  return (
    <div ref={wrapRef} className="h3d-wrap">
      <div ref={sceneRef} className="h3d-scene">

        {/* ══ Layer 0: Dot grid · translateZ(-80px) ══ */}
        <div className="h3d-layer h3d-dot-grid" aria-hidden="true">
          {Array.from({ length: GRID_COLS * GRID_ROWS }, (_, i) => (
            <span key={i} className="h3d-dot" data-i={i} />
          ))}
        </div>

        {/* ══ Layer 1: Glow corona · translateZ(-40px) ══ */}
        <div className="h3d-layer h3d-corona" aria-hidden="true" />

        {/* ══ Layer 2: Side panel — Stack · translateZ(0) ══ */}
        <div className="h3d-layer h3d-side h3d-side--stack">
          <p className="h3d-side__label">Stack</p>
          <div className="h3d-side__badges">
            {TECH.map(t => (
              <span key={t} className="h3d-side__badge">{t}</span>
            ))}
          </div>
        </div>

        {/* ══ Layer 3: Side panel — Perf · translateZ(20px) ══ */}
        <div className="h3d-layer h3d-side h3d-side--perf">
          <PerfMini />
          <p className="h3d-side__label" style={{ marginTop: '0.5rem' }}>Performance</p>
          <p className="h3d-side__stat">LCP 1.2s · CLS 0.02</p>
        </div>

        {/* ══ Layer 4: Main dashboard card · translateZ(50px) ══ */}
        <div className="h3d-layer h3d-card">

          {/* Browser chrome */}
          <div className="h3d-chrome">
            <div className="h3d-chrome__dots">
              <span /><span /><span />
            </div>
            <div className="h3d-chrome__tab">
              <span className="h3d-chrome__tab-icon" aria-hidden="true">⬡</span>
              dashboard.primus.dev
            </div>
          </div>

          {/* KPI stat row */}
          <div className="h3d-kpi-row">
            {KPIS.map(k => (
              <div key={k.label} className="h3d-kpi" data-target={k.raw}>
                <span className="h3d-kpi__num h3d-kpi-num">{k.value}</span>
                <span className="h3d-kpi__label">{k.label}</span>
              </div>
            ))}
          </div>

          {/* Revenue sparkline */}
          <div className="h3d-spark-wrap">
            <span className="h3d-spark-label">Revenue</span>
            <svg
              className="h3d-sparkline-svg"
              viewBox="0 0 164 44"
              fill="none"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="h3d-sg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity="0.22" />
                  <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
                </linearGradient>
              </defs>
              {/* Area fill (always visible) */}
              <path d={`${SPARK_D} L164,44 L0,44 Z`} fill="url(#h3d-sg)" />
              {/* Line — Phase 3 will animate via stroke-dashoffset */}
              <path
                className="h3d-spark-line"
                d={SPARK_D}
                stroke="#6366f1"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray={SPARK_LEN}
                strokeDashoffset={0}
              />
            </svg>
          </div>

          {/* Build progress */}
          <div className="h3d-progress-wrap">
            <div className="h3d-progress-track">
              <div className="h3d-progress-fill h3d-prog-fill" style={{ width: '82%' }} />
            </div>
            <div className="h3d-progress-meta">
              <span>Build progress</span>
              <span className="h3d-prog-pct">82%</span>
            </div>
          </div>

          {/* Deploy status */}
          <div className="h3d-deploy">
            <span className="h3d-deploy-pulse" aria-hidden="true" />
            <span className="h3d-deploy-dot"   aria-hidden="true" />
            <span>Deployed · 3 min ago</span>
          </div>

        </div>{/* end .h3d-card */}

        {/* ══ Layer 5: Status chips · translateZ(70px) ══ */}
        <div className="h3d-layer h3d-chips-layer" aria-hidden="true">
          {CHIPS.map((chip, i) => (
            <div
              key={i}
              ref={el => { chipRefs.current[i] = el }}
              className="h3d-chip"
              style={{ '--chip-color': chip.color, ...chip.style } as React.CSSProperties}
            >
              <span className="h3d-chip__icon" style={{ color: chip.color }}>{chip.icon}</span>
              <span className="h3d-chip__text">{chip.label}</span>
            </div>
          ))}
        </div>

        {/* ══ Layer 6: Cursor actor · translateZ(90px) ══ */}
        <div className="h3d-layer h3d-cursor-actor">
          <svg width="14" height="14" viewBox="0 0 20 20" fill="white" aria-hidden="true">
            <path d="M5 2l13 8-7 2-3 7z" />
          </svg>
          <span className="h3d-cursor-actor__label">Primus</span>
        </div>

      </div>{/* end .h3d-scene */}
    </div>
  )
}
