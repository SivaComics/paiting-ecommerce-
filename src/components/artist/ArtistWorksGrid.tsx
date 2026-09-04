import { Artwork } from "@/lib/data/types";
import { ArtworkCard } from "@/components/artwork/ArtworkCard";
import { RevealOnScroll } from "@/components/ui/motion";

export function ArtistWorksGrid({ works }: { works: Artwork[] }) {
  const available = works.filter((w) => w.availability !== "sold");
  const sold = works.filter((w) => w.availability === "sold");

  return (
    <div>
      {available.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-10 mb-14">
          {available.map((w, i) => (
            <RevealOnScroll key={w.id} delay={(i % 3) * 0.05}>
              <ArtworkCard artwork={w} />
            </RevealOnScroll>
          ))}
        </div>
      )}

      {sold.length > 0 && (
        <div>
          <p className="text-xs font-sans uppercase tracking-wider text-espresso-soft mb-6">
            Previously Sold
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-10 opacity-70">
            {sold.map((w, i) => (
              <RevealOnScroll key={w.id} delay={(i % 3) * 0.05}>
                <ArtworkCard artwork={w} />
              </RevealOnScroll>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
