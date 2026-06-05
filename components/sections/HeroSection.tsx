'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

export function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-slate-950">
      {/* Background Gradient Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl opacity-30 animate-float-soft"></div>
        <div className="absolute bottom-32 right-20 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl opacity-30 animate-float-soft" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/3 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl opacity-20"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className={`space-y-6 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="inline-block px-4 py-2 bg-slate-900/50 border border-slate-800 rounded-full backdrop-blur-sm">
              <span className="text-sm text-cyan-400 font-medium">✨ Premium Design-First Studio</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              <span className="block mb-2">Design that</span>
              <span className="bg-gradient-to-r from-indigo-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent animate-text-shimmer">moves.</span>
              <span className="block mt-2">Code that scales.</span>
              <span className="block text-slate-300 mt-2">Products that win.</span>
            </h1>

            <p className="text-lg text-slate-400 leading-relaxed max-w-lg">
              We build high-performance web apps, eCommerce platforms, SaaS products, and brands that make an impact. Design-first. Engineering-obsessed. Results-driven.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-7 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-all duration-300 transform hover:scale-105 font-medium shadow-lg shadow-indigo-600/50 btn-magnetic"
              >
                Start a Project
                <i className="ph-bold ph-arrow-right"></i>
              </Link>
              <button
                onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex items-center justify-center gap-2 px-7 py-3 bg-slate-900 hover:bg-slate-800 text-slate-100 border border-slate-800 rounded-lg transition-all duration-300 font-medium btn-magnetic"
              >
                View Our Work
                <i className="ph-bold ph-arrow-down"></i>
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-slate-800/50">
              <div>
                <p className="text-2xl font-bold text-cyan-400">100+</p>
                <p className="text-sm text-slate-400">Projects Delivered</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-indigo-400">50+</p>
                <p className="text-sm text-slate-400">Happy Clients</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-emerald-400">8+</p>
                <p className="text-sm text-slate-400">Years Experience</p>
              </div>
            </div>
          </div>

          {/* Visual */}
          <div className={`relative h-96 md:h-full transition-all duration-1000 delay-200 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            <div className="absolute inset-0 bg-gradient-indigo-cyan rounded-2xl overflow-hidden group image-hover-glow">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <i className="ph-bold ph-rocket text-7xl text-cyan-400 mb-4 block"></i>
                  <p className="text-slate-300 font-semibold">Interactive Design Studio</p>
                </div>
              </div>
            </div>

            {/* Floating Cards */}
            <div className="absolute -bottom-6 -left-6 bg-slate-900 p-4 rounded-lg border border-slate-800 shadow-2xl animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <p className="text-xs text-slate-400 mb-2">Active Projects</p>
              <p className="text-2xl font-bold text-emerald-400">24/7</p>
            </div>

            <div className="absolute -top-6 -right-6 bg-slate-900 p-4 rounded-lg border border-slate-800 shadow-2xl animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
              <p className="text-xs text-slate-400 mb-2">Client Satisfaction</p>
              <p className="text-2xl font-bold text-indigo-400">98%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <i className="ph-bold ph-arrow-down text-2xl text-slate-400"></i>
      </div>
    </section>
  )
}
