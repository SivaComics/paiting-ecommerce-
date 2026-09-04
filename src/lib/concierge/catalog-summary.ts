import { artists, artworks, collections } from "@/lib/data";
import { formatPrice } from "@/lib/format";

function buildCatalogSummary(): string {
  const artistLines = artists.map(
    (a) => `- ${a.name} (${a.region}): ${a.tagline}`
  );

  const collectionLines = collections.map(
    (c) => `- ${c.title}: ${c.curatorialBlurb}`
  );

  const availableWorks = artworks.filter((a) => a.availability === "available");
  const prices = availableWorks.map((a) => a.price);
  const min = Math.min(...prices);
  const max = Math.max(...prices);

  const artworkLines = artworks.map((a) => {
    const artist = artists.find((ar) => ar.id === a.artistId);
    return `- "${a.title}" (${a.year}) by ${artist?.name ?? "Unknown"} — ${a.medium}, ${formatPrice(
      a.price
    )}, ${a.availability}, slug: ${a.slug}`;
  });

  return [
    `Auréline's current inventory spans ${artworks.length} works from ${artists.length} artists, priced roughly from ${formatPrice(
      min
    )} to ${formatPrice(max)}.`,
    "",
    "ARTISTS:",
    ...artistLines,
    "",
    "CURATED COLLECTIONS:",
    ...collectionLines,
    "",
    "ARTWORKS (reference only these — never invent inventory that isn't listed here):",
    ...artworkLines,
  ].join("\n");
}

export const catalogSummary = buildCatalogSummary();
