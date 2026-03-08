"use client";

import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls, RoundedBox, Sparkles, Text } from "@react-three/drei";
import { EffectComposer, Bloom, Noise, Vignette, ChromaticAberration } from "@react-three/postprocessing";
import * as THREE from "three";

const HEADLINE = "I build SEO systems that generate traffic, authority and revenue.";
const SUBHEADLINE = "Technical SEO · AI Content Systems · Programmatic Growth · Affiliate SEO";

const KEYWORDS = ["traffic", "SEO", "growth", "revenue", "authority", "systems"];

const CARDS = [
  { domain: "example.com", title: "iGaming SEO growth", metric: "+128% organic", accent: "#22d3ee" },
  { domain: "saas-tool.com", title: "Scaling SaaS signups", metric: "+85% trials", accent: "#60a5fa" },
  { domain: "growth.io", title: "Technical SEO audit checklist", metric: "CWV fixed", accent: "#34d399" },
  { domain: "rank-tracker.io", title: "Keyword velocity dashboard", metric: "Top 3 wins", accent: "#a78bfa" },
];

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8 } },
};

const headlineContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.025, delayChildren: 0.15 } },
};

const letterVariant = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55 } },
};

function MiniBars({ seed = 1 }: { seed?: number }) {
  const bars = useMemo(() => {
    const rng = mulberry32(seed);
    return Array.from({ length: 10 }, () => Math.max(0.12, rng() * 1));
  }, [seed]);

  return (
    <div className="mt-2 flex items-end gap-1">
      {bars.map((h, i) => (
        <span
          key={i}
          className="w-1.5 rounded-t bg-white/30"
          style={{ height: `${Math.round(h * 22)}px` }}
        />
      ))}
    </div>
  );
}

