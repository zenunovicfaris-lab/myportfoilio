import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Code2, Search, Globe, Star } from "lucide-react";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isBS = locale === "bs";

  return {
    title: isBS
      ? "Casino BiH – Nezavisne recenzije online casina | Faris Zenunović"
      : "Casino BiH – Independent Online Casino Reviews | Faris Zenunović",
    description: isBS
      ? "Izgradnja kompletne platforme za recenzije online casina od nule. Next.js, React i Tailwind CSS. Najrealnije casino recenzije za bosansko tržište."
      : "Built a full casino review platform from scratch using Next.js, React and Tailwind CSS. Independent, unbiased online casino reviews for the Bosnian market.",
    alternates: {
      canonical: `https://fariszenunovic.com/${locale}/portfolio/casino-bih`,
      languages: {
        bs: "https://fariszenunovic.com/bs/portfolio/casino-bih",
        en: "https://fariszenunovic.com/en/portfolio/casino-bih",
      },
    },
    openGraph: {
      title: isBS ? "Casino BiH – Nezavisne recenzije online casina" : "Casino BiH – Independent Online Casino Reviews",
      description: isBS
        ? "Web projekat: platforma za online casino recenzije. Next.js, React, Tailwind CSS."
        : "Web project: online casino review platform built with Next.js, React, Tailwind CSS.",
      url: `https://fariszenunovic.com/${locale}/portfolio/casino-bih`,
      images: ["/images/casino-bih.jpg"],
      type: "website",
    },
    robots: { index: true, follow: true },
  };
}

