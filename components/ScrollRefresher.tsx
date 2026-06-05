'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'

export function ScrollRefresher() {
  const pathname  = usePathname()
  const firstRun  = useRef(true)

  useEffect(() => {
    // Skip the very first mount — animations initialise themselves
    if (firstRun.current) {
      firstRun.current = false
      return
    }

    // After client-side navigation, scroll to top and refresh ScrollTrigger
    // so scroll-linked animations recalculate their trigger positions
    window.scrollTo(0, 0)

    const refresh = async () => {
      try {
        const { ScrollTrigger } = await import('gsap/ScrollTrigger')
        // Small delay so the new page has finished painting
        setTimeout(() => {
          ScrollTrigger.refresh(true)
        }, 80)
      } catch {
        // gsap not loaded yet — no-op
      }
    }
    refresh()
  }, [pathname])

  return null
}
