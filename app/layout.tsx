import { Analytics }   from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Syne } from 'next/font/google'
import { baseMetadata } from '@/lib/metadata'
import { Navbar }        from '@/components/Navbar'
import { Footer }        from '@/components/Footer'
import { ScrollRefresher } from '@/components/ScrollRefresher'
import './globals.css'

const syne = Syne({
  subsets: ['latin'],
  weight: ['700', '800'],
  variable: '--font-syne',
  display: 'swap',
})

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
    <html lang="en" className={`scroll-smooth ${syne.variable}`}>
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
