import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";

import { routing } from "../../../i18n/routing";
import {
  SITE,
  PERSON_ID,
  ORGANIZATION,
  ORG_URL,
  SAME_AS,
  KNOWS_ABOUT,
  EMAIL,
  TELEPHONE,
  IMAGE_WIDE,
  IMAGE_PORTRAIT,
  imageObject,
} from "../../../lib/entity";

type Props = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "oMeni" });
  const isBS = locale === "bs";
  const url = `${SITE}/${locale}/o-meni`;

  return {
    title: isBS
      ? "Ko je Faris Zenunović? | SEO Specialist iz Živinica, BiH"
      : "Who is Faris Zenunović? | SEO Specialist from Bosnia and Herzegovina",
    description: t("lead"),
    keywords: isBS
      ? ["ko je Faris Zenunović", "Faris Zenunović", "Faris Zenunovic SEO", "SEO specijalist BiH", "ZT Media", "SEO Živinice"]
      : ["who is Faris Zenunovic", "Faris Zenunović", "Faris Zenunovic SEO specialist", "ZT Media", "SEO Bosnia"],
    alternates: {
      canonical: url,
      languages: {
        bs: `${SITE}/bs/o-meni`,
        en: `${SITE}/en/o-meni`,
        "x-default": `${SITE}/en/o-meni`,
      },
    },
    openGraph: {
      title: isBS ? "Ko je Faris Zenunović? | SEO Specialist" : "Who is Faris Zenunović? | SEO Specialist",
      description: t("lead"),
      url,
      siteName: "Faris Zenunović",
      type: "profile",
      locale: isBS ? "bs_BA" : "en_US",
      // The 1200px-wide landscape image — Discover and large previews pull from here.
      images: [
        {
          url: IMAGE_WIDE.url,
          width: IMAGE_WIDE.width,
          height: IMAGE_WIDE.height,
          alt: t("photoAlt"),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: isBS ? "Ko je Faris Zenunović?" : "Who is Faris Zenunović?",
      description: t("lead"),
      images: [IMAGE_WIDE.url],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export default async function OMeniPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("oMeni");
  const isBS = locale === "bs";
  const url = `${SITE}/${locale}/o-meni`;

  // ProfilePage wrapping the canonical Person node. The @id must stay byte-identical
  // to the one used in [locale]/layout.tsx and on the ZT Media site — that shared
  // identifier is what merges both sources into one entity in Google's graph.
  const profileSchema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${url}#profilepage`,
    url,
    inLanguage: isBS ? "bs-BA" : "en-US",
    name: isBS ? "Ko je Faris Zenunović?" : "Who is Faris Zenunović?",
    mainEntity: {
      "@type": "Person",
      "@id": PERSON_ID,
      name: "Faris Zenunović",
      alternateName: ["Faris Zenunovic", "Zenunović Faris"],
      url: SITE,
      mainEntityOfPage: url,
      description: t("lead"),
      image: [
        imageObject(IMAGE_WIDE, t("photoAlt")),
        imageObject(IMAGE_PORTRAIT, t("photoAlt")),
      ],
      jobTitle: "SEO Specialist",
      email: EMAIL,
      telephone: TELEPHONE,
      nationality: { "@type": "Country", name: "Bosnia and Herzegovina" },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Živinice",
        addressCountry: "BA",
      },
      worksFor: ORGANIZATION,
      alumniOf: [
        {
          "@type": "CollegeOrUniversity",
          name: "IPI Akademija Tuzla",
          url: "https://ipi-akademija.ba",
        },
        { "@type": "EducationalOrganization", name: "IT Gimnazija Živinice" },
      ],
      knowsLanguage: [
        { "@type": "Language", name: "Bosnian", alternateName: "bs" },
        { "@type": "Language", name: "English", alternateName: "en" },
      ],
      knowsAbout: KNOWS_ABOUT,
      sameAs: SAME_AS,
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: isBS ? "Početna" : "Home",
        item: `${SITE}/${locale}`,
      },
      { "@type": "ListItem", position: 2, name: t("breadcrumb"), item: url },
    ],
  };

  const results = [t("result1"), t("result2"), t("result3"), t("result4")];

  const facts = [
    { label: t("factRoleLabel"), value: t("factRoleValue") },
    { label: t("factLocationLabel"), value: t("factLocationValue") },
    { label: t("factSinceLabel"), value: t("factSinceValue") },
    { label: t("factCompanyLabel"), value: t("factCompanyValue") },
    { label: t("factFocusLabel"), value: t("factFocusValue") },
    { label: t("factLanguagesLabel"), value: t("factLanguagesValue") },
  ];

  const expertise = [
    "Technical SEO",
    "Content Strategy",
    "Keyword Research",
    "Link Building",
    "Local SEO",
    "Next.js",
    "React",
    "WordPress",
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profileSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <main className="bg-[#0f1117] text-[#e5e7eb]">

        {/* BREADCRUMB */}
        <nav aria-label="Breadcrumb" className="max-w-4xl mx-auto px-6 md:px-10 pt-6">
          <ol className="flex items-center gap-2 text-sm text-[#6b7280]" role="list">
            <li>
              <Link href={`/${locale}`} className="hover:text-teal-400 transition-colors duration-200">
                {isBS ? "Početna" : "Home"}
              </Link>
            </li>
            <li aria-hidden="true" className="text-[#374151]">/</li>
            <li className="text-[#9ca3af]" aria-current="page">{t("breadcrumb")}</li>
          </ol>
        </nav>

        {/* HERO — the lead paragraph is the snippet target for "ko je faris zenunovic" */}
        <section className="pt-16 pb-20 px-6 md:px-10" aria-labelledby="omeni-heading">
          <div className="max-w-4xl mx-auto grid md:grid-cols-[1fr_260px] gap-12 items-start">
            <div>
              <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-teal-400 mb-4">
                {t("eyebrow")}
              </p>
              <h1
                id="omeni-heading"
                className="font-[family-name:var(--font-space)] text-4xl md:text-5xl font-bold text-white tracking-tight mb-7 leading-tight"
              >
                {t("h1")}
              </h1>
              <p className="text-lg text-gray-300 leading-relaxed">{t("lead")}</p>
            </div>

            <div className="relative mx-auto md:mx-0 w-56 md:w-full">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-white/10 shadow-[0_28px_70px_-20px_rgba(0,0,0,0.8)]">
                <Image
                  src="/images/faris-about-me.jpg"
                  alt={t("photoAlt")}
                  fill
                  sizes="(max-width: 768px) 224px, 260px"
                  priority
                  className="object-cover object-top"
                />
              </div>
            </div>
          </div>
        </section>

        {/* QUICK FACTS */}
        <section className="px-6 md:px-10 pb-20" aria-labelledby="facts-heading">
          <div className="max-w-4xl mx-auto">
            <h2
              id="facts-heading"
              className="font-[family-name:var(--font-space)] text-2xl font-bold text-white tracking-tight mb-6"
            >
              {t("quickFactsLabel")}
            </h2>
            <dl className="grid sm:grid-cols-2 gap-x-10 gap-y-0 border-t border-white/8">
              {facts.map((f) => (
                <div key={f.label} className="flex gap-4 py-4 border-b border-white/8">
                  <dt className="w-28 shrink-0 text-sm text-gray-500">{f.label}</dt>
                  <dd className="text-sm text-gray-200">{f.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* BACKGROUND */}
        <section className="px-6 md:px-10 py-20 border-t border-white/6" aria-labelledby="bg-heading">
          <div className="max-w-4xl mx-auto">
            <h2
              id="bg-heading"
              className="font-[family-name:var(--font-space)] text-2xl md:text-3xl font-bold text-white tracking-tight mb-7"
            >
              {t("bgHeading")}
            </h2>
            <div className="space-y-5 text-base text-gray-400 leading-relaxed max-w-2xl">
              <p>{t("bgP1")}</p>
              <p>{t("bgP2")}</p>
              <p>{t("bgP3")}</p>
            </div>
          </div>
        </section>

        {/* RESULTS */}
        <section className="px-6 md:px-10 py-20 border-t border-white/6 bg-white/[0.015]" aria-labelledby="res-heading">
          <div className="max-w-4xl mx-auto">
            <h2
              id="res-heading"
              className="font-[family-name:var(--font-space)] text-2xl md:text-3xl font-bold text-white tracking-tight mb-4"
            >
              {t("resultsHeading")}
            </h2>
            <p className="text-gray-500 mb-8 text-base">{t("resultsIntro")}</p>
            <ul className="space-y-3 max-w-2xl" role="list">
              {results.map((r) => (
                <li key={r} className="flex items-start gap-3 text-base text-gray-300 leading-relaxed">
                  <svg className="shrink-0 mt-1.5 text-teal-500" width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M2 7l3.5 3.5L12 3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {r}
                </li>
              ))}
            </ul>
            <Link
              href={`/${locale}#projects`}
              className="inline-flex items-center gap-1.5 mt-8 text-sm font-medium text-teal-400 hover:text-teal-300 transition-colors duration-200"
            >
              {isBS ? "Pogledaj sve projekte →" : "See all projects →"}
            </Link>
          </div>
        </section>

        {/* EXPERTISE */}
        <section className="px-6 md:px-10 py-20 border-t border-white/6" aria-labelledby="exp-heading">
          <div className="max-w-4xl mx-auto">
            <h2
              id="exp-heading"
              className="font-[family-name:var(--font-space)] text-2xl md:text-3xl font-bold text-white tracking-tight mb-7"
            >
              {t("expertiseHeading")}
            </h2>
            <ul className="flex flex-wrap gap-2.5" role="list">
              {expertise.map((e) => (
                <li
                  key={e}
                  className="px-4 py-2 rounded-full border border-white/10 bg-white/[0.03] text-sm text-gray-300"
                >
                  {e}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* EDUCATION */}
        <section className="px-6 md:px-10 py-20 border-t border-white/6" aria-labelledby="edu-heading">
          <div className="max-w-4xl mx-auto">
            <h2
              id="edu-heading"
              className="font-[family-name:var(--font-space)] text-2xl md:text-3xl font-bold text-white tracking-tight mb-7"
            >
              {t("eduHeading")}
            </h2>
            <ul className="space-y-3 text-base text-gray-400 max-w-2xl" role="list">
              <li>{t("edu1")}</li>
              <li>{t("edu2")}</li>
            </ul>
          </div>
        </section>

        {/* ZT MEDIA — reciprocal entity link */}
        <section className="px-6 md:px-10 py-20 border-t border-white/6 bg-white/[0.015]" aria-labelledby="org-heading">
          <div className="max-w-4xl mx-auto">
            <h2
              id="org-heading"
              className="font-[family-name:var(--font-space)] text-2xl md:text-3xl font-bold text-white tracking-tight mb-6"
            >
              {t("orgHeading")}
            </h2>
            <p className="text-base text-gray-400 leading-relaxed max-w-2xl mb-6">{t("orgP")}</p>
            <a
              href={ORG_URL}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-teal-400 hover:text-teal-300 transition-colors duration-200"
            >
              {t("orgLink")} →
            </a>
          </div>
        </section>

        {/* CONTACT */}
        <section className="px-6 md:px-10 py-20 border-t border-white/6" aria-labelledby="contact-heading">
          <div className="max-w-4xl mx-auto">
            <h2
              id="contact-heading"
              className="font-[family-name:var(--font-space)] text-2xl md:text-3xl font-bold text-white tracking-tight mb-5"
            >
              {t("contactHeading")}
            </h2>
            <p className="text-base text-gray-400 leading-relaxed max-w-xl mb-8">{t("contactP")}</p>
            <div className="flex flex-wrap gap-3">
              <Link
                href={`/${locale}#contact`}
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-teal-500 hover:bg-teal-400 text-[#0f1117] font-semibold rounded-xl transition-colors duration-200 text-sm"
              >
                {t("contactCta")}
              </Link>
              <Link
                href={`/${locale}/usluge`}
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-white/6 hover:bg-white/10 border border-white/10 text-white font-semibold rounded-xl transition-colors duration-200 text-sm"
              >
                {t("servicesCta")}
              </Link>
            </div>
          </div>
        </section>

      </main>
    </>
  );
}
