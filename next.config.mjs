/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },

  // NOTE: Next already minifies JS (SWC) and CSS on every production `next build`
  // (verified: globals CSS ships ~192KB minified / ~35KB gzipped). Minification
  // is automatic in prod — it just doesn't run in `next dev`.
  //
  // `experimental.optimizeCss` (critical-CSS inlining via beasties) was tested
  // and is a no-op in Next 16's App Router — React 19 hoists stylesheets with
  // `data-precedence`, which beasties can't post-process — so it's intentionally
  // NOT enabled here.
  compiler: {
    // Strip console.* from the production JS bundle (keep errors/warnings).
    removeConsole:
      process.env.NODE_ENV === 'production'
        ? { exclude: ['error', 'warn'] }
        : false,
  },
}

export default nextConfig
