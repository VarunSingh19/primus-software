'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

const ORBS = [
  { label: 'Core Web Vitals', pos: 'tl', z: 90 },
  { label: 'Schema Markup', pos: 'tr', z: 70 },
  { label: 'Sub-2s Loads', pos: 'bl', z: 80 },
  { label: 'Rank Tracking', pos: 'br', z: 60 },
]

const TABS = [
  { key: 'performance', label: 'Performance' },
  { key: 'search', label: 'Search Preview' },
] as const

const VITALS = [
  { key: 'lcp', label: 'LCP', value: '1.2s', target: 'Target < 2.5s', pct: 0.85 },
  { key: 'inp', label: 'INP', value: '180ms', target: 'Target < 200ms', pct: 0.78 },
  { key: 'cls', label: 'CLS', value: '0.04', target: 'Target < 0.10', pct: 0.92 },
]

const TREND = [30, 45, 40, 60, 55, 80, 92]
const TREND_LABELS = ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7']

const KEYWORDS = [
  { term: 'seo services mumbai', pos: 2, delta: 3, dir: 'up' as const },
  { term: 'core web vitals audit', pos: 4, delta: 1, dir: 'up' as const },
  { term: 'technical seo agency', pos: 7, delta: 0, dir: 'same' as const },
  { term: 'page speed optimization', pos: 3, delta: 5, dir: 'up' as const },
]

const SCORE_TARGET = 98
const SCORE_R = 42
const SCORE_C = 2 * Math.PI * SCORE_R

function CheckIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
      <path d="m5 10 3.5 3.5L15 6.5" />
    </svg>
  )
}

function StarIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor">
      <path d="M10 1.5l2.6 5.4 5.9.8-4.3 4.2 1 5.9L10 14.9l-5.2 2.9 1-5.9L1.5 7.7l5.9-.8z" />
    </svg>
  )
}

function TrendArrow({ dir }: { dir: 'up' | 'down' }) {
  return (
    <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
      <path d={dir === 'up' ? 'M6 10V2M2 6l4-4 4 4' : 'M6 2v8M2 6l4 4 4-4'} />
    </svg>
  )
}

function BookmarkIcon({ filled }: { filled: boolean }) {
  return (
    <svg viewBox="0 0 20 20" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={1.8}>
      <path d="M5 2.5h10v15l-5-3.3-5 3.3z" strokeLinejoin="round" />
    </svg>
  )
}

