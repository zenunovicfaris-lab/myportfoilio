"use client";

import Image from "next/image";
import { motion } from "framer-motion";

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

        .hero-marquee-track:hover {
          animation-play-state: paused;
        }

        @media (max-width: 768px) {
          .hero-marquee-track {
            animation-duration: 48s;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-marquee-track {
            animation: none;
          }
        }
      `}</style>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.55,
          duration: 0.55,
          ease: [0.16, 1, 0.3, 1] as const,
        }}
        className="mt-12 w-full"
      >
        <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-gray-500 text-center mb-5 select-none">
          Platforms I&apos;ve worked with
        </p>

        {/* Masked container */}
        <div
          className="overflow-hidden"
          style={{
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
            maskImage:
              "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
          }}
        >
          {/* Two identical groups for seamless infinite loop */}
          <div className="hero-marquee-track">
            {[0, 1].map((set) => (
              <div
                key={set}
                className="flex items-center gap-14 pr-14"
                aria-hidden={set === 1 ? "true" : undefined}
              >
                {LOGOS.map((logo) => (
                  <div
                    key={`${set}-${logo.file}`}
                    className="shrink-0 flex items-center justify-center"
                  >
                    <Image
                      src={`/logos/${logo.file}`}
                      alt={logo.name}
                      width={140}
                      height={40}
                      unoptimized
                      draggable={false}
                      className="h-8 w-auto object-contain select-none
                                 opacity-50 grayscale
                                 hover:opacity-100 hover:grayscale-0
                                 transition-[filter,opacity] duration-300"
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