import type { MetadataRoute } from "next";

import { SITE } from "../lib/entity";
import { CASE_STUDY_SLUGS } from "../lib/projects";

/**
 * Bump a route's date when its content actually changes. A lastModified that
 * moves on every build (new Date()) tells Google nothing, so it gets ignored.
 */
const UPDATED = {
  home: "2026-10-06",
  about: "2026-10-06",
  services: "2026-10-06",
  caseStudies: "2026-10-06",
};

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE;
  const locales = ["bs", "en"];

  const routes = [
    { path: "",         priority: 1.0,  changeFrequency: "monthly" as const, updated: UPDATED.home },
    { path: "/o-meni",  priority: 0.95, changeFrequency: "monthly" as const, updated: UPDATED.about },
    { path: "/usluge",  priority: 0.9,  changeFrequency: "monthly" as const, updated: UPDATED.services },
    ...CASE_STUDY_SLUGS.map((slug) => ({
      path: `/projekti/${slug}`,
      priority: 0.7,
      changeFrequency: "yearly" as const,
      updated: UPDATED.caseStudies,
    })),
  ];

  return locales.flatMap((locale) =>
    routes.map(({ path, priority, changeFrequency, updated }) => ({
      url: `${base}/${locale}${path}`,
      lastModified: new Date(updated),
      changeFrequency,
      priority,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${base}/${l}${path}`])
        ),
      },
    }))
  );
}
