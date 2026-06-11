'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

/* ════════════════════════════════════════════════════════════════
   IntegrationsHub3D — Promo block 1 ("Your stack, fully connected")

   A living event mesh. Five systems are wired to a central hub by
   curved conduits. Comet-trailed packets travel the curves and
   accelerate into the hub (requests); the hub absorbs each one with a
   ripple, then fires a response comet back to the source. Traffic is
   staggered and bursty. The hub breathes and tumbles with counter-
   rotating orbital rings; nodes bob on their own rhythm.

   Interactive:
   • Hover a node    → it lifts, its conduit becomes a live stream, and
                        a real API endpoint pill (route + latency) reveals.
   • Click the hub   → a synchronized "sync all" burst across every system.
   • Move the cursor → scene tilt parallax + a soft spotlight that trails.

   Reduced motion → a static, fully-composed mesh (no loops, no parallax).
═════════════════════════════════════════════════════════════════ */

const SCENE_W = 520
const SCENE_H = 440
const HUB = { x: 260, y: 222 }

type Node = {
  id: string; label: string; x: number; y: number; color: string
  icon: React.ReactNode; route: string; latency: string; side: 1 | -1
}

/* ── Tiny stroke icons (inherit currentColor) ── */
const I = (d: string) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
       strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {d.split('|').map((p, i) => <path key={i} d={p} />)}
  </svg>
)
const DbIcon    = I('M4 6c0-1.7 3.6-3 8-3s8 1.3 8 3-3.6 3-8 3-8-1.3-8-3z|M4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6|M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3')
const UsersIcon = I('M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2|M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8|M22 21v-2a4 4 0 0 0-3-3.87|M16 3.13A4 4 0 0 1 16 11')
const CardIcon  = I('M2 7h20v10a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z|M2 10h20|M6 14h4')
const ChatIcon  = I('M21 11.5a8.4 8.4 0 0 1-9 8 9 9 0 0 1-4-1l-5 1 1-4a8.4 8.4 0 0 1-1-4 8.5 8.5 0 0 1 8.5-8.5h.5a8.4 8.4 0 0 1 8.5 8z')
const ChartIcon = I('M3 3v18h18|M7 14l3-4 3 2 4-6')

const NODES: Node[] = [
  { id: 'erp', label: 'ERP',       x: 72,  y: 168, color: '#6366f1', icon: DbIcon,    route: 'GET /inventory', latency: '42ms', side:  1 },
  { id: 'crm', label: 'CRM',       x: 260, y: 64,  color: '#06b6d4', icon: UsersIcon, route: 'POST /contacts', latency: '31ms', side: -1 },
  { id: 'pay', label: 'Payments',  x: 448, y: 168, color: '#22c55e', icon: CardIcon,  route: 'POST /charges',  latency: '88ms', side: -1 },
  { id: 'msg', label: 'Messaging', x: 376, y: 344, color: '#f59e0b', icon: ChatIcon,  route: 'POST /messages', latency: '24ms', side:  1 },
  { id: 'ana', label: 'Analytics', x: 144, y: 344, color: '#a855f7', icon: ChartIcon, route: 'GET /events',     latency: '53ms', side: -1 },
]

const TRAIL = 5 // comet trail segments

/* ── Curved conduit path (quadratic bezier, bowed perpendicular) ── */
const pathFor = (n: Node) => {
  const mx = (n.x + HUB.x) / 2
  const my = (n.y + HUB.y) / 2
  const dx = HUB.x - n.x
  const dy = HUB.y - n.y
  const len = Math.hypot(dx, dy) || 1
  const px = -dy / len
  const py = dx / len
  const bow = 0.17 * len * n.side
  return `M ${n.x} ${n.y} Q ${mx + px * bow} ${my + py * bow} ${HUB.x} ${HUB.y}`
}

