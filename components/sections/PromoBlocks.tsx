import Image from 'next/image'
import type { ReactNode } from 'react'
import { LazyPromoViz } from './LazyPromoViz'

type Block = {
  flip: boolean
  img: string
  imgAlt: string
  text: string
  icons: { icon: string; label: string }[]
  viz?: ReactNode
}

const BLOCKS: Block[] = [
  {
    flip: false,
    img: '/promos/block1.png',
    imgAlt: 'Integrations and automation with modern APIs and workflows',
    viz: <LazyPromoViz name="integrations" />,
    text: 'Your stack, fully connected. ERP, CRM, payments, messaging, and analytics — stitched together with clean APIs and event-driven workflows that kill the busywork and surface what actually matters.',
    icons: [
      { icon: 'ph ph-plugs-connected', label: 'Integrations' },
      { icon: 'ph ph-database',        label: 'Data'          },
      { icon: 'ph ph-robot',           label: 'Automation'    },
      { icon: 'ph ph-gear-six',        label: 'Workflows'     },
    ],
  },
  {
    flip: true,
    img: '/promos/block2.png',
    imgAlt: 'High-performance, SEO-ready web experiences',
    viz: <LazyPromoViz name="performance" />,
    text: 'Obsessively fast by default. Code-split, image-optimized, and tuned for every Core Web Vital. Technical SEO, clean schema, and WCAG accessibility baked in — so your growth compounds while you sleep.',
    icons: [
      { icon: 'ph ph-gauge',            label: 'Performance'    },
      { icon: 'ph ph-magnifying-glass', label: 'Technical SEO'  },
      { icon: 'ph ph-chart-line-up',    label: 'Analytics'      },
      { icon: 'ph ph-read-cv-logo',     label: 'Accessibility'  },
    ],
  },
  {
    flip: false,
    img: '/promos/block3.png',
    imgAlt: 'Responsive UI across mobile, tablet, laptop, and desktop',
    viz: <LazyPromoViz name="responsive" />,
    text: 'Every screen, every device, zero compromise. Our components adapt fluidly — engineered for speed, accessibility, and conversion. Pixel-perfect from 320 px to 4 K, dark mode ready, and Core Web Vitals optimized out of the box.',
    icons: [
      { icon: 'ph ph-device-mobile-camera',  label: 'Mobile'  },
      { icon: 'ph ph-device-tablet-camera',  label: 'Tablet'  },
      { icon: 'ph ph-laptop',                label: 'Laptop'  },
      { icon: 'ph ph-desktop',               label: 'Desktop' },
    ],
  },
  {
    flip: true,
    img: '/promos/block4.png',
    imgAlt: 'Enterprise-grade security and compliance',
    viz: <LazyPromoViz name="security" />,
    text: "Security isn't an afterthought — it's the foundation. Hardened headers, role-based access, SSO with SAML and OAuth, audit trails, and automated backups. Built on OWASP best practices with compliance woven into every layer.",
    icons: [
      { icon: 'ph ph-shield-check', label: 'Protection' },
      { icon: 'ph ph-lock-key',     label: 'Access'     },
      { icon: 'ph ph-key',          label: 'SSO / 2FA'  },
      { icon: 'ph ph-file-text',    label: 'Compliance' },
    ],
  },
]

export function PromoBlocks() {
  return (
    <>
      {BLOCKS.map((block, i) => (
        <div key={i} className="promo-block">
          <div className={`promo-block__inner${block.flip ? ' promo-block__inner--flip' : ''}`}>
            <div className={`promo-image-col${block.viz ? ' promo-image-col--viz' : ''}`}>
              {block.viz ?? (
                <Image
                  src={block.img}
                  alt={block.imgAlt}
                  fill
                  className="promo-img"
                  sizes="(max-width: 1023px) 100vw, 50vw"
                  loading="lazy"
                />
              )}
            </div>
            <div className="promo-text-col">
              <p className="promo-text-col__para">{block.text}</p>
              <div className="promo-icons">
                {block.icons.map(ic => (
                  <div key={ic.label} className="promo-icon-item">
                    <div className="promo-icon-box">
                      <i className={ic.icon} aria-hidden="true" />
                    </div>
                    <span className="promo-icon-label">{ic.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  )
}
