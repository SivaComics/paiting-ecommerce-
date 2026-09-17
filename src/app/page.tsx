import { ArtistOpening } from "@/components/home/ArtistOpening";
import { AboutTheWork } from "@/components/home/AboutTheWork";
import { PaintingsShowcase } from "@/components/home/PaintingsShowcase";
import { TheElements } from "@/components/home/TheElements";
import { ClosingAndContact } from "@/components/home/ClosingAndContact";
import { artworks } from "@/lib/data/artworks";

export default function HomePage() {
  return (
    <>
      <ArtistOpening />
      <AboutTheWork />
      <PaintingsShowcase artworks={artworks} />
      <TheElements />
      <ClosingAndContact />
    </>
  );
}
