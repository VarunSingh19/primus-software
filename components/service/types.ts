import type { ReactNode } from 'react'

export interface ServiceHeroData {
  eyebrow:       string
  headlineLines: string[]
  tagline:       string
  description:   string
  col1:          string[]
  col2:          string[]
  marqueeItems:  string[]
  accent?:       string
  /** Optional custom 3D element that replaces the default blob in the sh08 section */
  hero3D?:       ReactNode
}

export interface ServiceAboutData {
  heading:    string        // plain text — chars animated on scroll
  paragraph:  string
  col1:       string[]
  col2:       string[]
  /** If provided, renders a card grid instead of the bullet list */
  principles?: { icon: string; title: string; desc: string }[]
}

export interface DeliverableCard {
  title:   string
  desc:    string
  tags:    string[]
  variant: 'dark' | 'indigo' | 'tint' | 'accent'
  span?:   7 | 5 | 12
  col1?:   { heading: string; items: string[] }
  col2?:   { heading: string; items: string[] }
}

export interface ProcessStep {
  label:    string
  tags:     string[]
  duration: string
}

export interface ServiceProcessData {
  heading: string            // newline = line break in the heading
  steps:   ProcessStep[]
}

export interface ServicePageData {
  hero:         ServiceHeroData
  about:        ServiceAboutData
  deliverables: DeliverableCard[]
  process:      ServiceProcessData
}
