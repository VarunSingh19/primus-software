import type { Metadata } from 'next'
import { ServiceHero }        from '@/components/service/ServiceHero'
import { ServiceAbout }       from '@/components/service/ServiceAbout'
import { ServiceDeliverables } from '@/components/service/ServiceDeliverables'
import { ServiceProcess }     from '@/components/service/ServiceProcess'
import { ServiceCTA }         from '@/components/service/ServiceCTA'
import type { ServicePageData } from '@/components/service/types'
import { baseMetadata }       from '@/lib/metadata'

export const metadata: Metadata = { ...baseMetadata, title: 'Mobile App Development | Primus Software', description: 'Native iOS & Android and cross-platform mobile apps - performant, polished, and production-ready.' }

const DATA: ServicePageData = {
  hero: {
    eyebrow: 'Mobile Apps - Mumbai, India',
    headlineLines: ['Mobile apps for', 'iOS & Android'],
    tagline: 'users actually love',
    description: 'Native and cross-platform mobile apps that users love. Performant, polished, and built to retain.',
    col1: ['iOS app development', 'Android app development', 'React Native cross-platform', 'Flutter development', 'App store submission', 'Push notifications'],
    col2: ['UI/UX for mobile', 'Offline-first architecture', 'REST/GraphQL integration', 'Authentication & security', 'Analytics & crash reporting', 'App maintenance & updates'],
    marqueeItems: ['ios', 'android', 'react native', 'flutter', 'mobile', 'apps', 'push', 'offline'],
    accent: '#10b981',
  },
  about: {
    heading: 'Our mobile app approach',
    paragraph: 'We build mobile apps that users actually want to use - fast, intuitive, and reliable on every device. Native performance where it matters, cross-platform efficiency where it makes sense.',
    col1: ['Native performance, cross-platform reach', 'Offline-first data architecture', 'Secure auth & biometrics', 'App store guidelines compliance', 'Crash reporting & telemetry', 'Iterative release cycles'],
    col2: ['iOS & Android native builds', 'React Native / Flutter cross-platform', 'REST/GraphQL API integration', 'Push notification systems', 'Analytics & funnel tracking', 'Ongoing support & updates'],
  },
  deliverables: [
    { title: 'iOS Development', desc: 'Native Swift apps optimised for the Apple ecosystem, App Store guidelines, and premium UX.', tags: ['Swift','SwiftUI','App Store','Apple HIG'], variant: 'dark', span: 7 },
    { title: 'Android Development', desc: 'Native Kotlin apps tuned for performance across the full Android device landscape.', tags: ['Kotlin','Jetpack Compose','Play Store','Material'], variant: 'indigo', span: 5 },
    { title: 'Cross-Platform (React Native)', desc: 'Single codebase, native performance on both iOS and Android - ship faster without compromise.', tags: ['React Native','Flutter','Expo','Cross-Platform'], variant: 'tint', span: 12 },
    { title: 'App UI/UX Design', desc: 'Mobile-first design systems with thumb-friendly navigation and delightful micro-interactions.', tags: ['Mobile UX','Touch Design','Accessibility','Motion'], variant: 'dark', span: 5 },
    { title: 'App Store Submission', desc: 'End-to-end App Store and Play Store submission, review management, and launch support.', tags: ['App Store','Play Store','ASO','Metadata'], variant: 'indigo', span: 7 },
  ],
  process: {
    heading: `Our mobile
dev process`,
    steps: [
      { label: 'Discovery - scope & architecture', tags: ['Platform strategy', 'Tech stack choice', 'Feature mapping'], duration: 'Typical: 1 week' },
      { label: 'Design - UX & UI', tags: ['User flows', 'Mobile UI design', 'Interactive prototype'], duration: 'Typical: 2-3 weeks' },
      { label: 'Build - development & testing', tags: ['Sprint-based build', 'API integration', 'QA & device testing'], duration: 'Typical: 6-12 weeks' },
      { label: 'Launch - store submission', tags: ['Store assets', 'Submission', 'Crash monitoring setup'], duration: 'Typical: 1 week' },
    ],
  },
}

export default function MobileAppsPage() {
  return (
    <main className="sp-page">
      <ServiceHero         data={DATA.hero}         />
      <ServiceAbout        data={DATA.about}        />
      <ServiceDeliverables cards={DATA.deliverables}/>
      <ServiceProcess      data={DATA.process}      />
      <ServiceCTA          service="mobile app"        />
    </main>
  )
}
