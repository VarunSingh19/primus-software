import { ImageResponse } from 'next/og'
import { readFileSync } from 'fs'
import { join } from 'path'

export const alt = 'Primus Software — Premium Design-First Tech Studio'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpengraphImage() {
  const logo = readFileSync(join(process.cwd(), 'public', 'logo', 'logo.png')).toString('base64')

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px',
          background: '#0e0e0e',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`data:image/png;base64,${logo}`} width={64} height={64} alt="" />

        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div style={{ display: 'flex', fontSize: 64, fontWeight: 800, color: '#ffffff' }}>
            Design that moves. Code that scales.
          </div>
          <div style={{ display: 'flex', fontSize: 26, color: 'rgba(255,255,255,0.55)' }}>
            Premium UI/UX and product engineering — primusoftware.com
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
