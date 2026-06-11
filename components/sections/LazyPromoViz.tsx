'use client'

import dynamic from 'next/dynamic'
import { useEffect, useRef, useState } from 'react'

/* ════════════════════════════════════════════════════════════════
   LazyPromoViz

   The four promo-block 3D visualizations are heavy (each bundles GSAP
   and runs animation loops) and live far below the fold. Loading them
   in the initial bundle hurts TBT/INP for no benefit.

   Each is code-split with `next/dynamic({ ssr: false })` and mounted
   only once it scrolls near the viewport (IntersectionObserver). The
   slot reserves the visualization's exact footprint (520×440 layout
   box) so deferring introduces zero layout shift.
═════════════════════════════════════════════════════════════════ */

const Skeleton = () => <div className="promo-viz-skel" aria-hidden="true" />

const VIZ = {
  integrations: dynamic(() => import('./promo3d/IntegrationsHub3D').then(m => m.IntegrationsHub3D), { ssr: false, loading: Skeleton }),
  performance:  dynamic(() => import('./promo3d/PerformanceAudit3D').then(m => m.PerformanceAudit3D),  { ssr: false, loading: Skeleton }),
  responsive:   dynamic(() => import('./promo3d/ResponsiveDevices3D').then(m => m.ResponsiveDevices3D), { ssr: false, loading: Skeleton }),
  security:     dynamic(() => import('./promo3d/SecurityShield3D').then(m => m.SecurityShield3D),       { ssr: false, loading: Skeleton }),
} as const

export type VizName = keyof typeof VIZ

export function LazyPromoViz({ name }: { name: VizName }) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (typeof IntersectionObserver === 'undefined') { setInView(true); return }
    const io = new IntersectionObserver(
      entries => {
        for (const e of entries) {
          if (e.isIntersecting) { setInView(true); io.disconnect(); break }
        }
      },
      { rootMargin: '400px 0px' }, // begin loading before it scrolls into view
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const Comp = VIZ[name]
  return (
    <div ref={ref} className="promo-viz-slot">
      {inView ? <Comp /> : <Skeleton />}
    </div>
  )
}
