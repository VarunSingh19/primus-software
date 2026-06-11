'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

/* ════════════════════════════════════════════════════════════════
   HomeHero3D — "The Canvas"
   A live design canvas that constructs itself, compiles into a real
   browser, and goes green — then loops. One GSAP master timeline
   drives the whole ~8s cycle; mouse-tilt parallax runs independently.
   Geometry below is shared between the SVG wireframe (draw phase) and
   the HTML fills (colour phase) so the two stay pixel-aligned.
═════════════════════════════════════════════════════════════════ */

const ART_W = 380
const ART_H = 300

type Kind = 'logo' | 'nav' | 'navBtn' | 'headline' | 'sub' | 'cta' | 'card'

type Block = { id: string; x: number; y: number; w: number; h: number; r: number; kind: Kind }

/* The mini landing page that builds itself (artboard coordinate space) */
const BLOCKS: Block[] = [
  /* navbar */
  { id: 'logo', x: 20, y: 18, w: 24, h: 24, r: 7, kind: 'logo' },
  { id: 'nav1', x: 206, y: 27, w: 30, h: 6, r: 3, kind: 'nav' },
  { id: 'nav2', x: 246, y: 27, w: 30, h: 6, r: 3, kind: 'nav' },
  { id: 'navBtn', x: 296, y: 18, w: 64, h: 24, r: 12, kind: 'navBtn' },
  /* hero */
  { id: 'h1', x: 20, y: 80, w: 232, h: 20, r: 5, kind: 'headline' },
  { id: 'h2', x: 20, y: 108, w: 168, h: 20, r: 5, kind: 'headline' },
  { id: 's1', x: 20, y: 142, w: 250, h: 7, r: 3, kind: 'sub' },
  { id: 's2', x: 20, y: 156, w: 206, h: 7, r: 3, kind: 'sub' },
  { id: 'cta', x: 20, y: 180, w: 120, h: 34, r: 9, kind: 'cta' },
  /* card row */
  { id: 'c1', x: 20, y: 232, w: 104, h: 52, r: 9, kind: 'card' },
  { id: 'c2', x: 138, y: 232, w: 104, h: 52, r: 9, kind: 'card' },
  { id: 'c3', x: 256, y: 232, w: 104, h: 52, r: 9, kind: 'card' },
]

const perimeter = (b: Block) => 2 * (b.w + b.h) + 16 /* +slack for rounded corners */

const CHIPS = [
  { id: 'ok', label: 'Deployed', dot: '#10b981', style: { top: '54px', right: '14px' } as React.CSSProperties },
  { id: 'indigo', label: '98 Lighthouse', dot: '#6366f1', style: { bottom: '70px', left: '22px' } as React.CSSProperties },
  { id: 'amber', label: '1.2s LCP', dot: '#f59e0b', style: { top: '198px', right: '0px' } as React.CSSProperties },
]

/* Simple character-typing into an element (no TextPlugin dependency) */
function typeInto(el: Element | null, str: string) {
  if (!el) return
  const proxy = { n: 0 }
  gsap.to(proxy, {
    n: str.length,
    duration: Math.max(0.25, str.length * 0.032),
    ease: 'none',
    onUpdate() { el.textContent = str.slice(0, Math.round(proxy.n)) },
  })
}

