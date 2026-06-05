'use client'

const testimonials = [
  {
    id: 1,
    quote: "Primus delivered an exceptional web application that exceeded all our expectations. Their attention to detail and understanding of our business needs was outstanding.",
    author: "Rahul Sharma",
    role: "CEO, TechStart India",
    company: "TechStart",
    rating: 5
  },
  {
    id: 2,
    quote: "Working with Primus was a game-changer for our brand. They transformed our vision into a stunning digital experience that resonated with our audience.",
    author: "Priya Patel",
    role: "Founder, StyleHub",
    company: "StyleHub",
    rating: 5
  },
  {
    id: 3,
    quote: "The team's expertise in eCommerce development helped us increase conversions by 150%. Their strategic approach to UX was pivotal to our success.",
    author: "Vikram Desai",
    role: "COO, ShopHub",
    company: "ShopHub",
    rating: 5
  }
]

export function TestimonialsSection() {
  return (
    <section className="relative py-20 md:py-32 bg-gradient-to-br from-slate-950 to-slate-900 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-indigo-600/5 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute bottom-1/3 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl opacity-30"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            <span className="text-slate-100">What Our</span>
            <span className="block bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">Clients Say</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Trusted by leading brands and startups to deliver excellence
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="tilt-card group relative p-6 md:p-8 bg-slate-900/50 border border-slate-800 rounded-xl backdrop-blur-sm hover:border-slate-700 opacity-0 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <i key={i} className="ph-fill ph-star text-amber-400 text-sm"></i>
                ))}
              </div>

              {/* Quote */}
              <p className="text-slate-200 leading-relaxed mb-6 italic">
                "{testimonial.quote}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-slate-800">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-cyan-400 flex items-center justify-center text-white font-bold">
                  {testimonial.author.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-slate-100 text-sm">{testimonial.author}</p>
                  <p className="text-xs text-slate-400">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-16 md:mt-20 pt-16 md:pt-20 border-t border-slate-800/50">
          <div className="text-center">
            <p className="text-3xl md:text-4xl font-bold text-indigo-400 mb-1">100+</p>
            <p className="text-xs md:text-sm text-slate-400">Projects Completed</p>
          </div>
          <div className="text-center">
            <p className="text-3xl md:text-4xl font-bold text-cyan-400 mb-1">50+</p>
            <p className="text-xs md:text-sm text-slate-400">Happy Clients</p>
          </div>
          <div className="text-center">
            <p className="text-3xl md:text-4xl font-bold text-emerald-400 mb-1">98%</p>
            <p className="text-xs md:text-sm text-slate-400">Satisfaction Rate</p>
          </div>
          <div className="text-center">
            <p className="text-3xl md:text-4xl font-bold text-violet-400 mb-1">8+</p>
            <p className="text-xs md:text-sm text-slate-400">Years in Business</p>
          </div>
        </div>
      </div>
    </section>
  )
}
