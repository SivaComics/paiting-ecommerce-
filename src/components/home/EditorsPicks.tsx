import { getArtworksByCollection } from "@/lib/data/artworks";
import { ArtworkCard } from "@/components/artwork/ArtworkCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealOnScroll } from "@/components/ui/motion";
import { Button } from "@/components/ui/Button";

export function EditorsPicks() {
  const picks = getArtworksByCollection("col-editors-picks").slice(0, 6);

  return (
    <section className="mx-auto max-w-7xl px-6 py-28">
      <RevealOnScroll>
        <div className="flex flex-wrap items-end justify-between gap-6 mb-14">
          <SectionHeading
            eyebrow="Curated This Week"
            title="Editor's Picks"
            description="A rotating selection chosen by Auréline's curatorial team, spanning painting, sculpture, and photography."
          />
          <Button href="/discover#collections" variant="secondary" size="sm">
            View All Collections
          </Button>
        </div>
      </RevealOnScroll>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-16">
        {picks.map((artwork, i) => (
          <RevealOnScroll key={artwork.id} delay={i * 0.05}>
            <ArtworkCard artwork={artwork} priority={i < 2} />
          </RevealOnScroll>
        ))}
      </div>
    </section>
  );
}
