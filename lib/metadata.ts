import type { Metadata } from "next";

export const baseMetadata: Metadata = {
  metadataBase: new URL("https://primusoftware.com"),
  title: {
    default: "Primus Software | Premium Design-First Tech Studio",
    template: "%s | Primus Software",
  },
  description:
    "Primus Software is a design and engineering studio delivering high-performance websites, mobile apps, eCommerce, SaaS products, and brand identities—fast, accessible, and built to scale.",
  keywords: [
    "Primus Software",
    "design-first tech studio",
    "web development",
    "UI/UX",
    "eCommerce",
    "SaaS",
    "brand identity",
    "digital agency",
    "portals",
    "ERP",
    "CRM",
    "SEO",
  ],
  authors: [{ name: "Primus Software", url: "https://primusoftware.com" }],
  creator: "Primus Software",
  publisher: "Primus Software",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://primusoftware.com",
    siteName: "Primus Software",
    // title / description intentionally omitted — Next.js falls back to each
    // page's own `title` / `description`, so shared links show page-specific text.
    // images is referenced explicitly because nested pages spread this object,
    // which otherwise blocks Next's auto-merge of the root opengraph-image route.
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Primus Software — Premium Design-First Tech Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/opengraph-image"],
  },
};

export const pageMetadata = {
  home: {
    description:
      "Design that moves. Code that scales. Products that win. Premium UI/UX & product engineering for ambitious brands.",
  },
  about: {
    title: "About",
    description:
      "Meet Primus Software. We've been building remarkable digital experiences since 2022. Learn about our mission, values, and team.",
  },
  contact: {
    title: "Contact",
    description:
      "Let's talk about your project. Get in touch with Primus Software and let's build something extraordinary together.",
  },
  uiux: {
    title: "UI/UX Design",
    description:
      "Beautiful, intuitive user interfaces and seamless experiences. We design interfaces that users love and businesses trust.",
  },
  webapps: {
    title: "Websites & Web Apps",
    description:
      "Custom websites and web applications built with modern technologies. Fast, secure, and scalable solutions for your business.",
  },
  ecommerce: {
    title: "eCommerce",
    description:
      "High-converting eCommerce platforms that drive sales. From design to deployment, we handle every detail.",
  },
  brand: {
    title: "Brand Identity",
    description:
      "Complete brand identity solutions. Logos, guidelines, and visual systems that make your brand unforgettable.",
  },
  mobile: {
    title: "Mobile Apps",
    description:
      "Native iOS and Android apps. We build mobile experiences that users keep coming back to.",
  },
  saas: {
    title: "SaaS Product Design",
    description:
      "SaaS platforms designed for growth. User-centric design that drives adoption and retention.",
  },
  performance: {
    title: "SEO & Performance",
    description:
      "Technical optimization and SEO that work. We ensure your site loads fast and ranks well.",
  },
  cloud: {
    title: "Cloud & DevOps",
    description:
      "Scalable infrastructure and deployment pipelines. Cloud solutions that grow with your business.",
  },
  erp: {
    title: "ERP/CRM & Portals",
    description:
      "Enterprise solutions that streamline operations. Custom portals, dashboards, and integrations.",
  },
  faq: {
    title: "FAQ",
    description:
      "Frequently asked questions about Primus Software, our services, and how we work.",
  },
};