export default async function CasinoBihCaseStudy({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isBS = locale === "bs";

  const tech = [
    { icon: Code2, label: "Next.js 14", desc: isBS ? "App Router, SSR, SSG" : "App Router, SSR, SSG" },
    { icon: Code2, label: "React 18",   desc: isBS ? "Server & Client komponente" : "Server & Client components" },
    { icon: Code2, label: "Tailwind CSS", desc: isBS ? "Responsivni dizajn" : "Responsive design" },
    { icon: Search, label: "SEO",        desc: isBS ? "Schema markup, meta, sitemap" : "Schema markup, meta, sitemap" },
    { icon: Globe,  label: "TypeScript", desc: isBS ? "Type-safe codebase" : "Type-safe codebase" },
    { icon: Star,   label: isBS ? "Recenzijski sistem" : "Review system", desc: isBS ? "Scoring & rating logika" : "Scoring & rating logic" },
  ];

  const highlights = isBS
    ? [
        "Kompletan sajt izgrađen od nule — dizajn, razvoj i deployment",
        "Sistem ocjenjivanja casina sa detaljnim kriterijima i realnim recenzijama",
        "Tehnička SEO optimizacija: schema markup, sitemap, meta tagovi, Core Web Vitals",
        "Responsivan dizajn prilagođen mobilnim uređajima",
        "Brze stranice zahvaljujući Next.js static generation i image optimizaciji",
      ]
    : [
        "Full website built from scratch — design, development and deployment",
        "Casino rating system with detailed criteria and honest reviews",
        "Technical SEO: schema markup, sitemap, meta tags, Core Web Vitals",
        "Fully responsive mobile-first design",
        "Fast page loads via Next.js static generation and image optimisation",
      ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: isBS ? "Casino BiH – Nezavisne recenzije online casina" : "Casino BiH – Independent Online Casino Reviews",
    url: "https://www.casino-bih.com/",
    description: isBS
      ? "Platforma za nezavisne recenzije online casina namijenjena bosanskom tržištu."
      : "Independent online casino review platform for the Bosnian market.",
    creator: {
      "@type": "Person",
      name: "Faris Zenunović",
      url: "https://fariszenunovic.com",
    },
    keywords: isBS
      ? "online casino, casino recenzije BiH, casino Bosna, online kockanje BiH"
      : "online casino, casino reviews BiH, casino Bosnia, online gambling BiH",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen bg-[#0a0a0f] text-[#e5e7eb]">

        {/* ── Back button ── */}
        <div className="px-6 md:px-10 pt-10 max-w-5xl mx-auto">
          <Link
            href={`/${locale}#projects`}
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-teal-400 transition-colors duration-200"
          >
            <ArrowLeft size={14} />
            {isBS ? "Nazad na portfolio" : "Back to portfolio"}
          </Link>
        </div>

        {/* ── Hero ── */}
        <section className="px-6 md:px-10 py-16 max-w-5xl mx-auto">
          <div className="mb-4">
            <span className="inline-block text-[11px] font-semibold tracking-[0.18em] uppercase text-teal-400 px-3.5 py-1.5 rounded-full border border-teal-500/20 bg-teal-500/8">
              {isBS ? "Studija slučaja" : "Case Study"}
            </span>
          </div>

          <h1 className="font-[family-name:var(--font-space)] text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight leading-tight">
            {isBS
              ? "Nezavisne recenzije online casina za BiH tržište"
              : "Independent Online Casino Reviews for the Bosnian Market"}
          </h1>

          <p className="text-gray-400 text-lg leading-relaxed max-w-3xl mb-10">
            {isBS
              ? "Izgradio kompletnu web platformu od nule koristeći Next.js, React i Tailwind CSS. Sajt pruža najrealnije i najpouzdanije ocjene online casina namijenjene bosanskim korisnicima."
              : "Built a complete web platform from scratch using Next.js, React and Tailwind CSS. The site delivers honest, unbiased ratings for online casinos targeting users in Bosnia and Herzegovina."}
          </p>

          {/* Screenshot */}
          <div className="relative rounded-2xl overflow-hidden border border-white/8 shadow-[0_24px_80px_-20px_rgba(0,0,0,0.8)]">
            <Image
              src="/images/casino-bih.jpg"
              alt={isBS ? "Casino BiH – platforma za recenzije online casina" : "Casino BiH – online casino review platform"}
              width={1200}
              height={680}
              className="w-full object-cover object-top"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f]/40 via-transparent to-transparent pointer-events-none" />
          </div>
        </section>

        {/* ── Tech stack ── */}
        <section className="px-6 md:px-10 pb-16 max-w-5xl mx-auto">
          <h2 className="font-[family-name:var(--font-space)] text-2xl font-bold text-white mb-8">
            {isBS ? "Tehnologije" : "Tech Stack"}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {tech.map(({ icon: Icon, label, desc }) => (
              <div
                key={label}
                className="flex items-start gap-3 p-4 bg-[#111218] border border-white/8 rounded-xl hover:border-teal-500/25 transition-colors duration-200"
              >
                <Icon size={18} className="text-teal-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-white">{label}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── What was built ── */}
        <section className="px-6 md:px-10 pb-16 max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="font-[family-name:var(--font-space)] text-2xl font-bold text-white mb-6">
                {isBS ? "Šta je urađeno" : "What Was Built"}
              </h2>
              <ul className="space-y-3">
                {highlights.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-gray-400 leading-relaxed">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-teal-400 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-[#111218] border border-white/8 rounded-2xl p-6">
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-4">
                {isBS ? "O projektu" : "Project Info"}
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-gray-600 mb-1">{isBS ? "Tip projekta" : "Project type"}</p>
                  <p className="text-sm text-white font-medium">{isBS ? "Web platforma / Affiliate SEO" : "Web platform / Affiliate SEO"}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1">{isBS ? "Uloga" : "Role"}</p>
                  <p className="text-sm text-white font-medium">{isBS ? "Full-stack razvoj & SEO" : "Full-stack development & SEO"}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1">{isBS ? "Tržište" : "Market"}</p>
                  <p className="text-sm text-white font-medium">{isBS ? "Bosna i Hercegovina" : "Bosnia and Herzegovina"}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1">Stack</p>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {["Next.js", "React", "Tailwind CSS", "TypeScript"].map((tag) => (
                      <span key={tag} className="text-[11px] px-2.5 py-1 rounded-full bg-white/5 border border-white/8 text-gray-400">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA — money anchor dofollow link ── */}
        <section className="px-6 md:px-10 pb-24 max-w-5xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden border border-teal-500/20 bg-gradient-to-br from-teal-500/8 to-cyan-500/4 p-8 md:p-12">
            <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-teal-500/6 blur-3xl pointer-events-none" />
            <div className="relative">
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-teal-400 mb-3">
                {isBS ? "Posjeti projekat" : "Visit the project"}
              </p>
              <h2 className="font-[family-name:var(--font-space)] text-2xl md:text-3xl font-bold text-white mb-4 leading-snug">
                {isBS
                  ? "Casino BiH — nezavisne recenzije online casina u Bosni i Hercegovini"
                  : "Casino BiH — independent online casino reviews in Bosnia and Herzegovina"}
              </h2>
              <p className="text-gray-400 text-base leading-relaxed mb-8 max-w-xl">
                {isBS
                  ? "Platforma nudi detaljne, nepristrasne ocjene online casina s fokusom na sigurnost, bonuse i korisničko iskustvo za igrače iz BiH."
                  : "The platform offers detailed, unbiased casino ratings with focus on safety, bonuses and user experience for players from BiH."}
              </p>
              <a
                href="https://www.casino-bih.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-teal-500 to-cyan-400 text-[#0f1117] font-semibold rounded-xl shadow-[0_0_40px_-8px_rgba(20,184,166,0.5)] hover:shadow-[0_0_60px_-8px_rgba(20,184,166,0.75)] transition-shadow text-sm"
              >
                {isBS
                  ? "Pogledaj online casino recenzije za BiH"
                  : "View independent casino reviews for BiH"}
                <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}
