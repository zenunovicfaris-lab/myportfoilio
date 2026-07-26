/**
 * Single source of truth for the Faris Zenunović entity across the site.
 *
 * PERSON_ID and ORG_ID are join keys: Google merges every schema node carrying the
 * same @id into one entity in its knowledge graph. The ZT Media site emits nodes with
 * these exact strings too, which is what makes both domains describe one person rather
 * than two. They must stay byte-identical everywhere — never inline them.
 */

/**
 * Canonical host. The apex domain 308-redirects here, so every canonical, hreflang,
 * OG url and sitemap entry must use the www form — pointing them at the apex made
 * each one a redirect hop, and Google discounts hreflang annotations that redirect.
 */
export const SITE = "https://www.fariszenunovic.com";

/**
 * Deliberately NOT derived from SITE. This is an opaque identifier, not a fetchable
 * URL — it never needs to resolve. The ZT Media site has already shipped nodes using
 * this exact string, so changing it would split the entity in two. Leave it alone.
 */
export const PERSON_ID = "https://fariszenunovic.com/#faris";
export const ORG_ID = "https://www.zt-media.digital/#organization";
export const ORG_URL = "https://www.zt-media.digital";

/** Landscape 1200x799 — meets Google Discover's 1200px minimum width. */
export const IMAGE_WIDE = {
  url: `${SITE}/images/faris-zenunovic.jpg`,
  width: 1200,
  height: 799,
} as const;

/** Portrait 1024x1265 — headshot, better suited to a knowledge panel thumbnail. */
export const IMAGE_PORTRAIT = {
  url: `${SITE}/images/faris-about-me.jpg`,
  width: 1024,
  height: 1265,
} as const;

/**
 * Verified profiles. Each corroborating profile strengthens entity resolution, so
 * only add URLs that actually resolve and visibly belong to the same person.
 *
 * Visible links in the UI are rendered from these same constants. A profile listed
 * in sameAs but linked with a different URL form (missing www, missing trailing
 * slash) reads as two separate profiles, which weakens rather than confirms.
 */
export const PROFILES = {
  linkedin: "https://www.linkedin.com/in/fariszenunovic/",
  github: "https://github.com/zenunovicfaris-lab",
  youtube: "https://www.youtube.com/@FarisZenunovi%C4%87",
  instagram: "https://www.instagram.com/znnvyc/",
  facebook: "https://www.facebook.com/faris.zenunovic.9/",
} as const;

export const SAME_AS = [...Object.values(PROFILES), ORG_URL];

export const KNOWS_ABOUT = [
  "SEO",
  "Technical SEO",
  "Content Optimization",
  "Keyword Research",
  "Link Building",
  "Local SEO",
  "Next.js",
  "React",
  "TypeScript",
  "WordPress",
];

export const EMAIL = "zenunovicfaris@gmail.com";
export const TELEPHONE = "+387603055894";

export function imageObject(
  img: typeof IMAGE_WIDE | typeof IMAGE_PORTRAIT,
  caption: string,
) {
  return {
    "@type": "ImageObject",
    url: img.url,
    width: img.width,
    height: img.height,
    caption,
  };
}

/** The ZT Media node, referenced by @id so both sites resolve to one organization. */
export const ORGANIZATION = {
  "@type": "Organization",
  "@id": ORG_ID,
  name: "ZT Media",
  url: ORG_URL,
} as const;
