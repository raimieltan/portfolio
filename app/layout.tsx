import type { Metadata, Viewport } from "next";
import { Fraunces, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import {
  SITE_URL,
  SITE_NAME,
  SITE_TITLE,
  SITE_DESCRIPTION,
  SITE_KEYWORDS,
  OG_IMAGE_ALT,
} from "@/lib/site";
import { profile } from "@/lib/data";

const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  axes: ["SOFT", "WONK", "opsz"],
});

const sans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s — Sean Raimiel Tan",
  },
  description: SITE_DESCRIPTION,
  keywords: SITE_KEYWORDS,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  applicationName: SITE_NAME,
  category: "technology",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "profile",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: OG_IMAGE_ALT,
      },
    ],
    firstName: "Sean Raimiel",
    lastName: "Tan",
    username: "raimieltan",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0908",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  givenName: "Sean Raimiel",
  familyName: "Tan",
  url: SITE_URL,
  email: `mailto:${profile.email}`,
  telephone: profile.phone,
  image: `${SITE_URL}/opengraph-image`,
  jobTitle: profile.title,
  description: profile.summary,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Iloilo",
    addressRegion: "Western Visayas",
    addressCountry: "PH",
  },
  sameAs: [
    profile.github,
    profile.linkedin,
    profile.youtube,
    profile.devto,
    profile.instagram,
  ],
  knowsAbout: [
    "Backend Engineering",
    "Full-Stack Development",
    "NestJS",
    "Prisma",
    "PostgreSQL",
    "Next.js",
    "React Native",
    "TypeScript",
    "Node.js",
    "Azure AI Search",
    "Retrieval-Augmented Generation",
    "LLM integration",
    "SaaS Architecture",
    "Docker",
    "AWS",
  ],
  alumniOf: [
    {
      "@type": "CollegeOrUniversity",
      name: "Central Philippine University",
    },
  ],
  hasOccupation: {
    "@type": "Occupation",
    name: "Senior Full-Stack Software Engineer",
    skills:
      "NestJS, Prisma, PostgreSQL, Next.js, React Native, TypeScript, Azure, RAG, LLM integration",
  },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
  inLanguage: "en-US",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} ${mono.variable}`}
    >
      <body className="grain relative min-h-screen bg-ink text-paper">
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:bg-signal focus:text-ink focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:tracking-widest2 focus:uppercase"
        >
          Skip to content
        </a>
        {children}
        <Analytics />
        <SpeedInsights />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </body>
    </html>
  );
}
