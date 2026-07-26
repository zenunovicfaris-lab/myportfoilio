import type { MetadataRoute } from "next";

import { SITE } from "../lib/entity";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE;
  const locales = ["bs", "en"];
  const now = new Date();

  const routes = [
    { path: "",         priority: 1.0,  changeFrequency: "monthly" as const },
    { path: "/o-meni",  priority: 0.95, changeFrequency: "monthly" as const },
    { path: "/usluge",  priority: 0.9,  changeFrequency: "monthly" as const },
  ];

  return locales.flatMap((locale) =>
    routes.map(({ path, priority, changeFrequency }) => ({
      url: `${base}/${locale}${path}`,
      lastModified: now,
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