export function PerformanceSeoHero3D() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<HTMLDivElement>(null)
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])

  const [hovered, setHovered] = useState(false)
  const [activeTab, setActiveTab] = useState<typeof TABS[number]['key']>('performance')
  const [vitalsOn, setVitalsOn] = useState(false)
  const [trendOn, setTrendOn] = useState(false)
  const [score, setScore] = useState(0)
  const [vitalHover, setVitalHover] = useState<number | null>(null)
  const [trendHover, setTrendHover] = useState<number | null>(null)
  const [schemaOn, setSchemaOn] = useState(true)
  const [pinned, setPinned] = useState<number | null>(null)

  /* float + 3D tilt */
  useEffect(() => {
    const wrap = wrapRef.current
    const scene = sceneRef.current
    if (!wrap || !scene) return

    gsap.to(scene, {
      y: -16, duration: 3.5, ease: 'sine.inOut', repeat: -1, yoyo: true,
    })

    const onMove = (e: MouseEvent) => {
      const r = wrap.getBoundingClientRect()
      const dx = (e.clientX - r.left - r.width / 2) / (r.width / 2)
      const dy = (e.clientY - r.top - r.height / 2) / (r.height / 2)
      gsap.to(scene, {
        rotateY: dx * 16,
        rotateX: -dy * 12,
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

  /* score count-up + bar fills */
  useEffect(() => {
    timers.current.push(setTimeout(() => { setVitalsOn(true); setTrendOn(true) }, 400))

    let raf = 0
    const startDelay = 350
    const duration = 1200
    const t0 = performance.now()
    const tick = (now: number) => {
      const elapsed = now - t0 - startDelay
      const t = Math.min(1, Math.max(0, elapsed / duration))
      const eased = 1 - Math.pow(1 - t, 3)
      setScore(Math.round(SCORE_TARGET * eased))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      timers.current.forEach(clearTimeout)
      timers.current = []
    }
  }, [])

  const scoreOffset = SCORE_C - (score / 100) * SCORE_C

  return (
    <div
      ref={wrapRef}
      className="pso-wrap"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div ref={sceneRef} className={`pso-scene${hovered ? ' hov' : ''}`}>

        {/* ── Orbital badges ── */}
        {ORBS.map(({ label, pos, z }) => (
          <div
            key={label}
            className={`pso-orb pso-orb--${pos}${hovered ? ' hov' : ''}`}
            style={{ '--bz': `${z}px` } as React.CSSProperties}
          >
            {label}
          </div>
        ))}

        {/* ── Glow halo ── */}
        <div className="pso-halo" />

        {/* ── Main card ── */}
        <div className="pso-card">

          {/* Header */}
          <div className="pso-header">
            <div className="pso-site">
              <span className="pso-site-favicon">P</span>
              https://www.primusoftware.com
            </div>
            <div className="pso-live">
              <span className="pso-live-dot" />
              Live · Updated 2m ago
            </div>
          </div>

          {/* Tabs */}
          <div className="pso-tabs">
            <span
              className="pso-tab-indicator"
              style={{ '--idx': TABS.findIndex(t => t.key === activeTab) } as React.CSSProperties}
            />
            {TABS.map(t => (
              <button
                key={t.key}
                className={`pso-tab${activeTab === t.key ? ' active' : ''}`}
                onClick={() => setActiveTab(t.key)}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Panel */}
          {activeTab === 'performance' ? (
            <div key="performance" className="pso-panel">

              {/* Score */}
              <div className="pso-score-row">
                <div className="pso-score">
                  <svg viewBox="0 0 100 100" width="84" height="84">
                    <defs>
                      <linearGradient id="pso-score-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#22d3ee" />
                        <stop offset="100%" stopColor="#10b981" />
                      </linearGradient>
                    </defs>
                    <circle cx="50" cy="50" r={SCORE_R} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="8" />
                    <circle
                      cx="50" cy="50" r={SCORE_R} fill="none" stroke="url(#pso-score-grad)" strokeWidth="8"
                      strokeDasharray={SCORE_C} strokeDashoffset={scoreOffset} strokeLinecap="round"
                      transform="rotate(-90 50 50)" className="pso-score-ring"
                    />
                  </svg>
                  <div className="pso-score-center">
                    <span className="pso-score-num">{score}</span>
                    <span className="pso-score-max">/ 100</span>
                  </div>
                </div>
                <div className="pso-score-meta">
                  <p className="pso-score-title">Performance Score</p>
                  <p className="pso-score-sub">Lab data · Mobile · Lighthouse</p>
                </div>
              </div>

              {/* Core Web Vitals */}
              <div className="pso-vitals">
                {VITALS.map((v, i) => (
                  <div
                    key={v.key}
                    className="pso-vital"
                    onMouseEnter={() => setVitalHover(i)}
                    onMouseLeave={() => setVitalHover(null)}
                  >
                    {vitalHover === i && <span className="pso-vital-tip">{v.target}</span>}
                    <div className="pso-vital-head">
                      <span className="pso-vital-label">{v.label}</span>
                      <span className="pso-vital-badge"><CheckIcon /></span>
                    </div>
                    <span className="pso-vital-value">{v.value}</span>
                    <div className="pso-vital-bar">
                      <div className="pso-vital-fill" style={{ width: vitalsOn ? `${v.pct * 100}%` : '0%' }} />
                    </div>
                  </div>
                ))}
              </div>

              {/* Trend chart */}
              <div className="pso-trend-card">
                <div className="pso-trend-head">
                  <span>Organic traffic</span>
                  <span className="pso-trend-total">+186% / 7w</span>
                </div>
                <div className="pso-trend-chart">
                  {TREND.map((v, i) => (
                    <div
                      key={i}
                      className="pso-trend-col"
                      onMouseEnter={() => setTrendHover(i)}
                      onMouseLeave={() => setTrendHover(null)}
                    >
                      {trendHover === i && <span className="pso-trend-tip">{v}k</span>}
                      <div className="pso-trend-bar" style={{ height: trendOn ? `${v}%` : '0%' }} />
                      <span className="pso-trend-label">{TREND_LABELS[i]}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div key="search" className="pso-panel">

              {/* Schema toggle */}
              <div className="pso-schema-row">
                <button
                  className={`pso-switch${schemaOn ? ' on' : ''}`}
                  onClick={() => setSchemaOn(s => !s)}
                  role="switch"
                  aria-checked={schemaOn}
                  aria-label="Toggle schema markup"
                >
                  <span className="pso-switch-thumb" />
                </button>
                <span className="pso-switch-label">
                  Schema markup <strong>{schemaOn ? 'ON' : 'OFF'}</strong>
                </span>
              </div>

              {/* SERP preview */}
              <div className="pso-serp">
                <div className="pso-serp-site">
                  <span className="pso-serp-favicon">P</span>
                  <div className="pso-serp-url">
                    <span className="pso-serp-name">Primus Software</span>
                    <span className="pso-serp-breadcrumb">https://primusoftware.com › services › seo</span>
                  </div>
                </div>
                <p className="pso-serp-title">Performance &amp; SEO Services | Primus Software</p>
                <div className={`pso-serp-rating${schemaOn ? '' : ' hidden'}`}>
                  {Array.from({ length: 5 }).map((_, i) => <StarIcon key={i} />)}
                  <span className="pso-serp-rating-num">4.9</span>
                  <span className="pso-serp-rating-count">(128 reviews)</span>
                </div>
                <p className="pso-serp-desc">
                  Technical SEO audits, Core Web Vitals tuning, and structured data that move you up the rankings and keep you there.
                </p>
                <div className={`pso-serp-sitelinks${schemaOn ? '' : ' hidden'}`}>
                  <span>Audits</span>
                  <span>Web Vitals</span>
                  <span>Schema</span>
                  <span>Reporting</span>
                </div>
              </div>

              {/* Keyword rankings */}
              <div className="pso-keywords">
                <span className="pso-keywords-head">Keyword rankings</span>
                {KEYWORDS.map((k, i) => (
                  <button
                    key={k.term}
                    className={`pso-kw-row${pinned === i ? ' pinned' : ''}`}
                    onClick={() => setPinned(p => (p === i ? null : i))}
                  >
                    <span className="pso-kw-pos">#{k.pos}</span>
                    <span className="pso-kw-term">{k.term}</span>
                    <span className={`pso-kw-trend pso-kw-trend--${k.dir}`}>
                      {k.dir !== 'same' && <TrendArrow dir={k.dir} />}
                      {k.dir !== 'same' ? k.delta : '—'}
                    </span>
                    <span className="pso-kw-bookmark"><BookmarkIcon filled={pinned === i} /></span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>{/* end .pso-card */}

        {/* ── Floating ranking chip ── */}
        <div className={`pso-rank-chip${hovered ? ' hov' : ''}`}>
          🔍 <strong>#2</strong> on Google
        </div>

      </div>
    </div>
  )
}
