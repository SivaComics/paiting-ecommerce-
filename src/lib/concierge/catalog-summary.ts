import { artists, artworks, collections } from "@/lib/data";
import { formatArtworkPrice, formatPrice } from "@/lib/format";
import { SITE_NAME } from "@/lib/site";

function buildCatalogSummary(): string {
  const artistLines = artists.map(
    (a) => `- ${a.name} (${a.region}): ${a.tagline}`
  );

  const collectionLines = collections.map(
    (c) => `- ${c.title}: ${c.curatorialBlurb}`
  );

  const availableWorks = artworks.filter((a) => a.availability === "available");
  const prices = availableWorks.map((a) => a.price).filter((p): p is number => p !== null);
  const priceRange = prices.length
    ? `priced roughly from ${formatPrice(Math.min(...prices))} to ${formatPrice(Math.max(...prices))}`
    : "with prices on request";

  const artworkLines = artworks.map((a) => {
    const artist = artists.find((ar) => ar.id === a.artistId);
    return `- "${a.title}" (${a.reference}, ${a.year ?? "year TBC"}) by ${artist?.name ?? "Unknown"} — ${a.medium}, ${formatArtworkPrice(
      a
    )}, ${a.availability}, slug: ${a.slug}`;
  });

  return [
    `${SITE_NAME}'s current inventory spans ${artworks.length} works from ${artists.length} artist${
      artists.length === 1 ? "" : "s"
    }, ${priceRange}.`,
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
