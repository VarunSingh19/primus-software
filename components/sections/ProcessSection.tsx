'use client'

const STEPS = [
  {
    title: 'Discover & Define',
    body: 'Deep-dive into your goals, users, and constraints. We map the opportunity space before touching a single pixel.',
  },
  {
    title: 'Design & Validate',
    body: 'Interactive prototypes tested with real users. We iterate fast so you ship the right thing, not just any thing.',
  },
  {
    title: 'Engineer & Ship',
    body: 'Type-safe code, CI/CD pipelines, and performance budgets. Production-ready on day one — not day ninety.',
  },
  {
    title: 'Measure & Evolve',
    body: "Analytics, monitoring, and continuous improvement. We don't disappear after launch — we help you compound growth.",
  },
]

export function ProcessSection() {
  return (
    <div className="mxd-section va-process-section">
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 2.5rem 3rem' }}>
        <p style={{ fontSize: '0.72rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#666', marginBottom: '0.75rem' }}>
          Methodology
        </p>
        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 800, letterSpacing: '-0.04em', color: '#fff', margin: 0 }}>
          How we build
        </h2>
      </div>
      <div className="va-process-grid">
        {STEPS.map((step, i) => (
          <div key={i} className="va-process-step">
            <h4>{step.title}</h4>
            <p>{step.body}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
