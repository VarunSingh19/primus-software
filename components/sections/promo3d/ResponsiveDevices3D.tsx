'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

/* ════════════════════════════════════════════════════════════════
   ResponsiveDevices3D — Promo block 3 ("Every screen, every device")

   A premium device continuum. ONE product dashboard reflows across an
   iPhone → iPad → Mac → Apple TV, each rendered as a detailed device.
   A stage shows the active device large; a dock below tracks all four.

   • Auto-cycles iPhone → iPad → Mac → Apple TV (click the dock to jump).
   • Power-on wake: the screen lights, status bar/clock come up, the UI
     reflows in and the chart draws — each time a device takes the stage.
   • Continuity handoff: a glowing indicator arcs across the dock from the
     outgoing device to the incoming one, which pulses "receiving."
   • Live in-screen UI: a real clock + a chart that draws on every wake.
   • Scene tilt parallax + cursor spotlight. Reduced motion → static Mac.
═════════════════════════════════════════════════════════════════ */

type Variant = 'phone' | 'tablet' | 'laptop' | 'tv'
const DEVICES: { key: string; name: string; vp: string; variant: Variant }[] = [
  { key: 'iphone', name: 'iPhone', vp: '393 pt', variant: 'phone' },
  { key: 'ipad', name: 'iPad', vp: '1024 pt', variant: 'tablet' },
  { key: 'mac', name: 'Mac', vp: '1440 px', variant: 'laptop' },
  { key: 'tv', name: 'Apple TV', vp: '2160 px', variant: 'tv' },
]

const STATS = [
  { v: '12.4k', l: 'Users' },
  { v: '3.8%', l: 'Conv' },
  { v: '1.2s', l: 'Load' },
]
const ROWS = [
  { name: 'Acme Inc', tag: '+18%' },
  { name: 'Globex', tag: '+9%' },
  { name: 'Initech', tag: '+24%' },
]

/* dock glyphs (device silhouettes) */
const GLYPH: Record<Variant, React.ReactNode> = {
  phone: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><rect x="7" y="2" width="10" height="20" rx="2.6" /><path d="M11 18.5h2" strokeLinecap="round" /></svg>,
  tablet: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><rect x="4" y="3" width="16" height="18" rx="2.4" /><path d="M11 18h2" strokeLinecap="round" /></svg>,
  laptop: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><rect x="4" y="4" width="16" height="11" rx="1.6" /><path d="M2 19h20" strokeLinecap="round" /></svg>,
  tv: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><rect x="3" y="4" width="18" height="12" rx="1.6" /><path d="M9 20h6M12 16v4" strokeLinecap="round" /></svg>,
}

function Chart({ id }: { id: string }) {
  return (
    <svg className="r3-chart" viewBox="0 0 100 40" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(129,140,248,0.45)" />
          <stop offset="100%" stopColor="rgba(129,140,248,0)" />
        </linearGradient>
      </defs>
      <path className="r3-chart__area" d="M0 32 L14 26 L28 29 L42 17 L56 21 L70 9 L84 13 L100 4 L100 40 L0 40 Z" fill={`url(#${id})`} />
      <path className="r3-chart__line" d="M0 32 L14 26 L28 29 L42 17 L56 21 L70 9 L84 13 L100 4" fill="none" stroke="#818cf8" strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  )
}

