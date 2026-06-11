'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

/* ════════════════════════════════════════════════════════════════
   PerformanceAudit3D — Promo block 2 ("Obsessively fast by default")

   A live Lighthouse audit you can interrogate. The audit auto-runs: a
   scan line sweeps the card, a page-load filmstrip captures frames, the
   score ring sweeps to 98, the Core Web Vitals markers land in the
   "good" zone of real threshold scales, the category scores count up,
   and a pass chip drops in.

   Interactive:
   • Hover a Web Vital → tooltip reveals its full name + verdict, marker pulses.
   • Hover a category  → the central ring morphs to that score + colour.
   • Click "Re-run"    → replays the audit on demand.
   • Move the cursor   → scene tilt parallax + a soft spotlight.

   Reduced motion → the finished report, painted statically.
═════════════════════════════════════════════════════════════════ */

/* Core Web Vitals — `pos` = marker position (%) on the threshold scale
   (the green/good zone occupies the left 50%). */
const VITALS = [
  { id: 'lcp', label: 'LCP', name: 'Largest Contentful Paint', val: '1.1s',  pos: 22 },
  { id: 'cls', label: 'CLS', name: 'Cumulative Layout Shift',  val: '0.01',  pos: 6  },
  { id: 'inp', label: 'INP', name: 'Interaction to Next Paint', val: '120ms', pos: 30 },
]

const CATS = [
  { id: 'perf', label: 'Performance',   short: 'Perf', score: 98,  color: '#22c55e' },
  { id: 'seo',  label: 'SEO',           short: 'SEO',  score: 100, color: '#06b6d4' },
  { id: 'a11y', label: 'Accessibility', short: 'A11y', score: 100, color: '#a855f7' },
  { id: 'bp',   label: 'Best Practices', short: 'BP',  score: 96,  color: '#f59e0b' },
]

/* Filmstrip: how many paint "parts" are visible in each captured frame */
const PARTS = ['bar', 'hero', 'line', 'line'] as const
const FILM = [0, 1, 2, 4]
const FILM_T = ['0s', '0.4s', '0.8s', '1.1s']

const R = 34
const C = 2 * Math.PI * R