function Scene({
  heroHover,
  ctaHover,
}: {
  heroHover: boolean;
  ctaHover: boolean;
}) {
  const group = useRef<THREE.Group>(null);
  const cards = useRef<THREE.Group>(null);
  const headline = useRef<THREE.Group>(null);
  const reduce = useReducedMotion();

  const keywordPositions = useMemo(() => {
    const rng = mulberry32(42);
    return Array.from({ length: 48 }, (_, i) => {
      const r = 5 + rng() * 8;
      const theta = rng() * Math.PI * 2;
      const phi = Math.acos(2 * rng() - 1);
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = (r * Math.cos(phi)) / 1.2;
      const z = r * Math.sin(phi) * Math.sin(theta);
      return { x, y, z, word: KEYWORDS[i % KEYWORDS.length], s: 0.2 + rng() * 0.25 };
    });
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const px = state.pointer.x;
    const py = state.pointer.y;

    // Parallax camera-ish movement (GPU-friendly: just transforms)
    if (group.current && !reduce) {
      group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, px * 0.22, 0.06);
      group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -py * 0.18, 0.06);
    }

    if (cards.current) {
      cards.current.position.x = THREE.MathUtils.lerp(cards.current.position.x, px * 0.55, 0.05);
      cards.current.position.y = THREE.MathUtils.lerp(cards.current.position.y, py * 0.35, 0.05);
    }

    if (headline.current) {
      headline.current.rotation.y = THREE.MathUtils.lerp(headline.current.rotation.y, px * 0.12, 0.06);
    }

    // Volumetric-ish pulse via subtle light intensity modulation
    state.scene.traverse((obj) => {
      if ((obj as THREE.Light).isLight && obj.name === "pulse") {
        (obj as THREE.Light).intensity = 1.6 + Math.sin(t * 0.6) * 0.25;
      }
    });
  });

  const distort = heroHover ? 0.65 : 0.25;
  const ctaDistort = ctaHover ? 0.9 : 0.25;

  return (
    <group ref={group}>
      {/* Lighting */}
      <ambientLight intensity={0.35} />
      <spotLight
        name="pulse"
        position={[2.5, 4.5, 4.5]}
        angle={0.55}
        penumbra={1}
        intensity={1.6}
        color={"#22d3ee"}
      />
      <directionalLight position={[-5, 3, 2]} intensity={0.6} color={"#a78bfa"} />

      {/* Particle field */}
      <Sparkles
        count={reduce ? 80 : 140}
        speed={0.35}
        opacity={0.18}
        scale={[14, 8, 14]}
        size={reduce ? 1.2 : 1.6}
        color={"#7dd3fc"}
      />

      {/* Keyword particles */}
      <group>
        {keywordPositions.map((p, i) => (
          <Float
            key={i}
            speed={0.9 + (i % 6) * 0.15}
            rotationIntensity={0.35}
            floatIntensity={0.6}
          >
            <Text
              position={[p.x, p.y, p.z]}
              fontSize={p.s}
              color={"rgba(255,255,255,0.55)"}
              anchorX="center"
              anchorY="middle"
            >
              {p.word}
            </Text>
          </Float>
        ))}
      </group>

      {/* Floating holographic cards */}
      <group ref={cards}>
        {CARDS.map((c, i) => (
          <Float
            key={c.domain}
            speed={1 + i * 0.25}
            rotationIntensity={0.4}
            floatIntensity={0.8}
          >
            <HoloCard
              position={[-3 + i * 2, 1.2 - (i % 2) * 1.4, -1.8 - i * 0.4]}
              accent={c.accent}
              title={c.title}
              domain={c.domain}
              metric={c.metric}
            />
          </Float>
        ))}
      </group>

      {/* 3D headline: letter-by-letter pop + shader-like distortion on hover */}
      <group ref={headline} position={[0, 0.1, 0.2]}>
        <Float speed={0.55} rotationIntensity={0.15} floatIntensity={0.35}>
          <DistortedHeadline distort={distort} />
        </Float>
      </group>

      {/* CTA distortion plane (responds to DOM hover) */}
      <group position={[0, -1.45, 1]}>
        <Float speed={1.0} rotationIntensity={0.25} floatIntensity={0.25}>
          <RoundedBox args={[3.2, 0.9, 0.2]} radius={0.18} smoothness={4}>
            <meshStandardMaterial
              color={"#0b1220"}
              roughness={0.1}
              metalness={0.2}
              emissive={new THREE.Color("#22d3ee")}
              emissiveIntensity={ctaHover ? 0.6 : 0.15}
            />
          </RoundedBox>
          {/* Distortion overlay (shader-based) */}
          <mesh position={[0, 0, 0.12]}>
            <planeGeometry args={[3.25, 0.95, 32, 32]} />
            <meshPhysicalMaterial
              transparent
              opacity={0.18}
              roughness={0.05}
              metalness={0.0}
              color={new THREE.Color("#22d3ee")}
            />
          </mesh>
          <mesh position={[0, 0, 0.13]}>
            <planeGeometry args={[3.25, 0.95, 32, 32]} />
            <MeshDistortLikeMaterial distort={ctaDistort} speed={ctaHover ? 2.2 : 1.1} />
          </mesh>
        </Float>
      </group>

      {/* Postprocessing: cinematic glow + vignette + subtle chroma */}
      <EffectComposer>
        <Bloom intensity={0.65} luminanceThreshold={0.2} luminanceSmoothing={0.85} />
        <ChromaticAberration
          offset={new THREE.Vector2(0.0006, 0.0004)}
          radialModulation
          modulationOffset={0.65}
        />
        <Vignette eskil={false} offset={0.4} darkness={0.6} />
        <Noise opacity={0.03} />
      </EffectComposer>
    </group>
  );
}

