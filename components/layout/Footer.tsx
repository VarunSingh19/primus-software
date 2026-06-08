import Image from 'next/image'
import Link from 'next/link'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-slate-950 border-t border-slate-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="inline-flex items-center">
              <Image src="/logo/logo.png" alt="Primus" width={140} height={40} className="h-9 w-auto" />
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed">
              Premium design-first tech studio building high-performance web apps, eCommerce solutions, and digital experiences.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-slate-100 font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/#services" className="text-slate-400 hover:text-slate-200 transition-colors">UI/UX Design</Link></li>
              <li><Link href="/#services" className="text-slate-400 hover:text-slate-200 transition-colors">Web Development</Link></li>
              <li><Link href="/#services" className="text-slate-400 hover:text-slate-200 transition-colors">eCommerce</Link></li>
              <li><Link href="/#services" className="text-slate-400 hover:text-slate-200 transition-colors">SaaS Products</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-slate-100 font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="text-slate-400 hover:text-slate-200 transition-colors">About</Link></li>
              <li><Link href="/contact" className="text-slate-400 hover:text-slate-200 transition-colors">Contact</Link></li>
              <li><Link href="/" className="text-slate-400 hover:text-slate-200 transition-colors">Careers</Link></li>
              <li><Link href="/" className="text-slate-400 hover:text-slate-200 transition-colors">Blog</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-slate-100 font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="text-slate-400 hover:text-slate-200 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/" className="text-slate-400 hover:text-slate-200 transition-colors">Terms of Service</Link></li>
              <li><Link href="/" className="text-slate-400 hover:text-slate-200 transition-colors">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-800/50 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-400 text-sm">
              © {currentYear} Primus Software. All rights reserved.
            </p>
            
            {/* Social Links */}
            <div className="flex items-center gap-4">
              <a href="/" className="text-slate-400 hover:text-slate-200 transition-colors">
                <i className="ph-bold ph-linkedin-logo text-xl"></i>
              </a>
              <a href="/" className="text-slate-400 hover:text-slate-200 transition-colors">
                <i className="ph-bold ph-github-logo text-xl"></i>
              </a>
              <a href="/" className="text-slate-400 hover:text-slate-200 transition-colors">
                <i className="ph-bold ph-twitter-logo text-xl"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
