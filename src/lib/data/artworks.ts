import { Artwork } from "./types";
import { getPaintingImages } from "./painting-images";
import { TBC } from "@/lib/site";

/**
 * K. Balasubramanian's paintings, as photographed in the yathraemagazine.com
 * article "Renowned Artist K. Balasubramanian".
 *
 * Source rules for this file:
 * - Neither the article nor the client PDFs say why any individual painting
 *   was made, so no painting is given a reason or meaning of its own.
 * - `observation` only describes what can be seen in the photograph.
 * - `artistQuote` is one of the artist's published statements (see
 *   artist-words.ts). `about` states plainly what the quote is about:
 *   where he describes a motif that is visibly in this painting, it names the
 *   motif; otherwise it says he is speaking about his work in general.
 * - Titles, medium, dimensions, year and price are [TBC] / null.
 * - `description` stays empty: none of these photographs can be matched with
 *   certainty to the six paintings the HS commentary describes (their texts
 *   are kept in commentary-reflections.ts).
 */

const ARTIST_ID = "artist-balu";

type Seed = Pick<Artwork, "slug" | "observation" | "artistQuote"> & { palette: string[] };

// Order follows the article. Palettes are approximate, from the photographs.
const seeds: Seed[] = [
  {
    slug: "painting-01",
    observation:
      "A large circle ringed with flame-like strokes stands above a row of green, upward-pointing triangles; the centre triangle holds a spiral. A line of five dots falls from the circle towards them, between two tall patterned columns.",
    artistQuote: { key: "atman", about: "on the upward-pointing triangle and the circle in his compositions" },
    palette: ["#F1E8D2", "#4E7A4A", "#D9A441"],
  },
  {
    slug: "painting-02",
    observation:
      "A circle of wave-like strokes floats inside a border of black triangles. Beneath it are a small serpent form, rows of gold dots and a square of many-coloured triangles turned in every direction.",
    artistQuote: { key: "inspiration", about: "on his work" },
    palette: ["#F7F5F0", "#1E1E1E", "#C79A3A"],
  },
  {
    slug: "painting-03",
    observation:
      "A large ringed circle, and beneath it a serpent-like form ending in a spiral. Below are two cross-hatched squares, one holding an upward-pointing triangle and the other a downward-pointing one. Rows of small blue triangles run along the foot, one of them red.",
    artistQuote: { key: "shakti", about: "on the upward- and downward-pointing triangles in his compositions" },
    palette: ["#F2E8D3", "#3F6FB0", "#1E1E1E"],
  },
  {
    slug: "painting-04",
    observation:
      "Teal and white triangles run down both sides and along the foot. Inside, a ringed circle sits above a square of black and rose-brown triangles, with a small serpent form in the upper corner and a single small triangle below.",
    artistQuote: { key: "symbolsAndForms", about: "on his work" },
    palette: ["#F0E7D6", "#3E8A9C", "#9C6B5E"],
  },
  {
    slug: "painting-05",
    observation:
      "A field of interlocking triangles, edged in black and touched with gold, fills the upper half. Below it stand three forms, a spiral serpent, a banded capsule and a coiled serpent, above a band of black and gold triangles.",
    artistQuote: { key: "communication", about: "on art" },
    palette: ["#F4EEDF", "#1F2A44", "#D8B24E"],
  },
  {
    slug: "painting-06",
    observation:
      "A large ringed circle fills the upper sheet, with a small serpent beside it. Below, zigzag lines of black and yellow triangles and small flower-like marks lead down to a band of triangles.",
    artistQuote: { key: "canvas", about: "on his work" },
    palette: ["#F5EFD8", "#2A2420", "#D9B25C"],
  },
  {
    slug: "painting-07",
    observation:
      "On a deep blue and silver-grey ground, a large grey triangle points across the upper half. A bright green circle sits on a dark band, with small gold dots, and the lower half is left open.",
    artistQuote: { key: "colour", about: "on colour in his work" },
    palette: ["#2A2C5A", "#8C8F9E", "#22C47A"],
  },
  {
    slug: "painting-08",
    observation:
      "The same arrangement as Painting No. 07 with the circle in red: a large grey triangle across the upper half, a red circle on a dark blue band, and the lower half left open.",
    artistQuote: { key: "precursor", about: "on art" },
    palette: ["#2A2C5A", "#8C8F9E", "#E5482A"],
  },
];

export const artworks: Artwork[] = seeds.map((s, i) => {
  const images = getPaintingImages(s.slug);
  return {
    id: `aw-${s.slug}`,
    slug: s.slug,
    title: TBC.title,
    reference: `Painting No. ${String(i + 1).padStart(2, "0")}`,
    artistId: ARTIST_ID,
    year: null, // TBC: year
    medium: "Painting",
    materials: null, // TBC: medium
    dimensions: null, // TBC: dimensions
    price: null, // TBC: price
    currency: "USD", // TBC: confirm currency once prices are known
    images: images.map((img) => img.src),
    imageAspect: images[0].aspect,
    collectionIds: [],
    colorPalette: s.palette,
    region: "[TBC: location]",
    availability: "available", // TBC: confirm each work is available
    description: "", // see commentary-reflections.ts
    observation: s.observation,
    artistQuote: s.artistQuote,
    provenance: [],
    exhibitionHistory: [],
    framingOptions: [],
    featured: true,
  };
});

export function getArtworkById(id: string): Artwork | undefined {
  return artworks.find((a) => a.id === id);
}

export function getArtworkBySlug(slug: string): Artwork | undefined {
  return artworks.find((a) => a.slug === slug);
}

export function getArtworksByArtist(artistId: string): Artwork[] {
  return artworks.filter((a) => a.artistId === artistId);
}

export function getArtworksByCollection(collectionId: string): Artwork[] {
  return artworks.filter((a) => a.collectionIds.includes(collectionId));
}

export function getFeaturedArtworks(): Artwork[] {
  return artworks.filter((a) => a.featured);
}
