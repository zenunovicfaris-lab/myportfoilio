"use client";

import BackgroundNoise from "./BackgroundNoise";
import CursorGlow from "./CursorGlow";
import Scene01Boot from "./Scene01Boot";
import Scene02SignalField from "./Scene02SignalField";
import Scene03SystemsConsole from "./Scene03SystemsConsole";
import Scene04CaseStudies from "./Scene04CaseStudies";
import Scene05Pipeline from "./Scene05Pipeline";
import Scene06ContactEnd from "./Scene06ContactEnd";

export default function HomeExperience() {
  return (
    <div className="relative">
      <BackgroundNoise />
      <CursorGlow />

      {/* Scenes as normal sections */}
      <section className="relative min-h-dvh">
        <Scene01Boot />
      </section>
      <section className="relative min-h-dvh">
        <Scene02SignalField />
      </section>
      <section className="relative min-h-dvh">
        <Scene03SystemsConsole />
      </section>
      <section className="relative min-h-dvh">
        <Scene04CaseStudies />
      </section>
      <section className="relative min-h-dvh">
        <Scene05Pipeline />
      </section>
      <section className="relative min-h-dvh">
        <Scene06ContactEnd />
      </section>
    </div>
  );
}

