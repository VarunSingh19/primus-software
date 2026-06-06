'use client'

/* Gradient SVG tiles — same no-external-image approach as hero */
const mkGrad = (c1: string, c2: string, g1: string, g2: string, angle = 45) =>
  `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" width="600" height="400"><defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="${c1}"/><stop offset="100%" stop-color="${c2}"/></linearGradient><radialGradient id="g1"><stop offset="0%" stop-color="${g1}" stop-opacity="0.85"/><stop offset="100%" stop-color="${g1}" stop-opacity="0"/></radialGradient><radialGradient id="g2"><stop offset="0%" stop-color="${g2}" stop-opacity="0.7"/><stop offset="100%" stop-color="${g2}" stop-opacity="0"/></radialGradient></defs><rect width="100" height="100" fill="url(%23bg)"/><g transform="rotate(${angle} 50 50)"><circle cx="30" cy="60" r="48" fill="url(%23g1)"/><circle cx="70" cy="30" r="38" fill="url(%23g2)"/></g></svg>`

const TOP_ITEMS = [
  { type: 'img', src: mkGrad('%231a1a2e', '%2316213e', '%23e94560', '%23f39c12', 252), alt: 'Project showcase 01' },
  { type: 'caption', text: 'UX that\nconverts' },
  { type: 'img', src: mkGrad('%230f172a', '%231e293b', '%236366f1', '%2306b6d4', 141), alt: 'Project showcase 02' },
  { type: 'caption', text: 'Lightning-fast\nweb' },
  { type: 'img', src: mkGrad('%230d1b2a', '%231b263b', '%2300b4d8', '%2390e0ef', 100), alt: 'Project showcase 03' },
  { type: 'caption', text: 'Headless\nCMS' },
  { type: 'img', src: mkGrad('%231a1a2e', '%2316213e', '%23e94560', '%23f39c12', 48), alt: 'Project showcase 04' },
  { type: 'caption', text: 'High-impact\nbrands' },
  /* duplicate for seamless loop */
  { type: 'img', src: mkGrad('%231a1a2e', '%2316213e', '%23e94560', '%23f39c12', 252), alt: 'Project showcase 01' },
  { type: 'caption', text: 'UX that\nconverts' },
  { type: 'img', src: mkGrad('%230f172a', '%231e293b', '%236366f1', '%2306b6d4', 141), alt: 'Project showcase 02' },
  { type: 'caption', text: 'Lightning-fast\nweb' },
  { type: 'img', src: mkGrad('%230d1b2a', '%231b263b', '%2300b4d8', '%2390e0ef', 100), alt: 'Project showcase 03' },
  { type: 'caption', text: 'Headless\nCMS' },
  { type: 'img', src: mkGrad('%231a1a2e', '%2316213e', '%23e94560', '%23f39c12', 48), alt: 'Project showcase 04' },
  { type: 'caption', text: 'High-impact\nbrands' },
]

const BTM_ITEMS = [
  { type: 'caption', text: 'SEO &\nperformance' },
  { type: 'img', src: mkGrad('%232c1810', '%235c2a1a', '%23f59e0b', '%23ef4444', 81), alt: 'Project showcase 05' },
  { type: 'caption', text: 'eCommerce\ngrowth' },
  { type: 'img', src: mkGrad('%230a2e36', '%2314746f', '%237ae582', '%2325a18e', 112), alt: 'Project showcase 06' },
  { type: 'caption', text: 'Cloud &\nDevOps' },
  { type: 'img', src: mkGrad('%231a1a2e', '%2316213e', '%23e94560', '%23f39c12', 158), alt: 'Project showcase 07' },
  { type: 'caption', text: 'Mobile &\napps' },
  { type: 'img', src: mkGrad('%230d1b2a', '%231b263b', '%2300b4d8', '%2390e0ef', 220), alt: 'Project showcase 08' },
  /* duplicate for seamless loop */
  { type: 'caption', text: 'SEO &\nperformance' },
  { type: 'img', src: mkGrad('%232c1810', '%235c2a1a', '%23f59e0b', '%23ef4444', 81), alt: 'Project showcase 05' },
  { type: 'caption', text: 'eCommerce\ngrowth' },
  { type: 'img', src: mkGrad('%230a2e36', '%2314746f', '%237ae582', '%2325a18e', 112), alt: 'Project showcase 06' },
  { type: 'caption', text: 'Cloud &\nDevOps' },
  { type: 'img', src: mkGrad('%231a1a2e', '%2316213e', '%23e94560', '%23f39c12', 158), alt: 'Project showcase 07' },
  { type: 'caption', text: 'Mobile &\napps' },
  { type: 'img', src: mkGrad('%230d1b2a', '%231b263b', '%2300b4d8', '%2390e0ef', 220), alt: 'Project showcase 08' },
]

export function WorkShowcase() {
  return (
    <div className="work-showcase">
      {/* Top row — scrolls left */}
      <div className="work-showcase__row work-showcase__row--left" aria-hidden="true">
        {TOP_ITEMS.map((item, i) =>
          item.type === 'img' ? (
            <div key={i} className="work-showcase__item work-showcase__item--img">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={item.src} alt={item.alt ?? ''} loading="lazy" decoding="async" />
            </div>
          ) : (
            <div key={i} className="work-showcase__item work-showcase__item--caption">
              <p style={{ whiteSpace: 'pre-line' }}>{item.text}</p>
            </div>
          )
        )}
      </div>

      {/* Bottom row — scrolls right */}
      <div className="work-showcase__row work-showcase__row--right" aria-hidden="true">
        {BTM_ITEMS.map((item, i) =>
          item.type === 'img' ? (
            <div key={i} className="work-showcase__item work-showcase__item--img">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={item.src} alt={item.alt ?? ''} loading="lazy" decoding="async" />
            </div>
          ) : (
            <div key={i} className="work-showcase__item work-showcase__item--caption">
              <p style={{ whiteSpace: 'pre-line' }}>{item.text}</p>
            </div>
          )
        )}
      </div>
    </div>
  )
}
