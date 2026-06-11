'use client'

import Image from 'next/image'
import Link from 'next/link'

const SERVICES = [
  { label: 'UI/UX Design', href: '/ui-ux' },
  { label: 'Websites & Web Apps', href: '/website-webapps' },
  { label: 'eCommerce', href: '/ecommerce' },
  { label: 'Brand Identity', href: '/brand-identity' },
  { label: 'Mobile Apps (iOS / Android)', href: '/mobile-apps' },
  { label: 'SaaS Product Design', href: '/saas-product-design' },
  { label: 'SEO & Technical Optimization', href: '/performance-seo' },
  { label: 'Cloud/DevOps & Hosting', href: '/cloud-devops-hosting' },
  { label: 'ERP/CRM & Portals', href: '/erp-crm-portals-dashboards' },
]

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About us', href: '/about' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact', href: '/contact' },
]

const SOCIALS = [
  {
    label: 'LinkedIn',
    href: 'https://in.linkedin.com/company/vasoftwares-technology-pvt-ltd',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 256 256" fill="currentColor">
        <path d="M216,24H40A16,16,0,0,0,24,40V216a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V40A16,16,0,0,0,216,24Zm0,192H40V40H216V216ZM96,112v64a8,8,0,0,1-16,0V112a8,8,0,0,1,16,0Zm88,28v36a8,8,0,0,1-16,0V140a20,20,0,0,0-40,0v36a8,8,0,0,1-16,0V112a8,8,0,0,1,15.79-1.78A36,36,0,0,1,184,140ZM100,84A12,12,0,1,1,88,72,12,12,0,0,1,100,84Z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/vasoftwarestech/',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 256 256" fill="currentColor">
        <path d="M128,80a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160ZM176,24H80A56.06,56.06,0,0,0,24,80v96a56.06,56.06,0,0,0,56,56h96a56.06,56.06,0,0,0,56-56V80A56.06,56.06,0,0,0,176,24Zm40,152a40,40,0,0,1-40,40H80a40,40,0,0,1-40-40V80A40,40,0,0,1,80,40h96a40,40,0,0,1,40,40ZM192,76a12,12,0,1,1-12-12A12,12,0,0,1,192,76Z" />
      </svg>
    ),
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/vasoftwaresTechnologyPVTLTD/',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 256 256" fill="currentColor">
        <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm8,191.63V152h24a8,8,0,0,0,0-16H136V112a16,16,0,0,1,16-16h16a8,8,0,0,0,0-16H152a32,32,0,0,0-32,32v24H96a8,8,0,0,0,0,16h24v63.63a88,88,0,1,1,16,0Z" />
      </svg>
    ),
  },
]

function StarIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="13" height="13"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
      className="ft-star"
    >
      <path d="M19.6,9.6h-3.9c-.4,0-1.8-.2-1.8-.2-.6,0-1.1-.2-1.6-.6-.5-.3-.9-.8-1.2-1.2-.3-.4-.4-.9-.5-1.4,0,0,0-1.1-.2-1.5V.4c0-.2-.2-.4-.4-.4s-.4.2-.4.4v4.4c0,.4-.2,1.5-.2,1.5,0,.5-.2,1-.5,1.4-.3.5-.7.9-1.2,1.2s-1,.5-1.6.6c0,0-1.2,0-1.7.2H.4c-.2,0-.4.2-.4.4s.2.4.4.4h4.1c.4,0,1.7.2,1.7.2.6,0,1.1.2,1.6.6.4.3.8.7,1.1,1.1.3.5.5,1,.6,1.6,0,0,0,1.3.2,1.7v4.1c0,.2.2.4.4.4s.4-.2.4-.4v-4.1c0-.4.2-1.7.2-1.7,0-.6.2-1.1.6-1.6.3-.4.7-.8,1.1-1.1.5-.3,1-.5,1.6-.6,0,0,1.3,0,1.8-.2h3.9c.2,0,.4-.2.4-.4s-.2-.4-.4-.4h0Z" />
    </svg>
  )
}

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="ft-root">

      {/* ── Three-column body ── */}
      <div className="ft-inner">

        {/* Col 1: Nav + logo wordmark + copyright */}
        <div className="ft-col ft-col--brand">
          <nav aria-label="Footer navigation">
            <ul className="ft-col__list">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="ft-link ft-link--nav">{l.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="ft-brand-bottom">
            <Link href="/" className="ft-logo">
              <Image src="https://res.cloudinary.com/dozdgvgbt/image/upload/q_auto/f_auto/v1781196202/ChatGPT_Image_Jun_8_2026_10_26_16_PM_wha67q.png" alt="" width={44} height={44} />
              <span className="ft-logo__text">Primus Software</span>
            </Link>
            <p className="ft-copyright">© {year} All rights reserved.</p>
          </div>
        </div>

        {/* Col 2: Services */}
        <div className="ft-col">
          <p className="ft-col__heading">Services</p>
          <ul className="ft-col__list">
            {SERVICES.map((s) => (
              <li key={s.href}>
                <Link href={s.href} className="ft-link">{s.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3: Contact + Social */}
        <div className="ft-col ft-col--contact">
          <p className="ft-col__heading">Contact</p>

          <div className="ft-contact-list">
            <p className="ft-contact-item">
              <StarIcon />
              <a href="mailto:contact@primusoftware.com" className="ft-link">
                contact@primusoftware.com
              </a>
            </p>
            <p className="ft-contact-item">
              <StarIcon />
              <a href="tel:+918433808081" className="ft-link">
                +91 8433808081
              </a>
            </p>
          </div>

          <div className="ft-social">
            <p className="ft-social__label">Follow us on social</p>
            <p className="ft-social__sub">We share tips, case studies &amp; product updates.</p>
            <ul className="ft-social__row">
              {SOCIALS.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="ft-social__btn"
                  >
                    {s.icon}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

      </div>

      {/* ── Large footer wordmark ── */}
      <div className="ft-wordmark-wrap" aria-hidden="true">
        <span className="ft-wordmark">Primus</span>
      </div>

    </footer>
  )
}
