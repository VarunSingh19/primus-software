import type { Metadata } from 'next'
import { ServiceHero } from '@/components/service/ServiceHero'
import { ServiceAbout } from '@/components/service/ServiceAbout'
import { ServiceDeliverables } from '@/components/service/ServiceDeliverables'
import { ServiceProcess } from '@/components/service/ServiceProcess'
import { ServiceCTA } from '@/components/service/ServiceCTA'
import { CloudDevOpsHero3D } from '@/components/service/hero3d/CloudDevOpsHero3D'
import type { ServicePageData } from '@/components/service/types'
import { baseMetadata } from '@/lib/metadata'

export const metadata: Metadata = { ...baseMetadata, title: 'Cloud, DevOps & Hosting', description: 'Cloud infrastructure, CI/CD pipelines, and DevOps that keep your product fast, reliable, and secure.' }


const DATA: ServicePageData = {
  hero: {
    eyebrow: 'Cloud / DevOps & Hosting - Mumbai, India',
    headlineLines: ['Cloud & DevOps', 'for production-grade apps'],
    tagline: 'that scale without drama',
    description: 'Cloud infrastructure, CI/CD pipelines, and DevOps practices that keep your product running fast, reliably, and securely at any scale.',
    col1: ['AWS / GCP / Azure setup', 'Vercel & Netlify deployments', 'Docker & Kubernetes', 'CI/CD pipeline setup', 'Database provisioning', 'Infrastructure as Code'],
    col2: ['Zero-downtime deployments', 'SSL & security hardening', 'Auto-scaling configuration', 'Monitoring & alerting', 'Backup & disaster recovery', 'Cost optimisation'],
    marqueeItems: ['aws', 'gcp', 'docker', 'kubernetes', 'ci/cd', 'vercel', 'devops', 'infrastructure'],
    hero3D: <CloudDevOpsHero3D />,
    accent: '#f59e0b',
  },
  about: {
    heading: 'Our DevOps approach',
    paragraph: 'We engineer infrastructure that your product can grow into - reliable, observable, and cost-efficient from day one. No over-engineering, no surprises at 3am.',
    col1: ['Infrastructure as Code (IaC)', 'Zero-downtime deployment strategy', 'Observability from day one', 'Security-first cloud config', 'Auto-scaling & cost controls', 'Documented runbooks'],
    col2: ['AWS / GCP / Azure provisioning', 'Docker & Kubernetes orchestration', 'CI/CD pipelines (GitHub Actions)', 'Monitoring & alerting (Datadog)', 'Backup & disaster recovery', 'Database & CDN optimisation'],
  },
  deliverables: [
    { title: 'Cloud Infrastructure', desc: 'AWS, GCP, or Azure environments configured for your scale, region, and budget - built to last.', tags: ['AWS', 'GCP', 'Azure', 'IaC', 'Terraform'], variant: 'dark', span: 7 },
    { title: 'CI/CD Pipelines', desc: 'Automated build, test, and deploy workflows - ship with confidence, every single time.', tags: ['GitHub Actions', 'CI/CD', 'Automation', 'Testing'], variant: 'indigo', span: 5 },
    { title: 'Containerisation', desc: 'Docker and Kubernetes for portable, scalable, environment-consistent deployments everywhere.', tags: ['Docker', 'Kubernetes', 'Helm', 'Containers'], variant: 'tint', span: 12 },
    { title: 'Monitoring & Alerting', desc: 'Datadog, Grafana, or CloudWatch dashboards and incident alerting so you know before users do.', tags: ['Datadog', 'Grafana', 'Alerts', 'Observability'], variant: 'dark', span: 5 },
    { title: 'Cost Optimisation', desc: 'Right-sizing, reserved instances, and spend alerts to keep your cloud bill predictable and lean.', tags: ['Cost', 'Right-sizing', 'Reserved', 'Savings'], variant: 'indigo', span: 7 },
  ],
  process: {
    heading: `Our DevOps
process`,
    steps: [
      { label: 'Audit - current infra review', tags: ['Architecture review', 'Security assessment', 'Cost analysis'], duration: 'Typical: 1 week' },
      { label: 'Plan - infrastructure design', tags: ['Cloud architecture', 'CI/CD design', 'Security model'], duration: 'Typical: 1 week' },
      { label: 'Build - provision & automate', tags: ['IaC setup', 'Pipeline build', 'Monitoring config'], duration: 'Typical: 2-4 weeks' },
      { label: 'Operate - monitoring & optimisation', tags: ['Alerting', 'Cost reporting', 'Runbook documentation'], duration: 'Ongoing' },
    ],
  },
}

export default function CloudDevOpsPage() {
  return (
    <main className="sp-page">
      <ServiceHero data={DATA.hero} />
      <ServiceAbout data={DATA.about} />
      <ServiceDeliverables cards={DATA.deliverables} />
      <ServiceProcess data={DATA.process} />
      <ServiceCTA service="cloud & DevOps" />
    </main>
  )
}