function Dashboard({ variant }: { variant: Variant }) {
  return (
    <div className={`r3-dash r3-dash--${variant}`}>
      <div className="r3-dash__head r3-wake">
        <span className="r3-brand"><span className="r3-brand__dot" />Helix</span>
        <span className="r3-dash__meta">Analytics</span>
      </div>

      <div className="r3-card r3-card--chart r3-wake">
        <div className="r3-card__top">
          <span className="r3-card__label">Revenue</span>
          <span className="r3-card__val">$84.2k <i>+12%</i></span>
        </div>
        <Chart id={`r3cg-${variant}`} />
      </div>

      <div className="r3-stats r3-wake">
        {STATS.map(s => (
          <div key={s.l} className="r3-stat">
            <b>{s.v}</b><span>{s.l}</span>
          </div>
        ))}
      </div>

      <div className="r3-list r3-wake">
        {ROWS.map(r => (
          <div key={r.name} className="r3-row">
            <span className="r3-row__dot" />
            <span className="r3-row__name">{r.name}</span>
            <span className="r3-row__bar"><i /></span>
            <span className="r3-row__tag">{r.tag}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

const StatusBar = () => (
  <div className="r3-statusbar">
    <span className="r3-clock">9:41</span>
    <span className="r3-sb-icons">
      <svg width="14" height="10" viewBox="0 0 16 12" fill="currentColor"><rect x="0" y="8" width="3" height="4" rx="0.5" /><rect x="4.5" y="5.5" width="3" height="6.5" rx="0.5" /><rect x="9" y="3" width="3" height="9" rx="0.5" /><rect x="13.5" y="0" width="3" height="12" rx="0.5" /></svg>
      <svg width="13" height="10" viewBox="0 0 16 12" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M1 4.5a11 11 0 0 1 14 0M3.5 7.2a7.4 7.4 0 0 1 9 0M6 9.8a3.6 3.6 0 0 1 4 0" strokeLinecap="round" /></svg>
      <svg width="20" height="10" viewBox="0 0 24 12" fill="none"><rect x="0.5" y="0.5" width="20" height="11" rx="2.5" stroke="currentColor" strokeWidth="1" opacity="0.5" /><rect x="21.5" y="4" width="2" height="4" rx="1" fill="currentColor" opacity="0.5" /><rect x="2" y="2" width="14" height="8" rx="1" fill="currentColor" /></svg>
    </span>
  </div>
)

const Continuity = () => (
  <span className="r3-continuity"><svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17 17 7M9 7h8v8" /></svg>Continuity</span>
)

function Shell({ variant }: { variant: Variant }) {
  if (variant === 'phone') return (
    <div className="r3-phone">
      <div className="r3-screen">
        <div className="r3-poweron" />
        <div className="r3-island" />
        <StatusBar />
        <Dashboard variant="phone" />
        <div className="r3-homebar" />
        {/* <Continuity /> */}
      </div>
    </div>
  )
  if (variant === 'tablet') return (
    <div className="r3-tablet">
      <div className="r3-screen">
        <div className="r3-poweron" />
        <span className="r3-cam" />
        <StatusBar />
        <Dashboard variant="tablet" />
        <div className="r3-homebar" />
        {/* <Continuity /> */}
      </div>
    </div>
  )
  if (variant === 'laptop') return (
    <div className="r3-laptop">
      <div className="r3-laptop__lid">
        <div className="r3-screen">
          <div className="r3-poweron" />
          <div className="r3-winbar">
            <span className="r3-traffic"><i /><i /><i /></span>
            <span className="r3-winbar__title">Helix — Analytics</span>
          </div>
          <Dashboard variant="laptop" />
          {/* <Continuity /> */}
        </div>
      </div>
      <div className="r3-laptop__base"><span className="r3-laptop__notch" /></div>
    </div>
  )
  return (
    <div className="r3-tv">
      <div className="r3-tv__panel">
        <div className="r3-screen">
          <div className="r3-poweron" />
          <Dashboard variant="tv" />
          {/* <Continuity /> */}
        </div>
      </div>
      <div className="r3-tv__stand" />
      <div className="r3-tv__foot" />
      <div className="r3-tv__puck" />
    </div>
  )
}

export function ResponsiveDevices3D() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const wrap = wrapRef.current
    const scene = sceneRef.current
    if (!wrap || !scene) return

    const $ = <T extends Element>(s: string) => Array.from(scene.querySelectorAll<T>(s))
    const devEls = $<HTMLElement>('.r3-dev')
    const dockEls = $<HTMLElement>('.r3-dock-item')
    const handoff = $<HTMLElement>('.r3-handoff')[0]
    const chipName = $<HTMLElement>('.r3-chip-name')[0]
    const chipVp = $<HTMLElement>('.r3-chip-vp')[0]
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    /* live clock into every status bar / window bar */
    const clocks = $<HTMLElement>('.r3-clock')
    const tick = () => {
      const t = new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
      clocks.forEach(c => { c.textContent = t })
    }
    tick()
    const clockId = window.setInterval(tick, 20000)

    let prev = -1

    const ctx = gsap.context(() => {
      const setChip = (i: number) => {
        if (chipName) chipName.textContent = DEVICES[i].name
        if (chipVp) chipVp.textContent = DEVICES[i].vp
      }

      /* ── Static composed state for reduced motion (Mac on stage) ── */
      if (reduce) {
        devEls.forEach((el, k) => gsap.set(el, { autoAlpha: k === 2 ? 1 : 0, scale: k === 2 ? 1 : 0.94 }))
        $<HTMLElement>('.r3-poweron').forEach(p => gsap.set(p, { autoAlpha: 0 }))
        $<HTMLElement>('.r3-chart').forEach(c => gsap.set(c, { clipPath: 'inset(0 0% 0 0)' }))
        $<HTMLElement>('.r3-continuity').forEach(c => gsap.set(c, { autoAlpha: 0 }))
        dockEls.forEach((d, k) => d.classList.toggle('is-active', k === 2))
        setChip(2)
        return
      }

      /* initial: all devices off-stage, screens unlit */
      gsap.set(devEls, { autoAlpha: 0, scale: 0.94 })
      $<HTMLElement>('.r3-poweron').forEach(p => gsap.set(p, { autoAlpha: 1 }))
      $<HTMLElement>('.r3-chart').forEach(c => gsap.set(c, { clipPath: 'inset(0 100% 0 0)' }))
      $<HTMLElement>('.r3-continuity').forEach(c => gsap.set(c, { autoAlpha: 0, y: -4 }))
      if (handoff) gsap.set(handoff, { autoAlpha: 0 })

      /* ── Power-on wake for the device taking the stage ── */
      const wake = (el: HTMLElement) => {
        const screen = el.querySelector<HTMLElement>('.r3-poweron')
        const items = el.querySelectorAll<HTMLElement>('.r3-wake')
        const chart = el.querySelector<HTMLElement>('.r3-chart')
        const cont = el.querySelector<HTMLElement>('.r3-continuity')
        const tl = gsap.timeline()
        if (screen) tl.fromTo(screen, { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.5, ease: 'power2.out' }, 0)
        tl.fromTo(items, { y: 9, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.4, stagger: 0.05, ease: 'power3.out' }, 0.12)
        if (chart) tl.fromTo(chart, { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.8, ease: 'power2.out' }, 0.25)
        if (cont && prev >= 0) tl.fromTo(cont, { autoAlpha: 0, y: -4 }, { autoAlpha: 1, y: 0, duration: 0.3 }, 0.2)
          .to(cont!, { autoAlpha: 0, duration: 0.4 }, 1.8)
      }

      /* ── Continuity handoff: orb arcs across the dock ── */
      const moveHandoff = (from: number, to: number) => {
        if (!handoff) return
        const a = dockEls[from].offsetLeft + dockEls[from].offsetWidth / 2
        const b = dockEls[to].offsetLeft + dockEls[to].offsetWidth / 2
        gsap.timeline()
          .set(handoff, { left: a, top: dockEls[to].offsetTop - 12 })
          .fromTo(handoff, { autoAlpha: 0, scale: 0.5 }, { autoAlpha: 1, scale: 1, duration: 0.18 })
          .to(handoff, { left: b, duration: 0.5, ease: 'power2.inOut' }, '<')
          .to(handoff, { autoAlpha: 0, scale: 0.5, duration: 0.25 })
        gsap.fromTo(dockEls[to], { '--recv': 0 } as gsap.TweenVars,
          { '--recv': 1, duration: 0.4, yoyo: true, repeat: 1, ease: 'power2.out' } as gsap.TweenVars)
      }

      /* ── Bring device i to the stage ── */
      const activate = (i: number) => {
        if (i === prev) return
        devEls.forEach((el, k) => {
          if (k !== i) gsap.to(el, { autoAlpha: 0, scale: 0.94, z: -10, duration: 0.35, ease: 'power2.in' })
        })
        gsap.to(devEls[i], { autoAlpha: 1, scale: 1, z: 28, duration: 0.5, ease: 'power3.out' })
        /* re-arm the screen so it can power on again */
        const po = devEls[i].querySelector<HTMLElement>('.r3-poweron')
        if (po) gsap.set(po, { autoAlpha: 1 })
        wake(devEls[i])
        dockEls.forEach((d, k) => d.classList.toggle('is-active', k === i))
        if (prev >= 0 && prev !== i) moveHandoff(prev, i)
        setChip(i)
        prev = i
      }

      /* ── Auto-cycle ── */
      const SEG = 3.4
      const cycle = gsap.timeline({ repeat: -1 })
      DEVICES.forEach((_, i) => cycle.call(() => activate(i), [], i * SEG))
      cycle.to({}, { duration: SEG }, (DEVICES.length - 1) * SEG)

      /* ── Dock click → jump to a device ── */
      const handlers: Array<[Element, string, EventListener]> = []
      const bind = (el: Element | undefined, type: string, fn: EventListener) => {
        if (!el) return
        el.addEventListener(type, fn); handlers.push([el, type, fn])
      }
      dockEls.forEach((d, i) => bind(d, 'click', () => { cycle.seek(i * SEG); activate(i) }))

      /* ── Parallax + cursor spotlight ── */
      const glow = $<HTMLElement>('.r3-glow')[0]
      const onMove = (e: MouseEvent) => {
        const r = wrap.getBoundingClientRect()
        const dx = (e.clientX - r.left) / r.width - 0.5
        const dy = (e.clientY - r.top) / r.height - 0.5
        gsap.to(scene, { rotateY: dx * 13, rotateX: -dy * 9, duration: 0.5, ease: 'power2.out' })
        if (glow) gsap.to(glow, { x: e.clientX - r.left, y: e.clientY - r.top, duration: 0.4, ease: 'power2.out' })
      }
      const onEnter = () => { if (glow) gsap.to(glow, { autoAlpha: 1, duration: 0.4 }) }
      const onLeave = () => {
        gsap.to(scene, { rotateY: 0, rotateX: 0, duration: 1.1, ease: 'elastic.out(1, 0.5)' })
        if (glow) gsap.to(glow, { autoAlpha: 0, duration: 0.5 })
      }
      wrap.addEventListener('mousemove', onMove)
      wrap.addEventListener('mouseenter', onEnter)
      wrap.addEventListener('mouseleave', onLeave)

      return () => {
        wrap.removeEventListener('mousemove', onMove)
        wrap.removeEventListener('mouseenter', onEnter)
        wrap.removeEventListener('mouseleave', onLeave)
        handlers.forEach(([el, type, fn]) => el.removeEventListener(type, fn))
      }
    }, wrap)

    return () => { window.clearInterval(clockId); ctx.revert() }
  }, [])

  return (
    <div ref={wrapRef} className="r3-wrap" aria-hidden="true">
      <div ref={sceneRef} className="r3-scene">

        {/* ── Cursor spotlight ── */}
        <span className="r3-glow" />

        {/* ── Reflective stage floor ── */}
        <div className="r3-floor" />

        {/* ── Stage: all four devices, one active ── */}
        <div className="r3-stage">
          {DEVICES.map(d => (
            <div key={d.key} className={`r3-dev r3-dev--${d.variant}`} data-key={d.key}>
              <Shell variant={d.variant} />
            </div>
          ))}
        </div>

        {/* ── Dock ── */}
        <div className="r3-dock">
          <span className="r3-handoff" />
          {DEVICES.map(d => (
            <button key={d.key} type="button" className="r3-dock-item" aria-label={d.name}>
              {GLYPH[d.variant]}
            </button>
          ))}
        </div>

        {/* ── Floating chip (name + viewport) ── */}
        <div className="r3-chip-layer">
          <div className="r3-chip">
            <span className="r3-chip__dot" />
            <span className="r3-chip-name">iPhone</span>
            <span className="r3-chip-vp">393 pt</span>
          </div>
        </div>

      </div>
    </div>
  )
}
