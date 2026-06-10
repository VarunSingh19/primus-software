'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

const ORBS = [
  { label: 'Shopify',   pos: 'tl', z: 90 },
  { label: 'Stripe',    pos: 'tr', z: 70 },
  { label: '+34% AOV',  pos: 'bl', z: 80 },
  { label: 'Headless',  pos: 'br', z: 60 },
]

const PROOF_MESSAGES = [
  'Someone in Mumbai just bought this',
  'Order #4821 confirmed · 2 min ago',
  '12 people are viewing this right now',
]

function HeartIcon({ filled }: { filled: boolean }) {
  return (
    <svg width="13" height="13" viewBox="0 0 20 20" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={1.6}>
      <path d="M10 17.3 8.5 16C4 12 1.5 9.6 1.5 6.6 1.5 4 3.5 2 6 2c1.6 0 3 .8 4 2.1C11 2.8 12.4 2 14 2c2.5 0 4.5 2 4.5 4.6 0 3-2.5 5.4-7 9.4l-1.5 1.3z"/>
    </svg>
  )
}

function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg width="11" height="11" viewBox="0 0 20 20" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={filled ? 0 : 1.4}>
      <path d="M10 1.5l2.6 5.4 5.9.8-4.3 4.2 1 5.9L10 14.9l-5.2 2.9 1-5.9L1.5 7.7l5.9-.8z"/>
    </svg>
  )
}

function CartIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.6}>
      <circle cx="8" cy="17" r="1.3" fill="currentColor" stroke="none"/>
      <circle cx="15" cy="17" r="1.3" fill="currentColor" stroke="none"/>
      <path d="M1.5 2h2l1.6 9.6a1.6 1.6 0 0 0 1.6 1.4h8.6a1.6 1.6 0 0 0 1.6-1.3l1.1-6.2H4.3" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function LockIcon() {
  return (
    <svg width="9" height="9" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.8}>
      <rect x="4" y="9" width="12" height="8" rx="1.5"/><path d="M7 9V6a3 3 0 0 1 6 0v3" strokeLinecap="round"/>
    </svg>
  )
}

