'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

const ORBS = [
  { label: 'React Native',       pos: 'tl', z: 90 },
  { label: 'Push Notifications', pos: 'tr', z: 70 },
  { label: 'Offline-first',      pos: 'bl', z: 80 },
  { label: '60 FPS',             pos: 'br', z: 60 },
]

/* Apple-Fitness-style activity rings: outer → inner */
const RINGS = [
  { r: 32, color: '#10b981', value: 0.92 },
  { r: 25, color: '#34d399', value: 0.68 },
  { r: 18, color: '#6ee7b7', value: 1.00 },
]

function HomeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
      <path d="M4 11.5 12 4l8 7.5V20a1 1 0 0 1-1 1h-4v-6H9v6H5a1 1 0 0 1-1-1z" strokeLinejoin="round"/>
    </svg>
  )
}

function ActivityIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
      <path d="M2 12h4l2-7 4 14 3-10 2 3h5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function BellIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
      <path d="M5 17h14l-1.5-2V11a5.5 5.5 0 0 0-11 0v4z" strokeLinejoin="round"/>
      <path d="M9.5 20a2.5 2.5 0 0 0 5 0" strokeLinecap="round"/>
    </svg>
  )
}

function ProfileIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
      <circle cx="12" cy="8" r="3.5"/>
      <path d="M4.5 20a7.5 7.5 0 0 1 15 0" strokeLinecap="round"/>
    </svg>
  )
}

function PlusIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2}>
      <path d="M12 4v16M4 12h16" strokeLinecap="round"/>
    </svg>
  )
}

function HeartIcon({ filled }: { filled: boolean }) {
  return (
    <svg viewBox="0 0 20 20" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={1.6}>
      <path d="M10 17.3 8.5 16C4 12 1.5 9.6 1.5 6.6 1.5 4 3.5 2 6 2c1.6 0 3 .8 4 2.1C11 2.8 12.4 2 14 2c2.5 0 4.5 2 4.5 4.6 0 3-2.5 5.4-7 9.4l-1.5 1.3z"/>
    </svg>
  )
}

function BookmarkIcon({ filled }: { filled: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={1.8}>
      <path d="M6 3h12v18l-6-4-6 4z" strokeLinejoin="round"/>
    </svg>
  )
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M8 5v14l11-7z"/>
    </svg>
  )
}

function TrendingIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
      <path d="M3 17l6-6 4 4 8-8" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M15 7h6v6" strokeLinecap="round" strokeLinejoin="round"/>
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

function SignalIcon() {
  return (
    <svg width="14" height="10" viewBox="0 0 16 12" fill="currentColor">
      <rect x="0" y="8" width="3" height="4" rx="0.5"/>
      <rect x="4.5" y="5.5" width="3" height="6.5" rx="0.5"/>
      <rect x="9" y="3" width="3" height="9" rx="0.5"/>
      <rect x="13.5" y="0" width="3" height="12" rx="0.5"/>
    </svg>
  )
}

function WifiIcon() {
  return (
    <svg width="13" height="10" viewBox="0 0 16 12" fill="none" stroke="currentColor" strokeWidth={1.6}>
      <path d="M1 4.5a11 11 0 0 1 14 0M3.5 7.2a7.4 7.4 0 0 1 9 0M6 9.8a3.6 3.6 0 0 1 4 0" strokeLinecap="round"/>
      <circle cx="8" cy="11.3" r="0.8" fill="currentColor" stroke="none"/>
    </svg>
  )
}

function BatteryIcon({ level }: { level: number }) {
  return (
    <svg width="22" height="11" viewBox="0 0 24 12" fill="none">
      <rect x="0.5" y="0.5" width="20" height="11" rx="2.5" stroke="currentColor" strokeWidth="1" opacity="0.5"/>
      <rect x="21.5" y="4" width="2" height="4" rx="1" fill="currentColor" opacity="0.5"/>
      <rect x="2" y="2" width={Math.round(17 * level / 100)} height="8" rx="1" fill="currentColor"/>
    </svg>
  )
}

