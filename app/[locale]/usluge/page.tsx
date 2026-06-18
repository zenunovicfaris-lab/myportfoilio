import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Link from "next/link";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isBS = locale === "bs";

  return {
    title: isBS
      ? "SEO Usluge u BiH | Faris Zenunovic - SEO Strucnjak"
      : "SEO Services Bosnia | Faris Zenunovic - SEO Expert",
    description: isBS
      ? "Profesionalne SEO usluge za biznise u Bosni i Hercegovini. Organski rast, tehnicki SEO, izrada sadrzaja i link building. Besplatna SEO analiza."
      : "Professional SEO services for businesses in Bosnia and Herzegovina. Organic growth, technical SEO, content creation and link building. Free SEO audit.",
    keywords: isBS
      ? ["SEO usluge", "SEO usluge BiH", "SEO optimizacija", "SEO Bosna", "SEO strucnjak BiH", "Google optimizacija", "lokalni SEO", "SEO agencija Bosna"]
      : ["SEO services Bosnia", "SEO optimization BiH", "SEO expert Bosnia", "Google optimization Bosnia"],
    alternates: {
      canonical: `https://fariszenunovic.com/${locale}/usluge`,
      languages: {
        bs: "https://fariszenunovic.com/bs/usluge",
        en: "https://fariszenunovic.com/en/usluge",
      },
    },
    openGraph: {
      title: isBS ? "SEO Usluge BiH | Faris Zenunovic" : "SEO Services Bosnia | Faris Zenunovic",
      description: isBS
        ? "Profesionalne SEO usluge. Organski rast i vidljivost na Googleu za biznise u BiH."
        : "Professional SEO services. Organic growth and Google visibility for businesses in BiH.",
      url: `https://fariszenunovic.com/${locale}/usluge`,
      siteName: "Faris Zenunovic",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: isBS ? "SEO Usluge BiH | Faris Zenunovic" : "SEO Services BiH",
      description: isBS
        ? "Profesionalne SEO usluge za biznise u BiH. Besplatna analiza."
        : "Professional SEO services for businesses in BiH. Free audit.",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
  };
}

