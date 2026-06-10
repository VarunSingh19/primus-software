'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

const ORBS = [
  { label: 'Multi-tenant',   pos: 'tl', z: 90 },
  { label: 'Stripe Billing', pos: 'tr', z: 70 },
  { label: 'RBAC',           pos: 'bl', z: 80 },
  { label: 'Real-time',      pos: 'br', z: 60 },
]

const WORKSPACES = ['Acme Inc', 'Side Project', 'Personal']

const CHART = [42, 68, 52, 84, 64, 96, 78]
const CHART_LABELS = ['M', 'T', 'W', 'T', 'F', 'S', 'S']

const ACTIVITY = [
  { text: 'New customer — Acme Corp',     time: '2m ago' },
  { text: 'Invoice paid — $2,400',        time: '18m ago' },
  { text: 'Sarah joined Engineering',     time: '1h ago' },
]

const NOTIFICATIONS = [
  { text: 'Payment received — Acme Corp',     time: '2m' },
  { text: 'New signup — jane@studio.io',      time: '15m' },
  { text: 'Weekly report is ready',           time: '1h' },
]

function DashboardIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.6}>
      <rect x="2.5" y="2.5" width="6.5" height="6.5" rx="1.5"/>
      <rect x="11" y="2.5" width="6.5" height="6.5" rx="1.5"/>
      <rect x="2.5" y="11" width="6.5" height="6.5" rx="1.5"/>
      <rect x="11" y="11" width="6.5" height="6.5" rx="1.5"/>
    </svg>
  )
}

function AnalyticsIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 17V9M9.5 17V3M16 17v-5"/>
      <path d="M2 17h16"/>
    </svg>
  )
}

function CustomersIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round">
      <circle cx="7.5" cy="6" r="3"/>
      <path d="M1.5 18c0-3.3 2.7-6 6-6s6 2.7 6 6"/>
      <circle cx="15" cy="7" r="2.2"/>
      <path d="M13.8 12.3c2.4.5 4.2 2.6 4.2 5.2"/>
    </svg>
  )
}

function BillingIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinejoin="round">
      <rect x="2" y="4.5" width="16" height="11" rx="2"/>
      <path d="M2 8h16"/>
    </svg>
  )
}

function SettingsIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.6}>
      <circle cx="10" cy="10" r="2.6"/>
      <path d="M10 2.5v2M10 15.5v2M17.5 10h-2M4.5 10h-2M15.4 4.6l-1.4 1.4M6 12.6l-1.4 1.4M15.4 15.4l-1.4-1.4M6 7.4 4.6 6" strokeLinecap="round"/>
    </svg>
  )
}

function BellIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.6}>
      <path d="M4.5 14.5h11l-1.3-1.7V9a4.2 4.2 0 0 0-8.4 0v3.8z" strokeLinejoin="round"/>
      <path d="M8.3 17a1.7 1.7 0 0 0 3.4 0" strokeLinecap="round"/>
    </svg>
  )
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.8}>
      <circle cx="9" cy="9" r="6"/>
      <path d="m17 17-3.5-3.5" strokeLinecap="round"/>
    </svg>
  )
}

function ChevronDownIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M5 7.5 10 12.5 15 7.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function SunIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.6}>
      <circle cx="10" cy="10" r="4"/>
      <path d="M10 1.5v2M10 16.5v2M18.5 10h-2M3.5 10h-2M15.6 4.4l-1.4 1.4M5.8 14.2l-1.4 1.4M15.6 15.6l-1.4-1.4M5.8 5.8 4.4 4.4" strokeLinecap="round"/>
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor">
      <path d="M17 11.5A7 7 0 0 1 8.5 3a7 7 0 1 0 8.5 8.5z"/>
    </svg>
  )
}

function TrendIcon({ dir }: { dir: 'up' | 'down' }) {
  return (
    <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d={dir === 'up' ? 'M6 10V2M2 6l4-4 4 4' : 'M6 2v8M2 6l4 4 4-4'}/>
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="m5 10 3.5 3.5L15 6.5"/>
    </svg>
  )
}

