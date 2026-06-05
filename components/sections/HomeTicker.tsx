'use client'

const ITEMS = [
  'UI/UX Design', 'Web Engineering', 'SaaS Platforms',
  'Brand Identity', 'eCommerce', 'Mobile Apps',
  'Cloud & DevOps', 'ERP/CRM', 'Performance & SEO',
]

export function HomeTicker() {
  return (
    <div className="ticker-wrap">
      <div className="ticker-pill">
        {/* doubled for seamless loop */}
        <div className="ticker-track" aria-hidden="true">
          {[...ITEMS, ...ITEMS, ...ITEMS].map((item, i) => (
            <span key={i} className="ticker-item">
              {item}
              <span className="ticker-sep">✦</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
