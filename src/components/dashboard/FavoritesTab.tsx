import { favoriteArtworkIds } from "@/lib/data/collector";
import { getArtworkById } from "@/lib/data/artworks";
import { ArtworkCard } from "@/components/artwork/ArtworkCard";

export function FavoritesTab() {
  const artworks = favoriteArtworkIds.map(getArtworkById).filter((a): a is NonNullable<typeof a> => Boolean(a));

  if (artworks.length === 0) {
    return <p className="text-espresso-soft py-12 text-center">No saved favorites yet.</p>;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
      {artworks.map((a) => (
        <ArtworkCard key={a.id} artwork={a} />
      ))}
    </div>
  );
}
