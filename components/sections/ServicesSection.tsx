'use client'

import { useState, useEffect } from 'react'

const services = [
  {
    id: 1,
    title: 'UI/UX Design',
    description: 'Beautiful, intuitive interfaces that users love',
    icon: 'ph-palette',
    gradient: 'gradient-indigo-cyan',
    tags: ['Figma', 'Design Systems', 'Prototyping']
  },
  {
    id: 2,
    title: 'Web Development',
    description: 'High-performance websites and web apps',
    icon: 'ph-code',
    gradient: 'gradient-blue-teal',
    tags: ['React', 'Next.js', 'Tailwind']
  },
  {
    id: 3,
    title: 'eCommerce',
    description: 'Powerful online stores that convert',
    icon: 'ph-shopping-cart',
    gradient: 'gradient-emerald-mint',
    tags: ['Shopify', 'WooCommerce', 'Custom']
  },
  {
    id: 4,
    title: 'Brand Identity',
    description: 'Complete brand design from logo to guidelines',
    icon: 'ph-sparkle',
    gradient: 'gradient-indigo-cyan',
    tags: ['Logo Design', 'Brand Book', 'Assets']
  },
  {
    id: 5,
    title: 'Mobile Apps',
    description: 'Native iOS and Android applications',
    icon: 'ph-device-mobile',
    gradient: 'gradient-blue-teal',
    tags: ['Flutter', 'React Native', 'Native']
  },
  {
    id: 6,
    title: 'SaaS Products',
    description: 'Scalable software as a service solutions',
    icon: 'ph-cloud',
    gradient: 'gradient-emerald-mint',
    tags: ['Dashboard', 'APIs', 'Automation']
  }
]

export function ServicesSection() {
  const [visibleTags, setVisibleTags] = useState<Set<number>>(new Set())

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const cardId = parseInt(entry.target.getAttribute('data-card-id') || '0')
            setVisibleTags(prev => new Set(prev).add(cardId))
          }
        })
      },
      { threshold: 0.5 }
    )

    document.querySelectorAll('[data-card-id]').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section id="services" className="relative py-20 md:py-32 bg-slate-950 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl opacity-20"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            <span className="text-slate-100">Our</span>
            <span className="block bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">Expertise & Services</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            We specialize in creating digital experiences that captivate, engage, and convert. From strategy to execution, we deliver excellence.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, index) => (
            <div
              key={service.id}
              data-card-id={service.id}
              className="service-card group relative h-64 md:h-72 p-6 flex flex-col justify-between opacity-0 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Background Image */}
              <div className={`absolute inset-0 ${service.gradient} z-0`}></div>

              {/* Content */}
              <div className="relative z-10 flex flex-col h-full justify-between">
                {/* Top */}
                <div className="space-y-2">
                  <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center backdrop-blur-sm border border-white/20 group-hover:bg-white/20 transition-all duration-300">
                    <i className={`${service.icon} text-2xl text-cyan-400`}></i>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-white">{service.title}</h3>
                  <p className="text-sm text-slate-200">{service.description}</p>
                </div>

                {/* Tags */}
                <div className={`flex flex-wrap gap-2 tags-visible=${visibleTags.has(service.id) ? 'true' : 'false'}`}>
                  {service.tags.map((tag, i) => (
                    <span
                      key={i}
                      className={`tag-stagger text-xs px-3 py-1 bg-white/10 text-slate-100 rounded-full border border-white/20 backdrop-blur-sm ${visibleTags.has(service.id) ? 'opacity-100' : ''}`}
                      style={{ transitionDelay: visibleTags.has(service.id) ? `${i * 0.06}s` : '0s' }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 md:mt-20 text-center">
          <p className="text-slate-400 mb-6">Ready to transform your ideas into reality?</p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-all duration-300 transform hover:scale-105 font-semibold shadow-lg shadow-indigo-600/50 animate-glow-pulse"
          >
            Start Your Project
            <i className="ph-bold ph-arrow-right"></i>
          </a>
        </div>
      </div>
    </section>
  )
}
