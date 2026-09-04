"use client";

import { useState } from "react";
import { Artwork } from "@/lib/data/types";
import { Hero } from "./Hero";
import { IntroLoader } from "./IntroLoader";

export function HeroWithIntro({ artworks }: { artworks: Artwork[] }) {
  const [introReady, setIntroReady] = useState(false);

  return (
    <>
      <IntroLoader onComplete={() => setIntroReady(true)} />
      <Hero artworks={artworks} introReady={introReady} />
    </>
  );
}
