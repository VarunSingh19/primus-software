'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

const ORBS = [
  { label: 'CI/CD Pipelines', pos: 'tl', z: 90 },
  { label: 'Auto-scaling',    pos: 'tr', z: 70 },
  { label: 'Multi-region',    pos: 'bl', z: 80 },
  { label: 'Zero Downtime',   pos: 'br', z: 60 },
]

const TABS = [
  { key: 'pipeline',       label: 'Pipeline' },
  { key: 'infrastructure', label: 'Infrastructure' },
] as const

const REGIONS = [
  { name: 'US East',  code: 'us-east-1',  latency: 12, load: 38 },
  { name: 'EU West',  code: 'eu-west-1',  latency: 28, load: 54 },
  { name: 'AP South', code: 'ap-south-1', latency: 9,  load: 31 },
]

const RESOURCES = [
  { key: 'cpu',  label: 'CPU',    value: 34, detail: '4 vCPUs'        },
  { key: 'mem',  label: 'Memory', value: 58, detail: '7.4 / 16 GB'    },
  { key: 'disk', label: 'Disk',   value: 22, detail: '44 / 200 GB'    },
]

const LOG_LINES = [
  { text: '$ git push origin main',              type: 'cmd'     },
  { text: 'Building application…',               type: 'info'    },
  { text: '✓ Build completed in 18s',             type: 'ok'      },
  { text: 'Running test suite (128 tests)…',      type: 'info'    },
  { text: '✓ All tests passed',                   type: 'ok'      },
  { text: 'Deploying to 3 regions…',              type: 'info'    },
  { text: '✓ Deployment successful',              type: 'ok'      },
  { text: '→ Live at primus.software',            type: 'success' },
] as const

type StepStatus = 'pending' | 'running' | 'done'

type TimelineEvent =
  | { t: number; step: number; status: 'running' | 'done' }
  | { t: number; log: number }

const TIMELINE: TimelineEvent[] = [
  { t: 0,    step: 0, status: 'running' },
  { t: 0,    log: 0 },
  { t: 250,  log: 1 },
  { t: 1000, step: 0, status: 'done' },
  { t: 1000, step: 1, status: 'running' },
  { t: 1050, log: 2 },
  { t: 1300, log: 3 },
  { t: 2000, step: 1, status: 'done' },
  { t: 2000, step: 2, status: 'running' },
  { t: 2050, log: 4 },
  { t: 2300, log: 5 },
  { t: 3000, step: 2, status: 'done' },
  { t: 3000, step: 3, status: 'running' },
  { t: 3050, log: 6 },
  { t: 3500, step: 3, status: 'done' },
  { t: 3550, log: 7 },
]

function BranchIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="6" cy="4.5" r="2"/>
      <circle cx="6" cy="15.5" r="2"/>
      <circle cx="14" cy="9.5" r="2"/>
      <path d="M6 6.5v7M6 9.5c2.5 0 4.5-2 6-2"/>
    </svg>
  )
}

function RocketIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinejoin="round" strokeLinecap="round">
      <path d="M10 2c2.5 1.5 4 4.5 4 8 0 1.5-.4 3-1 4l-3 2-3-2c-.6-1-1-2.5-1-4 0-3.5 1.5-6.5 4-8z"/>
      <circle cx="10" cy="8" r="1.4"/>
      <path d="M7 12l-2.5 1.5L5 16M13 12l2.5 1.5-.5 2.5"/>
    </svg>
  )
}

function BoxIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinejoin="round" strokeLinecap="round">
      <path d="M10 2 17 5.5v9L10 18 3 14.5v-9z"/>
      <path d="M3 5.5 10 9l7-3.5M10 9v9"/>
    </svg>
  )
}

function FlaskIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinejoin="round" strokeLinecap="round">
      <path d="M8 2.5h4M8.5 2.5v5L4.5 14a1.5 1.5 0 0 0 1.3 2.5h8.4a1.5 1.5 0 0 0 1.3-2.5l-4-6.5v-5"/>
      <path d="M6.5 12h7"/>
    </svg>
  )
}

function CloudUploadIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
      <path d="M5.5 14.5a3.2 3.2 0 0 1-.5-6.4 4.3 4.3 0 0 1 8.4-1.3 3 3 0 0 1-.4 6.7"/>
      <path d="M10 7.5v6M7.5 10l2.5-2.5L12.5 10"/>
    </svg>
  )
}

function GlobeIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.6}>
      <circle cx="10" cy="10" r="7.5"/>
      <path d="M2.5 10h15M10 2.5c2.2 2 3.5 4.8 3.5 7.5s-1.3 5.5-3.5 7.5c-2.2-2-3.5-4.8-3.5-7.5S7.8 4.5 10 2.5z"/>
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

function CpuIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinejoin="round">
      <rect x="5" y="5" width="10" height="10" rx="1.5"/>
      <rect x="8" y="8" width="4" height="4" rx="0.5"/>
      <path d="M10 1.5v2M10 16.5v2M1.5 10h2M16.5 10h2M5.5 1.5v2M14.5 1.5v2M5.5 16.5v2M14.5 16.5v2" strokeLinecap="round"/>
    </svg>
  )
}

function MemoryIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinejoin="round" strokeLinecap="round">
      <rect x="2.5" y="6" width="15" height="8" rx="1.5"/>
      <path d="M5.5 6V3.5M9 6V3.5M12.5 6V3.5M5.5 16.5V14M9 16.5V14M12.5 16.5V14"/>
    </svg>
  )
}

function DiskIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.6}>
      <ellipse cx="10" cy="5" rx="7.5" ry="2.5"/>
      <path d="M2.5 5v10c0 1.4 3.4 2.5 7.5 2.5s7.5-1.1 7.5-2.5V5"/>
      <path d="M2.5 10c0 1.4 3.4 2.5 7.5 2.5s7.5-1.1 7.5-2.5"/>
    </svg>
  )
}

const STEPS = [
  { key: 'build',  label: 'Build',  icon: <BoxIcon/> },
  { key: 'test',   label: 'Test',   icon: <FlaskIcon/> },
  { key: 'deploy', label: 'Deploy', icon: <CloudUploadIcon/> },
  { key: 'live',   label: 'Live',   icon: <GlobeIcon/> },
]

function formatElapsed(s: number) {
  if (s < 60) return `${s}s ago`
  return `${Math.floor(s / 60)}m ago`
}

