import { Artwork, Dimensions } from "@/lib/data/types";
import { PRICE_ON_REQUEST, TBC } from "@/lib/site";

export function formatPrice(value: number, currency: string = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatDimensions(d: Dimensions): string {
  const parts = [d.height, d.width, d.depth].filter((v): v is number => typeof v === "number");
  return `${parts.join(" x ")} ${d.unit}`;
}

/** A price for display, or "Price on request" while the price is unconfirmed. */
export function formatArtworkPrice(artwork: Pick<Artwork, "price" | "currency">): string {
  return artwork.price === null ? PRICE_ON_REQUEST : formatPrice(artwork.price, artwork.currency);
}

/** Medium, dimensions and year, with [TBC] placeholders for anything unconfirmed. */
export function formatArtworkDetails(artwork: Pick<Artwork, "materials" | "dimensions" | "year">) {
  return {
    medium: artwork.materials ?? TBC.medium,
    dimensions: artwork.dimensions ? formatDimensions(artwork.dimensions) : TBC.dimensions,
    year: artwork.year !== null ? String(artwork.year) : TBC.year,
  };
}

export function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("en-US", { year: "numeric", month: "long", day: "numeric" }).format(
    new Date(iso)
  );
}
