import ScrollVideoHero from "@/components/home/ScrollVideoHero";
import { HeroWithIntro } from "@/components/home/HeroWithIntro";
import { DiscoverArtSection } from "@/components/home/DiscoverArtSection";
import { EditorsPicks } from "@/components/home/EditorsPicks";
import { PressBar } from "@/components/home/PressBar";
import { WhiteGlovePromise } from "@/components/home/WhiteGlovePromise";
import { HairlineDivider } from "@/components/ui/HairlineDivider";
import { getFeaturedArtworks } from "@/lib/data/artworks";

export default function HomePage() {
  const featured = getFeaturedArtworks();

  return (
    <>
      <ScrollVideoHero />
      <HeroWithIntro artworks={featured} />
      <HairlineDivider accent />
      <DiscoverArtSection />
      <HairlineDivider accent className="max-w-7xl mx-auto" />
      <EditorsPicks />
      <PressBar />
      <WhiteGlovePromise />
    </>
  );
}
