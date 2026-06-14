import type { Metadata } from 'next'
import { baseMetadata, pageMetadata } from '@/lib/metadata'

export const metadata: Metadata = {
  ...baseMetadata,
  title: pageMetadata.about.title,
  description: pageMetadata.about.description,
}

export default function AboutPage() {
  return (
    <main id="mxd-page-content" className="mxd-page-content inner-page-content">

      {/* ABOUT HERO */}
      <div className="mxd-section mxd-section-inner-headline overflow-hidden">
        <div className="mxd-container grid-container">
          <div className="mxd-block loading-wrap">
            <div className="container-fluid px-0">
              <div className="row gx-0">
                <div className="col-12 col-xl-2 mxd-grid-item no-margin">
                  <div className="mxd-block__name name-inner-headline">
                    <p className="mxd-point-subtitle">
                      <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20px" height="20px" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fill="currentColor" d="M19.6,9.6c0,0-3,0-4,0c-0.4,0-1.8-0.2-1.8-0.2c-0.6-0.1-1.1-0.2-1.6-0.6c-0.5-0.3-0.9-0.8-1.2-1.2c-0.3-0.4-0.4-0.9-0.5-1.4c0,0-0.1-1.1-0.2-1.5c-0.1-1.1,0-4.4,0-4.4C10.4,0.2,10.2,0,10,0S9.6,0.2,9.6,0.4c0,0,0.1,3.3,0,4.4c0,0.4-0.2,1.5-0.2,1.5C9.4,6.7,9.2,7.2,9,7.6C8.7,8.1,8.2,8.5,7.8,8.9c-0.5,0.3-1,0.5-1.6,0.6c0,0-1.2,0.1-1.7,0.2c-1,0.1-4.2,0-4.2,0C0.2,9.6,0,9.8,0,10c0,0.2,0.2,0.4,0.4,0.4c0,0,3.1-0.1,4.2,0c0.4,0,1.7,0.2,1.7,0.2c0.6,0.1,1.1,0.2,1.6,0.6c0.4,0.3,0.8,0.7,1.1,1.1c0.3,0.5,0.5,1,0.6,1.6c0,0,0.1,1.3,0.2,1.7c0,1,0,4.1,0,4.1c0,0.2,0.2,0.4,0.4,0.4s0.4-0.2,0.4-0.4c0,0,0-3.1,0-4.1c0-0.4,0.2-1.7,0.2-1.7c0.1-0.6,0.2-1.1,0.6-1.6c0.3-0.4,0.7-0.8,1.1-1.1c0.5-0.3,1-0.5,1.6-0.6c0,0,1.3-0.1,1.8-0.2c1,0,4,0,4,0c0.2,0,0.4-0.2,0.4-0.4C20,9.8,19.8,9.6,19.6,9.6L19.6,9.6z"></path>
                      </svg>
                      <span>About</span>
                    </p>
                  </div>
                </div>

                <div className="col-12 col-xl-8 mxd-grid-item no-margin">
                  <div className="mxd-block__content">
                    <div className="mxd-block__inner-headline loading__item">
                      <h1 className="inner-headline__title">
                        Building remarkable<br />digital experiences<br />since 2022
                      </h1>
                      <p className="inner-headline__text t-large t-bright loading__item">
                        Primus Software is a design-first engineering studio dedicated to creating unforgettable digital products that solve real problems and drive measurable business outcomes. We combine strategic thinking, contemporary design, and technical excellence.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* STATS SECTION */}
      <div className="mxd-section va-stats-section">
        <div className="va-stats-grid">
          <div className="va-stat-card tilt-card anim-uni-in-up">
            <div className="va-stat-number">50+</div>
            <div className="va-stat-label">Projects Delivered</div>
          </div>
          <div className="va-stat-card tilt-card anim-uni-in-up">
            <div className="va-stat-number">100%</div>
            <div className="va-stat-label">Client Retention</div>
          </div>
          <div className="va-stat-card tilt-card anim-uni-in-up">
            <div className="va-stat-number">8+</div>
            <div className="va-stat-label">Years of Excellence</div>
          </div>
          <div className="va-stat-card tilt-card anim-uni-in-up">
            <div className="va-stat-number">12</div>
            <div className="va-stat-label">Industries Served</div>
          </div>
        </div>
      </div>

      {/* VALUES SECTION */}
      <div className="mxd-section va-process-section">
        <div className="mxd-container grid-container">
          <div className="mxd-block">
            <div className="mxd-section-title">
              <div className="mxd-section-title__title anim-uni-in-up">
                <h2 className="reveal-type">Our Values</h2>
              </div>
            </div>
          </div>
        </div>
        <div className="va-process-grid">
          <div className="va-process-step anim-uni-in-up">
            <h4>Innovation</h4>
            <p>We stay ahead of industry trends and constantly explore emerging technologies to deliver cutting-edge solutions that give our clients competitive advantages.</p>
          </div>
          <div className="va-process-step anim-uni-in-up">
            <h4>Quality</h4>
            <p>Excellence is not an act, it&apos;s a habit. We obsess over every pixel, every line of code, and every interaction to ensure exceptional quality.</p>
          </div>
          <div className="va-process-step anim-uni-in-up">
            <h4>Partnership</h4>
            <p>Your success is our success. We work collaboratively with you, transparent at every step, treating your business as our own.</p>
          </div>
          <div className="va-process-step anim-uni-in-up">
            <h4>Impact</h4>
            <p>We measure success by the real-world results we deliver—whether it&apos;s improved user engagement, higher conversions, or operational efficiency.</p>
          </div>
        </div>
      </div>

    </main>
  )
}
