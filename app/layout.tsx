import { Analytics }   from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { baseMetadata } from '@/lib/metadata'
import { Navbar }        from '@/components/Navbar'
import { Footer }        from '@/components/Footer'
import { ScrollRefresher } from '@/components/ScrollRefresher'
import './globals.css'

export const metadata: Metadata = baseMetadata

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#0f172a',
  colorScheme: 'dark',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth dark">
      <body className="font-sans antialiased bg-slate-950 text-slate-50">
        <Navbar />
        {children}
        <Footer />
        <ScrollRefresher />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
