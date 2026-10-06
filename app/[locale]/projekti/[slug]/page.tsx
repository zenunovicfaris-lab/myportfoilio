import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { routing } from "../../../../i18n/routing";
import { SITE, PERSON_ID } from "../../../../lib/entity";
import { CASE_STUDY_SLUGS, projectBySlug, type CaseStudyMsg } from "../../../../lib/projects";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => CASE_STUDY_SLUGS.map((slug) => ({ locale, slug })));
}

async function loadCaseStudy(locale: string, slug: string) {
  const project = projectBySlug(slug);
  if (!project?.slug) return null;
  const t = await getTranslations({ locale, namespace: "caseStudies" });
  const tp = await getTranslations({ locale, namespace: "portfolio" });
  const msg = t.raw(project.slug) as CaseStudyMsg;
  const tags = (tp.raw("projects") as { tags: string[] }[])[project.index].tags;
  return { project, msg, tags };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const data = await loadCaseStudy(locale, slug);
  if (!data) return {};
  const url = `${SITE}/${locale}/projekti/${slug}`;

  return {
    title: data.msg.title,
    description: data.msg.metaDescription,
    alternates: {
      canonical: url,
      languages: {
        bs: `${SITE}/bs/projekti/${slug}`,
        en: `${SITE}/en/projekti/${slug}`,
        "x-default": `${SITE}/en/projekti/${slug}`,
      },
    },
    openGraph: {
      title: data.msg.title,
      description: data.msg.metaDescription,
      url,
      siteName: "Faris Zenunović",
      type: "article",
      locale: locale === "bs" ? "bs_BA" : "en_US",
      // The site-wide card: the project screenshots are too short (some ~250px
      // tall) to work as 1200x630 previews.
      images: [{ url: `${SITE}/${locale}/opengraph-image`, width: 1200, height: 630, alt: data.msg.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: data.msg.title,
      description: data.msg.metaDescription,
      images: [`${SITE}/${locale}/opengraph-image`],
    },
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const data = await loadCaseStudy(locale, slug);
  if (!data) notFound();
  const { project, msg, tags } = data;

  const t = await getTranslations("caseStudy");
  const tAll = await getTranslations("caseStudies");
  const url = `${SITE}/${locale}/projekti/${slug}`;

  const others = CASE_STUDY_SLUGS.filter((s) => s !== slug).map((s) => ({
    slug: s,
    title: (tAll.raw(s) as CaseStudyMsg).title,
  }));

  // The author points at the canonical Person node by @id, so every case study
  // is attributed to the same entity as the rest of the site.
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${url}#article`,
    headline: msg.title,
    description: msg.metaDescription,
    url,
    inLanguage: locale === "bs" ? "bs-BA" : "en-US",
    image: `${SITE}${project.image.src}`,
    author: { "@type": "Person", "@id": PERSON_ID, name: "Faris Zenunović" },
    about: msg.client,
    keywords: tags.join(", "),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: t("breadcrumbHome"), item: `${SITE}/${locale}` },
      { "@type": "ListItem", position: 2, name: t("breadcrumbProjects"), item: `${SITE}/${locale}#projects` },
      { "@type": "ListItem", position: 3, name: msg.title, item: url },
    ],
  };

  // Search Console proof first, then the site itself (skipped when they are the same shot)
  const shots = [
    ...(project.gsc ? [{ ...project.gsc, caption: msg.proofCaption }] : []),
    ...(msg.siteCaption && project.image.src !== project.gsc?.src
      ? [{ ...project.image, caption: msg.siteCaption }]
      : []),
  ];

  const facts = [
    { label: t("clientLabel"), value: msg.client },
    { label: t("roleLabel"), value: msg.role },
    { label: t("periodLabel"), value: msg.period },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <article className="bg-[#0f1117] text-[#e5e7eb]">
        {/* BREADCRUMB */}
        <nav aria-label="Breadcrumb" className="max-w-4xl mx-auto px-6 md:px-10 pt-6">
          <ol className="flex flex-wrap items-center gap-2 text-sm text-[#6b7280]" role="list">
            <li>
              <Link href={`/${locale}`} className="hover:text-teal-400 transition-colors duration-200">
                {t("breadcrumbHome")}
              </Link>
            </li>
            <li aria-hidden="true" className="text-[#374151]">/</li>
            <li>
              <Link href={`/${locale}#projects`} className="hover:text-teal-400 transition-colors duration-200">
                {t("breadcrumbProjects")}
              </Link>
            </li>
            <li aria-hidden="true" className="text-[#374151]">/</li>
            <li className="text-[#9ca3af]" aria-current="page">{msg.client}</li>
          </ol>
        </nav>

        {/* HERO */}
        <header className="pt-16 pb-14 px-6 md:px-10">
          <div className="max-w-4xl mx-auto">
            <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-teal-400 mb-4">{t("eyebrow")}</p>
            <h1 className="font-[family-name:var(--font-space)] text-4xl md:text-5xl font-bold text-white tracking-tight mb-7 leading-tight">
              {msg.title}
            </h1>
            <p className="text-lg text-gray-300 leading-relaxed max-w-3xl">{msg.summary}</p>

            <dl className="mt-10 grid sm:grid-cols-3 border-t border-white/8">
              {facts.map((f) => (
                <div key={f.label} className="py-4 border-b border-white/8 sm:pr-6">
                  <dt className="text-xs uppercase tracking-wider text-gray-500 mb-1">{f.label}</dt>
                  <dd className="text-sm text-gray-200">{f.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </header>

        {/* RESULTS */}
        <section className="px-6 md:px-10 py-16 border-t border-white/6 bg-white/[0.015]" aria-labelledby="cs-results">
          <div className="max-w-4xl mx-auto">
            <h2 id="cs-results" className="font-[family-name:var(--font-space)] text-2xl md:text-3xl font-bold text-white tracking-tight mb-8">
              {t("resultsHeading")}
            </h2>
            <div className="grid sm:grid-cols-2 gap-5">
              {msg.results.map((r) => (
                <div key={r.label} className="rounded-2xl border border-teal-500/20 bg-teal-500/[0.04] p-6">
                  <div className="font-[family-name:var(--font-space)] text-4xl font-bold bg-gradient-to-r from-teal-400 to-cyan-300 bg-clip-text text-transparent mb-2">
                    {r.value}
                  </div>
                  <div className="text-sm text-gray-400">{r.label}</div>
                </div>
              ))}
            </div>
            <p className="mt-5 text-xs text-gray-500 max-w-2xl">{msg.resultsNote}</p>
          </div>
        </section>

        {/* WORK */}
        <section className="px-6 md:px-10 py-16 border-t border-white/6" aria-labelledby="cs-work">
          <div className="max-w-4xl mx-auto">
            <h2 id="cs-work" className="font-[family-name:var(--font-space)] text-2xl md:text-3xl font-bold text-white tracking-tight mb-7">
              {t("workHeading")}
            </h2>
            <ul className="space-y-4 max-w-3xl" role="list">
              {msg.work.map((w) => (
                <li key={w} className="flex items-start gap-3 text-base text-gray-300 leading-relaxed">
                  <svg className="shrink-0 mt-1.5 text-teal-500" width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M2 7l3.5 3.5L12 3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {w}
                </li>
              ))}
            </ul>

            <h3 className="mt-12 mb-4 text-sm font-semibold uppercase tracking-wider text-gray-500">{t("toolsHeading")}</h3>
            <ul className="flex flex-wrap gap-2" role="list">
              {tags.map((tag) => (
                <li key={tag} className="text-xs px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-gray-400">
                  {tag}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* PROOF */}
        <section className="px-6 md:px-10 py-16 border-t border-white/6" aria-labelledby="cs-proof">
          <div className="max-w-4xl mx-auto">
            <h2 id="cs-proof" className="font-[family-name:var(--font-space)] text-2xl md:text-3xl font-bold text-white tracking-tight mb-7">
              {t("proofHeading")}
            </h2>
            <div className="space-y-10">
              {shots.map((shot) => (
                <figure key={shot.src}>
                  <div className="rounded-2xl overflow-hidden border border-white/10 bg-[#1a1d27]">
                    <Image
                      src={shot.src}
                      alt={shot.caption}
                      width={shot.w}
                      height={shot.h}
                      quality={90}
                      sizes="(max-width: 1024px) 100vw, 896px"
                      className="w-full h-auto"
                    />
                  </div>
                  <figcaption className="mt-3 text-sm text-gray-500">{shot.caption}</figcaption>
                </figure>
              ))}
            </div>
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel={["noopener noreferrer", project.nofollow ? "nofollow" : ""].filter(Boolean).join(" ")}
                className="inline-flex items-center gap-1.5 mt-6 text-sm font-medium text-teal-400 hover:text-teal-300 transition-colors"
              >
                {t("visitSite")} ↗
              </a>
            )}
          </div>
        </section>

        {/* CTA */}
        <section className="px-6 md:px-10 py-20 border-t border-white/6 bg-white/[0.015]">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-[family-name:var(--font-space)] text-2xl md:text-3xl font-bold text-white tracking-tight mb-4">
              {t("ctaHeading")}
            </h2>
            <p className="text-gray-400 mb-8 max-w-2xl">{t("ctaText")}</p>
            <div className="flex flex-wrap gap-4">
              <Link
                href={`/${locale}#contact`}
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-teal-500 to-cyan-400 text-[#0f1117] font-semibold rounded-xl"
              >
                {t("ctaButton")}
              </Link>
              <Link
                href={`/${locale}/usluge`}
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#1a1d27] border border-white/10 text-white font-semibold rounded-xl hover:border-teal-500/40 transition-colors"
              >
                {t("ctaServices")}
              </Link>
            </div>

            {/* Cross-links between case studies */}
            <h3 className="mt-14 mb-4 text-sm font-semibold uppercase tracking-wider text-gray-500">{t("otherProjects")}</h3>
            <ul className="grid sm:grid-cols-3 gap-3" role="list">
              {others.map((o) => (
                <li key={o.slug}>
                  <Link
                    href={`/${locale}/projekti/${o.slug}`}
                    className="block h-full rounded-xl border border-white/8 bg-[#111218] p-4 text-sm text-gray-300 hover:border-teal-500/35 hover:text-white transition-colors"
                  >
                    {o.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </article>
    </>
  );
}
