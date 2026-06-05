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
  themeColor: '#f0ede8',
  colorScheme: 'light',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="font-sans antialiased">
        <Navbar />
        {children}
        <Footer />
        <ScrollRefresher />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
