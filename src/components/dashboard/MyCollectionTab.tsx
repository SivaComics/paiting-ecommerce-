import { orders } from "@/lib/data/collector";
import { getArtworkById } from "@/lib/data/artworks";
import { getArtistById } from "@/lib/data/artists";
import Link from "next/link";

export function MyCollectionTab() {
  const owned = orders
    .map((o) => getArtworkById(o.artworkId))
    .filter((a): a is NonNullable<typeof a> => Boolean(a));

  if (owned.length === 0) {
    return <p className="text-espresso-soft py-12 text-center">Your collection is empty for now.</p>;
  }

  return (
    <div className="bg-gradient-cream-blush p-8 sm:p-12">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
        {owned.map((artwork) => {
          const artist = getArtistById(artwork.artistId);
          return (
            <Link
              key={artwork.id}
              href={`/artwork/${artwork.slug}`}
              className="group block transition-transform duration-500 ease-premium hover:-translate-y-1"
            >
              <div className="bg-cream p-3 border border-transparent shadow-[0_10px_30px_rgba(42,36,32,0.12)] group-hover:border-copper/30 transition-colors duration-500 ease-premium">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={artwork.images[0]}
                  alt={artwork.title}
                  className="w-full aspect-square object-cover"
                />
              </div>
              <p className="mt-3 font-serif text-sm text-espresso text-center group-hover:text-copper transition-colors duration-300 ease-premium">
                {artwork.title}
              </p>
              <p className="text-xs text-espresso-soft text-center">{artist?.name}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
