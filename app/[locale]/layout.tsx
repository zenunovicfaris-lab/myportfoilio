import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import "../globals.css";

import { routing, type Locale } from "../../i18n/routing";
import {
  SITE,
  PERSON_ID,
  PERSON_URL,
  ORGANIZATION,
  SAME_AS,
  KNOWS_ABOUT,
  EMAIL,
  TELEPHONE,
  IMAGE_WIDE,
  IMAGE_PORTRAIT,
  imageObject,
} from "../../lib/entity";
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
  const url = `${SITE}/${locale}`;

  return {
    metadataBase: new URL(SITE),
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
        en: `${SITE}/en`,
        bs: `${SITE}/bs`,
        "x-default": `${SITE}/en`,
      },
    },
    openGraph: {
      title: t("ogTitle"),
      description: t("description"),
      images: [
        {
          url: `${SITE}/${locale}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: "Faris Zenunović | SEO Specialist - Technical SEO, Content & Web Development",
        },
      ],
      type: "website",
      locale: ogLocale,
      siteName: "Faris Zenunović",
      url,
    },
    twitter: {
      card: "summary_large_image",
      title: t("ogTitle"),
      description: t("description"),
      images: [`${SITE}/${locale}/opengraph-image`],
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
    "@id": PERSON_ID,
    name: "Faris Zenunović",
    alternateName: ["Faris Zenunovic", "Zenunović Faris"],
    url: PERSON_URL,
    // Points Google at /o-meni as the authoritative page describing this person.
    mainEntityOfPage: `${SITE}/${locale}/o-meni`,
    // Wide image first — it is the one eligible for Discover and large previews.
    image: [
      imageObject(IMAGE_WIDE, "Faris Zenunović, SEO Specialist"),
      imageObject(IMAGE_PORTRAIT, "Faris Zenunović, SEO Specialist"),
    ],
    jobTitle: "SEO Specialist",
    description: isBS
      ? "Freelance SEO Specialist iz Bosne i Hercegovine. Tehničke SEO usluge, optimizacija sadržaja i organski rast."
      : "Freelance SEO Specialist from Živinice, Bosnia and Herzegovina. Technical SEO, content optimization & multilingual organic growth.",
    nationality: { "@type": "Country", name: "Bosnia and Herzegovina" },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Živinice",
      addressCountry: "BA",
    },
    email: EMAIL,
    telephone: TELEPHONE,
    sameAs: SAME_AS,
    knowsAbout: KNOWS_ABOUT,
    worksFor: ORGANIZATION,
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
        <link rel="alternate" hrefLang="en" href={`${SITE}/en`} />
        <link rel="alternate" hrefLang="bs" href={`${SITE}/bs`} />
        <link rel="alternate" hrefLang="x-default" href={`${SITE}/en`} />
        {/* Plain <script>, not next/script — next/script injects client-side, which
            left this JSON-LD out of the server-rendered HTML entirely. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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
