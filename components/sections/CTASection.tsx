'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

export function CTASection() {
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
        }
      },
      { threshold: 0.5 }
    )

    const element = document.getElementById('cta-section')
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  return (
    <section id="cta-section" className="relative py-20 md:py-32 bg-slate-950 overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/30 rounded-full blur-3xl opacity-40 animate-float-soft"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/30 rounded-full blur-3xl opacity-40 animate-float-soft" style={{ animationDelay: '3s' }}></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center space-y-8 transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Headline */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            <span className="text-slate-100">Ready to Build</span>
            <br />
            <span className="bg-gradient-to-r from-indigo-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">Something Remarkable?</span>
          </h2>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Let&apos;s collaborate to create digital experiences that drive growth, engagement, and success for your brand.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link
              href="/contact"
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-all duration-300 transform hover:scale-105 font-semibold shadow-lg shadow-indigo-600/50 animate-glow-pulse btn-magnetic"
            >
              Start Your Project
              <i className="ph-bold ph-arrow-right group-hover:translate-x-1 transition-transform"></i>
            </Link>
            <button
              onClick={() => {
                const email = 'hello@primusoftware.com'
                window.location.href = `mailto:${email}`
              }}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-slate-900 hover:bg-slate-800 text-slate-100 border border-slate-800 rounded-lg transition-all duration-300 font-semibold btn-magnetic"
            >
              Get in Touch
              <i className="ph-bold ph-envelope"></i>
            </button>
          </div>

          {/* Contact Info */}
          <div className="pt-8 border-t border-slate-800/50">
            <p className="text-slate-400 mb-4">Or reach us directly:</p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <a
                href="mailto:hello@primusoftware.com"
                className="flex items-center justify-center gap-2 text-indigo-400 hover:text-indigo-300 transition-colors font-medium"
              >
                <i className="ph-bold ph-envelope"></i>
                hello@primusoftware.com
              </a>
              <a
                href="tel:+919876543210"
                className="flex items-center justify-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors font-medium"
              >
                <i className="ph-bold ph-phone"></i>
                +91 98765 43210
              </a>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-3 gap-4 pt-8 text-center text-sm">
            <div className="space-y-1">
              <i className="ph-bold ph-check-circle text-emerald-400 text-2xl block"></i>
              <p className="text-slate-400">24/7 Support</p>
            </div>
            <div className="space-y-1">
              <i className="ph-bold ph-rocket text-indigo-400 text-2xl block"></i>
              <p className="text-slate-400">Quick Turnaround</p>
            </div>
            <div className="space-y-1">
              <i className="ph-bold ph-shield-check text-cyan-400 text-2xl block"></i>
              <p className="text-slate-400">Quality Assured</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