const TABS = [
  { key: 'home',     label: 'Home',     icon: <HomeIcon/>     },
  { key: 'activity', label: 'Activity', icon: <ActivityIcon/> },
  { key: 'alerts',   label: 'Alerts',   icon: <BellIcon/>     },
  { key: 'profile',  label: 'Profile',  icon: <ProfileIcon/>  },
]

export function MobileAppsHero3D() {
  const wrapRef  = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<HTMLDivElement>(null)
  const timers   = useRef<ReturnType<typeof setTimeout>[]>([])

  const [hovered, setHovered]     = useState(false)
  const [ringsOn, setRingsOn]     = useState(false)
  const [time, setTime]           = useState('9:41')
  const [notifVisible, setNotif]  = useState(false)
  const [saved, setSaved]         = useState(false)
  const [activeTab, setActiveTab] = useState('home')
  const [fabPressed, setFabPressed] = useState(false)
  const [pulsedChip, setPulsedChip] = useState<string | null>(null)

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

  /* live clock */
  useEffect(() => {
    const update = () => setTime(new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }))
    update()
    const id = setInterval(update, 30000)
    return () => clearInterval(id)
  }, [])

  /* activity rings fill-in + notification banner sequence */
  useEffect(() => {
    timers.current.push(setTimeout(() => setRingsOn(true), 400))
    timers.current.push(setTimeout(() => setNotif(true), 2200))
    timers.current.push(setTimeout(() => setNotif(false), 6200))
    return () => { timers.current.forEach(clearTimeout); timers.current = [] }
  }, [])

  const tapChip = (key: string) => {
    setPulsedChip(key)
    const t = setTimeout(() => setPulsedChip(null), 400)
    timers.current.push(t)
  }

  return (
    <div
      ref={wrapRef}
      className="mob-wrap"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div ref={sceneRef} className={`mob-scene${hovered ? ' hov' : ''}`}>

        {/* ── Orbital badges ── */}
        {ORBS.map(({ label, pos, z }) => (
          <div
            key={label}
            className={`mob-orb mob-orb--${pos}${hovered ? ' hov' : ''}`}
            style={{ '--bz': `${z}px` } as React.CSSProperties}
          >
            {label}
          </div>
        ))}

        {/* ── Glow halo ── */}
        <div className="mob-halo" />

        {/* ── Phone frame ── */}
        <div className="mob-phone">
          <div className="mob-screen">

            {/* Notch / dynamic island */}
            <div className="mob-island" />

            {/* Status bar */}
            <div className="mob-statusbar">
              <span className="mob-time">{time}</span>
              <div className="mob-status-icons">
                <SignalIcon />
                <WifiIcon />
                <BatteryIcon level={87} />
              </div>
            </div>

            {/* Notification banner */}
            <button
              className={`mob-notification${notifVisible ? ' show' : ''}`}
              onClick={() => setNotif(false)}
              aria-label="Dismiss notification"
            >
              <span className="mob-notification-icon"><BellIcon/></span>
              <span className="mob-notification-text">
                <strong>Pulse</strong> · New workout plan ready 🔥
              </span>
            </button>

            {/* App content */}
            <div className="mob-app">

              {/* Header */}
              <div className="mob-header">
                <div>
                  <p className="mob-greeting">Good morning</p>
                  <p className="mob-username">Alex Carter</p>
                </div>
                <div className="mob-avatar">
                  AC
                  <span className="mob-avatar-dot" />
                </div>
              </div>

              {/* Activity rings */}
              <div className="mob-rings-card">
                <div className="mob-rings">
                  <svg viewBox="0 0 80 80" width="84" height="84">
                    {RINGS.map(({ r, color }) => (
                      <circle key={`bg-${r}`} cx="40" cy="40" r={r} fill="none" stroke={color} strokeOpacity="0.15" strokeWidth="6"/>
                    ))}
                    {RINGS.map(({ r, color, value }) => {
                      const c = 2 * Math.PI * r
                      const offset = c - (ringsOn ? value : 0) * c
                      return (
                        <circle
                          key={r} cx="40" cy="40" r={r} fill="none" stroke={color} strokeWidth="6"
                          strokeDasharray={c} strokeDashoffset={offset} strokeLinecap="round"
                          transform="rotate(-90 40 40)" className="mob-ring"
                        />
                      )
                    })}
                  </svg>
                  <div className="mob-rings-center">
                    <span className="mob-rings-num">742</span>
                    <span className="mob-rings-label">kcal</span>
                  </div>
                </div>

                <div className="mob-rings-meta">
                  <p className="mob-rings-title">Daily goal</p>
                  <p className="mob-rings-sub">92% of move ring complete</p>
                </div>
              </div>

              {/* Stat chips */}
              <div className="mob-stats-row">
                <button className={`mob-stat${pulsedChip === 'steps' ? ' pulse' : ''}`} onClick={() => tapChip('steps')}>
                  <span className="mob-stat-icon mob-stat-icon--steps"><TrendingIcon/></span>
                  <span className="mob-stat-value">8,492</span>
                  <span className="mob-stat-label">Steps</span>
                </button>
                <button className={`mob-stat${pulsedChip === 'heart' ? ' pulse' : ''}`} onClick={() => tapChip('heart')}>
                  <span className="mob-stat-icon mob-stat-icon--heart"><HeartIcon filled/></span>
                  <span className="mob-stat-value">72</span>
                  <span className="mob-stat-label">BPM</span>
                </button>
                <button className={`mob-stat${pulsedChip === 'sleep' ? ' pulse' : ''}`} onClick={() => tapChip('sleep')}>
                  <span className="mob-stat-icon mob-stat-icon--sleep"><MoonIcon/></span>
                  <span className="mob-stat-value">7h 20m</span>
                  <span className="mob-stat-label">Sleep</span>
                </button>
              </div>

              {/* Workout card */}
              <div className="mob-workout">
                <div className="mob-workout-media">
                  <button className="mob-play"><PlayIcon/></button>
                </div>
                <div className="mob-workout-info">
                  <p className="mob-workout-title">Morning Run</p>
                  <p className="mob-workout-meta">5.2 km · 32 min</p>
                </div>
                <button
                  className={`mob-bookmark${saved ? ' active' : ''}`}
                  onClick={() => setSaved(s => !s)}
                  aria-label="Save workout"
                >
                  <BookmarkIcon filled={saved}/>
                </button>
              </div>
            </div>

            {/* Tab bar */}
            <div className="mob-tabbar">
              <span
                className="mob-tab-indicator"
                style={{ '--idx': TABS.findIndex(t => t.key === activeTab) } as React.CSSProperties}
              />
              {TABS.map(t => (
                <button
                  key={t.key}
                  className={`mob-tab${activeTab === t.key ? ' active' : ''}`}
                  onClick={() => setActiveTab(t.key)}
                  aria-label={t.label}
                >
                  {t.icon}
                </button>
              ))}
            </div>

            {/* Floating action button */}
            <button
              className={`mob-fab${fabPressed ? ' pressed' : ''}`}
              onMouseDown={() => setFabPressed(true)}
              onMouseUp={() => setFabPressed(false)}
              onMouseLeave={() => setFabPressed(false)}
              aria-label="Add activity"
            >
              <PlusIcon/>
            </button>

            {/* Home indicator */}
            <div className="mob-home-indicator" />
          </div>
        </div>{/* end .mob-phone */}

        {/* ── Floating App Store rating ── */}
        <div className={`mob-rating${hovered ? ' hov' : ''}`}>
          <span className="mob-rating-star">★</span> 4.9 App Store
        </div>

      </div>
    </div>
  )
}
