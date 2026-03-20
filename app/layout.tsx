import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Script from "next/script";

import Sidebar from "./components/Sidebar";
import MobileNav from "./components/MobileNav";
import ClickSoundProvider from "./components/ClickSoundProvider"; // ← DODANO

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space" });

export const metadata: Metadata = {
  metadataBase: new URL("https://fariszenunovic.com"),
  title: {
    default: "Faris Zenunović | Freelance SEO Specialist - BiH",
    template: "%s | Faris Zenunović",
  },
  description: "Faris Zenunović - Freelance SEO Specialist from Bosnia. Technical SEO, content optimization & multilingual organic growth.",
  keywords: [
    "SEO specialist",
    "technical SEO",
    "content optimization",
    "organic growth",
    "multilingual SEO",
    "freelance SEO",
    "Faris Zenunović",
    "Faris Zenunovic",
    "Živinice",
    "Bosnia and Herzegovina",
    "Content Writer",
    "Content Editor"
  ],
  authors: [{ name: "Faris Zenunović" }],
  creator: "Faris Zenunović",
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
  openGraph: {
    title: "Faris Zenunović - Freelance SEO Specialist from BiH",
    description: "Faris Zenunović - Freelance SEO Specialist from Bosnia. Technical SEO, content optimization & multilingual organic growth.",
    images: ["/og-image.jpg"],
    type: "website",
    locale: "en_US",
    siteName: "Faris Zenunović",
  },
  twitter: {
    card: "summary_large_image",
    title: "Faris Zenunović - Freelance SEO Specialist from BiH",
    description: "Faris Zenunović - Freelance SEO Specialist from Bosnia. Technical SEO, content optimization & multilingual organic growth.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Faris Zenunović",
  "alternateName": "Faris Zenunovic",
  "url": "https://fariszenunovic.com",
  "image": "https://fariszenunovic.com/images/faris-about-me.jpg",
  "jobTitle": "Freelance SEO Specialist",
  "description": "Freelance SEO Specialist from Živinice, Bosnia and Herzegovina. Technical SEO, content optimization & multilingual organic growth.",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Živinice",
    "addressCountry": "BA"
  },
  "email": "zenunovicfaris@gmail.com",
  "telephone": "+387603055894",
  "sameAs": [
    "https://linkedin.com/in/fariszenunovic",
    "https://github.com/zenunovicfaris-lab"
  ],
  "knowsAbout": [
    "SEO", "Technical SEO", "Content Optimization",
    "Next.js", "React", "WordPress", "Web Development"
  ],
  "worksFor": {
    "@type": "Organization",
    "name": "Freelance"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon.ico" />
        <Script
          id="json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          strategy="beforeInteractive"
        />
      </head>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} min-h-screen text-[#e5e7eb] bg-[#0f1117] antialiased`}
        suppressHydrationWarning
      >
        <MobileNav />
        <div className="min-h-screen flex">
          <div className="hidden lg:block w-72 shrink-0">
            <Sidebar />
          </div>
          <main className="flex-1 min-w-0 pt-16 lg:pt-0">
            {children}
          </main>
        </div>
        <ClickSoundProvider /> {/* ← SAMO OVO DODAJ NA KRAJU */}
      </body>
    </html>
  );
}