function HeadphonesIcon() {
  return (
    <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4}>
      <path d="M3 13a9 9 0 0 1 18 0v5a2 2 0 0 1-2 2h-1a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1h3" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M3 13v4a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1H3" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

export function EcommerceHero3D() {
  const wrapRef  = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<HTMLDivElement>(null)
  const toastTimer  = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const bounceTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  const [hovered, setHovered]       = useState(false)
  const [wishlisted, setWishlisted] = useState(false)
  const [rating, setRating]         = useState(4)
  const [hoverRating, setHoverRating] = useState<number | null>(null)
  const [qty, setQty]               = useState(1)
  const [cartCount, setCartCount]   = useState(0)
  const [cartBounce, setCartBounce] = useState(false)
  const [toast, setToast]           = useState(false)
  const [proofIndex, setProofIndex] = useState(0)

  useEffect(() => {
    const wrap  = wrapRef.current
    const scene = sceneRef.current
    if (!wrap || !scene) return

    /* gentle float */
    gsap.to(scene, {
      y: -16, duration: 3.5, ease: 'sine.inOut', repeat: -1, yoyo: true,
    })

    /* mouse tilt */
    const onMove = (e: MouseEvent) => {
      const r  = wrap.getBoundingClientRect()
      const dx = (e.clientX - r.left - r.width  / 2) / (r.width  / 2)
      const dy = (e.clientY - r.top  - r.height / 2) / (r.height / 2)
      gsap.to(scene, {
        rotateY: dx * 20,
        rotateX: -dy * 14,
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

  /* cycle social-proof messages */
  useEffect(() => {
    const id = setInterval(() => setProofIndex(i => (i + 1) % PROOF_MESSAGES.length), 3600)
    return () => clearInterval(id)
  }, [])

  useEffect(() => () => {
    clearTimeout(toastTimer.current)
    clearTimeout(bounceTimer.current)
  }, [])

  const addToCart = () => {
    setCartCount(c => c + qty)

    setToast(true)
    clearTimeout(toastTimer.current)
    toastTimer.current = setTimeout(() => setToast(false), 1800)

    setCartBounce(true)
    clearTimeout(bounceTimer.current)
    bounceTimer.current = setTimeout(() => setCartBounce(false), 500)
  }

  const displayRating = hoverRating ?? rating

  return (
    <div
      ref={wrapRef}
      className="ecm-wrap"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div ref={sceneRef} className={`ecm-scene${hovered ? ' hov' : ''}`}>

        {/* ── Orbital badges at corners ── */}
        {ORBS.map(({ label, pos, z }) => (
          <div
            key={label}
            className={`ecm-orb ecm-orb--${pos}${hovered ? ' hov' : ''}`}
            style={{ '--bz': `${z}px` } as React.CSSProperties}
          >
            {label}
          </div>
        ))}

        {/* ── Glow halo ── */}
        <div className="ecm-halo" />

        {/* ── Main storefront card ── */}
        <div className="ecm-card">

          {/* Chrome */}
          <div className="ecm-chrome">
            <div className="u3d-dots">
              <span className="dot-r"/><span className="dot-y"/><span className="dot-g"/>
            </div>
            <div className="ecm-address">shop.yourbrand.com</div>
            <div className={`ecm-cart-chip${cartBounce ? ' bounce' : ''}`}>
              <CartIcon />
              <span className="ecm-cart-count">{cartCount}</span>
            </div>
          </div>

          {/* Product media */}
          <div className="ecm-media">
            <span className="ecm-badge-sale">-30%</span>
            <button
              className={`ecm-wishlist${wishlisted ? ' active' : ''}`}
              onClick={() => setWishlisted(w => !w)}
              aria-label="Toggle wishlist"
            >
              <HeartIcon filled={wishlisted} />
            </button>
            <div className="ecm-media-icon"><HeadphonesIcon /></div>
          </div>

          {/* Product info */}
          <div className="ecm-info">
            <p className="ecm-title">Aurora Wireless Headphones</p>

            <div className="ecm-rating" onMouseLeave={() => setHoverRating(null)}>
              {[0, 1, 2, 3, 4].map(i => (
                <button
                  key={i}
                  className={`ecm-star${i < displayRating ? ' is-filled' : ''}`}
                  onMouseEnter={() => setHoverRating(i + 1)}
                  onClick={() => setRating(i + 1)}
                  aria-label={`Rate ${i + 1} stars`}
                >
                  <StarIcon filled={i < displayRating} />
                </button>
              ))}
              <span className="ecm-rating-num">{displayRating.toFixed(1)} · 128</span>
            </div>

            <div className="ecm-price-row">
              <span className="ecm-price-old">$129</span>
              <span className="ecm-price-new">$89</span>
              <span className="ecm-stock"><span className="ecm-stock-dot"/>3 left</span>
            </div>
          </div>

          {/* Actions */}
          <div className="ecm-actions">
            <div className="ecm-qty">
              <button onClick={() => setQty(q => Math.max(1, q - 1))} aria-label="Decrease quantity">−</button>
              <span>{qty}</span>
              <button onClick={() => setQty(q => Math.min(9, q + 1))} aria-label="Increase quantity">+</button>
            </div>
            <button className="ecm-add-btn" onClick={addToCart}>Add to cart</button>
          </div>

          {/* Footer: payments + secure checkout */}
          <div className="ecm-footer">
            <div className="ecm-pay-icons">
              <span className="ecm-pay-chip">VISA</span>
              <span className="ecm-pay-chip">Pay</span>
              <span className="ecm-pay-chip">UPI</span>
            </div>
            <div className="ecm-secure"><LockIcon /> Secure checkout</div>
          </div>

          {/* Add-to-cart toast */}
          <div className={`ecm-toast${toast ? ' show' : ''}`}>
            ✓ Added {qty} to cart
          </div>
        </div>{/* end .ecm-card */}

        {/* ── Floating social-proof badge ── */}
        <div className={`ecm-proof${hovered ? ' hov' : ''}`}>
          <span className="ecm-proof-dot" />
          {PROOF_MESSAGES[proofIndex]}
        </div>

      </div>
    </div>
  )
}
