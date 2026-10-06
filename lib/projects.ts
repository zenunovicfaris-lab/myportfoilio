/**
 * Non-translatable project data (links, flags, image paths), shared by the
 * portfolio grid and the case study pages. Order matches `portfolio.projects`
 * in the message files, which supply titles, descriptions and tags.
 *
 * A project with a `slug` has a case study at /[locale]/projekti/[slug], whose
 * text lives under `caseStudies.<slug>` in the message files.
 *
 * `image` is the card / site screenshot; `gsc` is the Search Console screenshot
 * shown as proof on the case study page.
 */
type Shot = { src: string; w: number; h: number };

type Project = {
  id: number;
  slug: string | null;
  image: Shot;
  gsc: Shot | null;
  link: string | null;
  newTab: boolean;
  nofollow: boolean;
};

export const PROJECTS: Project[] = [
  {
    id: 1, slug: "s-line",
    image: { src: "/images/s-line-homepage.png", w: 1892, h: 945 },
    gsc:   { src: "/images/s-line-gsc.png",      w: 1911, h: 766 },
    link: "https://www.s-line-doo.com/", newTab: true, nofollow: false,
  },
  {
    id: 2, slug: "auratherm",
    image: { src: "/images/auratherm-website.jpg", w: 1200, h: 596 },
    gsc:   { src: "/images/auratherm-gsc.png",     w: 1907, h: 684 },
    link: "https://www.auratherm.ba/", newTab: true, nofollow: false,
  },
  {
    id: 3, slug: "soccer365",
    image: { src: "/images/soccer365-homepage.png", w: 1897, h: 949 },
    gsc:   { src: "/images/soccer365-gsc.png",      w: 1909, h: 676 },
    link: "https://www.soccer365.news/", newTab: true, nofollow: false,
  },
  {
    id: 4, slug: "fudbal365",
    image: { src: "/images/fudbal365-homepage.png", w: 1901, h: 940 },
    gsc:   { src: "/images/fudbal365-gsc.png",      w: 1915, h: 748 },
    link: "https://www.fudbal365.com/", newTab: true, nofollow: false,
  },
  {
    id: 5, slug: "alu-line-systems",
    image: { src: "/images/alu-line-systems-homepage.png", w: 1902, h: 944 },
    gsc:   { src: "/images/alu-line-systems-gsc.png",      w: 1905, h: 678 },
    link: "https://www.alu-line-systems.com/", newTab: true, nofollow: false,
  },
  {
    id: 6, slug: null,
    image: { src: "/images/zt-media-agency-website.png", w: 1897, h: 943 },
    gsc: null,
    link: "https://www.zt-media.digital", newTab: true, nofollow: false,
  },
  {
    id: 7, slug: null,
    image: { src: "/images/akademija-znanja-priprema-test-mup-tk.png", w: 1896, h: 945 },
    gsc: null,
    link: "https://police-eight-bay.vercel.app/", newTab: true, nofollow: false,
  },
  {
    id: 8, slug: "kakolako",
    image: { src: "/images/kakolako-gsc.jpg", w: 1099, h: 542 },
    gsc:   { src: "/images/kakolako-gsc.jpg", w: 1099, h: 542 },
    link: "https://kakolako.org/", newTab: true, nofollow: false,
  },
];

export type ProjectStatic = Project;

export const CASE_STUDY_SLUGS = PROJECTS.flatMap((p) => (p.slug ? [p.slug] : []));

export function projectBySlug(slug: string) {
  const index = PROJECTS.findIndex((p) => p.slug === slug);
  return index === -1 ? null : { ...PROJECTS[index], index };
}

/** Shape of `caseStudies.<slug>` in the message files. */
export type CaseStudyMsg = {
  title: string;
  metaDescription: string;
  client: string;
  role: string;
  period: string;
  summary: string;
  work: string[];
  results: { value: string; label: string }[];
  resultsNote: string;
  proofCaption: string;
  /** Caption for the site screenshot; omitted when the card image is the GSC shot itself. */
  siteCaption?: string;
};