export function PerformanceAudit3D() {
  const wrapRef  = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const wrap  = wrapRef.current
    const scene = sceneRef.current
    if (!wrap || !scene) return

    const $  = <T extends Element>(s: string) => Array.from(scene.querySelectorAll<T>(s))
    const ring    = $<SVGCircleElement>('.pb2-ring-prog')[0]
    const scoreNum= $<HTMLElement>('.pb2-score-num')[0]
    const scoreLbl= $<HTMLElement>('.pb2-score__lbl')[0]
    const markers = $<HTMLElement>('.pb2-marker')
    const catNums = $<HTMLElement>('.pb2-cat-num')
    const catEls  = $<HTMLElement>('.pb2-cat')
    const vitalEls= $<HTMLElement>('.pb2-vital')
    const frames  = $<HTMLElement>('.pb2-frame-cell')
    const reduce  = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const setRingCenter = (v: number, label: string, color: string) => {
      if (scoreNum) { scoreNum.textContent = String(Math.round(v)); scoreNum.style.color = color }
      if (scoreLbl) scoreLbl.textContent = label
    }

    const ctx = gsap.context(() => {
      /* ── Reduced motion: paint the finished report ── */
      if (reduce) {
        gsap.set('.pb2-card', { autoAlpha: 1, y: 0 })
        gsap.set(ring, { strokeDashoffset: C * (1 - CATS[0].score / 100), stroke: CATS[0].color })
        setRingCenter(CATS[0].score, CATS[0].short, CATS[0].color)
        markers.forEach((m, i) => gsap.set(m, { left: VITALS[i].pos + '%' }))
        catNums.forEach((n, i) => { n.textContent = String(CATS[i].score) })
        frames.forEach(f => gsap.set(f, { autoAlpha: 1, scale: 1 }))
        gsap.set('.pb2-chip', { autoAlpha: 1, scale: 1 })
        return
      }

      gsap.set('.pb2-card', { autoAlpha: 0, y: 14 })

      const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.6 })

      /* card in + reset everything each loop */
      tl.to('.pb2-card', { autoAlpha: 1, y: 0, duration: 0.6, ease: 'power3.out' })
        .set(ring, { strokeDashoffset: C, stroke: CATS[0].color }, '<')
        .set(markers, { left: '0%' }, '<')
        .set(frames, { autoAlpha: 0, scale: 0.85 }, '<')
        .call(() => setRingCenter(0, CATS[0].short, CATS[0].color), [], '<')
        .call(() => catNums.forEach(n => { n.textContent = '0' }), [], '<')
        .set('.pb2-chip', { autoAlpha: 0, scale: 0.7 }, '<')

      /* scan line sweeps the card (twice) */
      tl.fromTo('.pb2-scan', { yPercent: -120, autoAlpha: 0 },
        { yPercent: 420, autoAlpha: 1, duration: 1.1, ease: 'none', repeat: 1 }, 0.4)
        .to('.pb2-scan', { autoAlpha: 0, duration: 0.3 }, '>-0.1')

      /* filmstrip captures frames left → right */
      tl.to(frames, { autoAlpha: 1, scale: 1, duration: 0.4, stagger: 0.16, ease: 'back.out(1.7)' }, 0.5)

      /* score ring sweep + count-up */
      const s = { v: 0 }
      tl.to(s, { v: CATS[0].score, duration: 1.3, ease: 'power2.out',
        onUpdate: () => setRingCenter(s.v, CATS[0].short, CATS[0].color) }, 0.9)
        .to(ring, { strokeDashoffset: C * (1 - CATS[0].score / 100), duration: 1.3, ease: 'power2.out' }, 0.9)

      /* Web Vital markers slide onto the scales */
      markers.forEach((m, i) => {
        tl.to(m, { left: VITALS[i].pos + '%', duration: 0.7, ease: 'back.out(1.5)' }, 1.2 + i * 0.14)
      })

      /* category count-up */
      CATS.forEach((c, i) => {
        const o = { v: 0 }
        tl.to(o, { v: c.score, duration: 0.7, ease: 'power1.out',
          onUpdate: () => { catNums[i].textContent = String(Math.round(o.v)) } }, 1.4 + i * 0.1)
      })

      /* pass chip + breathing room */
      tl.to('.pb2-chip', { autoAlpha: 1, scale: 1, duration: 0.5, ease: 'back.out(1.8)' }, 2.3)
        .to({}, { duration: 1.2 })

      /* ════ Hover a Web Vital: reveal name + verdict, pulse marker ════ */
      const handlers: Array<[Element, string, EventListener]> = []
      const bind = (el: Element | undefined, type: string, fn: EventListener) => {
        if (!el) return
        el.addEventListener(type, fn); handlers.push([el, type, fn])
      }
      vitalEls.forEach((v, i) => {
        bind(v, 'mouseenter', () => {
          v.classList.add('is-active')
          gsap.fromTo(markers[i], { scale: 1 }, { scale: 1.5, duration: 0.25, yoyo: true, repeat: 1, ease: 'power2.out' })
        })
        bind(v, 'mouseleave', () => v.classList.remove('is-active'))
      })

      /* ════ Hover a category: morph the ring to that score + colour ════ */
      const selectCat = (c: typeof CATS[number]) => {
        gsap.to(ring, { strokeDashoffset: C * (1 - c.score / 100), stroke: c.color, duration: 0.5, ease: 'power2.out' })
        const o = { v: Number(scoreNum?.textContent || 0) }
        gsap.to(o, { v: c.score, duration: 0.4, ease: 'power2.out', onUpdate: () => setRingCenter(o.v, c.short, c.color) })
      }
      catEls.forEach((el, i) => {
        bind(el, 'mouseenter', () => { el.classList.add('is-active'); selectCat(CATS[i]) })
        bind(el, 'mouseleave', () => { el.classList.remove('is-active'); selectCat(CATS[0]) })
      })

      /* ════ Click "Re-run": replay the audit ════ */
      bind($('.pb2-rerun')[0], 'click', (() => {
        gsap.fromTo('.pb2-rerun', { scale: 0.9 }, { scale: 1, duration: 0.4, ease: 'back.out(2.5)' })
        tl.restart(true)
      }) as EventListener)

      /* ════ Parallax + cursor spotlight ════ */
      const glow = $<HTMLElement>('.pb2-glow')[0]
      const onMove = (e: MouseEvent) => {
        const r = wrap.getBoundingClientRect()
        const dx = (e.clientX - r.left) / r.width - 0.5
        const dy = (e.clientY - r.top) / r.height - 0.5
        gsap.to(scene, { rotateY: dx * 14, rotateX: -dy * 10, duration: 0.5, ease: 'power2.out' })
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

    return () => ctx.revert()
  }, [])

  return (
    <div ref={wrapRef} className="pb2-wrap" aria-hidden="true">
      <div ref={sceneRef} className="pb2-scene">
        <div className="pb2-grid" />

        {/* ── Cursor spotlight ── */}
        <span className="pb2-glow" />

        <div className="pb2-card">
          <span className="pb2-scan" />

          <div className="pb2-card__head">
            <span className="pb2-card__title">Lighthouse</span>
            <button type="button" className="pb2-rerun">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 12a9 9 0 1 1-2.64-6.36" /><path d="M21 3v6h-6" />
              </svg>
              Re-run
            </button>
          </div>

          {/* ── Page-load filmstrip ── */}
          <div className="pb2-film">
            {FILM.map((n, i) => (
              <div key={i} className={`pb2-frame-cell${i === FILM.length - 1 ? ' is-lcp' : ''}`}>
                <div className="pb2-frame-vp">
                  {PARTS.slice(0, n).map((p, k) => <span key={k} className={`pb2-paint pb2-paint--${p}`} />)}
                </div>
                <span className="pb2-frame-t">{FILM_T[i]}</span>
              </div>
            ))}
          </div>

          {/* ── Score gauge (selectable) ── */}
          <div className="pb2-score">
            <svg viewBox="0 0 80 80" width="92" height="92" aria-hidden="true">
              <circle cx="40" cy="40" r={R} stroke="rgba(255,255,255,0.1)" strokeWidth="6" fill="none" />
              <circle
                className="pb2-ring-prog"
                cx="40" cy="40" r={R}
                stroke={CATS[0].color} strokeWidth="6" fill="none" strokeLinecap="round"
                strokeDasharray={C} strokeDashoffset={C}
                style={{ transform: 'rotate(-90deg)', transformOrigin: '40px 40px' }}
              />
            </svg>
            <div className="pb2-score__center">
              <span className="pb2-score-num">0</span>
              <span className="pb2-score__lbl">Perf</span>
            </div>
          </div>

          {/* ── Core Web Vitals with threshold scales ── */}
          <div className="pb2-vitals">
            {VITALS.map((v, i) => (
              <div key={v.id} className="pb2-vital" data-i={i}>
                <span className="pb2-vital__lbl">{v.label}</span>
                <span className="pb2-scale">
                  <span className="pb2-zone pb2-zone--good" />
                  <span className="pb2-zone pb2-zone--ni" />
                  <span className="pb2-zone pb2-zone--poor" />
                  <span className="pb2-marker" style={{ left: '0%' }} />
                </span>
                <span className="pb2-vital__val">{v.val}</span>
                <span className="pb2-vital__tip">{v.name} · <strong>Good</strong></span>
              </div>
            ))}
          </div>

          {/* ── Category scores (hover to morph the ring) ── */}
          <div className="pb2-cats">
            {CATS.map(c => (
              <div key={c.id} className="pb2-cat">
                <span className="pb2-cat-num" style={{ color: c.color } as React.CSSProperties}>0</span>
                <span className="pb2-cat__lbl">{c.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="pb2-chip-layer">
          <div className="pb2-chip">
            <span className="pb2-chip__dot" />
            98 / 100 · all passed
          </div>
        </div>
      </div>
    </div>
  )
}
