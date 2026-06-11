/**
 * PhosphorIcons
 *
 * Loads the Phosphor icon-font stylesheets WITHOUT blocking render.
 *
 * Previously these were pulled in via `@import url('https://unpkg.com/...')`
 * at the top of globals.css. A CSS @import to a third-party origin is
 * render-blocking AND sequential, so on Slow 4G the browser couldn't paint
 * the hero headline until it finished DNS + TLS + downloading all three remote
 * files — the root cause of the ~4s LCP. None of these icons are above the
 * fold, so they have no business blocking first paint.
 *
 * This renders a tiny inline script placed at the end of <body>. It runs as
 * soon as the parser reaches it (after the hero HTML, so paint isn't blocked)
 * and appends the stylesheets dynamically — a dynamically-inserted stylesheet
 * is applied when it loads but does not block the initial render. It also runs
 * independently of the (large) app JS bundle, so the icons start downloading
 * immediately rather than waiting for hydration.
 */
const WEIGHTS = ['regular', 'bold', 'fill']
const BASE = 'https://unpkg.com/@phosphor-icons/web@2.1.1/src'

export function PhosphorIcons() {
  const js = `(function(){var w=${JSON.stringify(WEIGHTS)};for(var i=0;i<w.length;i++){var l=document.createElement('link');l.rel='stylesheet';l.href='${BASE}/'+w[i]+'/style.css';document.head.appendChild(l);}})();`
  return (
    <>
      {/* warm the connection so the deferred icon fetch resolves quickly */}
      <link rel="preconnect" href="https://unpkg.com" crossOrigin="anonymous" />
      <script dangerouslySetInnerHTML={{ __html: js }} />
    </>
  )
}