function HoloCard({
  position,
  accent,
  domain,
  title,
  metric,
}: {
  position: [number, number, number];
  accent: string;
  domain: string;
  title: string;
  metric: string;
}) {
  return (
    <group position={position}>
      <RoundedBox args={[2.1, 1.2, 0.12]} radius={0.12} smoothness={4}>
        <meshPhysicalMaterial
          color={new THREE.Color("#0a0f1a")}
          transparent
          opacity={0.55}
          roughness={0.08}
          metalness={0.1}
          transmission={0.65}
          thickness={0.6}
          ior={1.25}
          emissive={new THREE.Color(accent)}
          emissiveIntensity={0.25}
        />
      </RoundedBox>

      <mesh position={[0, 0, 0.07]}>
        <planeGeometry args={[2.05, 1.12]} />
        <meshBasicMaterial transparent opacity={0.0} />
      </mesh>

      <Text
        position={[-0.9, 0.42, 0.08]}
        fontSize={0.12}
        color={"rgba(125,211,252,0.9)"}
        anchorX="left"
        anchorY="middle"
      >
        {domain}
      </Text>
      <Text
        position={[-0.9, 0.18, 0.08]}
        fontSize={0.16}
        color={"rgba(255,255,255,0.9)"}
        anchorX="left"
        anchorY="middle"
      >
        {title}
      </Text>
      <Text
        position={[-0.9, -0.18, 0.08]}
        fontSize={0.12}
        color={"rgba(52,211,153,0.9)"}
        anchorX="left"
        anchorY="middle"
      >
        {metric}
      </Text>

      {/* Tiny analytics bars */}
      <group position={[0.65, -0.25, 0.08]}>
        {Array.from({ length: 10 }).map((_, i) => (
          <mesh key={i} position={[-0.45 + i * 0.1, 0, 0]}>
            <boxGeometry args={[0.06, 0.1 + (i % 5) * 0.06, 0.02]} />
            <meshStandardMaterial color={accent} transparent opacity={0.55} emissive={accent} emissiveIntensity={0.2} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

function DistortedHeadline({ distort }: { distort: number }) {
  const letters = useMemo(() => Array.from(HEADLINE), []);
  const letterRefs = useRef<Array<THREE.Group | null>>([]);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);

  const positions = useMemo(() => {
    // Layout the text across a fixed width without external font JSON.
    // Using Text (SDF) keeps it lightweight and crisp.
    const total = letters.length;
    const w = 0.09;
    const start = (-total * w) / 2;
    return letters.map((_, i) => start + i * w);
  }, [letters]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    letterRefs.current.forEach((g, i) => {
      if (!g) return;
      const delay = i * 0.015;
      const targetZ = 0;
      const intro = THREE.MathUtils.clamp((t - delay) * 1.1, 0, 1);
      g.position.z = THREE.MathUtils.lerp(-0.6, targetZ, intro);
      g.scale.setScalar(THREE.MathUtils.lerp(0.95, 1, intro));
    });
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = t;
      materialRef.current.uniforms.uStrength.value = distort;
    }
  });

  // A lightweight shader that distorts alpha edges for a “glitchy” feel.
  const shader = useMemo(() => {
    const vertex = /* glsl */ `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `;
    const fragment = /* glsl */ `
      uniform float uTime;
      uniform float uStrength;
      varying vec2 vUv;
      float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453123); }
      void main() {
        vec2 uv = vUv;
        float n = hash(uv * 8.0 + uTime * 0.8);
        float warp = (n - 0.5) * 0.06 * uStrength;
        uv.x += warp;
        uv.y += sin((uv.x + uTime) * 10.0) * 0.01 * uStrength;
        float vignette = smoothstep(0.9, 0.2, distance(uv, vec2(0.5)));
        vec3 col = mix(vec3(0.55, 0.85, 1.0), vec3(0.13, 0.83, 0.93), uv.y) * vignette;
        gl_FragColor = vec4(col, 0.9);
      }
    `;
    return { vertex, fragment };
  }, []);

  return (
    <group position={[0, 0.25, 0]}>
      {/* SDF letters (fast) */}
      {letters.map((ch, i) => (
        <group key={i} ref={(el) => void (letterRefs.current[i] = el)} position={[positions[i], 0, 0]}>
          <Text
            fontSize={0.25}
            color={"rgba(255,255,255,0.92)"}
            anchorX="center"
            anchorY="middle"
            characters={HEADLINE}
          >
            {ch === " " ? "\u00A0" : ch}
          </Text>
        </group>
      ))}

      {/* Hover distortion overlay plane (shader) */}
      <mesh position={[0, -0.02, -0.12]}>
        <planeGeometry args={[10, 1.2, 1, 1]} />
        <shaderMaterial
          ref={(m) => {
            materialRef.current = m as unknown as THREE.ShaderMaterial;
          }}
          transparent
          depthWrite={false}
          uniforms={{
            uTime: { value: 0 },
            uStrength: { value: distort },
          }}
          vertexShader={shader.vertex}
          fragmentShader={shader.fragment}
        />
      </mesh>
    </group>
  );
}

function MeshDistortLikeMaterial({ distort, speed }: { distort: number; speed: number }) {
  // We keep a minimal custom shader instead of heavy effects.
  const mat = useRef<THREE.ShaderMaterial>(null);
  useFrame((state) => {
    if (!mat.current) return;
    mat.current.uniforms.uTime.value = state.clock.getElapsedTime();
    mat.current.uniforms.uDistort.value = distort;
    mat.current.uniforms.uSpeed.value = speed;
  });

  return (
    <shaderMaterial
      ref={mat}
      transparent
      depthWrite={false}
      uniforms={{
        uTime: { value: 0 },
        uDistort: { value: distort },
        uSpeed: { value: speed },
      }}
      vertexShader={/* glsl */ `
        uniform float uTime;
        uniform float uDistort;
        uniform float uSpeed;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          vec3 p = position;
          float w = sin((p.x * 6.0 + uTime * uSpeed)) * 0.08 * uDistort;
          float w2 = cos((p.y * 8.0 + uTime * (uSpeed * 0.9))) * 0.06 * uDistort;
          p.z += w + w2;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
        }
      `}
      fragmentShader={/* glsl */ `
        uniform float uTime;
        uniform float uDistort;
        varying vec2 vUv;
        void main() {
          float scan = sin((vUv.y + uTime * 0.35) * 60.0) * 0.5 + 0.5;
          float glow = smoothstep(0.0, 1.0, scan) * 0.18 * uDistort;
          vec3 col = vec3(0.13, 0.83, 0.93) * (0.18 + glow);
          gl_FragColor = vec4(col, 0.55);
        }
      `}
    />
  );
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [heroHover, setHeroHover] = useState(false);
  const [ctaHover, setCtaHover] = useState(false);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, 0.85, 0.4]);

  const letters = useMemo(() => Array.from(HEADLINE), []);

  return (
    <motion.section
      ref={(el) => void (sectionRef.current = el)}
      aria-label="Hero"
      className="relative min-h-dvh w-full overflow-hidden bg-[#030306]"
      variants={sectionVariants}
      initial="hidden"
      animate="visible"
      onMouseEnter={() => setHeroHover(true)}
      onMouseLeave={() => setHeroHover(false)}
    >
      {/* 3D background */}
      <motion.div className="absolute inset-0" style={{ scale }}>
        <Canvas
          dpr={[1, 1.75]}
          gl={{ powerPreference: "high-performance", antialias: false, alpha: true }}
          camera={{ position: [0, 0.3, 6.5], fov: 55, near: 0.1, far: 60 }}
        >
          <color attach="background" args={["#030306"]} />
          <fog attach="fog" args={["#030306", 8, 24]} />

          <Scene heroHover={heroHover} ctaHover={ctaHover} />

          <OrbitControls
            enabled={!reduce}
            enablePan={false}
            enableZoom={false}
            rotateSpeed={0.35}
            dampingFactor={0.08}
          />
        </Canvas>
      </motion.div>

      {/* Deep radial gradients */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_50%_50%,rgba(34,211,238,0.15),transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_50%_15%,rgba(167,139,250,0.18),transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.12] mix-blend-overlay [background-image:repeating-linear-gradient(0deg,rgba(255,255,255,0.04)_0px,rgba(255,255,255,0.04)_1px,transparent_1px,transparent_4px)]" />

      {/* UI overlay */}
      <motion.div
        className="relative z-10 flex min-h-dvh items-center justify-center px-6"
        style={{
          opacity: overlayOpacity,
        }}
      >
        <motion.div
          className="text-center max-w-4xl"
        >
          {/* Vignette/spotlight behind text */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[980px] h-[520px] bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(255,255,255,0.12),transparent_65%)]" />

          <motion.h1
className="relative font-[family-name:var(--font-space)] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white"
variants={headlineContainer}
initial="hidden"
animate="visible"
>
{letters.map((ch, i) => (
<motion.span
key={`${ch}-${i}`}
variants={letterVariant}
className="inline-block"
style={{ willChange: "transform, filter, opacity" }}
>
{ch === " " ? "\u00A0" : ch}
</motion.span>
))}
</motion.h1>

<motion.p
className="mt-6 text-base sm:text-lg md:text-xl text-gray-300/80"
initial={{ opacity: 0, y: 14 }}
animate={{ opacity: 1, y: 0 }}
transition={{ delay: 0.6, duration: 0.6 }}
>
{SUBHEADLINE}
</motion.p>

{/* CTAs */}
<motion.div
className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-5"
initial={{ opacity: 0, y: 16 }}
animate={{ opacity: 1, y: 0 }}
transition={{ delay: 0.9, duration: 0.6 }}
>
<Link
href="#case-studies"
onMouseEnter={() => setCtaHover(true)}
onMouseLeave={() => setCtaHover(false)}
className="group relative inline-flex items-center justify-center rounded-xl px-8 py-4 font-medium text-white"
>
<span className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/35 via-cyan-400/20 to-indigo-400/25" />
<motion.span
className="absolute inset-0 rounded-xl"
animate={{
boxShadow: [
"inset 0 0 0 1px rgba(34,211,238,0.35)",
"inset 0 0 0 1px rgba(34,211,238,0.65), 0 0 32px rgba(34,211,238,0.22)",
"inset 0 0 0 1px rgba(34,211,238,0.35)",
],
}}
transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
/>
<span className="relative text-cyan-100 transition-transform duration-300 group-hover:scale-[1.02]">
Enter the Growth System
</span>
</Link>

<Link
href="#case-studies"
className="relative inline-block text-gray-300/80 hover:text-cyan-200 transition-colors group/link"
>
View case studies
<span className="absolute left-0 -bottom-1 h-px w-0 bg-cyan-300 transition-all duration-300 group-hover/link:w-full" />
</Link>
</motion.div>

{/* Glass UI strip */}
<motion.div
className="mt-14 mx-auto max-w-3xl rounded-2xl border border-white/10 bg-white/[0.08] px-5 py-4 text-left shadow-[0_0_40px_rgba(34,211,238,0.12)]"
initial={{ opacity: 0, y: 18 }}
animate={{ opacity: 1, y: 0 }}
transition={{ delay: 1.1, duration: 0.6 }}
>
<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
<div>
<div className="text-xs text-cyan-300/80 tracking-wide">LIVE SYSTEM STATUS</div>
<div className="mt-1 text-sm text-gray-200/90">
Technical SEO + content ops + automation → compounding growth.
</div>
</div>
<div className="flex items-center gap-3">
<div className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3">
<div className="text-[10px] text-gray-400">Signals</div>
<div className="text-sm text-white/90">Crawl · CWV · Intent</div>
<MiniBars seed={7} />
</div>
<div className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3">
<div className="text-[10px] text-gray-400">Output</div>
<div className="text-sm text-white/90">Pages · Links · Revenue</div>
<MiniBars seed={11} />
</div>
</div>
</div>
</motion.div>
</motion.div>
</motion.div>
</motion.section>
  );
}

function mulberry32(a: number) {
  return function () {
    let t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