export function HomeHero3D() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const wrap = wrapRef.current
    const scene = sceneRef.current
    if (!wrap || !scene) return

    const q = gsap.utils.selector(scene)
    const stage = q('.hc-stage')[0]
    const wires = q('.hc-wire')
    const fills = q('.hc-fill')
    const chips = q('.hc-chip')
    const cursor = q('.hc-cursor')[0]
    const urlText = q('.hc-url-text')[0]
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const ctx = gsap.context(() => {
      /* ── Reduced motion: paint the finished, compiled state and stop ── */
      if (reduce) {
        gsap.set(stage, { autoAlpha: 1, rotateY: -13, rotateX: 7, z: 30 })
        gsap.set('.hc-paper', { autoAlpha: 1 })
        gsap.set('.hc-grid', { autoAlpha: 0.4, scale: 1 })
        gsap.set(wires, { autoAlpha: 0 })
        gsap.set(fills, { autoAlpha: 1, y: 0 })
        gsap.set('.hc-frame', { autoAlpha: 1 })
        gsap.set('.hc-chrome', { autoAlpha: 1, yPercent: 0 })
        gsap.set('.hc-url-dot', { backgroundColor: '#10b981' })
        gsap.set('.hc-status', { autoAlpha: 1, scale: 1 })
        gsap.set(chips, { autoAlpha: 1, scale: 1, y: 0 })
        gsap.set(cursor, { autoAlpha: 0 })
        if (urlText) urlText.textContent = 'https://primusoftware.com'
        return
      }

      const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.45, defaults: { ease: 'power2.out' } })

      /* ══ RESET (re-applied at the head of every loop) ══ */
      tl.set(stage, { autoAlpha: 0, rotateY: 0, rotateX: 0, z: 0 })
        .set('.hc-paper', { autoAlpha: 0 })
        .set('.hc-grid', { autoAlpha: 0, scale: 0.94 })
        .set(cursor, { autoAlpha: 0, x: 34, y: 24 })
        .set(wires, { autoAlpha: 1, strokeDashoffset: (i, el) => Number((el as HTMLElement).dataset.peri) })
        .set(fills, { autoAlpha: 0, y: 6 })
        .set('.hc-frame', { autoAlpha: 0 })
        .set('.hc-chrome', { autoAlpha: 0, yPercent: -120 })
        .set('.hc-url-dot', { backgroundColor: 'rgba(255,255,255,0.25)' })
        .set('.hc-status', { autoAlpha: 0, scale: 0.7 })
        .set(chips, { autoAlpha: 0, scale: 0.6, y: 10 })
        .call(() => { if (urlText) urlText.textContent = '' })

      /* ══ PHASE 0 — blank canvas + grid + cursor (0 → 1.0s) ══ */
      tl.to(stage, { autoAlpha: 1, duration: 0.5 }, 0)
        .to('.hc-grid', { autoAlpha: 1, scale: 1, duration: 0.7 }, 0.1)
        .to(cursor, { autoAlpha: 1, duration: 0.3 }, 0.55)

      /* ══ PHASE 1 — wireframe sketches itself, cursor leads (1.0 → 3.1s) ══ */
      tl.to(cursor, { x: 308, y: 30, duration: 0.45 }, 1.0)
        .to(wires, { strokeDashoffset: 0, duration: 0.24, stagger: 0.115 }, 1.05)
        .to(cursor, { x: 90, y: 92, duration: 0.5 }, 1.75)
        .to(cursor, { x: 70, y: 196, duration: 0.5 }, 2.45)

      /* ══ PHASE 2 — colour washes in, type snaps into place (3.1 → 4.9s) ══ */
      tl.to('.hc-paper', { autoAlpha: 1, duration: 0.6 }, 3.1)
        .to(cursor, { autoAlpha: 0, duration: 0.3 }, 3.15)
        .to(wires, { autoAlpha: 0, duration: 0.5, stagger: 0.025 }, 3.25)
        .to(fills, { autoAlpha: 1, y: 0, duration: 0.45, stagger: 0.06 }, 3.4)
        .fromTo('.hc-fill--cta', { scale: 0.88 }, { scale: 1, duration: 0.45, ease: 'back.out(2.2)' }, 4.05)

      /* ══ PHASE 3 — compile: tilt, browser wraps, URL resolves, goes green (4.9 → 6.8s) ══ */
      tl.to(stage, { rotateY: -13, rotateX: 7, z: 30, duration: 0.95, ease: 'power3.inOut' }, 4.95)
        .to('.hc-frame', { autoAlpha: 1, duration: 0.4 }, 5.15)
        .to('.hc-chrome', { autoAlpha: 1, yPercent: 0, duration: 0.5, ease: 'power3.out' }, 5.25)
        .call(typeInto, [urlText, 'localhost:3000'], 5.55)
        .call(typeInto, [urlText, 'https://primusoftware.com'], 6.25)
        .to('.hc-url-dot', { backgroundColor: '#10b981', duration: 0.3 }, 6.7)
        .to('.hc-status', { autoAlpha: 1, scale: 1, duration: 0.4, ease: 'back.out(2.2)' }, 6.7)

      /* ══ PHASE 4 — live: metric chips pop in closest to camera (6.9 → 7.6s) ══ */
      tl.to(chips, { autoAlpha: 1, scale: 1, y: 0, duration: 0.5, stagger: 0.12, ease: 'back.out(1.7)' }, 6.95)

      /* ══ RESOLVE — hold, then gently fade back to blank ══ */
      tl.to([stage, ...chips], { autoAlpha: 0, duration: 0.6, ease: 'power2.in' }, 8.4)

      /* ── Mouse-tilt parallax (independent of the build timeline) ── */
      const onMove = (e: MouseEvent) => {
        const r = wrap.getBoundingClientRect()
        const dx = (e.clientX - r.left) / r.width - 0.5
        const dy = (e.clientY - r.top) / r.height - 0.5
        gsap.to(scene, { rotateY: dx * 14, rotateX: -dy * 10, duration: 0.5, ease: 'power2.out' })
      }
      const onLeave = () => gsap.to(scene, { rotateY: 0, rotateX: 0, duration: 1.1, ease: 'elastic.out(1, 0.5)' })
      wrap.addEventListener('mousemove', onMove)
      wrap.addEventListener('mouseleave', onLeave)

      return () => {
        wrap.removeEventListener('mousemove', onMove)
        wrap.removeEventListener('mouseleave', onLeave)
      }
    }, wrap)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={wrapRef} className="hc-wrap" aria-hidden="true">
      <div ref={sceneRef} className="hc-scene">

        {/* ══ Stage — canvas + browser frame (gets the compile tilt) ══ */}
        <div className="hc-stage">

          {/* Browser frame outline (appears on compile) */}
          <div className="hc-frame" />

          {/* Browser chrome bar (slides in on compile) */}
          <div className="hc-chrome">
            <div className="hc-chrome__dots"><span /><span /><span /></div>
            <div className="hc-urlbar">
              <span className="hc-url-dot" />
              <span className="hc-url-text" />
            </div>
            <div className="hc-status">
              <svg width="9" height="9" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <path d="M2.5 6.2l2.3 2.3 4.7-5" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              deployed
            </div>
          </div>

          {/* The artboard / live canvas */}
          <div className="hc-artboard">
            <div className="hc-grid" />
            <div className="hc-paper" />

            {/* Wireframe layer — drawn via stroke-dashoffset */}
            <svg className="hc-wires" viewBox={`0 0 ${ART_W} ${ART_H}`} fill="none" preserveAspectRatio="none">
              {BLOCKS.map(b => {
                const peri = perimeter(b)
                return (
                  <rect
                    key={b.id}
                    className="hc-wire"
                    data-peri={peri}
                    x={b.x} y={b.y} width={b.w} height={b.h} rx={b.r}
                    strokeDasharray={peri}
                    strokeDashoffset={peri}
                  />
                )
              })}
            </svg>

            {/* Fill layer — coloured UI that snaps in */}
            <div className="hc-fills">
              {BLOCKS.map(b => (
                <div
                  key={b.id}
                  className={`hc-fill hc-fill--${b.kind}`}
                  style={{ left: b.x, top: b.y, width: b.w, height: b.h, borderRadius: b.r }}
                />
              ))}
            </div>

            {/* The working cursor */}
            <div className="hc-cursor">
              <svg width="15" height="15" viewBox="0 0 20 20" fill="#fff" aria-hidden="true">
                <path d="M5 2l13 8-7 2-3 7z" />
              </svg>
              <span className="hc-cursor__tag">Primus</span>
            </div>
          </div>
        </div>{/* end .hc-stage */}

        {/* ══ Floating metric chips — closest to camera ══ */}
        <div className="hc-chips">
          {CHIPS.map(c => (
            <div key={c.id} className="hc-chip" style={c.style}>
              <span className="hc-chip__dot" style={{ background: c.dot }} />
              <span className="hc-chip__label">{c.label}</span>
            </div>
          ))}
        </div>

      </div>{/* end .hc-scene */}
    </div>
  )
}
