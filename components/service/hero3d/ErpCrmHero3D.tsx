'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

const ORBS = [
  { label: 'Real-time Sync',    pos: 'tl', z: 90 },
  { label: 'Role-based Access', pos: 'tr', z: 70 },
  { label: 'API Integrations',  pos: 'bl', z: 80 },
  { label: 'Custom Portals',    pos: 'br', z: 60 },
]

const TABS = ['dashboard', 'integrations'] as const
type Tab = typeof TABS[number]
const TAB_LABELS: Record<Tab, string> = { dashboard: 'Dashboard', integrations: 'Integrations' }

const ROLES = ['admin', 'sales', 'finance'] as const
type Role = typeof ROLES[number]

type Kpi = { label: string; value: number; prefix?: string; suffix?: string; decimals?: number; trend: 'up' | 'down'; delta: string; good: boolean; tip: string }

const KPIS: Record<Role, Kpi[]> = {
  admin: [
    { label: 'Active Users', value: 1284,  trend: 'up',   delta: '+4.2%',  good: true,  tip: 'vs last month' },
    { label: 'API Uptime',   value: 99.98, suffix: '%', decimals: 2, trend: 'up',   delta: '+0.01%', good: true,  tip: '90-day average' },
    { label: 'API Calls',    value: 48200, trend: 'up',   delta: '+12%',   good: true,  tip: 'last 24 hours' },
  ],
  sales: [
    { label: 'Pipeline',    value: 284000, prefix: '$', trend: 'up',   delta: '+8.6%', good: true,  tip: 'open opportunities' },
    { label: 'Deals Won',   value: 42,     trend: 'up',   delta: '+6',    good: true,  tip: 'this quarter' },
    { label: 'Conversion',  value: 18.4,   suffix: '%', decimals: 1, trend: 'down', delta: '-1.2%', good: false, tip: 'lead to close' },
  ],
  finance: [
    { label: 'Revenue',      value: 612000, prefix: '$', trend: 'up',   delta: '+5.1%', good: true, tip: 'this quarter' },
    { label: 'Invoices Due', value: 16,     trend: 'down', delta: '-3',    good: true, tip: 'outstanding' },
    { label: 'Expenses',     value: 84000,  prefix: '$', trend: 'down', delta: '-2.3%', good: true, tip: 'this quarter' },
  ],
}

const PIPELINE = [
  { label: 'Leads',     count: 128, pct: 100 },
  { label: 'Qualified', count: 64,  pct: 72  },
  { label: 'Proposal',  count: 28,  pct: 45  },
  { label: 'Won',       count: 12,  pct: 22  },
]

const ACTIVITY = [
  { text: 'Acme Corp moved to Proposal',    time: '2m ago'  },
  { text: 'Invoice #4821 paid — $12,400',   time: '14m ago' },
  { text: 'New lead: Globex Ltd',           time: '32m ago' },
]

const SYSTEMS = [
  { key: 'sap',     label: 'SAP',        badge: 'SAP', color: '#0faaff', records: 1240 },
  { key: 'sf',      label: 'Salesforce', badge: 'SF',  color: '#00a1e0', records: 384  },
  { key: 'hubspot', label: 'HubSpot',    badge: 'H',   color: '#ff7a59', records: 96   },
  { key: 'tally',   label: 'Tally',      badge: 'T',   color: '#6366f1', records: 512  },
]

const SYNC_LOG_INITIAL = [
  { text: 'Synced 1,240 records from SAP',        time: '2m ago' },
  { text: 'Synced 384 contacts from Salesforce',  time: '5m ago' },
  { text: 'Synced 96 deals from HubSpot',         time: '8m ago' },
]

const SYNC_DELAYS = [400, 750, 1050, 1400]

function GridIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.6}>
      <rect x="2.5" y="2.5" width="6.5" height="6.5" rx="1.5"/>
      <rect x="11" y="2.5" width="6.5" height="6.5" rx="1.5"/>
      <rect x="2.5" y="11" width="6.5" height="6.5" rx="1.5"/>
      <rect x="11" y="11" width="6.5" height="6.5" rx="1.5"/>
    </svg>
  )
}

function UserIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="10" cy="6.5" r="3.5"/>
      <path d="M3 17c0-3.6 3.1-6.5 7-6.5s7 2.9 7 6.5"/>
    </svg>
  )
}

function TargetIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.6}>
      <circle cx="10" cy="10" r="7.5"/>
      <circle cx="10" cy="10" r="4"/>
      <circle cx="10" cy="10" r="1" fill="currentColor" stroke="none"/>
    </svg>
  )
}

function WalletIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinejoin="round" strokeLinecap="round">
      <path d="M2.5 6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-10a2 2 0 0 1-2-2z"/>
      <path d="M2.5 8.5h13.5a1.5 1.5 0 0 1 1.5 1.5v1a1.5 1.5 0 0 1-1.5 1.5H14a1.5 1.5 0 0 1 0-3h2.5"/>
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
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
      <path d="m5 10 3.5 3.5L15 6.5"/>
    </svg>
  )
}

function RefreshIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M16.5 10a6.5 6.5 0 1 1-1.9-4.6"/>
      <path d="M16.5 3v3.5H13"/>
    </svg>
  )
}

const ROLE_META: Record<Role, { label: string; icon: React.ReactNode }> = {
  admin:   { label: 'Admin',   icon: <UserIcon/> },
  sales:   { label: 'Sales',   icon: <TargetIcon/> },
  finance: { label: 'Finance', icon: <WalletIcon/> },
}

function formatKpi(value: number, prefix?: string, suffix?: string, decimals = 0) {
  if (prefix === '$' && value >= 1000) {
    return `$${(value / 1000).toFixed(1)}K`
  }
  const num = decimals > 0 ? value.toFixed(decimals) : Math.round(value).toLocaleString()
  return `${prefix ?? ''}${num}${suffix ?? ''}`
}

function formatElapsed(s: number) {
  if (s < 60) return `${s}s ago`
  return `${Math.floor(s / 60)}m ago`
}

export function ErpCrmHero3D() {
  const wrapRef  = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<HTMLDivElement>(null)
  const timers   = useRef<ReturnType<typeof setTimeout>[]>([])

  const [hovered, setHovered]       = useState(false)
  const [activeTab, setActiveTab]   = useState<Tab>('dashboard')
  const [role, setRole]             = useState<Role>('admin')
  const [kpiVals, setKpiVals]       = useState([0, 0, 0])
  const [kpiHover, setKpiHover]     = useState<number | null>(null)
  const [funnelOn, setFunnelOn]     = useState(false)
  const [funnelHover, setFunnelHover] = useState<number | null>(null)
  const [syncing, setSyncing]       = useState(false)
  const [syncStatus, setSyncStatus] = useState<('idle' | 'syncing' | 'done')[]>(['idle', 'idle', 'idle', 'idle'])
  const [lastSync, setLastSync]     = useState(['2m ago', '5m ago', '1m ago', '8m ago'])
  const [syncLog, setSyncLog]       = useState(SYNC_LOG_INITIAL)
  const [elapsed, setElapsed]       = useState<number | null>(null)

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

  /* funnel fill-in */
  useEffect(() => {
    const t = setTimeout(() => setFunnelOn(true), 400)
    return () => clearTimeout(t)
  }, [])

  /* KPI count-up — runs on mount and whenever the role switches */
  useEffect(() => {
    const target = KPIS[role].map(k => k.value)
    const from = kpiVals
    const isFirst = from.every(v => v === 0)
    const startDelay = isFirst ? 350 : 0
    const duration = isFirst ? 1200 : 700
    let raf = 0
    const t0 = performance.now()
    const tick = (now: number) => {
      const elapsedMs = now - t0 - startDelay
      const p = Math.min(1, Math.max(0, elapsedMs / duration))
      const eased = 1 - Math.pow(1 - p, 3)
      setKpiVals(from.map((f, i) => f + (target[i] - f) * eased))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [role])

  /* integration sync sequence */
  const runSync = () => {
    timers.current.forEach(clearTimeout)
    timers.current = []
    setSyncing(true)
    setElapsed(null)
    setSyncStatus(['syncing', 'syncing', 'syncing', 'syncing'])

    SYNC_DELAYS.forEach((d, i) => {
      timers.current.push(setTimeout(() => {
        setSyncStatus(prev => {
          const next = [...prev]
          next[i] = 'done'
          return next
        })
        setLastSync(prev => {
          const next = [...prev]
          next[i] = 'Just now'
          return next
        })
      }, d))
    })

    timers.current.push(setTimeout(() => {
      setSyncing(false)
      setElapsed(0)
      setSyncLog(prev => [{ text: '✓ Synced 4 systems · 2,232 records', time: 'Just now' }, ...prev].slice(0, 3))
    }, 1600))
  }

  useEffect(() => {
    runSync()
    const id = setInterval(() => {
      setElapsed(e => (e === null ? null : e + 1))
    }, 1000)
    return () => {
      clearInterval(id)
      timers.current.forEach(clearTimeout)
      timers.current = []
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div
      ref={wrapRef}
      className="ecp-wrap"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div ref={sceneRef} className={`ecp-scene${hovered ? ' hov' : ''}`}>

        {/* ── Orbital badges ── */}
        {ORBS.map(({ label, pos, z }) => (
          <div
            key={label}
            className={`ecp-orb ecp-orb--${pos}${hovered ? ' hov' : ''}`}
            style={{ '--bz': `${z}px` } as React.CSSProperties}
          >
            {label}
          </div>
        ))}

        {/* ── Glow halo ── */}
        <div className="ecp-halo" />

        {/* ── Main card ── */}
        <div className="ecp-card">

          {/* Header */}
          <div className="ecp-header">
            <div className="ecp-portal">
              <span className="ecp-portal-icon"><GridIcon/></span>
              Business Portal
            </div>
            <div className={`ecp-live${syncing ? ' syncing' : ''}`}>
              <span className="ecp-live-dot" />
              {syncing ? 'Syncing…' : 'All systems synced'}
            </div>
          </div>

          {/* Tabs */}
          <div className="ecp-tabs">
            <span
              className="ecp-tab-indicator"
              style={{ '--idx': TABS.indexOf(activeTab) } as React.CSSProperties}
            />
            {TABS.map(t => (
              <button
                key={t}
                className={`ecp-tab${activeTab === t ? ' active' : ''}`}
                onClick={() => setActiveTab(t)}
              >
                {TAB_LABELS[t]}
              </button>
            ))}
          </div>

          {/* Panel */}
          {activeTab === 'dashboard' ? (
            <div key="dashboard" className="ecp-panel">

              {/* Role switcher */}
              <div className="ecp-roles">
                <span
                  className="ecp-role-indicator"
                  style={{ '--idx': ROLES.indexOf(role) } as React.CSSProperties}
                />
                {ROLES.map(r => (
                  <button
                    key={r}
                    className={`ecp-role${role === r ? ' active' : ''}`}
                    onClick={() => setRole(r)}
                  >
                    {ROLE_META[r].icon}
                    {ROLE_META[r].label}
                  </button>
                ))}
              </div>

              {/* KPIs */}
              <div className="ecp-kpis">
                {KPIS[role].map((k, i) => (
                  <div
                    key={k.label}
                    className="ecp-kpi"
                    onMouseEnter={() => setKpiHover(i)}
                    onMouseLeave={() => setKpiHover(null)}
                  >
                    {kpiHover === i && <span className="ecp-kpi-tip">{k.tip}</span>}
                    <span className="ecp-kpi-label">{k.label}</span>
                    <span className="ecp-kpi-value">{formatKpi(kpiVals[i], k.prefix, k.suffix, k.decimals)}</span>
                    <span className={`ecp-kpi-trend${k.good ? ' good' : ' bad'}`}>
                      <TrendIcon dir={k.trend}/>{k.delta}
                    </span>
                  </div>
                ))}
              </div>

              {/* Pipeline funnel */}
              <div className="ecp-funnel">
                {PIPELINE.map((p, i) => (
                  <div
                    key={p.label}
                    className="ecp-funnel-row"
                    onMouseEnter={() => setFunnelHover(i)}
                    onMouseLeave={() => setFunnelHover(null)}
                  >
                    {funnelHover === i && i > 0 && (
                      <span className="ecp-funnel-tip">{Math.round((p.count / PIPELINE[i - 1].count) * 100)}% conv.</span>
                    )}
                    <span className="ecp-funnel-label">{p.label}</span>
                    <div className="ecp-funnel-bar">
                      <div className="ecp-funnel-fill" style={{ width: funnelOn ? `${p.pct}%` : '0%' }} />
                    </div>
                    <span className="ecp-funnel-count">{p.count}</span>
                  </div>
                ))}
              </div>

              {/* Activity */}
              <div className="ecp-activity">
                {ACTIVITY.map((a, i) => (
                  <div key={i} className="ecp-activity-item">
                    <span className="ecp-activity-icon"><CheckIcon/></span>
                    <span className="ecp-activity-text">{a.text}</span>
                    <span className="ecp-activity-time">{a.time}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div key="integrations" className="ecp-panel">

              {/* Connected systems */}
              <div className="ecp-systems">
                {SYSTEMS.map((s, i) => (
                  <div key={s.key} className={`ecp-system${syncStatus[i] === 'syncing' ? ' syncing' : ''}`}>
                    <span className="ecp-system-badge" style={{ background: s.color }}>{s.badge}</span>
                    <div className="ecp-system-info">
                      <span className="ecp-system-name">{s.label}</span>
                      <span className="ecp-system-meta">{s.records.toLocaleString()} records · {lastSync[i]}</span>
                    </div>
                    <span className={`ecp-system-status ecp-system-status--${syncStatus[i]}`}>
                      {syncStatus[i] === 'syncing' ? <span className="ecp-system-spinner" /> : <CheckIcon/>}
                    </span>
                  </div>
                ))}
              </div>

              {/* Sync now */}
              <button
                className={`ecp-sync-btn${syncing ? ' busy' : ''}`}
                onClick={runSync}
                disabled={syncing}
              >
                <RefreshIcon/>
                {syncing ? 'Syncing…' : 'Sync Now'}
              </button>

              {/* Sync log */}
              <div className="ecp-synclog">
                {syncLog.map((l, i) => (
                  <div key={i} className="ecp-synclog-item">
                    <span className="ecp-synclog-text">{l.text}</span>
                    <span className="ecp-synclog-time">{l.time}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>{/* end .ecp-card */}

        {/* ── Floating sync chip ── */}
        <div className={`ecp-chip${hovered ? ' hov' : ''}`}>
          <RefreshIcon/>
          {elapsed === null ? 'Syncing…' : `Synced ${formatElapsed(elapsed)}`}
        </div>

      </div>
    </div>
  )
}
