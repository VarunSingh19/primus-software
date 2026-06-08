'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image src="/logo/logo.png" alt="Primus" width={140} height={40} className="h-9 w-auto" priority />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/#services" className="text-slate-300 hover:text-slate-100 transition-colors duration-300">
            Services
          </Link>
          <Link href="/about" className="text-slate-300 hover:text-slate-100 transition-colors duration-300">
            About
          </Link>
          <Link href="/contact" className="text-slate-300 hover:text-slate-100 transition-colors duration-300">
            Contact
          </Link>
        </nav>

        {/* CTA Button */}
        <Link 
          href="/contact" 
          className="hidden sm:inline-flex items-center gap-2 px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-all duration-300 transform hover:scale-105 font-medium"
        >
          Start Now
          <i className="ph-bold ph-arrow-right text-sm"></i>
        </Link>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 hover:bg-slate-800 rounded-lg transition-colors"
        >
          <i className="ph-bold ph-list text-2xl"></i>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-slate-900 border-t border-slate-800/50 p-4 space-y-4 animate-fade-in-up">
          <Link href="/#services" className="block text-slate-300 hover:text-slate-100 transition-colors">
            Services
          </Link>
          <Link href="/about" className="block text-slate-300 hover:text-slate-100 transition-colors">
            About
          </Link>
          <Link href="/contact" className="block text-slate-300 hover:text-slate-100 transition-colors">
            Contact
          </Link>
          <Link 
            href="/contact" 
            className="block px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-all duration-300 font-medium text-center"
          >
            Start Now
          </Link>
        </div>
      )}
    </header>
  )
}
