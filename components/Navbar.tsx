'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useRef, useEffect, useCallback, ReactNode } from 'react'
import gsap from 'gsap'
import { useMagnetic } from '@/hooks/useMagnetic'

interface NavItem {
  label: string
  href?: string
  children?: { label: string; href: string }[]
}

const NAV_ITEMS: NavItem[] = [
  {
    label: 'Services',
    children: [
      { label: 'UI/UX Design', href: '/ui-ux' },
      { label: 'Websites & Web Apps', href: '/website-webapps' },
      { label: 'eCommerce', href: '/ecommerce' },
      { label: 'Brand Identity', href: '/brand-identity' },
      { label: 'Mobile Apps (iOS / Android)', href: '/mobile-apps' },
      { label: 'SaaS Product Design', href: '/saas-product-design' },
      { label: 'SEO & Technical Optimization', href: '/performance-seo' },
      { label: 'Cloud/DevOps & Hosting', href: '/cloud-devops-hosting' },
      { label: 'ERP/CRM & Portals', href: '/erp-crm-portals-dashboards' },
    ],
  },
  { label: 'About', href: '/about' },
  { label: 'Careers', href: 'mailto:contact@primusoftware.com' },
  { label: 'Contact', href: '/contact' },
]

function MagneticBtn({ children }: { children: ReactNode }) {
  const ref = useMagnetic() as React.RefObject<HTMLDivElement>
  return <div ref={ref}>{children}</div>
}

function AnimLink({
  label,
  href,
  className = '',
  onClick,
}: {
  label: string
  href?: string
  className?: string
  onClick?: () => void
}) {
  const letters = label.split('')
  const inner = (
    <span className={`anim-link ${className}`}>
      <span className="anim-link__row anim-link__row--a" aria-hidden="true">
        {letters.map((l, i) => (
          <span key={i} className="anim-link__letter" style={{ transitionDelay: `${i * 14}ms` }}>
            {l === ' ' ? ' ' : l}
          </span>
        ))}
      </span>
      <span className="anim-link__row anim-link__row--b" aria-hidden="true">
        {letters.map((l, i) => (
          <span key={i} className="anim-link__letter" style={{ transitionDelay: `${i * 14}ms` }}>
            {l === ' ' ? ' ' : l}
          </span>
        ))}
      </span>
      <span className="sr-only">{label}</span>
    </span>
  )
  if (!href) return inner
  if (href.startsWith('mailto:') || href.startsWith('tel:')) {
    return <a href={href} onClick={onClick}>{inner}</a>
  }
  return <Link href={href} onClick={onClick}>{inner}</Link>
}

