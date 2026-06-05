'use client'

import Link from 'next/link'

const NAV_LINKS = [
  { href: '/',        label: 'Home'       },
  { href: '/about',   label: 'About us'   },
  { href: '/contact', label: 'Contact us' },
]

const SERVICE_LINKS = [
  { href: '/ui-ux',                        label: 'UI/UX Design'           },
  { href: '/website-webapps',              label: 'Websites & Web Apps'    },
  { href: '/ecommerce',                    label: 'eCommerce'              },
  { href: '/brand-identity',               label: 'Brand Identity'         },
  { href: '/mobile-apps',                  label: 'Mobile Apps'            },
  { href: '/saas-product-design',          label: 'SaaS Product Design'    },
  { href: '/performance-seo',              label: 'Performance & SEO'      },
  { href: '/cloud-devops-hosting',         label: 'Cloud / DevOps'         },
  { href: '/erp-crm-portals-dashboards',   label: 'ERP / CRM & Portals'   },
]

export function Footer() {
  return (
    <footer className="ft-root">
      <div className="ft-inner">

        {/* Brand */}
        <div className="ft-brand">
          <Link href="/" className="ft-logo">Primus</Link>
          <p className="ft-tagline">
            Premium UI/UX &amp; product engineering.<br />
            Mumbai — India.
          </p>
          <p className="ft-contact">
            <a href="tel:+918108325237">+91 81083 25237</a>
            <span>·</span>
            <a href="mailto:contact@primus.dev">contact@primus.dev</a>
          </p>
        </div>

        {/* Company links */}
        <div className="ft-col">
          <p className="ft-col__heading">Company</p>
          <ul className="ft-col__list">
            {NAV_LINKS.map(l => (
              <li key={l.href}>
                <Link href={l.href} className="ft-link">{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Services links */}
        <div className="ft-col">
          <p className="ft-col__heading">Services</p>
          <ul className="ft-col__list">
            {SERVICE_LINKS.map(l => (
              <li key={l.href}>
                <Link href={l.href} className="ft-link">{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>

      </div>

      <div className="ft-bottom">
        <p>© 2025 Primus Software. All rights reserved.</p>
        <p>Premium UI/UX &amp; Product Engineering</p>
      </div>
    </footer>
  )
}
