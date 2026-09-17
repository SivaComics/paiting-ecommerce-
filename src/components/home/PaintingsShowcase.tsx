import Link from "next/link";
import { clsx } from "clsx";
import { Artwork } from "@/lib/data/types";
import { formatArtworkDetails, formatArtworkPrice } from "@/lib/format";
import { AcquireActions } from "@/components/artwork/AcquireActions";
import { PaintingStory } from "@/components/artwork/PaintingStory";
import { RevealOnScroll } from "@/components/ui/motion";
import { ARTIST_NAME } from "@/lib/site";
import { SectionLabel } from "./SectionLabel";
import { DrawnRule } from "./scroll-effects";

export function PaintingsShowcase({ artworks }: { artworks: Artwork[] }) {
  return (
    <section
      id="paintings"
      aria-labelledby="paintings-heading"
      className="bg-cream-deep"
    >
      <DrawnRule />
      <div className="mx-auto max-w-6xl px-6 pt-24 sm:pt-36">
        <SectionLabel number="02">The Paintings</SectionLabel>
        <h2 id="paintings-heading" className="mt-8 font-serif text-5xl font-light leading-[1.02] text-espresso sm:text-6xl">
          Each work, <span className="italic text-copper-metal">on its own</span>
        </h2>
      </div>

      <div className="mx-auto max-w-6xl px-6">
        {artworks.map((artwork, i) => (
          <div key={artwork.id}>
            {i > 0 && <DrawnRule className="mx-auto w-24" />}
            <PaintingFeature artwork={artwork} index={i} total={artworks.length} imageRight={i % 2 === 1} />
          </div>
        ))}
      </div>
    </section>
  );
}

function PaintingFeature({
  artwork,
  index,
  total,
  imageRight,
}: {
  artwork: Artwork;
  index: number;
  total: number;
  imageRight: boolean;
}) {
  const pad = (n: number) => String(n).padStart(2, "0");
  const details = formatArtworkDetails(artwork);
  const headingId = `painting-${artwork.slug}`;

  return (
    <article
      id={artwork.slug}
      aria-labelledby={headingId}
      className="grid grid-cols-1 items-center gap-12 py-24 sm:py-32 md:grid-cols-12 md:gap-16"
    >
      <RevealOnScroll className={clsx("md:col-span-6", imageRight && "md:order-2 md:col-start-7")}>
        <Link
          href={`/artwork/${artwork.slug}`}
          className="copper-frame mx-auto block w-full max-w-md"
          aria-label={`View details: ${artwork.title}, ${artwork.reference}`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={artwork.images[0]}
            alt={`${artwork.reference} by ${ARTIST_NAME}`}
            loading="lazy"
            className="block h-auto w-full"
            style={{ aspectRatio: String(artwork.imageAspect) }}
          />
        </Link>
      </RevealOnScroll>

      <RevealOnScroll
        delay={0.1}
        className={clsx("md:col-span-5", imageRight ? "md:order-1 md:col-start-1" : "md:col-start-8")}
      >
        <p className="flex items-baseline gap-3">
          <span className="font-serif text-lg italic text-copper-metal">
            {pad(index + 1)} <span className="text-sm">/ {pad(total)}</span>
          </span>
          <span className="text-[11px] font-sans uppercase tracking-[0.28em] text-copper-deep">{artwork.reference}</span>
        </p>
        <h3 id={headingId} className="mt-4 font-serif text-4xl font-light text-espresso sm:text-5xl">
          {artwork.title}
        </h3>
        <p className="mt-4 text-[13px] tracking-wide text-espresso-soft">
          {details.medium}
          <span className="mx-2" aria-hidden="true">·</span>
          {details.dimensions}
          <span className="mx-2" aria-hidden="true">·</span>
          {details.year}
        </p>

        <span className="copper-rule mt-8 block w-12" aria-hidden="true" />
        {artwork.description && (
          <p className="mt-8 max-w-md text-base leading-[1.85] text-espresso-soft">{artwork.description}</p>
        )}
        <PaintingStory artwork={artwork} className="mt-8" />

        <p className="mt-8 font-serif text-2xl font-light italic text-espresso">{formatArtworkPrice(artwork)}</p>
        <AcquireActions artwork={artwork} className="mt-5" />

        <Link
          href={`/artwork/${artwork.slug}`}
          className="mt-8 inline-block text-[11px] font-sans uppercase tracking-[0.28em] text-espresso-soft underline decoration-copper/50 underline-offset-8 hover:text-copper-deep hover:decoration-copper transition-colors duration-500 ease-premium"
        >
          View details
        </Link>
      </RevealOnScroll>
    </article>
  );
}