const NAV = [
  { key: 'dashboard', icon: <DashboardIcon/>, label: 'Dashboard' },
  { key: 'analytics', icon: <AnalyticsIcon/>, label: 'Analytics' },
  { key: 'customers', icon: <CustomersIcon/>, label: 'Customers' },
  { key: 'billing',   icon: <BillingIcon/>,   label: 'Billing'   },
  { key: 'settings',  icon: <SettingsIcon/>,  label: 'Settings'  },
]

export function SaasProductHero3D() {
  const wrapRef  = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<HTMLDivElement>(null)
  const timers   = useRef<ReturnType<typeof setTimeout>[]>([])

  const [hovered, setHovered]     = useState(false)
  const [activeNav, setActiveNav] = useState('dashboard')
  const [openMenu, setOpenMenu]   = useState<'workspace' | 'notifications' | null>(null)
  const [workspace, setWorkspace] = useState(WORKSPACES[0])
  const [unread, setUnread]       = useState(3)
  const [lightMode, setLightMode] = useState(false)
  const [searchFocused, setSearchFocused] = useState(false)
  const [barsOn, setBarsOn]       = useState(false)
  const [counts, setCounts]       = useState({ mrr: 0, users: 0, churn: 0 })
  const [hoveredBar, setHoveredBar] = useState<number | null>(null)
  const [toastVisible, setToastVisible] = useState(false)

  /* float + 3D tilt */
  useEffect(() => {
    const wrap  = wrapRef.current
    const scene = sceneRef.current
    if (!wrap || !scene) return

    gsap.to(scene, {
      y: -16, duration: 3.5, ease: 'sine.inOut', repeat: -1, yoyo: true,
    })

    const onMove = (e: MouseEvent) => {
      const r  = wrap.getBoundingClientRect()
      const dx = (e.clientX - r.left - r.width  / 2) / (r.width  / 2)
      const dy = (e.clientY - r.top  - r.height / 2) / (r.height / 2)
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

  /* chart fill-in + KPI count-up + toast sequence */
  useEffect(() => {
    timers.current.push(setTimeout(() => setBarsOn(true), 400))
    timers.current.push(setTimeout(() => setToastVisible(true), 2400))
    timers.current.push(setTimeout(() => setToastVisible(false), 6200))

    let raf = 0
    const startDelay = 350
    const duration = 1200
    const t0 = performance.now()
    const tick = (now: number) => {
      const elapsed = now - t0 - startDelay
      const t = Math.min(1, Math.max(0, elapsed / duration))
      const eased = 1 - Math.pow(1 - t, 3)
      setCounts({ mrr: 48200 * eased, users: 2847 * eased, churn: 2.1 * eased })
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      timers.current.forEach(clearTimeout)
      timers.current = []
    }
  }, [])

  const toggleMenu = (menu: 'workspace' | 'notifications') => {
    setOpenMenu(m => (m === menu ? null : menu))
    if (menu === 'notifications') setUnread(0)
  }

  return (
    <div
      ref={wrapRef}
      className="spd-wrap"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div ref={sceneRef} className={`spd-scene${hovered ? ' hov' : ''}`}>

        {/* ── Orbital badges ── */}
        {ORBS.map(({ label, pos, z }) => (
          <div
            key={label}
            className={`spd-orb spd-orb--${pos}${hovered ? ' hov' : ''}`}
            style={{ '--bz': `${z}px` } as React.CSSProperties}
          >
            {label}
          </div>
        ))}

        {/* ── Glow halo ── */}
        <div className="spd-halo" />

        {/* ── Dashboard card ── */}
        <div className={`spd-card${lightMode ? ' light' : ''}`} onClick={() => setOpenMenu(null)}>

          {/* Sidebar */}
          <div className="spd-sidebar">
            <div className="spd-logo">S</div>
            <nav className="spd-nav">
              <span
                className="spd-nav-indicator"
                style={{ '--idx': NAV.findIndex(n => n.key === activeNav) } as React.CSSProperties}
              />
              {NAV.map(n => (
                <button
                  key={n.key}
                  className={`spd-nav-btn${activeNav === n.key ? ' active' : ''}`}
                  onClick={() => setActiveNav(n.key)}
                  title={n.label}
                  aria-label={n.label}
                >
                  {n.icon}
                </button>
              ))}
            </nav>
            <div className="spd-sidebar-avatar">JD</div>
          </div>

          {/* Main */}
          <div className="spd-main">

            {/* Top bar */}
            <div className="spd-topbar">
              <div className="spd-workspace">
                <button
                  className={`spd-workspace-btn${openMenu === 'workspace' ? ' open' : ''}`}
                  onClick={(e) => { e.stopPropagation(); toggleMenu('workspace') }}
                >
                  <span className="spd-workspace-dot" />
                  {workspace}
                  <ChevronDownIcon/>
                </button>
                {openMenu === 'workspace' && (
                  <div className="spd-dropdown spd-dropdown--workspace" onClick={e => e.stopPropagation()}>
                    {WORKSPACES.map(w => (
                      <button key={w} className="spd-dropdown-item" onClick={() => { setWorkspace(w); setOpenMenu(null) }}>
                        {w}
                        {workspace === w && <CheckIcon/>}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className={`spd-search${searchFocused ? ' focus' : ''}`}>
                <SearchIcon/>
                <input
                  className="spd-search-input"
                  type="text"
                  placeholder="Search..."
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setSearchFocused(false)}
                />
                <span className="spd-search-kbd">⌘K</span>
              </div>

              <div className="spd-topbar-actions">
                <button className="spd-icon-btn" onClick={() => setLightMode(m => !m)} aria-label="Toggle theme">
                  {lightMode ? <MoonIcon/> : <SunIcon/>}
                </button>
                <div className="spd-notif">
                  <button
                    className="spd-icon-btn"
                    onClick={(e) => { e.stopPropagation(); toggleMenu('notifications') }}
                    aria-label="Notifications"
                  >
                    <BellIcon/>
                    {unread > 0 && <span className="spd-badge">{unread}</span>}
                  </button>
                  {openMenu === 'notifications' && (
                    <div className="spd-dropdown spd-dropdown--notif" onClick={e => e.stopPropagation()}>
                      {NOTIFICATIONS.map((n, i) => (
                        <div key={i} className="spd-dropdown-item spd-notif-item">
                          <span className="spd-notif-text">{n.text}</span>
                          <span className="spd-notif-time">{n.time}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* KPI row */}
            <div className="spd-kpis">
              <div className="spd-kpi">
                <span className="spd-kpi-label">MRR</span>
                <span className="spd-kpi-value">${(counts.mrr / 1000).toFixed(1)}K</span>
                <span className="spd-kpi-trend up"><TrendIcon dir="up"/>+12.4%</span>
              </div>
              <div className="spd-kpi">
                <span className="spd-kpi-label">Active Users</span>
                <span className="spd-kpi-value">{Math.round(counts.users).toLocaleString()}</span>
                <span className="spd-kpi-trend up"><TrendIcon dir="up"/>+8.1%</span>
              </div>
              <div className="spd-kpi">
                <span className="spd-kpi-label">Churn Rate</span>
                <span className="spd-kpi-value">{counts.churn.toFixed(1)}%</span>
                <span className="spd-kpi-trend down good"><TrendIcon dir="down"/>-0.4%</span>
              </div>
            </div>

            {/* Chart */}
            <div className="spd-chart-card">
              <div className="spd-chart-head">
                <span>Weekly signups</span>
                <span className="spd-chart-total">+342 this week</span>
              </div>
              <div className="spd-chart">
                {CHART.map((v, i) => (
                  <div
                    key={i}
                    className="spd-bar-col"
                    onMouseEnter={() => setHoveredBar(i)}
                    onMouseLeave={() => setHoveredBar(null)}
                  >
                    {hoveredBar === i && <span className="spd-bar-tooltip">{v}</span>}
                    <div className="spd-bar" style={{ height: barsOn ? `${v}%` : '0%' }} />
                    <span className="spd-bar-label">{CHART_LABELS[i]}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Activity feed */}
            <div className="spd-activity">
              {ACTIVITY.map((a, i) => (
                <div key={i} className="spd-activity-item">
                  <span className="spd-activity-icon"><CheckIcon/></span>
                  <span className="spd-activity-text">{a.text}</span>
                  <span className="spd-activity-time">{a.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>{/* end .spd-card */}

        {/* ── Floating upgrade toast ── */}
        <div className={`spd-toast${toastVisible ? ' show' : ''}`}>
          🎉 <strong>Upgraded to Pro</strong>
        </div>

      </div>
    </div>
  )
}
