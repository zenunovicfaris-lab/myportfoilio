import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import Script from "next/script";
import "../globals.css";

import { routing, type Locale } from "../../i18n/routing";
import Sidebar from "../components/Sidebar";
import MobileNav from "../components/MobileNav";
import ClientOnly from "../components/ClientOnly";
import ClickSoundProvider from "../components/ClickSoundProvider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space" });

// Pre-generate /en and /bs at build time
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });

  const ogLocale = locale === "bs" ? "bs_BA" : "en_US";
  const url = `https://fariszenunovic.com/${locale}`;

  return {
    metadataBase: new URL("https://fariszenunovic.com"),
    title: {
      default: t("title"),
      template: "%s | Faris Zenunović",
    },
    description: t("description"),
    keywords:
      locale === "bs"
        ? ["seo usluge", "seo optimizacija", "seo za sajt", "seo specialist bosna", "seo bih", "seo usluge bih", "optimizacija sajta", "Faris Zenunović", "Bosna i Hercegovina"]
        : ["SEO specialist", "technical SEO", "content optimization", "organic growth", "multilingual SEO", "freelance SEO", "Faris Zenunović", "Živinice", "Bosnia"],
    authors: [{ name: "Faris Zenunović" }],
    creator: "Faris Zenunović",
    icons: {
      icon: "/favicon.ico",
      shortcut: "/favicon.ico",
      apple: "/favicon.ico",
    },
    // hreflang alternate links
    alternates: {
      canonical: url,
      languages: {
        en: "https://fariszenunovic.com/en",
        bs: "https://fariszenunovic.com/bs",
        "x-default": "https://fariszenunovic.com/en",
      },
    },
    openGraph: {
      title: t("ogTitle"),
      description: t("description"),
      images: ["/og-image.jpg"],
      type: "website",
      locale: ogLocale,
      siteName: "Faris Zenunović",
      url,
    },
    twitter: {
      card: "summary_large_image",
      title: t("ogTitle"),
      description: t("description"),
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
  };
}

function buildJsonLd(locale: Locale) {
  const isBS = locale === "bs";
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Faris Zenunović",
    alternateName: "Faris Zenunovic",
    url: `https://fariszenunovic.com/${locale}`,
    image: "https://fariszenunovic.com/images/faris-about-me.jpg",
    jobTitle: "Freelance SEO Specialist",
    description: isBS
      ? "Freelance SEO Specialist iz Bosne i Hercegovine. Tehničke SEO usluge, optimizacija sadržaja i organski rast."
      : "Freelance SEO Specialist from Živinice, Bosnia and Herzegovina. Technical SEO, content optimization & multilingual organic growth.",
    address: {
      "@type": "PostalAddress",
      addressLocality: isBS ? "Bosna i Hercegovina" : "Živinice",
      addressCountry: "BA",
    },
    email: "zenunovicfaris@gmail.com",
    telephone: "+387603055894",
    sameAs: [
      "https://linkedin.com/in/fariszenunovic",
      "https://github.com/zenunovicfaris-lab",
    ],
    knowsAbout: ["SEO", "Technical SEO", "Content Optimization", "Next.js", "React", "WordPress"],
    worksFor: { "@type": "Organization", name: "ZT Media" },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Enable static rendering for this locale
  setRequestLocale(locale);

  // Load messages for NextIntlClientProvider
  const messages = await getMessages();

  const jsonLd = buildJsonLd(locale as Locale);

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/favicon.ico" />
        {/* hreflang — also declared in metadata.alternates but some crawlers prefer <link> */}
        <link rel="alternate" hrefLang="en" href="https://fariszenunovic.com/en" />
        <link rel="alternate" hrefLang="bs" href="https://fariszenunovic.com/bs" />
        <link rel="alternate" hrefLang="x-default" href="https://fariszenunovic.com/en" />
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
        <NextIntlClientProvider messages={messages}>
          <ClientOnly fallback={<div className="lg:hidden fixed top-0 left-0 right-0 h-16 z-50 bg-[#0d0f16]/80 border-b border-white/8" aria-hidden="true" />}>
            <MobileNav />
          </ClientOnly>

          <div className="min-h-screen flex">
            <ClientOnly fallback={<div className="hidden lg:block w-72 shrink-0" aria-hidden="true" />}>
              <div className="hidden lg:block w-72 shrink-0">
                <Sidebar />
              </div>
            </ClientOnly>
            <main className="flex-1 min-w-0 pt-16 lg:pt-0">
              {children}
            </main>
          </div>

          <ClickSoundProvider />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