export function CloudDevOpsHero3D() {
  const wrapRef  = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<HTMLDivElement>(null)
  const timers   = useRef<ReturnType<typeof setTimeout>[]>([])

  const [hovered, setHovered]         = useState(false)
  const [activeTab, setActiveTab]     = useState<typeof TABS[number]['key']>('pipeline')
  const [stepStatuses, setStepStatuses] = useState<StepStatus[]>(['pending', 'pending', 'pending', 'pending'])
  const [logCount, setLogCount]       = useState(0)
  const [deploying, setDeploying]     = useState(false)
  const [elapsed, setElapsed]         = useState<number | null>(null)
  const [pinnedRegion, setPinnedRegion] = useState<number | null>(null)
  const [resHover, setResHover]       = useState<number | null>(null)
  const [regionsOn, setRegionsOn]     = useState(false)
  const [resOn, setResOn]             = useState(false)
  const [resVals, setResVals]         = useState({ cpu: 0, mem: 0, disk: 0 })

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

  /* resource gauges fill-in + count-up */
  useEffect(() => {
    const t = setTimeout(() => { setRegionsOn(true); setResOn(true) }, 400)

    let raf = 0
    const startDelay = 350
    const duration = 1200
    const t0 = performance.now()
    const tick = (now: number) => {
      const elapsedMs = now - t0 - startDelay
      const p = Math.min(1, Math.max(0, elapsedMs / duration))
      const eased = 1 - Math.pow(1 - p, 3)
      setResVals({
        cpu: RESOURCES[0].value * eased,
        mem: RESOURCES[1].value * eased,
        disk: RESOURCES[2].value * eased,
      })
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      clearTimeout(t)
      cancelAnimationFrame(raf)
    }
  }, [])

  /* deploy pipeline timeline */
  const runDeploy = () => {
    timers.current.forEach(clearTimeout)
    timers.current = []
    setStepStatuses(['pending', 'pending', 'pending', 'pending'])
    setLogCount(0)
    setDeploying(true)
    setElapsed(null)

    TIMELINE.forEach(ev => {
      timers.current.push(setTimeout(() => {
        if ('step' in ev) {
          setStepStatuses(prev => {
            const next = [...prev]
            next[ev.step] = ev.status
            return next
          })
        } else {
          setLogCount(ev.log + 1)
        }
      }, ev.t))
    })

    timers.current.push(setTimeout(() => {
      setDeploying(false)
      setElapsed(0)
    }, 3700))
  }

  useEffect(() => {
    runDeploy()
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
      className="cdh-wrap"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div ref={sceneRef} className={`cdh-scene${hovered ? ' hov' : ''}`}>

        {/* ── Orbital badges ── */}
        {ORBS.map(({ label, pos, z }) => (
          <div
            key={label}
            className={`cdh-orb cdh-orb--${pos}${hovered ? ' hov' : ''}`}
            style={{ '--bz': `${z}px` } as React.CSSProperties}
          >
            {label}
          </div>
        ))}

        {/* ── Glow halo ── */}
        <div className="cdh-halo" />

        {/* ── Main card ── */}
        <div className="cdh-card">

          {/* Header */}
          <div className="cdh-header">
            <div className="cdh-repo">
              <span className="cdh-repo-icon"><BranchIcon/></span>
              primus/web-app
              <span className="cdh-branch">main</span>
            </div>
            <div className={`cdh-status${deploying ? ' deploying' : ''}`}>
              <span className="cdh-status-dot" />
              {deploying ? 'Deploying' : 'Live'}
            </div>
          </div>

          {/* Tabs */}
          <div className="cdh-tabs">
            <span
              className="cdh-tab-indicator"
              style={{ '--idx': TABS.findIndex(t => t.key === activeTab) } as React.CSSProperties}
            />
            {TABS.map(t => (
              <button
                key={t.key}
                className={`cdh-tab${activeTab === t.key ? ' active' : ''}`}
                onClick={() => setActiveTab(t.key)}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Panel */}
          {activeTab === 'pipeline' ? (
            <div key="pipeline" className="cdh-panel">

              {/* Pipeline steps */}
              <div className="cdh-steps">
                {STEPS.flatMap((s, i) => {
                  const nodes = [
                    <div className="cdh-step" key={s.key}>
                      <div className={`cdh-step-icon cdh-step-icon--${stepStatuses[i]}`}>
                        {stepStatuses[i] === 'done' ? <CheckIcon/> : s.icon}
                        {stepStatuses[i] === 'running' && <span className="cdh-step-spinner"/>}
                      </div>
                      <span className="cdh-step-label">{s.label}</span>
                    </div>,
                  ]
                  if (i < STEPS.length - 1) {
                    nodes.push(
                      <span
                        key={`${s.key}-line`}
                        className={`cdh-step-line${stepStatuses[i] === 'done' ? ' done' : ''}`}
                      />
                    )
                  }
                  return nodes
                })}
              </div>

              {/* Terminal */}
              <div className="cdh-terminal">
                {LOG_LINES.slice(0, logCount).map((l, i) => (
                  <div key={i} className={`cdh-term-line cdh-term-line--${l.type}`}>
                    {l.text}
                    {i === logCount - 1 && deploying && <span className="cdh-term-cursor" />}
                  </div>
                ))}
              </div>

              {/* Redeploy */}
              <button
                className={`cdh-deploy-btn${deploying ? ' busy' : ''}`}
                onClick={runDeploy}
                disabled={deploying}
              >
                <RocketIcon/>
                {deploying ? 'Deploying…' : 'Redeploy'}
              </button>
            </div>
          ) : (
            <div key="infrastructure" className="cdh-panel">

              {/* Regions */}
              <div className="cdh-regions">
                {REGIONS.map((r, i) => (
                  <button
                    key={r.code}
                    className={`cdh-region${pinnedRegion === i ? ' pinned' : ''}`}
                    onClick={() => setPinnedRegion(p => (p === i ? null : i))}
                  >
                    {pinnedRegion === i && <span className="cdh-region-tip">p99: {r.latency * 3}ms</span>}
                    <div className="cdh-region-head">
                      <span className="cdh-region-dot" />
                      <span className="cdh-region-name">{r.name}</span>
                    </div>
                    <span className="cdh-region-code">{r.code}</span>
                    <div className="cdh-region-stats">
                      <span className="cdh-region-latency">{r.latency}ms</span>
                      <div className="cdh-region-bar">
                        <div className="cdh-region-fill" style={{ width: regionsOn ? `${r.load}%` : '0%' }} />
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Resource gauges */}
              <div className="cdh-resources">
                {RESOURCES.map((res, i) => (
                  <div
                    key={res.key}
                    className="cdh-resource"
                    onMouseEnter={() => setResHover(i)}
                    onMouseLeave={() => setResHover(null)}
                  >
                    {resHover === i && <span className="cdh-resource-tip">{res.detail}</span>}
                    <span className="cdh-resource-icon">
                      {res.key === 'cpu' && <CpuIcon/>}
                      {res.key === 'mem' && <MemoryIcon/>}
                      {res.key === 'disk' && <DiskIcon/>}
                    </span>
                    <span className="cdh-resource-label">{res.label}</span>
                    <div className="cdh-resource-bar">
                      <div className="cdh-resource-fill" style={{ width: resOn ? `${res.value}%` : '0%' }} />
                    </div>
                    <span className="cdh-resource-value">
                      {Math.round(i === 0 ? resVals.cpu : i === 1 ? resVals.mem : resVals.disk)}%
                    </span>
                  </div>
                ))}
              </div>

              {/* Uptime */}
              <div className="cdh-uptime">
                <span className="cdh-uptime-dot" />
                99.99% uptime · 182 days · 3 regions
              </div>
            </div>
          )}
        </div>{/* end .cdh-card */}

        {/* ── Floating deploy chip ── */}
        <div className={`cdh-deploy-chip${hovered ? ' hov' : ''}`}>
          <RocketIcon/>
          {elapsed === null ? 'Deploying…' : `Deployed ${formatElapsed(elapsed)}`}
        </div>

      </div>
    </div>
  )
}
