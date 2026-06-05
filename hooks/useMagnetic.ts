'use client'

import { useRef, useEffect } from 'react'
import gsap from 'gsap'

export function useMagnetic<T extends HTMLElement = HTMLDivElement>(strength = 0.35) {
  const wrapRef = useRef<T | null>(null)

  useEffect(() => {
    const wrap = wrapRef.current
    if (!wrap) return

    const btn = wrap.querySelector('button, a') as HTMLElement | null
    if (!btn) return

    const onMouseMove = (e: MouseEvent) => {
      const rect = wrap.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2
      gsap.to(btn, { x: x * strength, y: y * strength, duration: 0.4, ease: 'power2.out' })
    }

    const onMouseLeave = () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' })
    }

    wrap.addEventListener('mousemove', onMouseMove)
    wrap.addEventListener('mouseleave', onMouseLeave)
    return () => {
      wrap.removeEventListener('mousemove', onMouseMove)
      wrap.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [strength])

  return wrapRef
}
