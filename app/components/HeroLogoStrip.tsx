"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const LOGOS = [
  { file: "adventuregamers.png", name: "Adventure Gamers" },
  { file: "bitcoinist.png", name: "Bitcoinist" },
  { file: "clickoutmedia.png", name: "ClickOut Media" },
  { file: "cryptonews.png", name: "CryptoNews" },
  { file: "esports.png", name: "Esports" },
  { file: "healthstatus.png", name: "HealthStatus" },
  { file: "htmq.png", name: "HTMQ" },
  { file: "icobench.png", name: "ICOBench" },
  { file: "imperia.png", name: "Imperia" },
  { file: "newsbtc.png", name: "NewsBTC" },
  { file: "uvezi.png", name: "Uvezi" },
  { file: "videogamer.png", name: "VideoGamer" },
  { file: "99bitcoins.png", name: "99Bitcoins" },
];

export default function HeroLogoStrip() {
  /**
   * mounted guard: server sends an invisible placeholder div.
   * Client renders the real content after first paint.
   * This prevents the motion.div initial={opacity:0} inline style
   * from being in the SSR HTML and potentially mismatching.
   */
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    // SSR / pre-hydration: reserve the space, no animation state in HTML
    return <div className="mt-12 w-full h-14" aria-hidden="true" />;
  }

  return (
    <>
      <style>{`
        @keyframes heroMarquee {
          from { transform: translate3d(0, 0, 0); }
          to   { transform: translate3d(-50%, 0, 0); }
        }

        .hero-marquee-track {
          display: flex;
          width: max-content;
          will-change: transform;
          animation: heroMarquee 36s linear infinite;
        }

        @media (max-width: 768px) {
          .hero-marquee-track { animation-duration: 48s; }
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-marquee-track { animation: none; }
        }

        /* Hover state written in CSS so it survives Tailwind purging */
        .hl-logo {
          opacity: 0.5;
          filter: grayscale(1);
          transition: opacity 300ms, filter 300ms;
        }
        .hl-logo:hover {
          opacity: 1;
          filter: grayscale(0);
        }
      `}</style>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55, duration: 0.55, ease: [0.16, 1, 0.3, 1] as const }}
        className="mt-12 w-full"
      >
        <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-gray-500 text-center mb-5 select-none">
          Platforms I&apos;ve worked with
        </p>

        <div
          className="overflow-hidden"
          style={{
            WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
            maskImage:        "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
          }}
        >
          <div className="hero-marquee-track">
            {[0, 1].map((set) => (
              <div
                key={set}
                className="flex items-center gap-14 pr-14"
                aria-hidden={set === 1 ? "true" : undefined}
              >
                {LOGOS.map((logo) => (
                  <div key={`${set}-${logo.file}`} className="shrink-0 flex items-center justify-center">
                    <Image
                      src={`/logos/${logo.file}`}
                      alt={logo.name}
                      width={140}
                      height={40}
                      draggable={false}
                      className="hl-logo h-8 w-auto object-contain select-none"
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </>
  );
}