export function IntegrationsHub3D() {
  const wrapRef  = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const wrap  = wrapRef.current
    const scene = sceneRef.current
    if (!wrap || !scene) return

    const $  = <T extends Element>(s: string) => Array.from(scene.querySelectorAll<T>(s))
    const wires    = $<SVGPathElement>('.pb1-wire')
    const streams  = $<SVGPathElement>('.pb1-stream')
    const comets   = $<SVGGElement>('.pb1-comet')
    const heads    = $<SVGCircleElement>('.pb1-comet-head')
    const trails   = comets.map(g => Array.from(g.querySelectorAll<SVGCircleElement>('.pb1-comet-trail')))
    const nodeEls  = $<HTMLElement>('.pb1-node')
    const endpoints= $<HTMLElement>('.pb1-endpoint')
    const counter  = $<HTMLElement>('.pb1-count')[0]
    const reduce   = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const lens = wires.map(p => (p.getTotalLength ? p.getTotalLength() : 0))
    const hovering = NODES.map(() => false)

    let count = 14820
    const setCount = () => { if (counter) counter.textContent = count.toLocaleString() }
    const bump = (n = 1) => { count += n; setCount() }
    setCount()

    /* place comet i at parameter p∈[0,1] along its conduit (+ trail) */
    const place = (i: number, p: number) => {
      const path = wires[i]; const L = lens[i]
      if (!path || !L) return
      const clamp = Math.max(0, Math.min(1, p))
      const hp = path.getPointAtLength(clamp * L)
      heads[i].setAttribute('cx', String(hp.x))
      heads[i].setAttribute('cy', String(hp.y))
      trails[i].forEach((c, k) => {
        const tp = Math.max(0, clamp - (k + 1) * 0.05)
        const pt = path.getPointAtLength(tp * L)
        c.setAttribute('cx', String(pt.x))
        c.setAttribute('cy', String(pt.y))
      })
    }
    NODES.forEach((_, i) => place(i, 0))

    const ctx = gsap.context(() => {
      /* ── Reduced motion: paint a composed, static mesh ── */
      if (reduce) {
        gsap.set('.pb1-hub-core', { autoAlpha: 1, scale: 1 })
        gsap.set('.pb1-hub-spin, .pb1-hub-spin2', { autoAlpha: 1 })
        gsap.set(nodeEls, { autoAlpha: 1, scale: 1 })
        gsap.set(wires, { strokeDashoffset: 0 })
        gsap.set(comets, { autoAlpha: 0 })
        gsap.set(endpoints, { autoAlpha: 0, y: 6 })
        gsap.set('.pb1-chip', { autoAlpha: 1, scale: 1, y: 0 })
        return
      }

      /* ════ Shared reactions ════ */
      const flashNode = (i: number, strength = 1) => {
        gsap.fromTo(nodeEls[i], { '--glow': 0 } as gsap.TweenVars,
          { '--glow': strength, duration: 0.26, yoyo: true, repeat: 1, ease: 'power2.out' } as gsap.TweenVars)
      }
      const absorb = (i: number) => {
        gsap.fromTo('.pb1-hub-ring', { scale: 0.85, autoAlpha: 0.75 },
          { scale: 1.5, autoAlpha: 0, duration: 0.7, ease: 'power2.out' })
        gsap.fromTo('.pb1-hub-core', { scale: 1 },
          { scale: 1.08, duration: 0.15, yoyo: true, repeat: 1, ease: 'power2.out' })
        bump(1 + Math.floor(Math.random() * 4))
        flashNode(i, 0.5)
      }

      /* fire one comet along conduit i. dir 'down' = node→hub (request),
         'up' = hub→node (response, dimmer). returns its tween. */
      const pulse = (i: number, dir: 'down' | 'up', dur: number) => {
        const proxy = { p: dir === 'down' ? 0 : 1 }
        return gsap.to(proxy, {
          p: dir === 'down' ? 1 : 0,
          duration: dur,
          ease: dir === 'down' ? 'power1.in' : 'power2.out',
          onStart: () => gsap.set(comets[i], { autoAlpha: dir === 'down' ? 1 : 0.66 }),
          onUpdate: () => place(i, proxy.p),
          onComplete: () => {
            gsap.to(comets[i], { autoAlpha: 0, duration: 0.16 })
            if (dir === 'down') absorb(i)
            else flashNode(i, 0.8)
          },
        })
      }

      /* ════ Intro: hub blooms → conduits draw → nodes pop ════ */
      gsap.set('.pb1-hub-core', { autoAlpha: 0, scale: 0.5 })
      gsap.set('.pb1-hub-spin, .pb1-hub-spin2', { autoAlpha: 0 })
      gsap.set(nodeEls, { autoAlpha: 0, scale: 0.6 })
      gsap.set(wires, { strokeDashoffset: (i, el) => (el as SVGPathElement).getTotalLength(), strokeDasharray: (i, el) => (el as SVGPathElement).getTotalLength() })
      gsap.set(comets, { autoAlpha: 0 })
      gsap.set(endpoints, { autoAlpha: 0, y: 6 })
      gsap.set('.pb1-chip', { autoAlpha: 0, scale: 0.7, y: 8 })

      const intro = gsap.timeline()
      intro.to('.pb1-hub-core', { autoAlpha: 1, scale: 1, duration: 0.6, ease: 'back.out(1.7)' })
        .to('.pb1-hub-spin, .pb1-hub-spin2', { autoAlpha: 1, duration: 0.5 }, '<0.1')
        .to(wires, { strokeDashoffset: 0, duration: 0.7, stagger: 0.07, ease: 'power2.out' }, '-=0.3')
        .to(nodeEls, { autoAlpha: 1, scale: 1, duration: 0.5, stagger: 0.08, ease: 'back.out(1.6)' }, '-=0.5')
        .to('.pb1-chip', { autoAlpha: 1, scale: 1, y: 0, duration: 0.5, ease: 'back.out(1.7)' }, '-=0.25')

      /* ════ Ambient life (after intro) ════ */
      gsap.delayedCall(1.2, () => {
        /* hub core: gentle 3D tumble + breathe */
        gsap.to('.pb1-hub-core', { rotationY: 16, duration: 3.4, yoyo: true, repeat: -1, ease: 'sine.inOut' })
        gsap.to('.pb1-hub-core', { rotationX: -8, duration: 4.6, yoyo: true, repeat: -1, ease: 'sine.inOut' })
        /* nodes bob on their own rhythm */
        nodeEls.forEach((nd, i) => {
          gsap.to(nd, { y: i % 2 ? '+=7' : '-=7', duration: 1.9 + i * 0.18, yoyo: true, repeat: -1, ease: 'sine.inOut', delay: i * 0.25 })
        })
      })

      /* ════ Traffic loop — staggered, bursty request/response ════ */
      const flow = gsap.timeline({ repeat: -1, delay: 1.6 })
      const DOWN = 0.95, UP = 0.8
      NODES.forEach((_, i) => {
        const t = i * 0.5
        flow.add(pulse(i, 'down', DOWN), t)
            .add(pulse(i, 'up',   UP),   t + DOWN + 0.05)
      })
      /* a second, lighter wave overlapping the first for density */
      ;[1, 3].forEach((i, k) => {
        flow.add(pulse(i, 'down', DOWN * 0.85), 2.1 + k * 0.6)
      })
      flow.to({}, { duration: 1.1 }) // breathing room before the loop repeats

      /* ════ Hover a node: lift + live stream + endpoint pill ════ */
      const hoverNode = (i: number, on: boolean) => {
        hovering[i] = on
        gsap.to(nodeEls[i], {
          z: on ? 42 : 0, scale: on ? 1.08 : 1, '--glow': on ? 1 : 0,
          duration: on ? 0.32 : 0.5, ease: on ? 'power3.out' : 'power2.inOut',
        } as gsap.TweenVars)
        gsap.to(endpoints[i], { autoAlpha: on ? 1 : 0, y: on ? 0 : 6, duration: on ? 0.3 : 0.25, ease: 'power2.out' })
        streams[i].classList.toggle('is-streaming', on)
        if (on) {
          gsap.fromTo('.pb1-hub-ring', { scale: 0.85, autoAlpha: 0.6 }, { scale: 1.35, autoAlpha: 0, duration: 0.6, ease: 'power2.out' })
        }
      }

      /* ════ Click the hub: synchronized "sync all" burst ════ */
      const burst = () => {
        gsap.fromTo('.pb1-hub-ring', { scale: 0.7, autoAlpha: 0.95 }, { scale: 2.1, autoAlpha: 0, duration: 1.0, ease: 'power2.out' })
        gsap.fromTo('.pb1-hub-core', { scale: 1 }, { scale: 1.2, duration: 0.22, yoyo: true, repeat: 1, ease: 'power2.out' })
        NODES.forEach((_, i) => {
          gsap.delayedCall(i * 0.06, () => {
            flashNode(i, 1)
            streams[i].classList.add('is-streaming')
            gsap.delayedCall(0.55, () => { if (!hovering[i]) streams[i].classList.remove('is-streaming') })
          })
        })
        bump(38 + Math.floor(Math.random() * 44))
      }

      /* ════ Parallax + cursor spotlight ════ */
      const glow = $<HTMLElement>('.pb1-glow')[0]
      const onMove = (e: MouseEvent) => {
        const r = wrap.getBoundingClientRect()
        const dx = (e.clientX - r.left) / r.width - 0.5
        const dy = (e.clientY - r.top) / r.height - 0.5
        gsap.to(scene, { rotateY: dx * 16, rotateX: -dy * 12, duration: 0.5, ease: 'power2.out' })
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

      /* ════ Bind node hover + hub click ════ */
      const handlers: Array<[Element, string, EventListener]> = []
      const bind = (el: Element | undefined, type: string, fn: EventListener) => {
        if (!el) return
        el.addEventListener(type, fn); handlers.push([el, type, fn])
      }
      nodeEls.forEach((nd, i) => {
        bind(nd, 'mouseenter', () => hoverNode(i, true))
        bind(nd, 'mouseleave', () => hoverNode(i, false))
      })
      bind($('.pb1-hub')[0], 'click', burst as EventListener)

      return () => {
        wrap.removeEventListener('mousemove', onMove)
        wrap.removeEventListener('mouseenter', onEnter)
        wrap.removeEventListener('mouseleave', onLeave)
        handlers.forEach(([el, type, fn]) => el.removeEventListener(type, fn))
      }
    }, wrap)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={wrapRef} className="pb1-wrap" aria-hidden="true">
      <div ref={sceneRef} className="pb1-scene">

        {/* ── Cursor spotlight ── */}
        <span className="pb1-glow" />

        {/* ── Conduit mesh + flowing comets (behind nodes) ── */}
        <svg className="pb1-mesh" viewBox={`0 0 ${SCENE_W} ${SCENE_H}`} fill="none" preserveAspectRatio="none">
          {/* faint base conduits */}
          {NODES.map(n => <path key={n.id} className="pb1-wire" data-i={n.id} d={pathFor(n)} />)}
          {/* hover streams (one per conduit, lit on demand) */}
          {NODES.map((n, i) => (
            <path key={n.id} className="pb1-stream" data-i={i} d={pathFor(n)} style={{ stroke: n.color, color: n.color } as React.CSSProperties} />
          ))}
          {/* comet packets */}
          {NODES.map((n, i) => (
            <g key={n.id} className="pb1-comet" data-i={i} style={{ '--c': n.color } as React.CSSProperties}>
              {Array.from({ length: TRAIL }, (_, k) => (
                <circle key={k} className="pb1-comet-trail" r={3.4 - k * 0.5} cx={n.x} cy={n.y} style={{ opacity: 0.5 - k * 0.08 }} />
              ))}
              <circle className="pb1-comet-head" r="4.4" cx={n.x} cy={n.y} />
            </g>
          ))}
        </svg>

        {/* ── System nodes ── */}
        {NODES.map((n, i) => (
          <div
            key={n.id}
            className="pb1-node"
            data-i={i}
            style={{ left: n.x - 54, top: n.y - 22, '--node': n.color } as React.CSSProperties}
          >
            <span className="pb1-node__icon">{n.icon}</span>
            <span className="pb1-node__label">{n.label}</span>
            {/* live endpoint pill (revealed on hover) */}
            <span className="pb1-endpoint">
              <span className="pb1-endpoint__route">{n.route}</span>
              <span className="pb1-endpoint__lat">{n.latency}</span>
            </span>
          </div>
        ))}

        {/* ── Central integration hub (front) ── */}
        <div className="pb1-hub" style={{ left: HUB.x - 52, top: HUB.y - 52 } as React.CSSProperties}>
          <span className="pb1-hub-ring" />
          <span className="pb1-hub-spin" />
          <span className="pb1-hub-spin2" />
          <span className="pb1-hub-core">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M12 2l8.66 5v10L12 22 3.34 17V7z" stroke="#fff" strokeWidth="1.4" strokeLinejoin="round" opacity="0.9" />
              <circle cx="12" cy="12" r="3" fill="#fff" />
            </svg>
            <span className="pb1-hub-label">Hub</span>
          </span>
        </div>

        {/* ── Floating live chip (closest) ── */}
        <div className="pb1-chip-layer">
          <div className="pb1-chip">
            <span className="pb1-chip__dot" />
            <span className="pb1-count">14,820</span>
            <span className="pb1-chip__unit">events/min</span>
          </div>
        </div>

      </div>
    </div>
  )
}
