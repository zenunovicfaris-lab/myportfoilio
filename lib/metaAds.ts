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
  /** Logo version picked for the dark background, trimmed to its content. */
  logo: Shot;
  /** Square logo on its own coloured background, shown as a rounded tile. */
  logoTile?: boolean;
  /** Featured clients get a results card with a screenshot. */
  shot: Shot | null;
};

export const META_ADS_CLIENTS: MetaAdsClient[] = [
  {
    id: "epoxy387",
    name: "Epoxy 387",
    logo: { src: "/images/clients/epoxy-387-logo.png", w: 282, h: 320 },
    shot: { src: "/images/meta-ads/epoxy-387-meta-ads-poruke.png", w: 812, h: 334 },
  },
  {
    id: "vorbild",
    name: "Vorbild d.o.o.",
    logo: { src: "/images/clients/vorbild-logo.png", w: 320, h: 243 },
    shot: { src: "/images/meta-ads/vorbild-meta-ads-pozivi.png", w: 645, h: 334 },
  },
  {
    id: "beganovic",
    name: "Ograde Beganović",
    logo: { src: "/images/clients/ograde-beganovic-logo.png", w: 320, h: 276 },
    shot: null,
  },
  {
    id: "selmont",
    name: "Sel-Mont",
    logo: { src: "/images/clients/sel-mont-logo.png", w: 317, h: 320 },
    shot: null,
  },
  {
    id: "fimus",
    name: "Fimus Veleprodaja",
    logo: { src: "/images/clients/fimus-logo.png", w: 320, h: 320 },
    logoTile: true,
    shot: null,
  },
];

/** Shape of `metaAds.featured.<id>` in the message files. */
export type MetaAdsFeaturedMsg = {
  goal: string;
  summary: string;
  metrics: { value: string; label: string }[];
  extra?: string;
  caption: string;
};
