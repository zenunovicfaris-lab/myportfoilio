"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";

export type SceneRenderProps = {
  progress: MotionValue<number>;
  isActive: boolean;
  index: number;
};

export default function SceneFrame({
  index,
  children,
  label,
}: {
  index: number;
  label: string;
  children: (props: SceneRenderProps) => React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Each scene is pinned ~100vh (wrapper is 200vh; sticky is 100vh)
  const y = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const scale = useTransform(scrollYProgress, [0, 0.65, 1], [1, 0.985, 0.94]);
  const opacity = useTransform(scrollYProgress, [0, 0.7, 1], [1, 0.9, 0.4]);

  return (
    <div ref={ref} className="relative h-[200vh]">
      <motion.div className="sticky top-0 h-dvh w-full" style={{ y, scale, opacity }}>
        <div className="absolute left-6 top-6 z-20 text-[10px] tracking-[0.24em] text-cyan-200/60">
          {String(index + 1).padStart(2, "0")} / 06 · {label.toUpperCase()}
        </div>
        {children({ progress: scrollYProgress, isActive: true, index })}
      </motion.div>
    </div>
  );
}

