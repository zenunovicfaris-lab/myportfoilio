/**
 * Meta Ads (Facebook / Instagram) clients. Names are proper nouns and stay the
 * same in every language; the industry line, metrics and captions live under
 * `metaAds` in the message files, keyed by `id`.
 *
 * Screenshots in /images/meta-ads are crops of Ads Manager exports. Keep only
 * the performance block: Meta's peer-comparison panel is left in where it is
 * favourable and cropped out where it is not.
 */
type Shot = { src: string; w: number; h: number };

export type MetaAdsClient = {
  id: string;
  name: string;
  /** Featured clients get a results card with a screenshot. */
  shot: Shot | null;
};

export const META_ADS_CLIENTS: MetaAdsClient[] = [
  {
    id: "epoxy387",
    name: "Epoxy 387",
    shot: { src: "/images/meta-ads/epoxy-387-meta-ads-poruke.png", w: 812, h: 334 },
  },
  {
    id: "vorbild",
    name: "Vorbild d.o.o.",
    shot: { src: "/images/meta-ads/vorbild-meta-ads-pozivi.png", w: 645, h: 334 },
  },
  { id: "beganovic", name: "Ograde Beganović", shot: null },
  { id: "selmont", name: "Sel-Mont", shot: null },
  { id: "fimus", name: "Fimus Veleprodaja", shot: null },
];

/** Shape of `metaAds.featured.<id>` in the message files. */
export type MetaAdsFeaturedMsg = {
  goal: string;
  summary: string;
  metrics: { value: string; label: string }[];
  extra?: string;
  caption: string;
};