export default async function UslugePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("usluge");

  const faqs = [
    { q: t("faq1Q"), a: t("faq1A") },
    { q: t("faq2Q"), a: t("faq2A") },
    { q: t("faq3Q"), a: t("faq3A") },
    { q: t("faq4Q"), a: t("faq4A") },
  ];

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `https://fariszenunovic.com/${locale}/usluge#seo-usluge`,
    name: "SEO Usluge",
    description: "Profesionalne SEO usluge za biznise u Bosni i Hercegovini.",
    provider: {
      "@type": "Person",
      name: "Faris Zenunovic",
      url: "https://fariszenunovic.com",
      jobTitle: "SEO Strucnjak",
      address: {
        "@type": "PostalAddress",
        addressCountry: "BA",
        addressRegion: "Bosna i Hercegovina",
      },
    },
    areaServed: { "@type": "Country", name: "Bosna i Hercegovina" },
    offers: [
      {
        "@type": "Offer",
        name: "SEO Starter",
        description: "SEO audit, on-page optimizacija, keyword research i Google Search Console setup.",
        price: "299",
        priceCurrency: "BAM",
        priceSpecification: { "@type": "UnitPriceSpecification", billingDuration: "P1M" },
      },
      {
        "@type": "Offer",
        name: "SEO Pro",
        description: "Kompletna SEO strategija, link building, SEO sadrzaj, tehnicke popravke i mjesecno izvjestavanje.",
        price: "699",
        priceCurrency: "BAM",
        priceSpecification: { "@type": "UnitPriceSpecification", billingDuration: "P1M" },
      },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: locale === "bs" ? "Početna" : "Home",
        item: `https://fariszenunovic.com/${locale}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: locale === "bs" ? "SEO Usluge" : "SEO Services",
        item: `https://fariszenunovic.com/${locale}/usluge`,
      },
    ],
  };

  const services = [
    {
      icon: "⚙️",
      title: t("svc1Title"),
      desc: t("svc1Desc"),
      items: [t("svc1_1"), t("svc1_2"), t("svc1_3"), t("svc1_4"), t("svc1_5"), t("svc1_6"), t("svc1_7")],
    },
    {
      icon: "✍️",
      title: t("svc2Title"),
      desc: t("svc2Desc"),
      items: [t("svc2_1"), t("svc2_2"), t("svc2_3"), t("svc2_4"), t("svc2_5"), t("svc2_6"), t("svc2_7")],
    },
    {
      icon: "🔗",
      title: t("svc3Title"),
      desc: t("svc3Desc"),
      items: [t("svc3_1"), t("svc3_2"), t("svc3_3"), t("svc3_4"), t("svc3_5"), t("svc3_6")],
    },
    {
      icon: "📍",
      title: t("svc4Title"),
      desc: t("svc4Desc"),
      items: [t("svc4_1"), t("svc4_2"), t("svc4_3"), t("svc4_4"), t("svc4_5"), t("svc4_6")],
    },
  ];

  const results = [
    { title: t("result1Title"), metric: t("result1Metric"), desc: t("result1Desc") },
    { title: t("result2Title"), metric: t("result2Metric"), desc: t("result2Desc") },
    { title: t("result3Title"), metric: t("result3Metric"), desc: t("result3Desc") },
    { title: t("result4Title"), metric: t("result4Metric"), desc: t("result4Desc") },
  ];

  const process = [
    { step: t("process1Step"), title: t("process1Title"), desc: t("process1Desc") },
    { step: t("process2Step"), title: t("process2Title"), desc: t("process2Desc") },
    { step: t("process3Step"), title: t("process3Title"), desc: t("process3Desc") },
    { step: t("process4Step"), title: t("process4Title"), desc: t("process4Desc") },
  ];

  const packages = [
    {
      name: t("pkg1Name"),
      desc: t("pkg1Desc"),
      price: t("pkg1Price"),
      currency: t("pkg1Currency"),
      period: t("pkg1Period"),
      badge: null as string | null,
      items: [t("pkg1_1"), t("pkg1_2"), t("pkg1_3"), t("pkg1_4"), t("pkg1_5"), t("pkg1_6")],
      cta: t("pkg1Cta"),
      featured: false,
    },
    {
      name: t("pkg2Name"),
      desc: t("pkg2Desc"),
      price: t("pkg2Price"),
      currency: t("pkg2Currency"),
      period: t("pkg2Period"),
      badge: t("pkg2Badge") as string | null,
      items: [t("pkg2_1"), t("pkg2_2"), t("pkg2_3"), t("pkg2_4"), t("pkg2_5"), t("pkg2_6"), t("pkg2_7"), t("pkg2_8")],
      cta: t("pkg2Cta"),
      featured: true,
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <main className="bg-[#0f1117] text-[#e5e7eb]">

        {/* BREADCRUMB */}
        <nav aria-label="Breadcrumb" className="max-w-5xl mx-auto px-6 md:px-10 pt-6 pb-0">
          <ol className="flex items-center gap-2 text-sm text-[#6b7280]" role="list">
            <li>
              <Link
                href={`/${locale}`}
                className="hover:text-teal-400 transition-colors duration-200"
              >
                {locale === "bs" ? "Početna" : "Home"}
              </Link>
            </li>
            <li aria-hidden="true" className="text-[#374151]">/</li>
            <li className="text-[#9ca3af]" aria-current="page">
              {locale === "bs" ? "SEO Usluge" : "SEO Services"}
            </li>
          </ol>
        </nav>

        {/* HERO */}
        <section className="relative overflow-hidden pt-32 pb-24 px-6 md:px-10" aria-labelledby="hero-heading">
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: "linear-gradient(rgba(255,255,255,.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.025) 1px, transparent 1px)",
                backgroundSize: "80px 80px",
                maskImage: "radial-gradient(ellipse at 50% 0%, black 30%, transparent 80%)",
              }}
            />
            <div className="absolute -top-40 -right-24 w-[500px] h-[500px] rounded-full bg-sky-500/10 blur-[90px]" />
            <div className="absolute -bottom-24 -left-20 w-[400px] h-[400px] rounded-full bg-teal-500/8 blur-[90px]" />
          </div>

          <div className="relative max-w-5xl mx-auto">
            <div className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.18em] uppercase text-teal-400 mb-7">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400 shadow-[0_0_8px_rgba(20,184,166,0.8)] animate-pulse" />
              {t("eyebrow")}
            </div>

            <h1
              id="hero-heading"
              className="font-[family-name:var(--font-space)] text-5xl sm:text-6xl md:text-[80px] lg:text-[96px] font-bold leading-none tracking-tight mb-7"
            >
              <span className="block text-white">{t("heroTitle1")}</span>
              <span
                className="block text-transparent"
                style={{ WebkitTextStroke: "1.5px rgba(255,255,255,0.28)", fontStyle: "italic" }}
              >
                {t("heroTitleItalic")}
              </span>
              <span className="block text-white">{t("heroTitle2")}</span>
            </h1>

            <p className="text-base md:text-lg text-gray-400 max-w-xl mb-10 leading-relaxed">
              {t("heroDesc")}
            </p>

            <div className="flex flex-wrap gap-3">
              <a
                href="#paketi"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-teal-500 hover:bg-teal-400 text-[#0f1117] font-semibold rounded-xl transition-colors duration-200 text-sm"
              >
                {t("ctaPackages")}
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <a
                href="#audit"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-white/6 hover:bg-white/10 border border-white/10 text-white font-semibold rounded-xl transition-colors duration-200 text-sm"
              >
                {t("ctaAudit")}
              </a>
            </div>
          </div>
        </section>

        {/* STATS */}
        <section className="border-t border-b border-white/6 bg-white/[0.02] py-10 px-6 md:px-10">
          <div className="max-w-5xl mx-auto">
            <dl className="grid grid-cols-2 md:grid-cols-4">
              {[
                { value: t("stat1Value"), label: t("stat1Label") },
                { value: t("stat2Value"), label: t("stat2Label") },
                { value: t("stat3Value"), label: t("stat3Label") },
                { value: t("stat4Value"), label: t("stat4Label") },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="text-center px-4 py-4 md:py-0 md:border-r md:border-white/6 md:last:border-r-0"
                >
                  <dt className="font-[family-name:var(--font-space)] text-4xl font-bold text-teal-400 tracking-tight leading-none mb-2">
                    {stat.value}
                  </dt>
                  <dd className="text-xs text-gray-500 leading-snug">{stat.label}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* WHY ME */}
        <section className="py-24 px-6 md:px-10" aria-labelledby="why-heading">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-teal-400 mb-4">
                  {t("whyTag")}
                </p>
                <h2
                  id="why-heading"
                  className="font-[family-name:var(--font-space)] text-3xl md:text-4xl font-bold text-white tracking-tight mb-5"
                >
                  {t("whyTitle")}
                </h2>
                <p className="text-gray-400 leading-relaxed text-base">
                  {t("whyDesc")}
                </p>
              </div>
              <ul className="space-y-3">
                {[t("whyDiff1"), t("whyDiff2"), t("whyDiff3")].map((diff, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 bg-[#0d0f16] border border-white/8 hover:border-teal-500/20 rounded-xl p-4 transition-colors duration-200"
                  >
                    <svg className="shrink-0 mt-0.5 text-teal-400" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path d="M2 8l4 4 8-8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="text-sm text-gray-300 leading-relaxed">{diff}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section className="py-24 px-6 md:px-10 border-t border-white/6" id="usluge" aria-labelledby="services-heading">
          <div className="max-w-5xl mx-auto">
            <header className="text-center mb-14">
              <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-teal-400 mb-4">
                {t("servicesTag")}
              </p>
              <h2
                id="services-heading"
                className="font-[family-name:var(--font-space)] text-3xl md:text-4xl font-bold text-white tracking-tight mb-4"
              >
                {t("servicesTitle")}
              </h2>
              <p className="text-gray-400 max-w-xl mx-auto text-base leading-relaxed">
                {t("servicesDesc")}
              </p>
            </header>

            <div className="grid md:grid-cols-2 gap-5">
              {services.map((svc) => (
                <article
                  key={svc.title}
                  className="bg-[#0d0f16] border border-white/8 hover:border-teal-500/25 rounded-2xl p-8 transition-colors duration-200"
                >
                  <span className="text-3xl mb-5 block" aria-hidden="true">{svc.icon}</span>
                  <h3 className="font-[family-name:var(--font-space)] text-xl font-bold text-white mb-3 tracking-tight">
                    {svc.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed mb-5">{svc.desc}</p>
                  <ul className="space-y-2.5" role="list">
                    {svc.items.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm text-gray-400">
                        <svg className="shrink-0 mt-0.5 text-teal-500" width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                          <path d="M2 7l3.5 3.5L12 3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* PROVEN RESULTS */}
        <section className="py-24 px-6 md:px-10 border-t border-white/6 bg-white/[0.015]" aria-labelledby="results-heading">
          <div className="max-w-5xl mx-auto">
            <header className="text-center mb-14">
              <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-teal-400 mb-4">
                {t("resultsTag")}
              </p>
              <h2
                id="results-heading"
                className="font-[family-name:var(--font-space)] text-3xl md:text-4xl font-bold text-white tracking-tight mb-4"
              >
                {t("resultsTitle")}
              </h2>
              <p className="text-gray-400 max-w-xl mx-auto text-base">{t("resultsDesc")}</p>
            </header>

            <div className="grid md:grid-cols-3 gap-5 mb-10">
              {results.map((r) => (
                <article
                  key={r.title}
                  className="bg-[#0d0f16] border border-white/8 rounded-2xl p-6"
                >
                  <h3 className="font-[family-name:var(--font-space)] text-lg font-bold text-white mb-2">
                    {r.title}
                  </h3>
                  <p className="text-teal-400 font-semibold text-sm mb-3">{r.metric}</p>
                  <p className="text-sm text-gray-500 leading-relaxed">{r.desc}</p>
                </article>
              ))}
            </div>

            <div className="text-center">
              <a
                href={`/${locale}#projects`}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-teal-400 hover:text-teal-300 transition-colors duration-200"
              >
                {t("resultsCta")}
              </a>
            </div>
          </div>
        </section>

        {/* PROCESS */}
        <section className="py-24 px-6 md:px-10 border-t border-white/6" id="proces" aria-labelledby="process-heading">
          <div className="max-w-5xl mx-auto">
            <header className="text-center mb-14">
              <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-teal-400 mb-4">
                {t("processTag")}
              </p>
              <h2
                id="process-heading"
                className="font-[family-name:var(--font-space)] text-3xl md:text-4xl font-bold text-white tracking-tight"
              >
                {t("processTitle")}
              </h2>
            </header>

            <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8" role="list">
              {process.map((p) => (
                <li key={p.step} className="flex flex-col">
                  <span
                    className="font-[family-name:var(--font-space)] text-5xl font-bold text-teal-500/15 leading-none mb-4 tracking-tight"
                    aria-hidden="true"
                  >
                    {p.step}
                  </span>
                  <h3 className="font-[family-name:var(--font-space)] text-base font-bold text-white mb-2">
                    {p.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{p.desc}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* PACKAGES */}
        <section className="py-24 px-6 md:px-10 border-t border-white/6 bg-white/[0.015]" id="paketi" aria-labelledby="packages-heading">
          <div className="max-w-5xl mx-auto">
            <header className="text-center mb-14">
              <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-teal-400 mb-4">
                {t("packagesTag")}
              </p>
              <h2
                id="packages-heading"
                className="font-[family-name:var(--font-space)] text-3xl md:text-4xl font-bold text-white tracking-tight mb-4"
              >
                {t("packagesTitle")}
              </h2>
              <p className="text-gray-400 max-w-xl mx-auto text-base leading-relaxed">
                {t("packagesDesc")}
              </p>
            </header>

            <div className="grid md:grid-cols-2 gap-5 max-w-3xl mx-auto">
              {packages.map((pkg) => (
                <article
                  key={pkg.name}
                  className={`relative rounded-2xl p-8 ${pkg.featured ? "bg-teal-500/5 border border-teal-500/35" : "bg-[#0d0f16] border border-white/8"}`}
                  aria-labelledby={`pkg-${pkg.name}`}
                >
                  {pkg.badge && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-teal-500 text-[#0f1117] text-[11px] font-bold tracking-wider uppercase px-4 py-1 rounded-full whitespace-nowrap">
                      {pkg.badge}
                    </div>
                  )}

                  <h3
                    id={`pkg-${pkg.name}`}
                    className="font-[family-name:var(--font-space)] text-xl font-bold text-white mb-2"
                  >
                    {pkg.name}
                  </h3>
                  <p className="text-sm text-gray-500 mb-6 leading-snug">{pkg.desc}</p>

                  <div className="flex items-baseline gap-1 mb-7" aria-label={`${pkg.price} ${pkg.currency} ${pkg.period}`}>
                    <span className="font-[family-name:var(--font-space)] text-2xl font-bold text-teal-400">
                      {pkg.currency}
                    </span>
                    <span className="font-[family-name:var(--font-space)] text-5xl font-bold text-white tracking-tight leading-none">
                      {pkg.price}
                    </span>
                    <span className="text-gray-500 text-base">{pkg.period}</span>
                  </div>

                  <ul className="space-y-2.5 mb-7" role="list">
                    {pkg.items.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm text-gray-400">
                        <svg className="shrink-0 mt-0.5 text-teal-500" width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
                          <path d="M2.5 7.5l3.5 3.5 6.5-6.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>

                  <a
                    href={`/${locale}#contact`}
                    className={`block w-full text-center py-3 rounded-xl text-sm font-semibold transition-colors duration-200 ${pkg.featured ? "bg-teal-500 hover:bg-teal-400 text-[#0f1117]" : "border border-white/15 hover:border-white/30 text-white hover:bg-white/5"}`}
                  >
                    {pkg.cta}
                  </a>
                </article>
              ))}
            </div>

            <p className="text-center mt-8 text-sm text-gray-500">
              {t("packagesNote")}{" "}
              <a
                href={`/${locale}#contact`}
                className="text-teal-400 hover:text-teal-300 transition-colors duration-200"
              >
                {t("packagesNoteLink")}
              </a>
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-24 px-6 md:px-10 border-t border-white/6" id="faq" aria-labelledby="faq-heading">
          <div className="max-w-2xl mx-auto">
            <header className="text-center mb-14">
              <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-teal-400 mb-4">
                {t("faqTag")}
              </p>
              <h2
                id="faq-heading"
                className="font-[family-name:var(--font-space)] text-3xl md:text-4xl font-bold text-white tracking-tight"
              >
                {t("faqTitle")}
              </h2>
            </header>

            <dl className="divide-y divide-white/6">
              {faqs.map((faq, i) => (
                <div key={i} className="py-7">
                  <dt className="font-[family-name:var(--font-space)] text-base font-semibold text-white mb-3">
                    {faq.q}
                  </dt>
                  <dd className="text-sm text-gray-400 leading-relaxed">{faq.a}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* AUDIT CTA */}
        <section className="py-24 px-6 md:px-10 border-t border-white/6 bg-white/[0.015]" id="audit" aria-labelledby="audit-heading">
          <div className="max-w-5xl mx-auto">
            <div className="bg-teal-500/6 border border-teal-500/20 rounded-3xl p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-10">
              <div className="flex-1">
                <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-teal-400 mb-4">
                  {t("auditTag")}
                </p>
                <h2
                  id="audit-heading"
                  className="font-[family-name:var(--font-space)] text-3xl md:text-4xl font-bold text-white tracking-tight mb-4 leading-snug max-w-lg"
                >
                  {t("auditTitle")}
                </h2>
                <p className="text-gray-400 text-base leading-relaxed max-w-md">
                  {t("auditDesc")}
                </p>
              </div>

              <a
                href={`/${locale}#contact`}
                className="shrink-0 inline-flex items-center gap-2 px-8 py-4 bg-teal-500 hover:bg-teal-400 text-[#0f1117] font-semibold rounded-xl transition-colors duration-200"
              >
                {t("auditCta")}
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                  <path d="M3.75 9h10.5M10.5 5.25L14.25 9l-3.75 3.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </div>
        </section>

      </main>
    </>
  );
}
