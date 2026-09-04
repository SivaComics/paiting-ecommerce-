import { artworks } from "@/lib/data/artworks";
import { Artwork } from "@/lib/data/types";

export type SizeCategory = "Small" | "Medium" | "Large";

const newArrivalYearThreshold = Math.max(...artworks.map((a) => a.year)) - 1;

export function isNewArrival(artwork: Artwork): boolean {
  return artwork.year >= newArrivalYearThreshold;
}

export function getSizeCategory(artwork: Artwork): SizeCategory {
  const longest = Math.max(artwork.dimensions.height, artwork.dimensions.width);
  if (longest < 24) return "Small";
  if (longest <= 48) return "Medium";
  return "Large";
}

export const sizeCategories: SizeCategory[] = ["Small", "Medium", "Large"];

export const priceBands: { label: string; min: number; max: number }[] = [
  { label: "Under $5,000", min: 0, max: 5000 },
  { label: "$5,000 – $15,000", min: 5000, max: 15000 },
  { label: "$15,000 – $30,000", min: 15000, max: 30000 },
  { label: "$30,000+", min: 30000, max: Infinity },
];
