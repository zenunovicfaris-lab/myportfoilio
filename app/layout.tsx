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
  // ... tvoj metadata ostaje ISTI
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