function Accordion({
  item,
  onLinkClick,
}: {
  item: NavItem
  onLinkClick: () => void
}) {
  const [expanded, setExpanded] = useState(false)
  const bodyRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    if (bodyRef.current) gsap.set(bodyRef.current, { height: 0, opacity: 0, overflow: 'hidden' })
  }, [])

  useEffect(() => {
    if (!bodyRef.current) return
    if (expanded) {
      gsap.to(bodyRef.current, {
        height: 'auto', opacity: 1, duration: 0.42, ease: 'power3.inOut', overwrite: true,
      })
    } else {
      gsap.to(bodyRef.current, {
        height: 0, opacity: 0, duration: 0.35, ease: 'power3.inOut', overwrite: true,
        onComplete: () => { if (bodyRef.current) gsap.set(bodyRef.current, { overflow: 'hidden' }) },
      })
    }
  }, [expanded])

  return (
    <div>
      <div className="mn-item__toggle" onClick={() => setExpanded(v => !v)}>
        <AnimLink label={item.label} className="mn-item__label" />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18" height="18" viewBox="0 0 20 20"
          className={`mn-item__icon${expanded ? ' is-rotated' : ''}`}
        >
          <path d="M19.6,9.6h-3.9c-.4,0-1.8-.2-1.8-.2-.6,0-1.1-.2-1.6-.6-.5-.3-.9-.8-1.2-1.2-.3-.4-.4-.9-.5-1.4,0,0,0-1.1-.2-1.5V.4c0-.2-.2-.4-.4-.4s-.4.2-.4.4v4.4c0,.4-.2,1.5-.2,1.5,0,.5-.2,1-.5,1.4-.3.5-.7.9-1.2,1.2s-1,.5-1.6.6c0,0-1.2,0-1.7.2H.4c-.2,0-.4.2-.4.4s.2.4.4.4h4.1c.4,0,1.7.2,1.7.2.6,0,1.1.2,1.6.6.4.3.8.7,1.1,1.1.3.5.5,1,.6,1.6,0,0,0,1.3.2,1.7v4.1c0,.2.2.4.4.4s.4-.2.4-.4v-4.1c0-.4.2-1.7.2-1.7,0-.6.2-1.1.6-1.6.3-.4.7-.8,1.1-1.1.5-.3,1-.5,1.6-.6,0,0,1.3,0,1.8-.2h3.9c.2,0,.4-.2.4-.4s-.2-.4-.4-.4h0Z" />
        </svg>
      </div>
      <ul ref={bodyRef} className="mn-sub">
        {item.children?.map(child => (
          <li key={child.href} className="mn-sub__item">
            <Link href={child.href} onClick={onLinkClick}>{child.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function Navbar() {
  const [open, setOpen] = useState(false)

  const panelRef = useRef<HTMLDivElement>(null)
  const scrimRef = useRef<HTMLDivElement>(null)
  const captionRef = useRef<HTMLParagraphElement>(null)
  const itemRefs = useRef<(HTMLLIElement | null)[]>([])
  const hbgRef = useRef<HTMLButtonElement>(null)

  // Initialise panel collapsed
  useEffect(() => {
    if (panelRef.current) {
      gsap.set(panelRef.current, { scale: 0, borderRadius: '50%' })
    }
  }, [])

  // Animated open / close
  useEffect(() => {
    const panel = panelRef.current
    const btn = hbgRef.current
    const items = itemRefs.current.filter(Boolean) as HTMLLIElement[]
    if (!panel || !btn) return

    if (open) {
      const r = btn.getBoundingClientRect()
      gsap.set(panel, {
        transformOrigin: `${r.left + r.width / 2}px ${r.top + r.height / 2}px`,
        left: 0, top: 0, right: 'auto', width: '100vw', height: '100dvh',
      })
      gsap.timeline()
        .to(panel, {
          scale: 1, borderRadius: '0px', duration: 0.72, ease: 'expo.inOut',
          onComplete: () => { panel.style.overflow = 'auto' }
        })
        .to(scrimRef.current, { opacity: 1, pointerEvents: 'auto', duration: 0.3 }, '<0.1')
        .fromTo(captionRef.current,
          { opacity: 0, y: 20, filter: 'blur(8px)' },
          { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.45, ease: 'power3.out' }, '<0.15')
        .fromTo(items,
          { opacity: 0, y: 28, filter: 'blur(6px)' },
          { opacity: 1, y: 0, filter: 'blur(0px)', stagger: 0.065, duration: 0.5, ease: 'power3.out' }, '<0.08')
    } else {
      panel.style.overflow = 'hidden'
      gsap.timeline()
        .to(items, { opacity: 0, y: 12, filter: 'blur(4px)', duration: 0.15, stagger: 0.02 })
        .to(captionRef.current, { opacity: 0, filter: 'blur(8px)', duration: 0.15 }, '<')
        .to(scrimRef.current, { opacity: 0, pointerEvents: 'none', duration: 0.2 }, '<0.05')
        .to(panel, { scale: 0, borderRadius: '50%', duration: 0.62, ease: 'expo.inOut' }, '<0.05')
    }
  }, [open])

  // Lock scroll when menu open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  // ── Instant close: kill all menu tweens and snap panel shut immediately.
  // Called when a nav link is clicked so the incoming page's GSAP animations
  // start with a clean slate (no competing timelines).
  const closeInstant = useCallback(() => {
    const panel = panelRef.current
    const items = itemRefs.current.filter(Boolean) as HTMLLIElement[]
    if (!panel) return

    gsap.killTweensOf([panel, scrimRef.current, captionRef.current, ...items])

    panel.style.overflow = 'hidden'
    gsap.set(panel, { scale: 0, borderRadius: '50%' })
    gsap.set(scrimRef.current, { opacity: 0, pointerEvents: 'none' })
    gsap.set(captionRef.current, { opacity: 0 })
    gsap.set(items, { opacity: 0, y: 0, filter: 'none' })

    document.body.style.overflow = ''
    setOpen(false)
  }, [])

  return (
    <>
      {/* ─── Top bar ─── */}
      <nav className="nb">
        <div className="nb__inner">
          <Link href="/" className="nb__logo" onClick={closeInstant}>
            <Image src="https://res.cloudinary.com/dozdgvgbt/image/upload/q_auto/f_auto/v1781196202/ChatGPT_Image_Jun_8_2026_10_26_16_PM_wha67q.png" alt="Primus Software" width={46} height={46} priority />
          </Link>

          <div className="nb__right">
            <MagneticBtn>
              <Link href="/contact" className="nb__cta" onClick={closeInstant}>
                {/* <span className="nb__dot" aria-hidden="true" /> */}
                <span className="nb__cta-label">Start a project</span>
                <span className="nb__cta-arrow" aria-hidden="true">→</span>
              </Link>
            </MagneticBtn>

            <MagneticBtn>
              <button
                ref={hbgRef}
                className={`hbg${open ? ' is-open' : ''}`}
                onClick={() => setOpen(v => !v)}
                aria-label={open ? 'Close menu' : 'Open menu'}
              >
                <span className="hbg__l" />
                <span className="hbg__l" />
              </button>
            </MagneticBtn>
          </div>
        </div>
      </nav>

      {/* ─── Scrim ─── */}
      <div
        ref={scrimRef}
        className="nb-scrim"
        style={{ opacity: 0, pointerEvents: 'none' }}
        onClick={() => setOpen(false)}
      />

      {/* ─── Full-screen menu panel ─── */}
      <div ref={panelRef} className="mp" data-lenis-prevent>
        <div className="mp__left">
          <p ref={captionRef} className="mp__caption" style={{ opacity: 0 }}>
            The extraordinary not the everyday.
            <br />
            Premium UI/UX &amp; product engineering.
          </p>
        </div>

        <div className="mp__right">
          <ul className="mn">
            {NAV_ITEMS.map((item, i) => (
              <li
                key={item.label}
                className="mn__item"
                ref={el => { itemRefs.current[i] = el }}
                style={{ opacity: 0 }}
              >
                {item.children ? (
                  <Accordion item={item} onLinkClick={closeInstant} />
                ) : (
                  <AnimLink
                    label={item.label}
                    href={item.href}
                    className="mn-item__label"
                    onClick={closeInstant}
                  />
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}
