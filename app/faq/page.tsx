import type { Metadata } from 'next'
import { baseMetadata, pageMetadata } from '@/lib/metadata'

export const metadata: Metadata = {
  ...baseMetadata,
  title: pageMetadata.faq.title,
  description: pageMetadata.faq.description,
}

export default function FAQPage() {
  const faqs = [
    {
      question: 'What services does Primus Software offer?',
      answer: 'We provide comprehensive design and engineering services including UI/UX design, web development, mobile apps, eCommerce, SaaS product design, cloud infrastructure, and enterprise solutions.'
    },
    {
      question: 'How long does a typical project take?',
      answer: 'Project timelines vary based on complexity and scope. Simple projects may take 4-8 weeks, while complex applications can take 3-6 months or more. We provide detailed timelines after understanding your requirements.'
    },
    {
      question: 'Do you offer ongoing support after launch?',
      answer: 'Yes, we provide maintenance, support, and feature development services after your project launches. We can discuss support packages based on your needs.'
    },
    {
      question: 'What technologies do you work with?',
      answer: 'We specialize in modern tech stacks including React, Next.js, Vue, Node.js, Python, AWS, Google Cloud, Docker, Kubernetes, and more. We choose the best tools for your specific project needs.'
    },
    {
      question: 'How do you ensure quality?',
      answer: 'We follow rigorous quality assurance processes including code reviews, automated testing, user testing, accessibility compliance (WCAG), and performance optimization.'
    },
    {
      question: 'Can you work with existing code/systems?',
      answer: 'Absolutely! We regularly work with legacy systems, conduct code audits, perform migrations, and integrate new solutions with existing infrastructure.'
    },
    {
      question: 'What is your project process?',
      answer: 'Our process includes discovery, strategy, design, development, testing, deployment, and ongoing optimization. We maintain clear communication throughout with regular updates and demos.'
    },
    {
      question: 'How do you handle project changes?',
      answer: 'We use agile methodologies allowing for flexibility. Changes can be incorporated, and we adjust timelines and scope accordingly with transparent communication about impacts.'
    }
  ]

  return (
    <main id="mxd-page-content" className="mxd-page-content inner-page-content">
        <div className="mxd-section mxd-section-inner-headline overflow-hidden">
          <div className="col-12 col-xl-8">
            <h1 className="inner-headline__title">Frequently Asked Questions</h1>
            <p className="inner-headline__text t-large t-bright">Have questions? We&apos;ve compiled answers to our most common inquiries. Can&apos;t find what you need? <a href="/contact">Contact us</a>.</p>
          </div>
        </div>

        <div className="mxd-section va-process-section">
          <div className="mxd-container grid-container">
            <div className="mxd-block">
              <div className="faq-accordion">
                {faqs.map((faq, index) => (
                  <details key={index} className="faq-item anim-uni-in-up">
                    <summary className="faq-question">{faq.question}</summary>
                    <p className="faq-answer">{faq.answer}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
  )
}
