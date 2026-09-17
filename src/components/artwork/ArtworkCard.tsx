import Link from "next/link";
import { Artwork } from "@/lib/data/types";
import { getArtistById } from "@/lib/data/artists";
import { formatArtworkPrice } from "@/lib/format";
import { ZoomOnHover } from "@/components/ui/motion";
import { CornerFrame } from "@/components/ui/CornerFrame";

export function ArtworkCard({ artwork, priority = false }: { artwork: Artwork; priority?: boolean }) {
  const artist = getArtistById(artwork.artistId);
  const aspect = 1 / artwork.imageAspect;

  return (
    <Link href={`/artwork/${artwork.slug}`} className="group block transition-transform duration-500 ease-premium hover:-translate-y-1">
      <ZoomOnHover className="relative bg-cream-deep shadow-sm border border-transparent group-hover:border-copper/30 group-hover:shadow-premium transition-[box-shadow,border-color] duration-500 ease-premium">
        <div style={{ aspectRatio: `1 / ${aspect.toFixed(3)}` }} className="relative w-full overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={artwork.images[0]}
            alt={`${artwork.reference} by ${artist?.name ?? "unknown artist"}`}
            loading={priority ? "eager" : "lazy"}
            className="absolute inset-0 h-full w-full object-cover"
          />

          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-espresso-veil opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-500 ease-premium"
          />

          <CornerFrame className="hidden lg:block" />

          <div className="absolute inset-x-0 bottom-0 p-4 opacity-100 translate-y-0 lg:opacity-0 lg:translate-y-2 lg:group-hover:opacity-100 lg:group-hover:translate-y-0 transition-all duration-500 ease-premium">
            <p className="font-serif text-base sm:text-lg text-cream leading-snug truncate">{artwork.title}</p>
            <p className="text-[11px] font-sans uppercase tracking-wider text-cream/75 truncate mt-0.5">
              {artist?.name}
            </p>
            <p className="text-sm text-cream/90 mt-1">
              {artwork.availability === "sold" ? (
                "Sold"
              ) : (
                <>
                  {formatArtworkPrice(artwork)}
                  {artwork.availability === "on-hold" && <span className="text-cream/60"> · On Hold</span>}
                </>
              )}
            </p>
          </div>
        </div>
      </ZoomOnHover>
    </Link>
  );
}
