'use client'

import { useEffect, useRef } from 'react'

const STATS = [
  { num: 50,  suffix: '+', label: 'Projects delivered' },
  { num: 98,  suffix: '%', label: 'Client retention'   },
  { num: 4,   suffix: '×', label: 'Faster delivery'    },
  { num: 12,  suffix: '+', label: 'Industries served'  },
]

export function StatsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const cards  = Array.from(section.querySelectorAll<HTMLElement>('.va-stat-card'))
    const numEls = Array.from(section.querySelectorAll<HTMLElement>('.stat-num-val'))
    const line   = section.querySelector<HTMLElement>('.va-line-draw')

    /* ── Set initial hidden state (JS-only so no SSR flash) ── */
    cards.forEach(c => {
      c.style.opacity   = '0'
      c.style.transform = 'translateY(28px) scale(0.96)'
      c.style.transition = 'opacity 0.65s cubic-bezier(0.16,1,0.3,1), transform 0.65s cubic-bezier(0.16,1,0.3,1)'
    })

    /* ── Line-draw ── */
    if (line) {
      line.style.transform       = 'scaleX(0)'
      line.style.transformOrigin = 'center'
      line.style.transition      = 'transform 0.9s cubic-bezier(0.16,1,0.3,1)'
    }

    /* ── Scroll-triggered entry ── */
    const entryObserver = new IntersectionObserver(entries => {
      if (!entries[0].isIntersecting) return

      /* Line draws in first */
      if (line) line.style.transform = 'scaleX(1)'

      /* Cards stagger in */
      cards.forEach((card, i) => {
        setTimeout(() => {
          card.style.opacity   = '1'
          card.style.transform = 'translateY(0) scale(1)'
        }, i * 110)
      })

      /* Count-up starts once cards are visible */
      numEls.forEach((el, i) => {
        const target = parseInt(el.dataset.target ?? '0', 10)
        setTimeout(() => {
          const duration = 1600
          const startTime = performance.now()
          const tick = (now: number) => {
            const elapsed = now - startTime
            const progress = Math.min(elapsed / duration, 1)
            /* easeOutExpo */
            const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
            el.textContent = String(Math.floor(eased * target))
            if (progress < 1) requestAnimationFrame(tick)
            else el.textContent = String(target)
          }
          requestAnimationFrame(tick)
        }, i * 110 + 200) /* slight delay after card appears */
      })

      entryObserver.disconnect()
    }, { threshold: 0.25 })

    entryObserver.observe(section)

    /* ── 3-D tilt on hover ── */
    const handleMove = (e: MouseEvent) => {
      const card = e.currentTarget as HTMLElement
      const { left, top, width, height } = card.getBoundingClientRect()
      const rx = ((e.clientY - top  - height / 2) / (height / 2)) * -7
      const ry = ((e.clientX - left - width  / 2) / (width  / 2)) *  7
      card.style.transform = `perspective(700px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-6px)`
    }
    const handleLeave = (e: MouseEvent) => {
      const card = e.currentTarget as HTMLElement
      card.style.transform = 'perspective(700px) rotateX(0) rotateY(0) translateY(0)'
    }

    cards.forEach(c => {
      c.addEventListener('mousemove',  handleMove)
      c.addEventListener('mouseleave', handleLeave)
    })

    /* ── Ripple on click ── */
    const handleClick = (e: MouseEvent) => {
      const card = e.currentTarget as HTMLElement
      const ripple = document.createElement('span')
      ripple.className = 'stat-ripple'
      const { left, top, width, height } = card.getBoundingClientRect()
      const size = Math.max(width, height) * 2
      ripple.style.cssText = [
        `width:${size}px`,
        `height:${size}px`,
        `left:${e.clientX - left - size / 2}px`,
        `top:${e.clientY - top  - size / 2}px`,
      ].join(';')
      card.appendChild(ripple)
      setTimeout(() => ripple.remove(), 700)
    }

    cards.forEach(c => c.addEventListener('click', handleClick))

    /* ── Hover: number glow ── */
    const handleCardEnter = (e: MouseEvent) => {
      const numEl = (e.currentTarget as HTMLElement).querySelector<HTMLElement>('.va-stat-number')
      if (numEl) numEl.style.textShadow = '0 0 32px rgba(43,43,255,0.55)'
    }
    const handleCardExit = (e: MouseEvent) => {
      const numEl = (e.currentTarget as HTMLElement).querySelector<HTMLElement>('.va-stat-number')
      if (numEl) numEl.style.textShadow = ''
    }
    cards.forEach(c => {
      c.addEventListener('mouseenter', handleCardEnter)
      c.addEventListener('mouseleave', handleCardExit)
    })

    return () => {
      cards.forEach(c => {
        c.removeEventListener('mousemove',   handleMove)
        c.removeEventListener('mouseleave',  handleLeave)
        c.removeEventListener('click',       handleClick)
        c.removeEventListener('mouseenter',  handleCardEnter)
        c.removeEventListener('mouseleave',  handleCardExit)
      })
    }
  }, [])

  return (
    <div style={{ background: '#0e0e0e', width: '100%' }}>
      <section ref={sectionRef} className="mxd-section va-stats-section">
        <div className="va-line-draw" />
        <div className="va-stats-grid">
          {STATS.map(s => (
            <div key={s.label} className="va-stat-card">
              <div className="va-stat-number">
                <span className="stat-num-val" data-target={s.num}>0</span>
                <span className="va-stat-suffix">{s.suffix}</span>
              </div>
              <div className="va-stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
