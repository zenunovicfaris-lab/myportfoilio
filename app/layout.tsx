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
    default: "Faris Zenunović | SEO Specialist & Growth Partner", // 58 chars
    template: "%s | Faris Zenunović",
  },
  description: "Multilingual SEO specialist with 4+ years experience in technical SEO, content optimization & organic growth. React/Next.js developer. Let's scale your traffic.", // 149 chars
  keywords: [
    "SEO specialist",
    "technical SEO",
    "content optimization",
    "organic growth",
    "React developer",
    "Next.js developer",
    "multilingual SEO",
    "web development",
    "Faris Zenunović",
    "Živinice",
    "Bosnia and Herzegovina",
    "Faris Zenunovic",
    "Content Writer",
    "Content Editor"
  ],
  authors: [{ name: "Faris Zenunović" }],
  creator: "Faris Zenunović",
  openGraph: {
    title: "Faris Zenunović - SEO & Web Development",
    description: "Technical SEO, content strategy, Next.js/React development",
    images: ["/og-image.jpg"],
    type: "website",
    locale: "en_US",
    siteName: "Faris Zenunović",
  },
  twitter: {
    card: "summary_large_image",
    title: "Faris Zenunović - SEO & Web Development",
    description: "Technical SEO, content strategy, Next.js/React development",
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
  // ... tvoj jsonLd ostaje ISTI
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script
          id="json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          strategy="beforeInteractive"
        />
      </head>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} min-h-screen text-[#e5e7eb] bg-[#0f1117] antialiased`}
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
