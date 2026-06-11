'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

/* ════════════════════════════════════════════════════════════════
   SecurityShield3D — Promo block 4 ("Security is the foundation")

   A live Active-Defense console. A shield core sweeps a radar behind a
   defense barrier; incoming threats fly in from every side and are
   deflected at the barrier (spark + ripple), never reaching the core.
   Each block ticks a live counter and a threat log; the hardening
   checklist ticks green and the compliance badges light up; the shield
   locks to "Secured."

   Interactive:
   • Hover a checklist item → tooltip reveals the specifics.
   • Click "Run scan" / the shield → a full scan burst (volley blocked,
     everything snaps green, the lock slams shut, the counter surges).
   • Scene tilt parallax + cursor spotlight. Reduced motion → secured.
═════════════════════════════════════════════════════════════════ */

const CHECKS = [
  { label: 'Hardened headers',   detail: 'HSTS · CSP · X-Frame-Options' },
  { label: 'Role-based access',  detail: 'Granular RBAC policies' },
  { label: 'SSO · SAML / OAuth', detail: 'Okta · Azure AD · Google' },
  { label: 'Audit trail',        detail: 'Immutable, exportable logs' },
  { label: 'Automated backups',  detail: 'Encrypted · 15-min RPO' },
]
const COMPLIANCE = ['OWASP', 'SOC 2', 'GDPR', 'ISO 27001']
const THREATS = ['SQL injection', 'XSS', 'DDoS flood', 'CSRF', 'Brute-force', 'Bot traffic', 'Path traversal']

const DARTS = 6
const SPARKS = 4
const CX = 75, CY = 72         // shield centre within the 150×150 stage
const START_R = 96, END_R = 56 // threat spawn radius → deflection radius

