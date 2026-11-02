// Server component: only the sections that animate or hold state ship as client JS.
import { setRequestLocale } from "next-intl/server";

import HomeHero              from "../components/HomeHero";
import PortfolioSection      from "../components/PortfolioSection";
import MetaAdsSection        from "../components/MetaAdsSection";
import ExperienceSection     from "../components/ExperienceSection";
import EducationSection      from "../components/EducationSection";
import ContactSection        from "../components/ContactSection";
import EffectsLayer          from "../components/EffectsLayer";
import GrowthScrollAnimation from "../components/GrowthScrollAnimation";

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="relative">
      <EffectsLayer />

      {/* ═══ 1. HERO (id="about") ══════════════════════════════════════════ */}
      <HomeHero />

      {/* ═══ 2. GROWTH SCROLL ANIMATION ════════════════════════════════════ */}
      <GrowthScrollAnimation />

      {/* ═══ 3. PORTFOLIO (id="projects") ══════════════════════════════════ */}
      <PortfolioSection />

      {/* ═══ 3b. META ADS (id="ads") ═══════════════════════════════════════ */}
      <MetaAdsSection />

      {/* ═══ 4+5. SKILLS & EXPERIENCE (id="resume") ════════════════════════ */}
      <ExperienceSection />

      {/* ═══ 5b. EDUCATION & LANGUAGES (id="education") ════════════════════ */}
      <EducationSection />

      {/* ═══ 6. CONTACT (id="contact") ══════════════════════════════════════ */}
      <ContactSection />
    </div>
  );
}