export function SecurityShield3D() {
  const wrapRef  = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const wrap  = wrapRef.current
    const scene = sceneRef.current
    if (!wrap || !scene) return

    const $  = <T extends Element>(s: string) => Array.from(scene.querySelectorAll<T>(s))
    const checks   = $<HTMLElement>('.pb4-check')
    const comps    = $<HTMLElement>('.pb4-comp')
    const darts    = $<HTMLElement>('.pb4-dart')
    const sparks   = $<HTMLElement>('.pb4-spark')
    const countEl  = $<HTMLElement>('.pb4-blocked-num')[0]
    const logTxt   = $<HTMLElement>('.pb4-log__txt')[0]
    const reduce   = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let count = 1284930
    const setCount = () => { if (countEl) countEl.textContent = count.toLocaleString() }
    setCount()

    let di = 0, si = 0

    const ctx = gsap.context(() => {
      /* ── Reduced motion: a fully-secured console ── */
      if (reduce) {
        gsap.set('.pb4-card', { autoAlpha: 1, y: 0 })
        gsap.set(checks, { '--on': 1 } as gsap.TweenVars)
        gsap.set(comps, { '--on': 1 } as gsap.TweenVars)
        gsap.set('.pb4-shield-ok', { autoAlpha: 1 })
        gsap.set('.pb4-chip', { autoAlpha: 1, scale: 1 })
        gsap.set(darts.concat(sparks), { autoAlpha: 0 })
        if (logTxt) logTxt.textContent = 'All systems secure'
        return
      }

      /* ── A threat is deflected at the barrier ── */
      const blockAt = (x: number, y: number) => {
        const sp = sparks[si++ % sparks.length]
        gsap.set(sp, { left: x, top: y })
        gsap.fromTo(sp, { scale: 0.4, autoAlpha: 0.95 }, { scale: 1.9, autoAlpha: 0, duration: 0.45, ease: 'power2.out' })
        gsap.fromTo('.pb4-barrier', { '--flash': 0.7 } as gsap.TweenVars,
          { '--flash': 0, duration: 0.55, ease: 'power2.out' } as gsap.TweenVars)
        count += 1 + Math.floor(Math.random() * 6)
        setCount()
        if (logTxt) {
          logTxt.textContent = 'Blocked · ' + THREATS[Math.floor(Math.random() * THREATS.length)]
          gsap.fromTo(logTxt, { autoAlpha: 0.3, x: -3 }, { autoAlpha: 1, x: 0, duration: 0.3, ease: 'power2.out' })
        }
      }

      /* ── Launch one incoming threat dart ── */
      const fireThreat = () => {
        const dart = darts[di++ % darts.length]
        const ang = Math.random() * Math.PI * 2
        const sx = CX + Math.cos(ang) * START_R, sy = CY + Math.sin(ang) * START_R
        const ex = CX + Math.cos(ang) * END_R,   ey = CY + Math.sin(ang) * END_R
        const bx = CX + Math.cos(ang) * (END_R + 12), by = CY + Math.sin(ang) * (END_R + 12)
        gsap.timeline()
          .set(dart, { left: sx, top: sy, autoAlpha: 0, rotation: (ang * 180) / Math.PI + 90 })
          .to(dart, { autoAlpha: 1, duration: 0.12 })
          .to(dart, { left: ex, top: ey, duration: 0.5, ease: 'power2.in' }, '<')
          .call(() => blockAt(ex, ey))
          .to(dart, { left: bx, top: by, autoAlpha: 0, duration: 0.28, ease: 'power2.out' })
      }

      /* ── Perpetual incoming threats ── */
      const N = 7
      const threatTl = gsap.timeline({ repeat: -1 })
      for (let k = 0; k < N; k++) threatTl.call(fireThreat, [], k * 0.62)
      threatTl.to({}, { duration: 0.62 }, N * 0.62)

      /* ── Secure-build sequence (loops) ── */
      gsap.set('.pb4-card', { autoAlpha: 0, y: 14 })
      gsap.set(darts.concat(sparks), { autoAlpha: 0 })

      const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.8 })
      tl.to('.pb4-card', { autoAlpha: 1, y: 0, duration: 0.6, ease: 'power3.out' })
        .set(checks, { '--on': 0 } as gsap.TweenVars, '<')
        .set(comps, { '--on': 0 } as gsap.TweenVars, '<')
        .set('.pb4-shield-ok', { autoAlpha: 0 }, '<')
        .set('.pb4-chip', { autoAlpha: 0, scale: 0.7 }, '<')

      CHECKS.forEach((_, i) => {
        tl.to(checks[i], { '--on': 1, duration: 0.3, ease: 'power2.out' } as gsap.TweenVars, 0.5 + i * 0.34)
      })

      const compAt = 0.5 + CHECKS.length * 0.34
      COMPLIANCE.forEach((_, i) => {
        tl.to(comps[i], { '--on': 1, duration: 0.3, ease: 'back.out(2)' } as gsap.TweenVars, compAt + i * 0.12)
      })

      const lockAt = compAt + COMPLIANCE.length * 0.12 + 0.1
      tl.to('.pb4-shield-ok', { autoAlpha: 1, duration: 0.5, ease: 'power2.out' }, lockAt)
        .fromTo('.pb4-shield-ring', { scale: 0.8, autoAlpha: 0.85 }, { scale: 1.55, autoAlpha: 0, duration: 0.85, ease: 'power2.out' }, lockAt)
        .fromTo('.pb4-lock', { scale: 0.7, rotate: -8 }, { scale: 1, rotate: 0, duration: 0.5, ease: 'back.out(2.2)' }, lockAt)
        .to('.pb4-chip', { autoAlpha: 1, scale: 1, duration: 0.5, ease: 'back.out(1.8)' }, lockAt + 0.2)
        .to({}, { duration: 1.4 })

      /* ── Click "Run scan" / the shield: full scan burst ── */
      const runScan = () => {
        gsap.fromTo('.pb4-scan', { scale: 0.9 }, { scale: 1, duration: 0.4, ease: 'back.out(2.5)' })
        gsap.fromTo('.pb4-barrier', { '--flash': 1 } as gsap.TweenVars, { '--flash': 0, duration: 0.8, ease: 'power2.out' } as gsap.TweenVars)
        gsap.fromTo('.pb4-shield-ring', { scale: 0.7, autoAlpha: 0.95 }, { scale: 1.9, autoAlpha: 0, duration: 0.95, ease: 'power2.out' })
        for (let k = 0; k < 6; k++) gsap.delayedCall(k * 0.06, fireThreat)
        gsap.to(checks, { '--on': 1, duration: 0.3, stagger: 0.05, ease: 'power2.out' } as gsap.TweenVars)
        gsap.to(comps, { '--on': 1, duration: 0.3, stagger: 0.05, ease: 'back.out(2)' } as gsap.TweenVars)
        gsap.to('.pb4-shield-ok', { autoAlpha: 1, duration: 0.4 })
        gsap.fromTo('.pb4-lock', { scale: 0.8, rotate: -6 }, { scale: 1, rotate: 0, duration: 0.5, ease: 'back.out(2.4)' })
        gsap.to('.pb4-chip', { autoAlpha: 1, scale: 1, duration: 0.4, ease: 'back.out(1.8)' })
        count += 120 + Math.floor(Math.random() * 160)
        setCount()
        if (logTxt) logTxt.textContent = 'Full scan complete · secure'
      }

      /* ── Bind scan button + shield click ── */
      const handlers: Array<[Element, string, EventListener]> = []
      const bind = (el: Element | undefined, type: string, fn: EventListener) => {
        if (!el) return
        el.addEventListener(type, fn); handlers.push([el, type, fn])
      }
      bind($('.pb4-scan')[0], 'click', runScan as EventListener)
      bind($('.pb4-shield')[0], 'click', runScan as EventListener)

      /* ── Parallax + cursor spotlight ── */
      const glow = $<HTMLElement>('.pb4-glow')[0]
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
    <div ref={wrapRef} className="pb4-wrap" aria-hidden="true">
      <div ref={sceneRef} className="pb4-scene">

        {/* ── Cursor spotlight ── */}
        <span className="pb4-glow" />

        <div className="pb4-card">
          {/* ── Head ── */}
          <div className="pb4-card__head">
            <span className="pb4-title">
              <svg width="15" height="16" viewBox="0 0 24 26" fill="none" aria-hidden="true">
                <path d="M12 1 L22 5 V13 C22 19 18 23 12 25 C6 23 2 19 2 13 V5 Z" fill="rgba(16,185,129,0.18)" stroke="#10b981" strokeWidth="1.4" strokeLinejoin="round" />
              </svg>
              Security
            </span>
            <button type="button" className="pb4-scan">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 12a9 9 0 1 1-2.64-6.36" /><path d="M21 3v6h-6" />
              </svg>
              Run scan
            </button>
          </div>

          {/* ── Main: shield + checklist ── */}
          <div className="pb4-main">
            <div className="pb4-shield-wrap">
              <div className="pb4-shield">
                <span className="pb4-radar" />
                <span className="pb4-barrier" />
                <span className="pb4-shield-ring" />
                <svg className="pb4-shield-svg" viewBox="0 0 100 110" width="104" height="114" aria-hidden="true">
                  <defs>
                    <linearGradient id="pb4-base" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#1e293b" /><stop offset="100%" stopColor="#0f172a" />
                    </linearGradient>
                    <linearGradient id="pb4-ok" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10b981" /><stop offset="100%" stopColor="#059669" />
                    </linearGradient>
                  </defs>
                  <path className="pb4-shield-base" d="M50 4 L92 20 V54 C92 82 73 99 50 106 C27 99 8 82 8 54 V20 Z" fill="url(#pb4-base)" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" />
                  <path className="pb4-shield-ok" d="M50 4 L92 20 V54 C92 82 73 99 50 106 C27 99 8 82 8 54 V20 Z" fill="url(#pb4-ok)" />
                </svg>
                <svg className="pb4-lock" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.9" aria-hidden="true">
                  <rect x="5" y="11" width="14" height="9" rx="2" />
                  <path d="M8 11V8a4 4 0 0 1 8 0v3" strokeLinecap="round" />
                </svg>
                {Array.from({ length: DARTS }, (_, i) => <span key={`d${i}`} className="pb4-dart" />)}
                {Array.from({ length: SPARKS }, (_, i) => <span key={`s${i}`} className="pb4-spark" />)}
              </div>
              <div className="pb4-blocked">
                <span className="pb4-blocked-num">1,284,930</span>
                <span className="pb4-blocked-lbl">threats blocked</span>
              </div>
            </div>

            <div className="pb4-info">
              <span className="pb4-log">
                <span className="pb4-log__dot" />
                <span className="pb4-log__txt">Monitoring…</span>
              </span>
              <div className="pb4-checks">
                {CHECKS.map((c, i) => (
                  <div key={c.label} className="pb4-check" data-i={i}>
                    <span className="pb4-check__dot">
                      <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                        <path d="M2.5 6.2l2.3 2.3 4.7-5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <span className="pb4-check__label">{c.label}</span>
                    <span className="pb4-check__tip">{c.detail}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Compliance badges ── */}
          <div className="pb4-compliance">
            {COMPLIANCE.map(c => (
              <span key={c} className="pb4-comp">
                <svg width="9" height="9" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <path d="M2.5 6.2l2.3 2.3 4.7-5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {c}
              </span>
            ))}
          </div>
        </div>

        <div className="pb4-chip-layer">
          <div className="pb4-chip">
            <span className="pb4-chip__dot" />
            Secured · OWASP Top 10
          </div>
        </div>

      </div>
    </div>
  )
}
